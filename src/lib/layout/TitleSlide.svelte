<script lang="ts">
  export let md: string;
  const titleMatch = md.match(/^\s*#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : 'Presentation';
</script>

<div class="hero">
  <div class="decor"></div>
  <div class="inner">
    <h1>{title}</h1>
    <div class="chips">
      <span class="badge">Analysis</span>
      <span class="badge">Architecture</span>
      <span class="badge">Migration</span>
    </div>
  </div>
</div>

<style>
  .hero { position: relative; min-height: 68vh; display:grid; place-items:center; }
  .decor { position:absolute; inset:0; opacity:.10; background:
    radial-gradient(60% 60% at 80% 10%, rgba(255,255,255,.8), transparent 60%),
    url('/Introduction%20to%20AI/dofinity-slide-1.png') bottom right / contain no-repeat;
    pointer-events:none; }
  .inner { text-align:center; padding: 3rem 1rem; background: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.6); backdrop-filter: blur(6px) saturate(1.1); border-radius: 24px; box-shadow: var(--shadow-lg); width: min(1000px, 92vw); }
  h1 { margin: 0 0 12px 0; font-size: clamp(2.2rem, 4.6vw, 4rem); letter-spacing: -0.02em; }
  .chips { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-top:8px; }
</style>

