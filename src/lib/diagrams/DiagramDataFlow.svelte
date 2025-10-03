<script lang="ts">
  import { onMount } from 'svelte';
  let drawn = false;
  onMount(() => requestAnimationFrame(() => drawn = true));
  const steps = [
    { n: 1, t: 'Capture', d: 'Forms, UTMs, page views, downloads' },
    { n: 2, t: 'Normalize', d: 'Lead source, attribution, standards' },
    { n: 3, t: 'Sync', d: 'Real-time to Salesforce' },
    { n: 4, t: 'Access', d: 'SFMC via DEs / MC Connect' },
    { n: 5, t: 'Trigger', d: 'Journeys on submits or score' },
  ];
</script>

<svg class="diagram" class:drawn={drawn} viewBox="0 0 960 500" width="100%" height="auto" role="img" aria-label="Data flow process">
  <defs>
    <linearGradient id="c1" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eef3ff"/>
    </linearGradient>
    <filter id="ds" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.18"/>
    </filter>
    <marker id="arrow2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a" />
    </marker>
  </defs>

  <!-- vertical timeline line -->
  <path d="M 480 40 L 480 460" stroke="#1a1a1a" stroke-width="3" stroke-dasharray="6 8" />

  {#each steps as s, i}
    <g transform={`translate(200, ${80 + i*80})`}>
      <circle cx="280" cy="0" r="26" fill="#1a1a1a" />
      <text x="280" y="7" fill="#fff" text-anchor="middle" font-weight="700">{s.n}</text>

      <g filter="url(#ds)">
        <rect x="-160" y="-30" width="260" height="60" rx="14" fill="url(#c1)" stroke="#1a1a1a" />
        <text x="-130" y="-5" font-weight="700">{s.t}</text>
        <text x="-130" y="18" font-size="14">{s.d}</text>
      </g>

      <path class="seg" d="M 306 0 L 420 0" stroke="#1a1a1a" stroke-width="3" marker-end="url(#arrow2)" />
    </g>
  {/each}
</svg>

<style>
  .diagram .seg { stroke-dasharray: 160; stroke-dashoffset: 160; transition: stroke-dashoffset .7s ease; }
  .diagram.drawn .seg { stroke-dashoffset: 0; }
</style>
