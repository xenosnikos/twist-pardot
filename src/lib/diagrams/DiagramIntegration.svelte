<script lang="ts">
  import { onMount } from 'svelte';
  let drawn = false;
  onMount(() => {
    requestAnimationFrame(() => drawn = true);
  });
</script>

<svg class="diagram" class:drawn={drawn} viewBox="0 0 1100 420" width="100%" height="auto" role="img" aria-label="Integration architecture">
  <defs>
    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#e9eefc" stop-opacity="1"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.18"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1a1a" />
    </marker>
  </defs>

  <!-- Nodes -->
  <g filter="url(#shadow)" transform="translate(40,120)">
    <rect rx="14" width="220" height="120" fill="url(#g1)" stroke="#1a1a1a"/>
    <text x="110" y="50" text-anchor="middle" font-weight="700">Pardot Forms</text>
    <text x="110" y="78" text-anchor="middle">Tracking & Attribution</text>
  </g>

  <g filter="url(#shadow)" transform="translate(320,120)">
    <rect rx="14" width="220" height="120" fill="url(#g1)" stroke="#1a1a1a"/>
    <text x="110" y="50" text-anchor="middle" font-weight="700">Salesforce CRM</text>
    <text x="110" y="78" text-anchor="middle">Lead + Campaign Data</text>
  </g>

  <g filter="url(#shadow)" transform="translate(600,120)">
    <rect rx="14" width="220" height="120" fill="url(#g1)" stroke="#1a1a1a"/>
    <text x="110" y="50" text-anchor="middle" font-weight="700">MC Connect</text>
    <text x="110" y="78" text-anchor="middle">Bidirectional Sync</text>
  </g>

  <g filter="url(#shadow)" transform="translate(880,120)">
    <rect rx="14" width="220" height="120" fill="url(#g1)" stroke="#1a1a1a"/>
    <text x="110" y="50" text-anchor="middle" font-weight="700">SFMC</text>
    <text x="110" y="78" text-anchor="middle">Journeys + Messaging</text>
  </g>

  <!-- Connectors -->
  <g stroke="#1a1a1a" stroke-width="3" marker-end="url(#arrow)" class="draw">
    <path d="M 260 180 L 320 180" />
    <path d="M 540 180 L 600 180" />
    <path d="M 820 180 L 880 180" />
  </g>

  <!-- Vertical context arrows/text -->
  <g>
    <path d="M 150 240 L 150 300" stroke="#1a1a1a" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="150" y="320" text-anchor="middle" font-weight="700">Tracking Layer</text>

    <path d="M 430 120 L 430 70" stroke="#1a1a1a" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="430" y="55" text-anchor="middle" font-weight="700">CRM of Record</text>

    <path d="M 710 240 L 710 300" stroke="#1a1a1a" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="710" y="320" text-anchor="middle" font-weight="700">Connector</text>

    <path d="M 990 120 L 990 70" stroke="#1a1a1a" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="990" y="55" text-anchor="middle" font-weight="700">Activation</text>
  </g>
</svg>

<style>
  .diagram .draw path { stroke-dasharray: 260; stroke-dashoffset: 260; transition: stroke-dashoffset .9s ease .1s; }
  .diagram.drawn .draw path { stroke-dashoffset: 0; }
</style>
