<script lang="ts">
  export let nodes: string[] = [];
  export let notes: { belowLeft?: string; aboveMid?: string; belowMid?: string; aboveRight?: string } = {};
</script>

<div class="card" style="padding:16px;">
  <svg viewBox="0 0 1100 300" width="100%" height="auto" role="img" aria-label="Integration architecture">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text)" />
      </marker>
    </defs>

    <!-- Nodes -->
    {#if nodes && nodes.length}
      {#each nodes as n, i}
        <g transform={`translate(${60 + i*260}, 80)`}>
          <rect rx="16" width="220" height="100" fill="#fff" stroke="var(--text)" />
          <text x="110" y="45" text-anchor="middle" fill="var(--text)" font-weight="700">{n}</text>
        </g>
      {/each}
    {/if}

    <!-- Connectors -->
    <g stroke="var(--text)" stroke-width="3" marker-end="url(#arrow)">
      <path d="M 280 130 L 320 130" />
      <path d="M 540 130 L 580 130" />
      <path d="M 800 130 L 840 130" />
    </g>

    <!-- Notes -->
    {#if notes.belowLeft}
      <text x="170" y="210" text-anchor="middle" fill="var(--text)" font-weight="700">{notes.belowLeft}</text>
    {/if}
    {#if notes.aboveMid}
      <text x="450" y="60" text-anchor="middle" fill="var(--text)" font-weight="700">{notes.aboveMid}</text>
    {/if}
    {#if notes.belowMid}
      <text x="710" y="210" text-anchor="middle" fill="var(--text)" font-weight="700">{notes.belowMid}</text>
    {/if}
    {#if notes.aboveRight}
      <text x="970" y="60" text-anchor="middle" fill="var(--text)" font-weight="700">{notes.aboveRight}</text>
    {/if}
  </svg>
</div>

