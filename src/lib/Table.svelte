<script lang="ts">
  export let head: string[];
  export let rows: string[][];
</script>

<div class="card" style="padding:16px;">
  <div style="overflow-x:auto;">
    <table aria-label="Comparison table">
      <thead>
        <tr>{#each head as h}<th scope="col">{h}</th>{/each}</tr>
      </thead>
      <tbody>
        {#each rows as r}
          <tr>{#each r as c, i}<td>{c}</td>{/each}</tr>
        {/each}
      </tbody>
    </table>
  </div>
  <slot />
  </div>

