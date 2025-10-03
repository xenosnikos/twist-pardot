<script lang="ts">
  import { marked } from 'marked';
  import DiagramIntegration from './diagrams/DiagramIntegration.svelte';
  import DiagramDataFlow from './diagrams/DiagramDataFlow.svelte';
  import DiagramTimeline from './diagrams/DiagramTimeline.svelte';
  import ProsCons from './layout/ProsCons.svelte';
  import ChecklistColumns from './layout/ChecklistColumns.svelte';
  import TitleSlide from './layout/TitleSlide.svelte';
  import { fade, fly, scale } from 'svelte/transition';

  export let md: string;
  export let i: number = 0; // slide index

  const firstHeading = (s: string) => {
    const m = s.match(/^\s*#\s+(.+)$/m) || s.match(/^\s*##\s+(.+)$/m);
    return m ? m[1].trim() : '';
  };

  const title = firstHeading(md).toLowerCase();
  const isIntegration = /integration architecture/.test(title);
  const isDataFlow = /data flow process/.test(title);
  const isTimeline = /migration timeline/.test(title);
  const isProsCons = /considerations for keeping marketo/.test(title);
  const isChecklist = /decision criteria checklist/.test(title);

  const html = marked.parse(md);
</script>

  {#if i === 0}
  <TitleSlide {md} />
{:else if isIntegration}
  <div class="slide-inner prose" in:fade={{duration:300}}>
    <h2>Integration Architecture</h2>
    <div class="diagram-card" in:fly={{y:20,duration:350}}>
      <DiagramIntegration />
    </div>
    <div style="margin-top:12px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap">
      <span class="badge">UTM Capture</span>
      <span class="badge">Hidden Fields</span>
      <span class="badge">Progressive Profiling</span>
      <span class="badge">Connected Campaigns</span>
    </div>
  </div>
{:else if isDataFlow}
  <div class="slide-inner prose" in:fade={{duration:300}}>
    <h2>Data Flow Process</h2>
    <div class="diagram-card" in:fly={{y:20,duration:350}}>
      <DiagramDataFlow />
    </div>
  </div>
{:else if isTimeline}
  <div class="slide-inner prose" in:fade={{duration:300}}>
    <h2>Migration Timeline</h2>
    <div class="diagram-card" in:fly={{y:20,duration:350}}>
      <DiagramTimeline {md} />
    </div>
  </div>
{:else if isProsCons}
  <div class="slide-inner prose" in:fade={{duration:300}}>
    <h2>Considerations for Keeping Marketo</h2>
    <ProsCons {md} />
  </div>
{:else if isChecklist}
  <div class="slide-inner prose" in:fade={{duration:300}}>
    <h2>Decision Criteria Checklist</h2>
    <ChecklistColumns {md} />
  </div>
{:else}
  <div class="slide-inner" in:fade={{duration:250}}>
    <div class="card prose" in:fly={{y:12}}>{@html html}</div>
  </div>
{/if}
