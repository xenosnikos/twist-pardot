<script lang="ts">
  export type Phase = { label: string; when: string; text: string };
  export let phases: Phase[] = [];
</script>

<div class="card" style="padding:20px;">
  <div class="container" style="padding:0;">
    <div style="position:relative; height: 160px;">
      <div style="position:absolute; left:0; right:0; top:50%; height:4px; background: var(--primary); opacity:.2;"></div>
      {#each phases as p, i}
        <div style="position:absolute; left: {i*(100/(phases.length-1))}%; top:50%; transform: translate(-50%, -50%); text-align:center; width: 240px;">
          <div style="width:18px; height:18px; border-radius:999px; background:var(--primary); margin: 0 auto 10px;"></div>
          <div class="card" style="padding:12px; background:#fff;">
            <div style="font-weight:800; color:var(--primary)">{p.label}</div>
            <div style="font-weight:700">{p.when}</div>
            <div style="font-size:14px; color:var(--text)">{p.text}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

