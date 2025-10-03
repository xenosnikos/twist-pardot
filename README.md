# Interactive Svelte Presentation

This repo contains a lightweight Svelte + Vite slide deck that renders slides from Markdown and applies the brand look from your PPT export.

## Quick Start

- Requirements: Node 18+ and npm
- Commands:
  - `npm install`
  - `npm run dev` then open the printed URL
  - `npm run build` to create a static build in `dist/`

## Slides Content

- The deck currently reads from `BUSINESS.MD` at the repo root.
- Slides are split by lines containing only `---`. If no separators are present, it will auto-split on top-level headings (`# ...`).
- You can include standard Markdown and inline HTML for simple callouts (e.g., `<div class="card">...</div>`).

## Brand Styling

- Global theme tokens are defined in `src/app.css`:
  - `--bg: #809df1` (background)
  - `--text: #1a1a1a` (text)
  - `--card: #ffffff` (card surfaces)
  - `--success`, `--warning`, `--info` for accents
- The deck styles mirror the PPT-derived HTML in `Introduction to AI/dofinity-presentation.html`.
- Add logos/images to `public/` and reference them from Markdown: `![](/your-logo.png)`.

## Controls

- Next: Right Arrow, Space, PageDown, `j`
- Previous: Left Arrow, PageUp, `k`
- Home/End jump to first/last slides
- Click dots to jump directly

## Notes

- `BUSINESS.MD` in this repo is currently empty. Paste your real content into `content/business.md` (or tell me to repoint the import to `BUSINESS.MD`).
- If you have a specific brand guide deck, share the color/typography tokens or point me to the exact assets to incorporate.
