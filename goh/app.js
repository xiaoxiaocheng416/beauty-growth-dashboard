(() => {
  'use strict';

  const data = window.GOH_DATA;
  const workspace = document.querySelector('#workspace');
  const navLinks = [...document.querySelectorAll('[data-route]')];
  const groupLabels = {
    content: 'Content',
    offer: 'Offer',
    'cash-injection': 'Cash Injection',
    'sales-setting': 'Sales & Setting',
    fulfillment: 'Fulfillment',
    systems: 'Systems',
  };
  const archivedStates = new Set(['archived', 'content_archived', 'form_archived']);
  let activePhase = data.roadmap[0]?.id || '';
  let activeGroup = 'all';
  let searchQuery = '';
  let activeLearningGroup = 'all';
  let learningQuery = '';

  function escapeHtml(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function safeExternal(url) {
    try {
      const parsed = new URL(url, document.baseURI);
      return ['http:', 'https:', 'file:'].includes(parsed.protocol) ? parsed.href : '#';
    } catch {
      return '#';
    }
  }

  function assetUrl(pathValue, sop) {
    if (!pathValue) return '#';
    if (/^https?:\/\//i.test(pathValue)) return safeExternal(pathValue);
    if (pathValue.startsWith('__SOP_ROOT__/')) {
      return safeExternal(data.sopAssetBase + pathValue.slice('__SOP_ROOT__/'.length));
    }
    const snapshotMarker = '/2026-09-21/';
    if (pathValue.includes(snapshotMarker)) {
      const relative = pathValue.split(snapshotMarker).pop();
      return safeExternal(data.sopAssetBase + relative);
    }
    const base = new URL(data.sopAssetBase + (sop.sourceDir ? `${sop.sourceDir}/` : ''), document.baseURI);
    return safeExternal(new URL(pathValue, base).href);
  }

  function localFile(pathValue) {
    if (!pathValue) return '';
    return safeExternal(data.sopAssetBase + pathValue);
  }

  function inlineMarkdown(value, sop) {
    const source = String(value || '');
    const token = /(!?)\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
    let output = '';
    let last = 0;
    let match;
    while ((match = token.exec(source))) {
      output += escapeHtml(source.slice(last, match.index));
      if (match[2] !== undefined) {
        const url = assetUrl(match[3].trim(), sop);
        output += match[1]
          ? `<img src="${escapeHtml(url)}" alt="${escapeHtml(match[2])}" loading="lazy">`
          : `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(match[2])}</a>`;
      } else if (match[4] !== undefined) {
        output += `<strong>${escapeHtml(match[4])}</strong>`;
      } else {
        output += `<code>${escapeHtml(match[5])}</code>`;
      }
      last = token.lastIndex;
    }
    return output + escapeHtml(source.slice(last));
  }

  function articleMarkdown(markdown, sop) {
    const lines = String(markdown || '').replace(/\r/g, '').split('\n');
    let index = 0;
    const skipBlank = () => {
      while (index < lines.length && !lines[index].trim()) index += 1;
    };
    const isArchiveMetadata = (line) => {
      const value = line.trim();
      return /^-\s*(Source|Category|Captured|Capture|Tab count):/i.test(value)
        || /^Source:\s*/i.test(value)
        || /^Platform-generated transcript;/i.test(value)
        || /^\[打开原始公开链接\]\(/.test(value)
        || /^-\s*栏目：/.test(value)
        || /^-\s*\[SOP 门户入口\]\(/.test(value)
        || /^-\s*(Miro 实际名称|门户条目|白板名称|来源|范围|整理方式|图中的观点)：/.test(value)
        || /^-\s*\[打开原始 Miro 白板\]/.test(value);
    };

    skipBlank();
    if (/^#\s+/.test(lines[index] || '')) index += 1;
    skipBlank();

    while (index < lines.length) {
      const value = lines[index].trim();
      if (!value) {
        index += 1;
        continue;
      }
      if (isArchiveMetadata(lines[index])) {
        index += 1;
        continue;
      }
      if (value === String(sop.title || '').trim()
        || value === String(sop.description || '').trim()
        || /^按用户要求保留公开链接/.test(value)
        || /^本地未保存来源的完整正文/.test(value)) {
        index += 1;
        continue;
      }
      break;
    }

    return lines.slice(index).join('\n').trim();
  }

  function enhanceTranslation(markdown) {
    const sectionPattern = /^(重要|目标|唯一法则|这是什么|为什么(?:这很)?重要|你需要什么|概览|团队|团队结构|团队管理|工具|主仪表盘|追踪|开始之前|谁负责|流程，一步一步来|整套 SOP 所依赖的唯一一条规则|什么时候用这个|什么时候用它（以及什么时候不用）|好的样子|做得好是什么样|常见错误|边缘情况和例外|注意事项|需要注意的事项|快速清单|快速检查清单|待确认的缺口|招聘故事框架（Hiring Story Framework）|实例——.+|选择你处理反对意见内容的方法|第 \d+ 步[:：].+|\d+\s+-\s+.+)$/;
    return String(markdown || '')
      .replace(/\n*## 第 \d+ 页\n*/g, '\n')
      .replace(/^\s*\.(?:GOH CONSULTING|TOF CONTENT SOP|设定预期|逆向工程|爆款视频|内容制作|工作流程)\.?\s*$/gim, '')
      .replace(/^\s*(?:GOH CONSULTING|MOF CONTENT SOP)\s*$/gim, '')
      .replace(/[ \t]+[●•]\s*/g, '\n- ')
      .replace(/^\s*[●•]\s*/gm, '- ')
      .replace(/\s*☐\s*/g, '\n- ☐ ')
      .replace(/^\s*​\s*/gm, '- ')
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed && sectionPattern.test(trimmed) && !trimmed.startsWith('#')) return `### ${trimmed}`;
        return line;
      })
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function enhanceRecordingTranslation(markdown) {
    return String(markdown || '')
      .replace(/^\s*[–—]\s*/gm, '- ')
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed || /^#{1,6}\s|^-\s|^\d+[.)]\s|^https?:\/\//.test(trimmed)) return line;
        const shortLabel = trimmed.length <= 32
          && !/[。！？!?]$/.test(trimmed)
          && !/^GOH CONSULTING$/i.test(trimmed)
          && !/^(日期|来源|官方摘要)[:：]/.test(trimmed);
        return shortLabel ? `## ${trimmed}` : line;
      })
      .join('\n')
      .replace(/^GOH CONSULTING\s*$/gim, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function renderMarkdown(markdown, sop, preserveBreaks = true) {
    const content = articleMarkdown(markdown, sop);
    if (!content) return '<p>这项资料当前只保留来源链接。</p>';
    const lines = content.split('\n');
    const html = [];
    let index = 0;
    let list = null;
    let code = false;
    let codeLines = [];

    const closeList = () => {
      if (list) {
        html.push(`</${list}>`);
        list = null;
      }
    };

    while (index < lines.length) {
      const line = lines[index];
      if (line.startsWith('```')) {
        closeList();
        if (code) {
          html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
          codeLines = [];
          code = false;
        } else code = true;
        index += 1;
        continue;
      }
      if (code) {
        codeLines.push(line);
        index += 1;
        continue;
      }
      if (!line.trim()) {
        closeList();
        index += 1;
        continue;
      }
      const heading = line.match(/^(#{1,4})\s+(.+)$/);
      if (heading) {
        closeList();
        const level = heading[1].length;
        html.push(`<h${level}>${inlineMarkdown(heading[2], sop)}</h${level}>`);
        index += 1;
        continue;
      }
      if (/^\s*[-*]\s+/.test(line)) {
        if (list !== 'ul') { closeList(); list = 'ul'; html.push('<ul>'); }
        html.push(`<li>${inlineMarkdown(line.replace(/^\s*[-*]\s+/, ''), sop)}</li>`);
        index += 1;
        continue;
      }
      if (/^\s*\d+[.)]\s+/.test(line)) {
        if (list !== 'ol') {
          const start = Number(line.match(/^\s*(\d+)/)?.[1] || 1);
          closeList();
          list = 'ol';
          html.push(start > 1 ? `<ol start="${start}">` : '<ol>');
        }
        html.push(`<li>${inlineMarkdown(line.replace(/^\s*\d+[.)]\s+/, ''), sop)}</li>`);
        index += 1;
        continue;
      }
      if (line.startsWith('> ')) {
        closeList();
        html.push(`<blockquote>${inlineMarkdown(line.slice(2), sop)}</blockquote>`);
        index += 1;
        continue;
      }
      if (line.includes('|') && lines[index + 1] && /^\s*\|?\s*:?-+/.test(lines[index + 1])) {
        closeList();
        const split = (row) => row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((cell) => cell.trim());
        const headers = split(line);
        index += 2;
        const rows = [];
        while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
          rows.push(split(lines[index]));
          index += 1;
        }
        html.push(`<table><thead><tr>${headers.map((cell) => `<th>${inlineMarkdown(cell, sop)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell, sop)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
        continue;
      }
      closeList();
      const paragraph = [line];
      index += 1;
      while (index < lines.length && lines[index].trim() && !/^(#{1,4})\s+/.test(lines[index]) && !/^\s*[-*]\s+/.test(lines[index]) && !/^\s*\d+[.)]\s+/.test(lines[index]) && !lines[index].startsWith('```') && !lines[index].startsWith('> ')) {
        paragraph.push(lines[index]);
        index += 1;
      }
      const separator = preserveBreaks ? '\n' : ' ';
      const rendered = inlineMarkdown(paragraph.join(separator), sop);
      html.push(`<p>${preserveBreaks ? rendered.replaceAll('\n', '<br>') : rendered}</p>`);
    }
    closeList();
    if (codeLines.length) html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
    return html.join('');
  }

  function setActiveNav(route) {
    navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.route === route));
  }

  function renderStats(items) {
    return `<div class="signal-row">
      ${items.map(([value, label]) => `<div><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`).join('')}
    </div>`;
  }

  function resourceLink(item) {
    return `<a class="resource-link" href="${escapeHtml(safeExternal(item.url))}" target="_blank" rel="noreferrer">${escapeHtml(item.label || 'Open resource')} ↗</a>`;
  }

  function formatDuration(seconds) {
    const value = Number(seconds || 0);
    if (!value) return '时长未知';
    const minutes = Math.floor(value / 60);
    const remainder = Math.round(value % 60);
    return `${minutes}:${String(remainder).padStart(2, '0')}`;
  }

  function formatDate(value) {
    if (!value) return '日期未标注';
    const parts = String(value).split('-');
    return parts.length === 3 ? `${parts[0]}-${parts[1]}-${parts[2]}` : value;
  }

  function videoMarkup(item) {
    if (!item?.embedId) {
      return '<div class="article-note">这条旧版 Roadmap 课程没有可用的站内播放器，保留 GOH 备用入口。</div>';
    }
    return `<div class="embedded-player-wrap">
      <div class="video-player-mount" data-video-player data-embed-id="${escapeHtml(item.embedId)}" data-player-base="${escapeHtml(item.playerBase || '')}" data-player-aspect="${escapeHtml(item.playerAspect || 56.25)}" aria-label="${escapeHtml(item.title)} 视频播放器"></div>
    </div>`;
  }

  function mountVidalytics(item) {
    const mount = workspace.querySelector('[data-video-player]');
    if (!mount || !item?.embedId) return;
    const embedId = item.embedId;
    const playerBase = item.playerBase || `https://fast.vidalytics.com/embeds/Dyp2a1Oi/${embedId}/`;
    const container = document.createElement('div');
    container.id = `vidalytics_embed_${embedId}`;
    container.style.width = '100%';
    container.style.position = 'relative';
    container.style.paddingTop = `${Number(item.playerAspect || 56.25)}%`;
    mount.replaceChildren(container);

    const vendor = 'Vidalytics';
    const vendorLoader = `${vendor}L`;
    const vendorState = `_${vendor.toLowerCase()}`;
    window[vendor] ||= {};
    window[vendorLoader] ||= {};
    window[vendorState] ||= {};
    const loaderName = 'Loader';
    const currentLoader = window[vendorState][loaderName];
    const loaderClass = window[vendorLoader][loaderName];

    const startPlayer = () => {
      const Loader = window[vendorLoader][loaderName];
      const loader = currentLoader || new Loader();
      window[vendorState][loaderName] = loader;
      loader.loadScript(`${playerBase}player.min.js`, () => {
        const Player = window[vendor].Embed;
        const player = new Player();
        player.run(container.id);
      });
    };

    if (loaderClass) {
      startPlayer();
      return;
    }
    const script = document.createElement('script');
    script.src = `${playerBase}loader.min.js`;
    script.async = true;
    script.onload = startPlayer;
    script.onerror = () => {
      mount.innerHTML = '<div class="video-player-error">播放器暂时无法加载，请稍后重试或使用下方备用入口。</div>';
    };
    document.head.appendChild(script);
  }

  function stepMarkup(step, index) {
    const matchedRecording = step.recording
      ? data.recordings.find((recording) => recording.category === step.recording.category
        && new RegExp(step.recording.match, 'i').test(recording.title))
      : null;
    const resources = [
      ...(step.sops || []).map((sop) => `<a class="resource-link is-sop" href="#/sop/${encodeURIComponent(sop.badge)}">SOP ${escapeHtml(sop.badge)} · ${escapeHtml(sop.title)}</a>`),
      ...(matchedRecording ? [`<a class="resource-link is-sop" href="#/recording/${encodeURIComponent(matchedRecording.id)}">录播 · ${escapeHtml(matchedRecording.title)}</a>`] : []),
      ...(step.links || []).map(resourceLink),
      ...(step.guides || []).map((guide) => `<span class="resource-link">Guide · ${escapeHtml(guide.label)}</span>`),
    ].join('');
    const lessonList = (step.lessons || []).length
      ? `<p><strong>Related modules</strong><br>${step.lessons.map((lesson) => `<a href="#/module/${encodeURIComponent(lesson.id)}">${escapeHtml(lesson.title)}</a>`).join('<br>')}</p>`
      : '';
    const detail = step.body || step.desc || lessonList || resources
      ? `<div class="step-body">${step.body ? `<p>${escapeHtml(step.body)}</p>` : ''}${step.desc && step.desc !== step.body ? `<p>${escapeHtml(step.desc)}</p>` : ''}${lessonList}${resources ? `<div class="resource-row">${resources}</div>` : ''}</div>`
      : '<div class="step-body"><p>这一步在当前快照里没有附加资源。</p></div>';
    return `<details class="roadmap-step ${step.completed ? 'is-done' : ''}">
      <summary>
        <span class="step-check">✓</span>
        <span class="step-title">${String(index + 1).padStart(2, '0')} · ${escapeHtml(step.text)}${step.desc ? `<small>${escapeHtml(step.desc)}</small>` : ''}</span>
        <span class="step-arrow" aria-hidden="true">→</span>
      </summary>
      ${detail}
    </details>`;
  }

  function renderRoadmap() {
    setActiveNav('roadmap');
    const phase = data.roadmap.find((item) => item.id === activePhase) || data.roadmap[0];
    activePhase = phase.id;
    const percent = phase.items.length ? Math.round((phase.completed / phase.items.length) * 100) : 0;
    workspace.innerHTML = `
      <header class="page-heading">
        <div>
          <p class="kicker">Program path · saved locally</p>
          <h1>你的 GOH Roadmap</h1>
          <p>按官网顺序保留全部阶段、步骤和资源。完成状态来自 2026-09-22 的账号快照。</p>
        </div>
        <aside class="snapshot-card"><p class="kicker">Current snapshot</p><strong>${data.stats.roadmapDone} / ${data.stats.roadmapSteps}</strong><span>当前 Roadmap 步骤已完成</span></aside>
      </header>
      ${renderStats([
        [data.stats.roadmapPhases, 'Phases'],
        [data.stats.roadmapSteps, 'Steps'],
        [data.stats.roadmapDone, 'Completed'],
        [data.stats.sops, 'Linked SOP Library'],
      ])}
      <nav class="phase-rail" aria-label="Roadmap phases">
        ${data.roadmap.map((item) => `<button class="phase-tab ${item.id === phase.id ? 'is-active' : ''}" type="button" data-phase="${escapeHtml(item.id)}"><span class="phase-num">${escapeHtml(item.num)}</span><span><strong>${escapeHtml(item.title)}</strong><small>${item.completed} / ${item.items.length} complete</small></span></button>`).join('')}
      </nav>
      <section class="roadmap-panel">
        <aside class="phase-intro">
          <span class="phase-label">Phase ${escapeHtml(phase.num)}</span>
          <h2>${escapeHtml(phase.title)}</h2>
          <p>${escapeHtml(phase.sub || '')}</p>
          <div class="progress-track" aria-label="${percent}% complete"><i style="width:${percent}%"></i></div>
          <div class="progress-copy"><span>${phase.completed} complete</span><span>${percent}%</span></div>
        </aside>
        <div class="step-list">${phase.items.map(stepMarkup).join('')}</div>
      </section>`;
    workspace.querySelectorAll('[data-phase]').forEach((button) => button.addEventListener('click', () => {
      activePhase = button.dataset.phase;
      renderRoadmap();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));
  }

  function statusLabel(sop) {
    if (sop.status === 'screenshot_partial') return '截图补录';
    if (sop.status === 'link_only') return '公开链接';
    return '本地归档';
  }

  function sopDetail(sop) {
    if (!sop) return '<section class="sop-detail"><div class="empty-list">没有符合条件的 SOP。</div></section>';
    const pdfPages = sop.pdfPages || [];
    const isPdf = sop.format === 'pdf' && pdfPages.length;
    const originalUrl = sop.original ? localFile(sop.original) : '';
    const actions = [
      sop.zhBody ? `<a class="article-action zh-action" href="#/zh/${encodeURIComponent(sop.badge)}">中文 1:1</a>` : '',
      sop.original ? `<a class="article-action primary" href="${escapeHtml(originalUrl)}" target="_blank">打开原文件</a>` : '',
      sop.sourceUrl ? `<a class="article-action" href="${escapeHtml(safeExternal(sop.sourceUrl))}" target="_blank" rel="noreferrer">打开来源 ↗</a>` : '',
      sop.text ? `<a class="article-action" href="${escapeHtml(localFile(sop.text))}" target="_blank">Markdown</a>` : '',
    ].join('');
    const content = isPdf
      ? `<div class="pdf-reader">
          <div class="pdf-page-stack">
            ${pdfPages.map((page, index) => `<figure><img src="${escapeHtml(localFile(page))}" alt="${escapeHtml(sop.title)} · Page ${index + 1}" ${index ? 'loading="lazy"' : ''}><figcaption>Page ${index + 1} / ${pdfPages.length}</figcaption></figure>`).join('')}
          </div>
          <details class="extracted-text">
            <summary>查看可搜索的提取文本</summary>
            <article class="article-body">${renderMarkdown(sop.body, sop)}</article>
          </details>
        </div>`
      : `<article class="article-body">${renderMarkdown(sop.body, sop)}</article>`;
    const partial = !archivedStates.has(sop.status)
      ? `<div class="article-note">${sop.status === 'screenshot_partial' ? '这项内容来自 6 张可见区域截图；完整白板仍需通过来源链接访问。' : '这项资料当前只保留公开来源链接，尚未完整离线归档。'}</div>`
      : '';
    return `<section class="sop-detail" aria-live="polite">
      <header class="article-head">
        <div class="article-meta"><span>SOP ${escapeHtml(sop.badge)}</span><span>·</span><span>${escapeHtml(groupLabels[sop.group] || sop.group)}</span><span>·</span><span>${escapeHtml(statusLabel(sop))}</span></div>
        <h2>${escapeHtml(sop.title)}</h2>
        <p>${escapeHtml(sop.description || '')}</p>
        <div class="article-actions">${actions}</div>
      </header>
      ${content}
      ${partial}
    </section>`;
  }

  function priorityEntry(entry) {
    const sop = data.sops.find((item) => item.badge === entry.badge);
    const shareUrl = `${data.publicBase}#/zh/${encodeURIComponent(entry.badge)}`;
    return `<article class="priority-entry ${entry.rank === 1 ? 'is-lead' : ''}">
      <div class="priority-rank"><span>${String(entry.rank).padStart(2, '0')}</span><small>${escapeHtml(entry.stage)}</small></div>
      <div class="priority-copy">
        <div class="role-row">${entry.roles.map((role) => `<span>${escapeHtml(role)}</span>`).join('')}</div>
        <h2>${escapeHtml(entry.titleZh)}</h2>
        <p class="priority-original">SOP ${escapeHtml(entry.badge)} · ${escapeHtml(sop?.title || '')}</p>
        <p>${escapeHtml(entry.reason)}</p>
        <div class="priority-action"><strong>看完立刻做</strong><span>${escapeHtml(entry.action)}</span></div>
      </div>
      <div class="priority-links">
        <a class="article-action primary" href="#/zh/${encodeURIComponent(entry.badge)}">中文阅读</a>
        <a class="text-link" href="#/sop/${encodeURIComponent(entry.badge)}">英文原版 →</a>
        <a class="text-link share-link" href="${escapeHtml(shareUrl)}" target="_blank" rel="noreferrer">分享链接 ↗</a>
      </div>
    </article>`;
  }

  function creativePriorityEntry(entry) {
    const item = data.recordings.find((recording) => recording.id === entry.id);
    const shareUrl = `${data.publicBase}#/recording/${encodeURIComponent(entry.id)}`;
    return `<article class="priority-entry creative-entry ${entry.rank === 1 ? 'is-lead' : ''}">
      <div class="priority-rank"><span>${String(entry.rank).padStart(2, '0')}</span><small>${escapeHtml(entry.stage)}</small></div>
      <div class="priority-copy">
        <div class="role-row">${entry.roles.map((role) => `<span>${escapeHtml(role)}</span>`).join('')}</div>
        <h2>${escapeHtml(entry.titleZh)}</h2>
        <p class="priority-original">${escapeHtml(entry.title)}${item?.durationSeconds ? ` · ${escapeHtml(formatDuration(item.durationSeconds))}` : ''}</p>
        <p>${escapeHtml(entry.reason)}</p>
        <div class="priority-action"><strong>看完立刻做</strong><span>${escapeHtml(entry.action)}</span></div>
      </div>
      <div class="priority-links">
        <a class="article-action primary" href="#/recording/${encodeURIComponent(entry.id)}">直接观看</a>
        ${entry.relatedSop ? `<a class="text-link" href="#/sop/${encodeURIComponent(entry.relatedSop)}">相关 SOP ${escapeHtml(entry.relatedSop)} →</a>` : ''}
        <a class="text-link share-link" href="${escapeHtml(shareUrl)}" target="_blank" rel="noreferrer">分享链接 ↗</a>
      </div>
    </article>`;
  }

  function renderMustRead() {
    setActiveNav('must-read');
    workspace.innerHTML = `
      <header class="priority-heading">
        <p class="kicker">Yicheng × Creative Director</p>
        <h1>现在最该看的<br>5 篇内容 SOP</h1>
        <p>这不是按课程顺序排，而是按你们现在的决策依赖排：先统一品牌和内容形式，再解决 TOF 与 MOF，最后把复盘和生产交给团队。</p>
      </header>
      <section class="role-briefs" aria-label="阅读分工">
        <article><span>给 Yicheng</span><strong>先看 21 → 06 → 07</strong><p>你负责品牌判断、真实经历、受众洞察和最后取舍。前三篇决定团队应该放大什么。</p></article>
        <article><span>给 Creative Director</span><strong>先看同样 3 篇，再看 02 → 03</strong><p>先理解你的判断，再负责把它变成复盘机制、brief、剪辑和追踪流程。</p></article>
      </section>
      <section class="priority-list" aria-label="优先 SOP">
        ${data.priority.map(priorityEntry).join('')}
      </section>
      <header class="priority-subheading">
        <p class="kicker">Visual identity × Creative direction</p>
        <h2>还要立刻看的 6 场课程与录播</h2>
        <p>前面的 SOP 负责判断和流程；这组负责镜头前后的实际表达，包括品牌信任、视觉识别、拍摄、故事、电影感和选题。Creative Director 应优先看 01 → 03 → 04 → 05。</p>
      </header>
      <section class="priority-list creative-priority-list" aria-label="优先课程与录播">
        ${data.creativePriority.map(creativePriorityEntry).join('')}
      </section>`;
  }

  function renderChineseSop(badge) {
    setActiveNav('must-read');
    const sop = data.sops.find((item) => item.badge === badge && item.zhBody);
    const entry = data.priority.find((item) => item.badge === badge);
    if (!sop || !entry) {
      workspace.innerHTML = '<div class="empty-list">这篇 SOP 还没有中文逐段翻译。<br><a href="#/must-read">返回必看清单</a></div>';
      return;
    }
    const shareUrl = `${data.publicBase}#/zh/${encodeURIComponent(sop.badge)}`;
    workspace.innerHTML = `<section class="translation-shell">
      <aside class="translation-outline">
        <a class="back-link" href="#/must-read">← 返回必看清单</a>
        <p class="outline-label">5 篇必看 SOP</p>
        <nav>${data.priority.map((item) => `<a class="${item.badge === sop.badge ? 'is-active' : ''}" href="#/zh/${encodeURIComponent(item.badge)}"><b>${String(item.rank).padStart(2, '0')}</b><span>${escapeHtml(item.titleZh)}</span></a>`).join('')}</nav>
        <button class="copy-url" type="button" data-copy-url="${escapeHtml(shareUrl)}">复制当前直达链接</button>
        <a class="canonical-url" href="${escapeHtml(shareUrl)}" target="_blank" rel="noreferrer">${escapeHtml(shareUrl.replace(/^https?:\/\//, ''))}</a>
      </aside>
      <section class="translation-page">
        <header class="translation-head">
          <div>
            <p class="kicker">SOP ${escapeHtml(sop.badge)} · 中文逐段翻译</p>
            <h1>${escapeHtml(entry.titleZh)}</h1>
            <p>${escapeHtml(entry.reason)}</p>
            <div class="role-row">${entry.roles.map((role) => `<span>${escapeHtml(role)}</span>`).join('')}</div>
          </div>
          <aside class="translation-task"><span>看完立刻做</span><strong>${escapeHtml(entry.action)}</strong></aside>
        </header>
        <nav class="language-switch" aria-label="阅读语言">
          <span class="is-active">中文翻译</span>
          <a href="#/sop/${encodeURIComponent(sop.badge)}">英文原版与 PDF</a>
        </nav>
        <article class="article-body translated-body">${renderMarkdown(enhanceTranslation(sop.zhBody), sop, false)}</article>
      </section>
    </section>`;
    workspace.querySelector('[data-copy-url]')?.addEventListener('click', async (event) => {
      try {
        await navigator.clipboard.writeText(event.currentTarget.dataset.copyUrl);
        event.currentTarget.textContent = '链接已复制';
      } catch {
        event.currentTarget.textContent = '请长按下方网址复制';
      }
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function filteredSops() {
    const query = searchQuery.trim().toLowerCase();
    return data.sops.filter((sop) => {
      if (activeGroup !== 'all' && sop.group !== activeGroup) return false;
      if (!query) return true;
      return `${sop.badge} ${sop.title} ${sop.description} ${sop.body} ${sop.zhBody || ''}`.toLowerCase().includes(query);
    });
  }

  function renderSops(selectedBadge = '') {
    setActiveNav('sops');
    const items = filteredSops();
    const selected = items.find((sop) => sop.badge === selectedBadge) || items[0] || null;
    const groups = [...new Set(data.sops.map((sop) => sop.group))];
    workspace.innerHTML = `
      <header class="page-heading">
        <div>
          <p class="kicker">Full-text local archive</p>
          <h1>SOP Library</h1>
          <p>搜索全部正文，按业务环节筛选，并直接打开本地附件或公开来源。</p>
        </div>
        <aside class="snapshot-card"><p class="kicker">Archive coverage</p><strong>${data.stats.archived} / ${data.stats.sops}</strong><span>已保存完整内容，其余保留链接或截图</span></aside>
      </header>
      ${renderStats([
        [data.stats.sops, 'Total SOPs'],
        [data.stats.archived, 'Archived'],
        [data.stats.linked, 'Public links'],
        [6, 'Business sections'],
      ])}
      <div class="library-toolbar">
        <div class="search-wrap"><label for="sop-search">搜索标题和全文</label><div class="search-box"><input id="sop-search" type="search" value="${escapeHtml(searchQuery)}" placeholder="例如：TOF、hooks、setting、offer"><span aria-hidden="true">⌕</span></div></div>
        <span class="result-count">${items.length} / ${data.sops.length} entries</span>
      </div>
      <div class="filter-row" aria-label="SOP categories">
        <button class="filter-chip ${activeGroup === 'all' ? 'is-active' : ''}" type="button" data-group="all">All</button>
        ${groups.map((group) => `<button class="filter-chip ${activeGroup === group ? 'is-active' : ''}" type="button" data-group="${escapeHtml(group)}">${escapeHtml(groupLabels[group] || group)}</button>`).join('')}
      </div>
      <section class="library-layout">
        <div class="sop-list" aria-label="SOP list">
          ${items.length ? items.map((sop) => `<button class="sop-item ${selected?.badge === sop.badge ? 'is-active' : ''}" type="button" data-sop="${escapeHtml(sop.badge)}"><span class="sop-badge">${escapeHtml(sop.badge)}</span><span><strong>${escapeHtml(sop.title)}</strong><small>${escapeHtml(sop.section)} · ${escapeHtml(statusLabel(sop))}</small></span><i class="status-dot ${archivedStates.has(sop.status) ? '' : 'link'}" aria-hidden="true"></i></button>`).join('') : '<div class="empty-list">没有找到匹配内容。</div>'}
        </div>
        ${sopDetail(selected)}
      </section>`;

    const search = workspace.querySelector('#sop-search');
    search?.addEventListener('input', (event) => {
      searchQuery = event.target.value;
      renderSops('');
      const replacement = workspace.querySelector('#sop-search');
      replacement?.focus();
      replacement?.setSelectionRange(searchQuery.length, searchQuery.length);
    });
    workspace.querySelectorAll('[data-group]').forEach((button) => button.addEventListener('click', () => {
      activeGroup = button.dataset.group;
      renderSops('');
    }));
    workspace.querySelectorAll('[data-sop]').forEach((button) => button.addEventListener('click', () => {
      location.hash = `#/sop/${encodeURIComponent(button.dataset.sop)}`;
    }));
  }

  function allLearningItems() {
    const modules = data.modules.map((item) => ({ ...item, type: 'module' }));
    const roadmapModules = (data.roadmapOnlyModules || []).map((item) => ({ ...item, type: 'module' }));
    const recordings = data.recordings.map((item) => ({ ...item, type: 'recording' }));
    return [...recordings, ...modules, ...roadmapModules];
  }

  function learningItems() {
    const query = learningQuery.trim().toLowerCase();
    return allLearningItems().filter((item) => {
      if (item.roadmapOnly) return false;
      if (activeLearningGroup === 'modules' && item.type !== 'module') return false;
      if (activeLearningGroup === 'downloaded' && !(item.type === 'recording' && item.hasLocalVideo)) return false;
      if (['content_mastermind', 'brand_architect', 'scripting_mastermind'].includes(activeLearningGroup)
        && !(item.type === 'recording' && item.category === activeLearningGroup)) return false;
      if (!query) return true;
      return `${item.title} ${item.section || ''} ${item.categoryLabel || ''} ${item.summaryBody || ''}`.toLowerCase().includes(query);
    });
  }

  function learningDetail(item) {
    if (!item) return '<section class="sop-detail"><div class="empty-list">没有符合条件的课程或录播。</div></section>';
    if (item.type === 'module') {
      const moduleNote = item.roadmapOnly
        ? 'Roadmap 快照关联的课程入口；它不在当前 65 节课程目录中。'
        : '官网课程模块。Roadmap 中引用同一课程时，会直接跳到这里。';
      const moduleBody = item.roadmapOnly
        ? '这里保留 Roadmap 原始课程入口，方便继续回查旧版或专属模块。'
        : '课程视频已嵌入站内播放器，可以直接观看；GOH 入口仅作为备用来源。';
      return `<section class="sop-detail" aria-live="polite">
        <header class="article-head">
          <div class="article-meta"><span>Program module</span><span>·</span><span>${escapeHtml(item.section)}</span></div>
          <h2>${escapeHtml(item.title)}</h2>
          <p>${escapeHtml(moduleNote)}</p>
          <div class="article-actions"><a class="article-action" href="${escapeHtml(safeExternal(item.portalUrl))}" target="_blank" rel="noreferrer">GOH 备用入口 ↗</a></div>
        </header>
        ${videoMarkup(item)}
        <article class="article-body learning-empty"><p>${escapeHtml(moduleBody)}</p></article>
      </section>`;
    }
    const actions = [
      item.localVideo ? `<a class="article-action primary" href="${escapeHtml(safeExternal(item.localVideo))}" target="_blank">打开本地录播</a>` : '',
      `<a class="article-action" href="${escapeHtml(safeExternal(item.portalUrl))}" target="_blank" rel="noreferrer">GOH 备用入口 ↗</a>`,
      item.summaryUrl ? `<a class="article-action" href="${escapeHtml(safeExternal(item.summaryUrl))}" target="_blank" rel="noreferrer">官方摘要 PDF ↗</a>` : '',
      item.localTranscript ? `<a class="article-action" href="${escapeHtml(safeExternal(item.localTranscript))}" target="_blank">机器逐字稿</a>` : '',
    ].join('');
    const status = item.hasLocalVideo ? '本地录播已归档' : '目录与播放器已归档';
    const body = item.zhSummaryBody
      ? `<section class="recording-summary">
          <div class="summary-language"><span>中文完整翻译</span><small>官方摘要逐段翻译</small></div>
          <article class="article-body translated-body recording-translation">${renderMarkdown(enhanceRecordingTranslation(item.zhSummaryBody), item, false)}</article>
          ${item.summaryBody ? `<details class="original-summary"><summary>查看英文原始摘要</summary><article class="article-body">${renderMarkdown(item.summaryBody, item)}</article></details>` : ''}
        </section>`
      : item.summaryBody
      ? `<article class="article-body">${renderMarkdown(item.summaryBody, item)}</article>`
      : '<div class="article-note">官网没有提供这场录播的官方摘要；播放器入口和基础信息已经保存。</div>';
    return `<section class="sop-detail" aria-live="polite">
      <header class="article-head">
        <div class="article-meta"><span>${escapeHtml(item.categoryLabel)}</span><span>·</span><span>${escapeHtml(formatDate(item.callDate))}</span><span>·</span><span>${escapeHtml(formatDuration(item.durationSeconds))}</span></div>
        <h2>${escapeHtml(item.title)}</h2>
        <p>${escapeHtml(status)}${item.localTranscript ? ' · 有机器逐字稿' : ''}</p>
        <div class="article-actions">${actions}</div>
      </header>
      ${videoMarkup(item)}
      ${body}
    </section>`;
  }

  function renderLearning(selectedType = '', selectedId = '') {
    setActiveNav('learning');
    const items = learningItems();
    const selected = allLearningItems().find((item) => item.type === selectedType && item.id === selectedId) || items[0] || null;
    const filters = [
      ['all', '全部'],
      ['modules', 'Program Modules'],
      ['content_mastermind', 'Content · Yash'],
      ['brand_architect', 'Brand · SooWei'],
      ['scripting_mastermind', 'Scripting · Aidan'],
      ['downloaded', `本地 ${data.stats.downloadedRecordings} 场`],
    ];
    workspace.innerHTML = `
      <header class="page-heading">
        <div>
          <p class="kicker">One learning library</p>
          <h1>课程与录播</h1>
          <p>Program Modules 与 Group Calls 全部可以站内播放。Roadmap 负责学习顺序，这里负责查找原课、录播和复盘资料。</p>
        </div>
        <aside class="snapshot-card"><p class="kicker">Site playback</p><strong>${data.stats.modules + data.stats.recordings} / ${data.stats.modules + data.stats.recordings}</strong><span>65 节课程与 64 场 Group Calls 均可直接播放</span></aside>
      </header>
      ${renderStats([
        [data.stats.modules, 'Program Modules'],
        [data.stats.recordings, 'Group Calls'],
        [data.stats.downloadedRecordings, 'Local videos'],
        [data.stats.recordingSummaries, 'Official summaries'],
      ])}
      <div class="library-toolbar">
        <div class="search-wrap"><label for="learning-search">搜索课程、录播和官方摘要</label><div class="search-box"><input id="learning-search" type="search" value="${escapeHtml(learningQuery)}" placeholder="例如：B-roll、TOF、visual identity、scripting"><span aria-hidden="true">⌕</span></div></div>
        <span class="result-count">${items.length} / ${data.stats.modules + data.stats.recordings} entries</span>
      </div>
      <div class="filter-row" aria-label="Course and recording categories">
        ${filters.map(([value, label]) => `<button class="filter-chip ${activeLearningGroup === value ? 'is-active' : ''}" type="button" data-learning-group="${escapeHtml(value)}">${escapeHtml(label)}</button>`).join('')}
      </div>
      <section class="library-layout learning-layout">
        <div class="sop-list" aria-label="Course and recording list">
          ${items.length ? items.map((item) => {
            const active = selected?.id === item.id && selected?.type === item.type;
            const badge = item.type === 'module' ? 'MOD' : 'VID';
            const meta = item.type === 'module' ? item.section : `${item.categoryLabel} · ${formatDate(item.callDate)}`;
            return `<button class="sop-item ${active ? 'is-active' : ''}" type="button" data-learning-type="${item.type}" data-learning-id="${escapeHtml(item.id)}"><span class="sop-badge learning-badge">${badge}</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(meta)}</small></span><i class="status-dot ${item.type === 'recording' && item.hasLocalVideo ? '' : 'link'}" aria-hidden="true"></i></button>`;
          }).join('') : '<div class="empty-list">没有找到匹配内容。</div>'}
        </div>
        ${learningDetail(selected)}
      </section>`;

    mountVidalytics(selected);

    const search = workspace.querySelector('#learning-search');
    search?.addEventListener('input', (event) => {
      learningQuery = event.target.value;
      renderLearning('', '');
      const replacement = workspace.querySelector('#learning-search');
      replacement?.focus();
      replacement?.setSelectionRange(learningQuery.length, learningQuery.length);
    });
    workspace.querySelectorAll('[data-learning-group]').forEach((button) => button.addEventListener('click', () => {
      activeLearningGroup = button.dataset.learningGroup;
      renderLearning('', '');
    }));
    workspace.querySelectorAll('[data-learning-id]').forEach((button) => button.addEventListener('click', () => {
      const routeName = button.dataset.learningType === 'module' ? 'module' : 'recording';
      location.hash = `#/${routeName}/${encodeURIComponent(button.dataset.learningId)}`;
    }));
  }

  function route() {
    const parts = (location.hash.replace(/^#\/?/, '') || 'roadmap').split('/');
    if (parts[0] === 'must-read') renderMustRead();
    else if (parts[0] === 'zh') renderChineseSop(decodeURIComponent(parts[1] || ''));
    else if (parts[0] === 'sops') renderSops('');
    else if (parts[0] === 'sop') renderSops(decodeURIComponent(parts[1] || ''));
    else if (parts[0] === 'learning') renderLearning('', '');
    else if (parts[0] === 'module') renderLearning('module', decodeURIComponent(parts[1] || ''));
    else if (parts[0] === 'recording') renderLearning('recording', decodeURIComponent(parts[1] || ''));
    else renderRoadmap();
  }

  window.addEventListener('hashchange', route);
  route();
})();
