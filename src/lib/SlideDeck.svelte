<script lang="ts">
  import { onMount } from 'svelte';
  import SlideRenderer from './SlideRenderer.svelte';
  import { fly } from 'svelte/transition';

  export let source: string;

  // Prepare slides from source markdown.
  // Priority split: explicit separators (---). Fallback: top-level headings (# ).
  let slides: string[] = [];
  {
    const norm = source.replace(/\r\n?/g, '\n');
    if (/^---\s*$/m.test(norm)) {
      slides = norm.split(/^---\s*$/m).map((s) => s.trim()).filter(Boolean);
    } else {
      // Split by top-level headings while keeping the heading with each block
      const blocks = norm.trim().split(/\n(?=#\s)/);
      slides = blocks.map((b) => b.trim()).filter(Boolean);
    }
  }

  let index = 0;
  let prevIndex = 0;

  const go = (i: number) => {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, i));
    prevIndex = index;
    index = nextIndex;
    history.replaceState(null, '', `#${index + 1}`);
  };
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const handleKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ': // space
      case 'j':
        e.preventDefault();
        next();
        break;
      case 'ArrowLeft':
      case 'PageUp':
      case 'k':
        e.preventDefault();
        prev();
        break;
      case 'Home':
        go(0);
        break;
      case 'End':
        go(slides.length - 1);
        break;
    }
  };

  onMount(() => {
    const hash = (location.hash || '').replace('#', '');
    const num = Number(hash);
    if (!Number.isNaN(num) && num >= 1 && num <= slides.length) index = num - 1;
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const titleOf = (s: string) => {
    const m = s.match(/^\s*#\s+(.+)$/m) || s.match(/^\s*##\s+(.+)$/m);
    return m ? m[1].trim() : `Slide ${index+1}`;
  };
</script>

<div class="deck">
  <div class="counter">{index + 1} / {slides.length}</div>
  <button class="arrow left" on:click={prev} aria-label="Previous">‹</button>
  <button class="arrow right" on:click={next} aria-label="Next">›</button>
  <div style="position:fixed;left:0;right:0;bottom:0;height:4px;background:rgba(255,255,255,0.35);z-index:10;">
    <div style={`height:100%;width:${((index+1)/slides.length)*100}%;background:#1a1a1a;transition:width .25s ease;`}></div>
  </div>

  {#key index}
    <section class="slide"
      transition:fly={{ x: index > prevIndex ? 60 : -60, duration: 260 }}
      aria-label={titleOf(slides[index])}
    >
      <div class="slide-inner-bg" aria-hidden="true"></div>
      <SlideRenderer md={slides[index]} i={index} />
    </section>
  {/key}

  <div class="nav" role="tablist" aria-label="Slide navigation">
    {#each slides as _, i}
      <button class="dot {i === index ? 'active' : ''}" on:click={() => go(i)} aria-label={`Go to slide ${i + 1}`} />
    {/each}
  </div>
</div>
