#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path
from typing import Any

from google import genai
from google.genai import types


ROOT = Path(__file__).resolve().parents[2]
SITE_DIR = ROOT / "site"
DATA_JS = SITE_DIR / "data.js"
VIDEOS_DIR = SITE_DIR
OUT_DIR = Path(__file__).resolve().parent
MOMENTS_DIR = OUT_DIR / "gemini-moments"
CLIPS_ROOT = OUT_DIR / "clips"
MANIFEST_PATH = OUT_DIR / "hook-moments.csv"
MODEL = "gemini-3.1-flash-lite-preview"


def slug(value: str) -> str:
    value = value.lower().replace("@", "")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "unknown"


def run(cmd: list[str], **kwargs: Any) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=True, text=True, **kwargs)


def load_viral_references() -> list[dict[str, Any]]:
    js = (
        "global.window={};"
        f"require({json.dumps(str(DATA_JS))});"
        "console.log(JSON.stringify(window.referenceData.viralNonTikTokShop));"
    )
    result = run(["node", "-e", js], capture_output=True)
    return json.loads(result.stdout)


def duration_seconds(video_path: Path) -> float:
    result = run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=nk=1:nw=1",
            str(video_path),
        ],
        capture_output=True,
    )
    return float(result.stdout.strip())


def build_prompt(ref: dict[str, Any], duration: float) -> str:
    video_id = ref["videoId"]
    creator = ref["creator"]
    title = ref["title"]
    title_l = title.lower()
    if "banana" in title_l and "honey" in title_l:
        ingredient_focus = "banana+honey / diy skincare"
    elif "banana" in title_l:
        ingredient_focus = "banana / diy skincare"
    elif "honey" in title_l:
        ingredient_focus = "honey / diy skincare"
    else:
        ingredient_focus = "diy skincare"

    return f'''你正在分析一条 non-shoppable 的 TikTok 爆款参考视频。

视频信息：
- video_id: {video_id}
- creator: {creator}
- title: {title}
- ingredient_focus: {ingredient_focus}
- duration_seconds: {duration:.1f}

你的任务是找出里面最有价值的视觉片段，用来给 MUMUKI Honey Banana BDRN Ampoule 做 shoppable video 的视觉 Hook 灵感。

重点不是总结视频。
重点是判断：哪些片段值得被切出来。

我们关心的是：
- 哪几秒最容易让人停下来
- 哪个动作有最强的视觉冲击
- 哪个画面能证明 banana / honey / DIY skincare 这个 angle 已经有人愿意看
- 哪个片段可以被迁移到 MUMUKI 的 shoppable video 里

我们重点看这些视觉元素：
- 任何能让人觉得“等一下，她在干嘛？”的画面
- banana 出现在脸上
- honey 出现在脸上
- banana peel rubbing skin
- honey texture / sticky texture
- DIY skincare mess
- face close-up
- product-like application
- skin glow / skin payoff
- before-after / one side vs other side

我们不关心：
- 普通 talking
- 健康类解释
- 太长的 ingredient science
- 没有视觉动作的说明
- 只能服务原视频 context、无法迁移到 MUMUKI 的片段

时间戳规则非常重要：
- 必须输出 absolute seconds
- 必须用数字，不要用字符串
- 正确示例：16.0, 21.5, 36.0
- 错误示例：0.16, 0:16, 00:16

请返回 JSON，不要返回 markdown，不要解释。

JSON 格式如下：

{{
  "video_id": "{video_id}",
  "creator": "{creator}",
  "title": "{title}",
  "ingredient_focus": "{ingredient_focus}",
  "candidate_valuable_moments": [
    {{
      "index": 1,
      "start_seconds": 0.0,
      "end_seconds": 3.5,
      "moment_bucket": "hook_moment",
      "role_tag": "stop-power",
      "visual_evidence": "具体描述画面里发生了什么，只描述看得见的东西",
      "on_screen_text": "如果画面上有字，写出原文；没有就留空",
      "spoken_evidence": "如果口播对这个片段很重要，写出关键原句；不重要就留空",
      "why_this_moment_matters": "为什么这个片段值得被切出来",
      "mumuki_reuse_note": "这个片段可以怎么迁移到 MUMUKI；如果不能迁移，写 not reusable",
      "clip_priority": 1
    }}
  ]
}}

筛选规则：
- 返回 5-8 个片段
- 不要输出小于 2 秒的片段
- 不要平均覆盖整条视频，只选真正有用的视觉片段
- 优先选视觉动作，不要优先选口播
- 如果两个片段做的是同一件事，只保留更强的那个
- 最强 Hook 片段的 clip_priority 应该是 1
- 如果某个片段只是好看，但不能迁移到 MUMUKI，不要选
- 如果某个片段能证明 banana / honey 这个 angle 已经有观看兴趣，要优先选

只返回 JSON。'''


def upload_ready(client: genai.Client, video_path: Path) -> Any:
    uploaded = client.files.upload(file=str(video_path))
    for _ in range(36):
        state = getattr(uploaded, "state", None)
        state_name = getattr(state, "name", str(state)) if state is not None else ""
        if state_name.upper() == "PROCESSING":
            time.sleep(5)
            uploaded = client.files.get(name=uploaded.name)
            continue
        return uploaded
    return uploaded


def parse_json(text: str) -> dict[str, Any]:
    clean = text.strip()
    if clean.startswith("```"):
        clean = re.sub(r"^```(?:json)?\s*", "", clean)
        clean = re.sub(r"\s*```$", "", clean)
    return json.loads(clean)


def normalize_moments(data: dict[str, Any], duration: float) -> list[dict[str, Any]]:
    moments = data.get("candidate_valuable_moments", [])
    normalized: list[dict[str, Any]] = []
    for i, moment in enumerate(moments, 1):
        try:
            start = float(moment.get("start_seconds", 0))
            end = float(moment.get("end_seconds", start + 3))
        except (TypeError, ValueError):
            continue
        start = max(0.0, min(start, max(0.0, duration - 0.5)))
        end = max(start + 2.0, min(end, duration))
        if start >= duration:
            continue
        moment["index"] = i
        moment["start_seconds"] = round(start, 2)
        moment["end_seconds"] = round(end, 2)
        moment["clip_file"] = f"beat-{i:02d}.mp4"
        normalized.append(moment)
    data["candidate_valuable_moments"] = normalized
    return normalized


def cut_clips(video_path: Path, clips_dir: Path, moments: list[dict[str, Any]]) -> None:
    clips_dir.mkdir(parents=True, exist_ok=True)
    for moment in moments:
        start = float(moment["start_seconds"])
        end = float(moment["end_seconds"])
        out = clips_dir / str(moment["clip_file"])
        run(
            [
                "ffmpeg",
                "-y",
                "-ss",
                f"{start:.3f}",
                "-i",
                str(video_path),
                "-t",
                f"{end - start:.3f}",
                "-c:v",
                "libx264",
                "-preset",
                "veryfast",
                "-crf",
                "23",
                "-c:a",
                "aac",
                "-movflags",
                "+faststart",
                str(out),
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )


def append_manifest(rows: list[dict[str, Any]]) -> None:
    fieldnames = [
        "video_id",
        "creator",
        "title",
        "local_video",
        "clip_path",
        "start_seconds",
        "end_seconds",
        "moment_bucket",
        "role_tag",
        "clip_priority",
        "visual_evidence",
        "on_screen_text",
        "spoken_evidence",
        "why_this_moment_matters",
        "mumuki_reuse_note",
    ]
    exists = MANIFEST_PATH.exists()
    with MANIFEST_PATH.open("a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if not exists:
            writer.writeheader()
        for row in rows:
            writer.writerow({k: row.get(k, "") for k in fieldnames})


def process_ref(client: genai.Client, ref: dict[str, Any], force: bool = False) -> dict[str, Any]:
    video_id = ref["videoId"]
    video_path = VIDEOS_DIR / ref["localVideo"]
    json_path = MOMENTS_DIR / f"{video_id}.v3.31flashlite.json"
    clips_dir = CLIPS_ROOT / f"{slug(ref['creator'])}__{slug(ref['title'])}__{video_id}_v3_31flashlite"
    if json_path.exists() and not force:
        return {"video_id": video_id, "status": "skipped", "json": str(json_path), "clips_dir": str(clips_dir)}
    if not video_path.exists():
        return {"video_id": video_id, "status": "missing_video", "video": str(video_path)}

    duration = duration_seconds(video_path)
    prompt = build_prompt(ref, duration)
    uploaded = upload_ready(client, video_path)
    response = client.models.generate_content(
        model=MODEL,
        contents=[uploaded, prompt],
        config=types.GenerateContentConfig(response_mime_type="application/json", temperature=0.1),
    )
    data = parse_json(response.text or "")
    data["model_used"] = MODEL
    data["source_url"] = ref.get("url", "")
    data["local_video"] = ref["localVideo"]
    moments = normalize_moments(data, duration)

    MOMENTS_DIR.mkdir(parents=True, exist_ok=True)
    json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    cut_clips(video_path, clips_dir, moments)

    manifest_rows = []
    for moment in moments:
        manifest_rows.append(
            {
                "video_id": video_id,
                "creator": ref["creator"],
                "title": ref["title"],
                "local_video": str(video_path),
                "clip_path": str(clips_dir / moment["clip_file"]),
                **moment,
            }
        )
    append_manifest(manifest_rows)
    return {
        "video_id": video_id,
        "status": "done",
        "moment_count": len(moments),
        "json": str(json_path),
        "clips_dir": str(clips_dir),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise SystemExit("GEMINI_API_KEY is required")
    client = genai.Client(api_key=api_key)
    refs = load_viral_references()
    if args.limit:
        refs = refs[: args.limit]

    results = []
    print(f"Starting visual hook mining: {len(refs)} videos, model={MODEL}", flush=True)
    for index, ref in enumerate(refs, 1):
        label = f"{index}/{len(refs)} {ref['creator']} {ref['title']} ({ref['videoId']})"
        print(f"RUN {label}", flush=True)
        try:
            result = process_ref(client, ref, force=args.force)
        except Exception as exc:
            result = {"video_id": ref.get("videoId", ""), "status": "error", "error": repr(exc)}
        results.append(result)
        print(json.dumps(result, ensure_ascii=False), flush=True)
        time.sleep(1)

    summary_path = OUT_DIR / "run-summary.json"
    summary_path.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"SUMMARY {summary_path}", flush=True)


if __name__ == "__main__":
    main()
