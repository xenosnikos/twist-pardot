<script lang="ts">
  export let md: string;
  // Extract lines like: - **Phase 1** (Month 1-2): Setup and configuration
  const lines = (md.match(/^\s*-\s+\*\*Phase\s+\d+\*\*.*$/gmi) || []).map((l) => l.trim());
  const phases = lines.map((l) => {
    const m = l.match(/\*\*Phase\s+(\d+)\*\*\s*\(([^)]+)\):\s*(.+)$/i);
    return m ? { n: Number(m[1]), when: m[2], text: m[3] } : null;
  }).filter(Boolean) as {n:number; when:string; text:string;}[];
</script>

<svg viewBox="0 0 1100 220" width="100%" height="auto" role="img" aria-label="Migration timeline">
  <defs>
    <linearGradient id="tbg" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#eef3ff"/>
    </linearGradient>
    <filter id="tlshadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.18"/>
    </filter>
  </defs>

  <g transform="translate(40,40)">
    <rect width="1020" height="8" rx="4" fill="#1a1a1a"/>
    {#each phases as p, i}
      <g transform={`translate(${(i)*(1020/(phases.length-1))}, 0)`}>
        <circle cx="0" cy="4" r="14" fill="#1a1a1a" />
        <text x="0" y="-12" text-anchor="middle" font-weight="700">Phase {p.n}</text>
        <g filter="url(#tlshadow)" transform="translate(-120,20)">
          <rect width="240" height="80" rx="12" fill="url(#tbg)" stroke="#1a1a1a" />
          <text x="120" y="34" text-anchor="middle" font-weight="700">{p.when}</text>
          <text x="120" y="56" text-anchor="middle" font-size="14">{p.text}</text>
        </g>
      </g>
    {/each}
  </g>
</svg>

