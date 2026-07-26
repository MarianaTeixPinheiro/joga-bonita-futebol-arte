# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`joga-bonita` is an **Astro 7** site for a Brazilian women's-football **empowerment apparel** brand (Rio de Janeiro) — "futebol também é delas". It carries the **Joga Bonita design system**: brand tokens + a core component kit, ready to assemble pages on top of (see [Styling](#styling-tailwind-css) below). Styling is **Tailwind CSS v4**. Requires Node `>=22.12.0`. TypeScript runs in strict mode (`astro/tsconfigs/strict`).

Brand identity in one line: mint green `#70B898` + near-black ink `#1D1D1B` + warm cream/peach surfaces; **Anton** display (condensed uppercase), **Archivo** body/UI, **Caveat** handwritten accents; lowercase product voice, UPPERCASE promos; pill buttons, crisp low radii, soft warm shadows, springy motion.

There is **no test runner and no linter configured** — don't go looking for one. Type-checking is the only static check available (`astro check`).

## Commands

```sh
npm run dev        # dev server at localhost:4321
npm run build      # type-check + build to ./dist/
npm run preview    # serve the production build locally
npm run astro -- check    # type-check only (prompts to install @astrojs/check + typescript on first run)
npm run astro add <name>  # add an integration (e.g. tailwind) and auto-wire astro.config.mjs
```

## Architecture

Astro is file-based and renders to static HTML by default (no adapter configured = fully static output).

- **Routing** — every `.astro` (or `.md`) file under `src/pages/` becomes a route. `index.astro` is `/`.
- **Layouts** (`src/layouts/`) wrap page content via `<slot />`. `Layout.astro` is the base HTML document; pages import it and nest their content inside.
- **Components** (`src/components/`) are imported into pages/layouts.
- **`.astro` component model** — the `---` frontmatter fence at the top runs at **build time** on the server (imports, data fetching, props); the markup below is the template. `<style>` blocks are **scoped to that component** by default.
- **Assets** — import from `src/assets/` when you want Astro to process/optimize/hash the file (images, etc.); put files in `public/` only when they must be served untouched at a stable URL (e.g. `favicon.ico`, `robots.txt`).

## Styling (Tailwind CSS)

This project standardizes on **Tailwind CSS v4** (CSS-first config — no `tailwind.config.js`). It's already installed: the `@tailwindcss/vite` plugin is wired in `astro.config.mjs`, and `src/styles/global.css` is imported once in `Layout.astro`, so every page inherits it.

For new UI, prefer Tailwind utility classes over per-component scoped `<style>` blocks.

### Design system

`src/styles/global.css` is the single source of truth for the visual identity. It declares the brand tokens inside Tailwind's **`@theme {}`** (which generates the utilities) — never a JS config:

- **Colors** → `bg-mint` / `text-ink` / `bg-cream` / `bg-sale` / `bg-forest` … (plus shades like `mint-700`, `ink-600`, and a brand `gray-50…500` neutral ramp).
- **Fonts** → `font-display` (Anton), `font-sans` (Archivo), `font-condensed` (Archivo Narrow), `font-script` (Caveat).
- **Type scale** → `text-hero` / `text-display` / `text-h1…h4` (plus `text-base` = 15px brand body).
- **Radii** → `rounded-sm/md/lg/xl` (4–18px) + `rounded-pill`. **Shadows** → `shadow-xs/sm/md/lg`. **Easing** → `ease-out` / `ease-spring`.

The documented `--jb-*` token names (and `--fs-*`, `--sp-*`, `--shadow-focus`, `--dur-*`, etc.) are kept as `:root` aliases, so `var(--jb-mint)` and friends resolve everywhere. Helper classes: `.jb-display`, `.jb-eyebrow`, `.jb-script`, `.jb-container`.

**Core components** live in `src/components/ui/` (`Button`, `IconButton`, `Badge`, `Tag`, `PriceTag`, `Input`, `ProductCard`) — ported from the design system to idiomatic `.astro` (Tailwind utilities, CSS-driven hover/active/focus states, no React). Money is formatted with `brl()` from `src/lib/format.ts` (BRL: `R$ 109,90`). Build pages by composing these; reuse `src/assets/img/` brand assets rather than hand-drawing marks. `Welcome.astro` is leftover starter scaffold — safe to delete when real pages land.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
