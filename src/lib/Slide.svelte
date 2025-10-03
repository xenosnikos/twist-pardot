<script lang="ts">
  export let title: string;
  export let hero = false;
  export let kicker: string | undefined = undefined;
</script>

<section class="slide">
  <div class="slide-inner container">
    {#if hero}
      <div class="card" style="position:relative; overflow:hidden;">
        <div class="hero-bg pattern-brand" aria-hidden="true"></div>
        <div style="position:relative; padding: 40px 32px; text-align:center;">
          <h1>{title}</h1>
          {#if kicker}
            <p style="color: var(--muted); font-weight:600">{kicker}</p>
          {/if}
          <slot name="tags" />
        </div>
      </div>
    {:else}
      <header style="margin-bottom: 18px;">
        <h2>{title}</h2>
        {#if kicker}<p style="color:var(--muted); margin-top:4px;">{kicker}</p>{/if}
      </header>
      <div class="card" style="padding: 24px;">
        <slot />
      </div>
    {/if}
  </div>
  <slot name="nav" />
</section>
