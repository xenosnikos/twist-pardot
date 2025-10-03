<script lang="ts">
  export let md: string;
  const prosMatch = md.match(/\*\*Pros:\*\*[\s\S]*?(?=(\*\*Cons:\*\*|$))/i);
  const consMatch = md.match(/\*\*Cons:\*\*[\s\S]*?$/i);
  const strip = (s: string) => s
    .replace(/\*\*Pros:\*\*/i, '')
    .replace(/\*\*Cons:\*\*/i, '')
    .trim();
  const toItems = (s: string) => (s.match(/^[-•]\s+.+$/gmi) || []).map((l) => l.replace(/^[-•]\s+/, ''));
  const pros = prosMatch ? toItems(strip(prosMatch[0])) : [];
  const cons = consMatch ? toItems(strip(consMatch[0])) : [];
</script>

<div class="proscons">
  <div class="col pros">
    <h3>Pros</h3>
    <ul>
      {#each pros as p}
        <li><span class="icon">✓</span><span>{p}</span></li>
      {/each}
    </ul>
  </div>
  <div class="col cons">
    <h3>Cons</h3>
    <ul>
      {#each cons as c}
        <li><span class="icon">✕</span><span>{c}</span></li>
      {/each}
    </ul>
  </div>
  {#if !pros.length && !cons.length}
    <p>No pros/cons detected. Ensure the slide contains **Pros:** and **Cons:** sections with list items.</p>
  {/if}
</div>

<style>
  .proscons { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .col { background: rgba(255,255,255,0.9); padding: 1rem 1.25rem; border-radius: 14px; box-shadow: var(--shadow-md); border: 1px solid rgba(0,0,0,0.06); }
  h3 { margin: 0 0 .5rem 0; }
  ul { list-style: none; padding: 0; margin: 0; display: grid; gap: .4rem; }
  li { display: grid; grid-template-columns: 24px 1fr; align-items: start; }
  .pros .icon { color: var(--success); font-weight: 800; }
  .cons .icon { color: #e74c3c; font-weight: 800; }
  @media (max-width: 800px){ .proscons{ grid-template-columns: 1fr; } }
</style>

