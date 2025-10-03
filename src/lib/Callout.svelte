<script lang="ts">
  export let type: 'info'|'note'|'emphasis' = 'info';
  const colorBy: Record<string, string> = {
    info: 'var(--accent)',
    note: 'var(--primary)',
    emphasis: 'var(--text)'
  };
</script>

<div class="card" style="padding:16px; border-left: 6px solid {colorBy[type] || 'var(--accent)'};">
  <slot />
</div>
