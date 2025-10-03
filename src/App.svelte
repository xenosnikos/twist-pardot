<script lang="ts">
  import './theme.css';
  import Deck from './lib/Deck.svelte';
  import { parseSlides } from './deck';
  const slides = parseSlides();
  const title = slides[0]?.title || 'Presentation';
</script>

<svelte:head><title>{title}</title></svelte:head>

<Deck {slides} />
