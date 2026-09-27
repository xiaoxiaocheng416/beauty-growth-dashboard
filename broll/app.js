function displayRecord(raw) {
  const r = {...raw};
  for (const key of ['title','activity','description','category','orientation','location','path','reviewNote','qualityNote','curationReason','line','previewNote','range','shot','downloadLabel']) r[key] = local(raw,key);
  r.contentTags = (raw.contentTags || []).map(tag=>t(tag));
  r.purposes = (raw.purposes || []).map(tag=>t(tag));
  return r;
}
const items = window.BROLL_DATA;
const categoryNames = ['全部素材', '工作与团队', '生活与出行', '经历、成果与幕后', '情绪与状态', '收款证据'];
const contentTagNames = ['全部标签', ...new Set(items.flatMap(r => r.contentTags || []))];
const sourceNames = {drive: 'Drive 旧素材', local: '芽庄切片', batch0926: '9/26 切片', driveraw0926: 'Drive 新切片'};
const curationNames = {primary:'常用', backup:'备选', hold:'暂不推荐'};
let category = '全部素材', contentTag = '全部标签', current = null;
let favorites = new Set();
try { favorites = new Set(JSON.parse(localStorage.getItem('yipeng-broll-favorites-v1') || '[]')); } catch {}
const $ = selector => document.querySelector(selector);
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = t(text); return n; };
function notice(message) { const n = $('#toast'); n.textContent = t(message); n.hidden = false; clearTimeout(notice.timer); notice.timer = setTimeout(() => n.hidden = true, 6000); }
function saveFavorite(id) {
  if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
  try { localStorage.setItem('yipeng-broll-favorites-v1', JSON.stringify([...favorites])); } catch { notice('当前浏览器无法保存收藏，关闭页面后可能丢失。'); }
  render(); if (current) $('#detail-favorite').textContent = t(favorites.has(current.id) ? '已收藏 ★' : '收藏 ☆');
}
function matchesCuration(r) {
  const mode = $('#curation').value;
  return mode === 'all' || (mode === 'primary' ? !r.curation || r.curation === 'primary' : r.curation === mode);
}
function navigation() {
  $('#categories').replaceChildren();
  const pool = items.filter(r => matchesCuration(r) && (!$('#source').value || r.source === $('#source').value));
  categoryNames.forEach(name => { const b = el('button', 'category' + (name === category ? ' active' : '')); b.append(el('span', '', name), el('small', '', name === '全部素材' ? pool.length : pool.filter(r => r.category === name).length)); b.setAttribute('aria-pressed', String(name === category)); b.onclick = () => { category = name; contentTag = '全部标签'; render(); }; $('#categories').append(b); });
  $('#purposes').replaceChildren();
  const availableTags = new Set(pool.filter(r => category === '全部素材' || r.category === category).flatMap(r => r.contentTags || []));
  contentTagNames.filter(name => name === '全部标签' || availableTags.has(name) || name === contentTag).forEach(name => { const b = el('button', 'chip' + (name === contentTag ? ' active' : ''), name); b.setAttribute('aria-pressed', String(name === contentTag)); b.onclick = () => { contentTag = name; render(); }; $('#purposes').append(b); });
}
function getFiltered() {
  const q = $('#search').value.trim().toLowerCase(), source = $('#source').value, ori = $('#orientation').value, review = $('#review').value, purpose = $('#editorial-purpose').value;
  return items.filter(r => matchesCuration(r) && (category === '全部素材' || r.category === category) && (contentTag === '全部标签' || (r.contentTags || []).includes(contentTag)) && (!purpose || r.purposes.includes(purpose)) && (!source || r.source === source) && (!ori || r.orientation === ori) && (!review || r.review === review) && (!$('#favorites').checked || favorites.has(r.id)) && (!q || [r.title,r.filename,r.category,r.activity,r.location,r.path,...(r.contentTags || []),...r.purposes,...r.keywords,...Object.values(r.en || {}),...(r.contentTags || []).map(tag=>t(tag,'en')),t(r.category,'en'),t(r.location,'en')].join(' ').toLowerCase().includes(q)));
}
function tags(r) { const wrap = el('div', 'tags'); (r.contentTags || [r.activity]).forEach(t => wrap.append(el('span', 'tag neutral', t))); return wrap; }
function render() {
  navigation(); const records = getFiltered(); $('#grid').replaceChildren();
  $('#result-count').textContent = `${t(category)} · ${records.length} / ${items.length}${language === 'en' ? ' clips' : ' 条'}`; $('#empty').hidden = records.length > 0;
  $('#empty-text').textContent = t(category === '收款证据' ? '目前没有付款截图或付款记录视频。之后有对应素材，再收进这一类。' : '换一个关键词，或清空部分筛选。');
  records.forEach(raw => {
    const r = displayRecord(raw);
    const card = el('article', 'card'), visual = el('button', 'visual'); visual.setAttribute('aria-label', `${language === 'en' ? 'Preview: ' : '预览：'}${r.title}`); visual.onclick = () => openDetail(raw);
    const fallback = el('span','cloud-cover'); fallback.append(el('b','',r.activity),el('small','',language === 'en' ? 'Preview' : '点击预览')); visual.append(fallback);
    if (r.poster) { const img = el('img'); img.src = r.poster; img.alt = r.title + (language === 'en' ? ' thumbnail' : '的画面缩略图'); img.loading = 'lazy'; img.onload = () => { fallback.hidden = true; }; img.onerror = () => { img.remove(); fallback.hidden = false; }; visual.append(img); }
    visual.append(el('span','play-icon','▷'));
    visual.append(el('span','duration', `${r.orientation}${r.duration !== null ? ' · ' + r.duration.toFixed(1) + 's' : ''}`));
    const body = el('div','card-body'), top = el('div','card-top'), fav = el('button','favorite' + (favorites.has(r.id) ? ' saved' : ''), favorites.has(r.id) ? '★' : '☆');
    fav.setAttribute('aria-label', (language === 'en' ? (favorites.has(r.id) ? 'Remove favorite: ' : 'Save: ') : (favorites.has(r.id) ? '取消收藏：' : '收藏：')) + r.title); fav.setAttribute('aria-pressed', String(favorites.has(r.id))); fav.onclick = () => saveFavorite(r.id);
    top.append(el('h2','',r.title),fav); body.append(top,el('div','filename',r.filename),tags(r));
    card.append(visual,body); $('#grid').append(card);
  });
}
function openDetail(raw) {
  current = raw; const r = displayRecord(raw); $('#player').replaceChildren();
  if (r.media) { const v = el('video'); v.controls = true; v.muted = true; v.playsInline = true; v.preload = 'metadata'; v.src = r.media; v.poster = r.poster; v.addEventListener('error', () => { const n = el('div','player-error'); n.append(el('p','','预览文件暂时无法播放。可以打开视频文件查看。')); const a = el('a','button','打开视频文件 ↗'); a.href = r.cutMedia || r.original || r.downloadUrl || r.media; a.target = '_blank'; a.rel = 'noopener'; n.append(a); $('#player').replaceChildren(n); }); $('#player').append(v); }
  else { const iframe = el('iframe'); iframe.src = r.preview; iframe.title = `Google Drive ${language === 'en' ? 'preview: ' : '视频预览：'}${r.filename}`; iframe.allow = 'fullscreen'; iframe.allowFullscreen = true; $('#player').append(iframe); }
  $('#detail-meta').textContent = t(sourceNames[r.source] || r.source) + ' / ' + r.category;
  $('#detail-title').textContent = r.title; $('#detail-tags').replaceChildren(tags(r)); $('#detail-description').textContent = r.description;
  $('#detail-line').hidden = !r.line; $('#detail-line-text').textContent = r.line || '';
  $('#detail-evidence').textContent = r.reviewNote || '画面抽帧检查与选段';
  $('#detail-quality').hidden = !r.qualityNote; $('#detail-quality').textContent = r.qualityNote || '';
  $('#detail-curation').hidden = !r.curationReason;
  $('#detail-curation').textContent = r.curationReason ? t(curationNames[r.curation] || '') + ' · ' + r.curationReason : '';
  const alternative = items.find(item => item.id === r.alternativeId);
  $('#detail-alternative').hidden = !alternative;
  $('#detail-alternative').textContent = alternative ? (language === 'en' ? 'View alternative: ' : '查看可替换片段：') + local(alternative,'title') + ' →' : '';
  $('#detail-alternative').onclick = alternative ? () => openDetail(alternative) : null;
  const fields = [['原文件',r.filename],['活动 / 状态',r.activity],['地点 / 场景',r.location || '待确认'],['画幅',r.orientation],['预览时长',r.duration === null ? '待读取' : r.duration.toFixed(2) + (language === 'en' ? ' s' : ' 秒')],['原目录',r.path]];
  if (r.purposes.length) fields.push(['剪辑用途',r.purposes.join(language === 'en' ? ', ' : '、')]);
  if (r.shot) fields.push(['景别',r.shot]);
  if (r.resolution) fields.push(['切片分辨率',r.resolution]);
  if (r.sourceDuration && r.sourceDuration > r.duration + 1) fields.push(['原片时长',r.sourceDuration.toFixed(2) + (language === 'en' ? ' s' : ' 秒')]);
  if (r.range) fields.push(['原片时间',r.range]); $('#detail-fields').replaceChildren(); fields.forEach(([a,b])=>$('#detail-fields').append(el('dt','',a),el('dd','',b)));
  $('#detail-original').href = r.original; $('#detail-original').textContent = t((r.source === 'drive' || r.driveId) ? '在 Drive 打开原片 ↗' : '打开本地原片 ↗');
  $('#detail-download').hidden = !r.media; $('#detail-download').href = r.cutMedia || r.rawMedia || r.media;
  $('#detail-download').textContent = t(r.cutMedia ? '下载切片（原分辨率）↓' : r.source === 'drive' ? '打开本地原画质副本 ↗' : r.source === 'batch0926' ? '打开预览视频 ↗' : '打开切片 ↗');
  if (r.source === 'batch0926') $('#detail-download').href = r.cutMedia || r.media;
  if (r.cutMedia) $('#detail-download').setAttribute('download', r.cutMedia.split('/').pop()); else $('#detail-download').removeAttribute('download');
  $('#detail-original').hidden = !r.original;
  if (r.downloadUrl) {
    $('#detail-download').href = r.downloadUrl;
    $('#detail-download').textContent = r.downloadLabel || t('下载视频 ↓');
    if (r.downloadUrl.startsWith('downloads/')) $('#detail-download').setAttribute('download', r.id + '.mp4');
  }
  $('#detail-favorite').textContent = t(favorites.has(r.id) ? '已收藏 ★' : '收藏 ☆'); $('#detail-favorite').onclick = () => saveFavorite(r.id);
  $('#detail-note').textContent = r.previewNote || t('保留现场原声，预览默认静音。未调色、未变速。');
  $('#detail-drive-cut').hidden = !r.driveCutUrl;
  if (r.driveCutUrl) $('#detail-drive-cut').href = r.driveCutUrl;
  if (!$('#detail').open) $('#detail').showModal();
}
function closeDetail() { $('#player').replaceChildren(); current = null; $('#detail').close(); }
function reset() { category = '全部素材'; contentTag = '全部标签'; $('#search').value = ''; ['source','orientation','review','editorial-purpose'].forEach(id=>$('#'+id).value=''); $('#curation').value='primary'; $('#favorites').checked=false; render(); }
['search','source','orientation','review','editorial-purpose','curation','favorites'].forEach(id=>$('#'+id).addEventListener('input',render));
$('#reset').onclick=reset;$('#empty-reset').onclick=reset;$('#detail-close').onclick=closeDetail;
$('#detail').addEventListener('cancel',()=>{$('#player').replaceChildren();current=null;});
$('#detail').addEventListener('click',e=>{if(e.target===$('#detail')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDetail();}});
$('#sop-open').onclick=()=>$('#sop').showModal();$('#sop-close').onclick=()=>$('#sop').close();
$('#sync-info').onclick=()=>notice('这是 2026-09-26 的目录索引，尚未自动同步。Drive 新增素材后，需要重新扫描并更新索引。');
$('#total').textContent=items.length;
const requestedSource = new URLSearchParams(location.hash.slice(1)).get('source');
if (requestedSource && items.some(r => r.source === requestedSource)) $('#source').value = requestedSource;
applyStaticLanguage();
render();
$('#language-toggle').onclick = () => {
  language = language === 'en' ? 'zh' : 'en';
  try { localStorage.setItem('yipeng-broll-language', language); } catch {}
  const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null,'',url);
  applyStaticLanguage(); render(); if (current) openDetail(current);
  const expanded = $('#mobile-filters').getAttribute('aria-expanded') === 'true';
  $('#mobile-filters').textContent = t(expanded ? '收起筛选' : '更多筛选');
};

// Compact filters on narrow screens; all filters remain available.
const mobileFilters = document.querySelector("#mobile-filters");
if (mobileFilters) mobileFilters.onclick = () => {
  const expanded = mobileFilters.getAttribute("aria-expanded") !== "true";
  mobileFilters.setAttribute("aria-expanded", String(expanded));
  mobileFilters.textContent = t(expanded ? "收起筛选" : "更多筛选");
  document.querySelector(".controls").classList.toggle("filters-open", expanded);
};
