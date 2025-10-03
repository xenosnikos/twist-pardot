<script lang="ts">
  import Slide from './Slide.svelte';
  import Tag from './Tag.svelte';
  import Table from './Table.svelte';
  import Timeline from './Timeline.svelte';
  import type { SlideNode } from '../deck';
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import IntegrationDiagram from './IntegrationDiagram.svelte';

  export let slides: SlideNode[];

  // Navigation state: index into H2-level slides (children of first H1), and optional child index for H3
  let top: SlideNode | undefined;
  let siblings: SlideNode[] = [];
  let idx = 0; // current H2 index (or 0 for H1 hero)
  let childIdx = -1; // -1 means at parent; >=0 means index into children of current H2

  const computeSiblings = () => {
    top = slides[0];
    siblings = top?.children || [];
  };
  // Initialize immediately in case onMount hasn't run yet
  computeSiblings();

  // Build lookup map for ancestry checks
  const nodesById = new Map<string, SlideNode>();
  const indexNodes = () => {
    nodesById.clear();
    const walk = (n: SlideNode) => { nodesById.set(n.id, n); n.children.forEach(walk); };
    slides.forEach(walk);
  };
  indexNodes();

  // Flattened children of a section (H2): include H3 and deeper descendants
  const sectionChildren = (section?: SlideNode) => {
    if (!section) return [] as SlideNode[];
    const out: SlideNode[] = [];
    const walk = (n: SlideNode) => {
      for (const c of n.children) {
        if (c.level >= 3) out.push(c);
        if (c.children?.length) walk(c);
      }
    };
    walk(section);
    return out;
  };

  // Compute the node to display. If a parent (H2) has no own content but has children,
  // show its first child without mutating navigation state.
  const view = () => {
    if (idx === 0) return top; // Hero (H1)
    const parent = siblings[idx-1];
    if (!parent) return top;
    const kids = sectionChildren(parent);
    if (childIdx >= 0 && kids[childIdx]) {
      const k = kids[childIdx];
      if (!hasContent(k)) {
        // show first contentful descendant of k within this section
        for (let j = childIdx + 1; j < kids.length; j++) {
          if (hasContent(kids[j]) && isDescendantOf(kids[j], k)) return kids[j];
        }
      }
      return k;
    }
    if (parent && (!hasContent(parent)) && kids.length) return kids[0];
    return parent;
  };

  // Reactive current node reference; explicitly depend on state
  let curr: SlideNode | undefined;
  const hasContent = (n?: SlideNode) => !!(n && n.content && n.content.trim().length > 0);
  $: { idx; childIdx; siblings; top; curr = view(); }

  const idToPath = (id: string) => {
    if (top && top.id === id) return { idx: 0, childIdx: -1 };
    const i = siblings.findIndex(s => s.id === id);
    if (i >= 0) return { idx: i+1, childIdx: -1 };
    // search children
    for (let i2=0;i2<siblings.length;i2++){
      const kids = sectionChildren(siblings[i2]);
      let ci = kids.findIndex(ch => ch.id === id);
      if (ci !== -1) {
        if (!hasContent(kids[ci])) {
          const ancestor = kids[ci];
          for (let j = ci + 1; j < kids.length; j++) {
            if (hasContent(kids[j]) && isDescendantOf(kids[j], ancestor)) { ci = j; break; }
          }
        }
        return { idx: i2+1, childIdx: ci };
      }
    }
    return { idx: 0, childIdx: -1 };
  };

  const updateHash = () => {
    const node = view();
    if (node) history.replaceState(null, '', `#/${node.id}`);
  };

  const fromHash = () => {
    const h = (location.hash||'').replace(/^#\//,'');
    if (!h) { idx = 0; childIdx = -1; return; }
    const path = idToPath(h);
    idx = path.idx; childIdx = path.childIdx;
  };

  const nextSibling = () => {
    if (idx === 0) { idx = 1; childIdx = -1; return; }
    // if inside children, move to next child; else next H2
    const parent = siblings[idx-1];
    const kids = sectionChildren(parent);
    if (childIdx >= 0) {
      if (childIdx < (kids.length - 1)) { childIdx++; return; }
      childIdx = -1; idx = Math.min(idx + 1, siblings.length);
    } else {
      idx = Math.min(idx + 1, siblings.length);
    }
  };

  const prevSibling = () => {
    if (idx === 0) return; // at hero
    if (childIdx >= 0) { childIdx = -1; return; }
    idx = Math.max(0, idx - 1);
  };

  const down = () => {
    if (idx === 0) { idx = 1; return; }
    const parent = siblings[idx-1];
    const kids = sectionChildren(parent);
    if (kids.length) childIdx = Math.max(0, childIdx === -1 ? 0 : childIdx);
  };

  const up = () => {
    if (childIdx >= 0) { childIdx = -1; return; }
    if (idx > 0) idx = 0; // back to hero
  };

  function onKey(e: KeyboardEvent){
    if (e.key === 'ArrowRight') { e.preventDefault(); nextSibling(); updateHash(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevSibling(); updateHash(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); down(); updateHash(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); up(); updateHash(); }
  }

  onMount(() => {
    computeSiblings();
    fromHash();
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', fromHash);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('hashchange', fromHash); };
  });

  // Render helpers (no text edits)
  function renderMarkdown(md: string){
    return marked.parse(md);
  }

  function parseTable(md: string){
    const m = md.match(/\n\|(.+)\|\n\|([\-\|\s:]+)\|\n([\s\S]+)$/);
    if (!m) return null;
    const head = m[1].split('|').map(s => s.trim());
    const rows = m[3].trim().split('\n').map(r => r.replace(/^\|/,'').replace(/\|$/,'').split('|').map(s => s.trim()));
    return {head, rows};
  }

  function parseTimeline(md: string){
    const re = /^-\s+\*\*Phase\s+(\d+)\*\*\s*\(([^)]+)\):\s*(.+)$/gmi;
    const out: {label:string; when:string; text:string;}[] = [];
    for (;;) { const m = re.exec(md); if (!m) break; out.push({ label: `Phase ${m[1]}`, when: m[2], text: m[3] }); }
    return out.length ? out : null;
  }

  function isHero(node?: SlideNode){ return !!node && node.level === 1; }
  function isIntegration(node?: SlideNode){ return !!node && /integration architecture/i.test(node.title); }
  function isTimelineSlide(node?: SlideNode){ return !!node && /migration timeline/i.test(node.title); }
  function isChecklist(node?: SlideNode){ return !!node && /decision criteria checklist/i.test(node.title); }

  function isDescendantOf(node: SlideNode, ancestor: SlideNode) {
    let cur: SlideNode | undefined = node;
    while (cur && cur.parentId) {
      const p = nodesById.get(cur.parentId);
      if (!p) break;
      if (p.id === ancestor.id) return true;
      cur = p;
    }
    return false;
  }

  // Parse Integration Architecture ASCII to nodes and labels
  function parseIntegration(md: string){
    const code = md.match(/```[\s\S]*?```/m)?.[0] || '';
    const lines = code.replace(/```/g,'').trim().split('\n');
    if (!lines.length) return null;
    const first = lines[0];
    const parts = first.split(/\s+→\s+/);
    const nodes = parts.map(s => s.trim());
    const notes = {
      belowLeft: (lines[2]||'').trim(),
      aboveMid: (lines[1]||'').trim().includes('↑') ? (lines[1]||'').trim().replace(/[^A-Za-z& ]/g,'') : undefined,
      belowMid: (lines[2]||'').includes('Bidirectional') ? 'Bidirectional Sync' : 'Connector',
      aboveRight: (lines[3]||'').trim()
    };
    return { nodes, notes };
  }
</script>

{#if top}
  {#if isHero(curr)}
    {#key curr.id}
    <Slide title={curr.title} hero={true}>
      <div slot="tags" style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-top:8px;">
        <Tag text="Analysis" />
        <Tag text="Architecture" />
        <Tag text="Migration" />
      </div>
    </Slide>
    {/key}
  {:else if isTimelineSlide(curr)}
    {#key curr.id}
    <Slide title={curr.title}>
      <Timeline phases={parseTimeline(curr.content) || []} />
    </Slide>
    {/key}
  {:else}
    {#key curr.id}
    <Slide title={curr.title}>
      {#if parseTable(curr.content)}
        {@const t = parseTable(curr.content)}
        <Table head={t.head} rows={t.rows} />
      {:else if isIntegration(curr)}
        {#if parseIntegration(curr.content)}
          {@const d = parseIntegration(curr.content)}
          <IntegrationDiagram nodes={d.nodes} notes={d.notes} />
        {:else}
          <div class="prose">{@html renderMarkdown(curr.content)}</div>
        {/if}
      {:else if isChecklist(curr)}
        <div class="checklist">
          {@html renderMarkdown(curr.content)
            .replace(/\[ \]/g,'<span class="checkbox" role="checkbox" aria-checked="false"></span>')
            .replace(/\[x\]/gi,'<span class="checkbox checked" role="checkbox" aria-checked="true"></span>')}
        </div>
      {:else}
        <div class="prose" style="text-align:left;">
          {@html renderMarkdown(curr.content)}
        </div>
      {/if}
    </Slide>
    {/key}
  {/if}

  <!-- Progress dots for current sibling group -->
  <div class="nav-dots" role="tablist" aria-label="Progress">
    <button class="dot" aria-label="Hero" aria-current={idx===0} on:click={() => { idx=0; childIdx=-1; updateHash(); }}></button>
    {#each siblings as s, i}
      <button class="dot" aria-label={s.title} aria-current={idx-1===i && childIdx===-1} on:click={() => { idx=i+1; childIdx=-1; updateHash(); }}></button>
    {/each}
  </div>
  {#if idx>0 && siblings[idx-1] && sectionChildren(siblings[idx-1]).length && (childIdx>=0 || !hasContent(siblings[idx-1]))}
    <div class="nav-dots" role="tablist" aria-label="Section details" style="bottom: 52px;">
      {#each sectionChildren(siblings[idx-1]) as c, ci}
        <button class="dot" aria-label={c.title} aria-current={childIdx===ci || (childIdx===-1 && !hasContent(siblings[idx-1]) && ci===0)} on:click={() => { childIdx=ci; updateHash(); }}></button>
      {/each}
    </div>
  {/if}
{/if}
