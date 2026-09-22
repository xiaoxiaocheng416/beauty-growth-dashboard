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

  function renderMarkdown(markdown, sop) {
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
        if (list !== 'ol') { closeList(); list = 'ol'; html.push('<ol>'); }
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
      html.push(`<p>${inlineMarkdown(paragraph.join('\n'), sop).replaceAll('\n', '<br>')}</p>`);
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

  function stepMarkup(step, index) {
    const resources = [
      ...(step.sops || []).map((sop) => `<a class="resource-link is-sop" href="#/sop/${encodeURIComponent(sop.badge)}">SOP ${escapeHtml(sop.badge)} · ${escapeHtml(sop.title)}</a>`),
      ...(step.links || []).map(resourceLink),
      ...(step.guides || []).map((guide) => `<span class="resource-link">Guide · ${escapeHtml(guide.label)}</span>`),
    ].join('');
    const lessonList = (step.lessons || []).length
      ? `<p><strong>Related modules</strong><br>${step.lessons.map((lesson) => escapeHtml(lesson.title)).join('<br>')}</p>`
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

  function filteredSops() {
    const query = searchQuery.trim().toLowerCase();
    return data.sops.filter((sop) => {
      if (activeGroup !== 'all' && sop.group !== activeGroup) return false;
      if (!query) return true;
      return `${sop.badge} ${sop.title} ${sop.description} ${sop.body}`.toLowerCase().includes(query);
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

  function route() {
    const parts = (location.hash.replace(/^#\/?/, '') || 'roadmap').split('/');
    if (parts[0] === 'sops') renderSops('');
    else if (parts[0] === 'sop') renderSops(decodeURIComponent(parts[1] || ''));
    else renderRoadmap();
  }

  window.addEventListener('hashchange', route);
  route();
})();
