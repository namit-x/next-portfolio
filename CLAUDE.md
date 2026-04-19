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

### V1 (parked, `app/`)

V1 is no longer routed: its entry `app/page.tsx` was renamed to [app/page_old.tsx](app/page_old.tsx) so the route group below takes over `/`. Code still lives in [app/components/](app/components/) and may be referenced while porting — entry chain was `page.tsx` → `App.tsx` → `SmoothScroll` (Lenis) + `ThemeProvider` → `Background.tsx` (renders `HeroSection`, `AboutSection`, `Projects`, `ContactMe`, `Timeline`).

V1 theme was class-based: `ThemeProvider` toggled `"light"`/`"dark"` on `<html>`, persisted to `localStorage`. CSS variables live in [app/globals.css](app/globals.css).

Primitive UI (`button`, `badge`, `card`) in [app/components/ui/](app/components/ui/) uses `class-variance-authority`. [lib/utils.ts](lib/utils.ts) exports `cn()` — a `clsx` + `tailwind-merge` helper used throughout both versions.

### V2 (active, `app/(v2)/`)

Route group that owns `/` now. Has its own nested `layout.tsx` (no `<html>`/`<body>` — those belong to [app/layout.tsx](app/layout.tsx)), isolated styles, and folder structure:

```
app/(v2)/
  layout.tsx          # Nested layout: wraps content in <div data-theme="dark" class="v2-root">
  page.tsx            # Entry point — renders HeroSection + AboutSection
  components/
    sections/         # Page-level section components (HeroSection, AboutSection)
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
