<script lang="ts">
  export let md: string;
  // Pull sections: Technical Requirements, Business Requirements, Integration Requirements
  const getSection = (title: string) => {
    const re = new RegExp(`^\s*###\s+${title}\s*$[\n\r]+([\s\S]*?)(?=^\s*###\s+|\n---|$)`, 'mi');
    const m = md.match(re);
    if (!m) return [] as string[];
    const body = m[1];
    const items = body.match(/^\s*-\s+.+$/gmi) || [];
    return items.map((l) => l.replace(/^\s*-\s+/, '').trim());
  };
  const technical = getSection('Technical Requirements');
  const business = getSection('Business Requirements');
  const integration = getSection('Integration Requirements');
</script>

<div class="grid3">
  <div class="col">
    <h3>Technical</h3>
    <ul>{#each technical as t}<li>⬢ {t}</li>{/each}</ul>
  </div>
  <div class="col">
    <h3>Business</h3>
    <ul>{#each business as b}<li>⬢ {b}</li>{/each}</ul>
  </div>
  <div class="col">
    <h3>Integration</h3>
    <ul>{#each integration as i}<li>⬢ {i}</li>{/each}</ul>
  </div>
</div>

<style>
  .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .col { background: rgba(255,255,255,0.9); padding: 1rem 1.25rem; border-radius: 14px; box-shadow: var(--shadow-md); border: 1px solid rgba(0,0,0,0.06); }
  h3 { margin: 0 0 .5rem 0; }
  ul { margin: 0; padding: 0; list-style: none; display: grid; gap: .35rem; }
  li { display: flex; gap: .5rem; align-items: start; }
  @media (max-width: 900px){ .grid3{ grid-template-columns: 1fr; } }
</style>

