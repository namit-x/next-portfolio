# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Stack

- **Next.js 16** with App Router (see AGENTS.md — read `node_modules/next/dist/docs/` before writing any Next.js code)
- **React 19** — all interactive components require `"use client"`
- **Tailwind CSS v4** — configured via `@import 'tailwindcss'` in `globals.css`, not `tailwind.config`; theme tokens defined with `@theme inline`
- **TypeScript**

## Architecture

### V1 (current, `app/`)

`app/page.tsx` → `App.tsx` (root client component) → wraps everything in `SmoothScroll` (Lenis) + `ThemeProvider`.

Theme is class-based: `ThemeProvider` adds `"light"` or `"dark"` to `<html>` classname, persisted to `localStorage`. CSS variables for both themes live in `app/globals.css`.

Components live in `app/components/`. Section components (`HeroSection`, `AboutSection`, `Projects`, `ContactMe`, `Timeline`) are rendered by `Background.tsx`. Primitive UI components (`button`, `badge`, `card`) are in `app/components/ui/` and use `class-variance-authority`.

`lib/utils.ts` exports `cn()` — a `clsx` + `tailwind-merge` helper used throughout.

### V2 (in progress, `app/(v2)/`)

Route group that isolates the new architecture from V1. Has its own nested `layout.tsx` (no `<html>`/`<body>` — those belong to root), isolated styles, and folder structure:

```
app/(v2)/
  layout.tsx          # Nested layout: wraps content in <div data-theme="dark" class="v2-root">
  page.tsx            # Entry point — renders HeroSection
  components/
    sections/         # Page-level section components (HeroSection, etc.)
    shared/           # Cross-cutting UI (nav, footer, etc.)
    ui/               # Primitive/atomic components
  styles/
    theme.css         # CSS variables for [data-theme="light"|"dark"], .v2-root base, keyframes
```

V2 theme uses `[data-theme]` attribute on the layout wrapper `<div>` (not a class, not on `<html>`). CSS custom properties cascade to all descendants.

Color tokens in `theme.css` use **bare HSL components** (`240 10% 4%`, not `hsl(...)`) to stay compatible with Tailwind v4's `@theme inline` mapping (`--color-background: hsl(var(--background))`). The `v2-bounce` scroll-indicator keyframe is also in `theme.css`.

### Key conventions

- `cn()` from `lib/utils.ts` for conditional class merging
- All color values go through CSS variables — never hardcode hex/rgb in components
- `"use client"` is required for any component using hooks, browser APIs, or event handlers
