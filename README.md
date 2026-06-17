# Lumen Quotes

A beautifully minimal random quote generator built with modern web technologies. Browse curated wisdom, save favorites, and organize quotes into personal collections — all wrapped in a polished, accessible UI with light/dark theme support.

**Live URL:** https://mellow-quotes.lovable.app

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) v1 — full-stack React 19 with SSR/SSG |
| Router | TanStack Router (file-based routing) |
| Data Fetching | TanStack Query (React Query) |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme inline`) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) (Radix primitives + custom styling) |
| Icons | [Lucide React](https://lucide.dev) |
| Build Tool | Vite 8 |
| Runtime | Cloudflare Worker (edge/serverless) |
| Language | TypeScript 5.8 (strict mode) |

---

## Project Architecture

This is a **TanStack Start** project. Unlike traditional apps that separate into `frontend/` and `backend/` folders, TanStack Start uses a **unified full-stack architecture** where:

- **Server functions** (`createServerFn`) live alongside components in `src/lib/api/*.functions.ts`
- **Server-only helpers** live in `*.server.ts` files that are automatically stripped from client bundles
- **Routes** are defined by files in `src/routes/` — each file is both a page definition and can contain server logic
- The Vite plugin auto-generates `routeTree.gen.ts` from the `src/routes/` directory

> **Why no `backend/` or `frontend/` folders?** TanStack Start's bundler and file-based router require this specific layout. Moving files would break routing, SSR, and code-splitting. Server code is kept out of the browser automatically by the framework.

---

## Directory Structure

```
├── src/
│   ├── components/           # React components (FRONTEND)
│   │   ├── ui/              # shadcn/ui primitive components (Button, Input, Badge, etc.)
│   │   ├── QuoteGenerator.tsx   # Main interactive quote card + favorites sidebar
│   │   └── SiteShell.tsx    # App shell: navbar, theme toggle, skip links, mobile nav
│   │
│   ├── hooks/               # Custom React hooks (FRONTEND)
│   │   └── use-mobile.tsx   # Responsive breakpoint detection
│   │
│   ├── lib/                 # Shared utilities & business logic
│   │   ├── api/             # Server functions (BACKEND — runs server-side only)
│   │   │   └── example.functions.ts   # createServerFn demo (POST endpoint)
│   │   ├── collections.ts   # Collection data model + localStorage persistence (FRONTEND)
│   │   ├── config.server.ts # Server-only config loader (BACKEND)
│   │   ├── error-capture.ts # SSR error tracking utility
│   │   ├── error-page.ts    # HTML error page renderer
│   │   ├── quotes.ts        # Quote dataset + Category types (FRONTEND data)
│   │   └── utils.ts         # cn() helper (clsx + tailwind-merge)
│   │
│   ├── routes/              # File-based routes (FRONTEND pages + BACKEND loaders)
│   │   ├── __root.tsx       # Root layout — wraps every page (SEO meta, providers)
│   │   ├── index.tsx        # Homepage / — QuoteGenerator
│   │   ├── library.tsx      # /library — Browse, search, filter all quotes
│   │   └── collections.tsx  # /collections — Manage custom quote folders
│   │
│   ├── router.tsx           # TanStack Router bootstrap (FRONTEND)
│   ├── server.ts            # SSR entry point with error handling wrapper
│   ├── start.ts             # TanStack Start instance + error middleware
│   └── styles.css           # Global styles, design tokens, custom utilities
│
├── vite.config.ts           # Vite configuration (TanStack Start plugin)
├── components.json          # shadcn/ui configuration
├── package.json
├── tsconfig.json
└── bun.lock
```

### Frontend / Backend Boundaries

| Concern | Location | Notes |
|---------|----------|-------|
| React components | `src/components/`, `src/routes/` | Render in browser + SSR |
| Client state | `useState`, `useEffect`, `localStorage` | Favorites & collections stored in browser |
| Static data | `src/lib/quotes.ts` | Quote dataset shipped to client |
| UI primitives | `src/components/ui/` | shadcn/radix — fully client-side |
| Server functions | `src/lib/api/*.functions.ts` | `createServerFn` — executes on the edge worker |
| Server config | `*.server.ts` | Auto-stripped from client bundles |
| SSR entry | `src/server.ts` | Wraps catastrophic errors into friendly HTML pages |
| Middleware | `src/start.ts` | Error middleware for server functions |
| Styling | `src/styles.css` | Tailwind v4 with custom `@utility` classes |

---

## Key Features

### Discover (`/`)
- Random quote generator with category filtering
- Save favorites (persisted to `localStorage`)
- Add quotes to custom collections
- Copy-to-clipboard & Web Share API support
- Keyboard shortcut: `Space` for new quote
- Session stats (seen, saved, pool size)

### Library (`/library`)
- Full searchable, filterable quote database
- Search by text or author
- Category chips for quick filtering
- Favorite and collect quotes inline

### Collections (`/collections`)
- Create, rename, and delete custom collections
- Add/remove quotes from collections
- Browse collection contents
- All data stored in `localStorage`

### Accessibility
- Skip-to-content link
- Visible focus rings on all interactive elements
- ARIA labels and `aria-current="page"` on navigation
- `aria-pressed` on theme toggle
- Keyboard-navigable collection rename/delete buttons
- Reduced-motion support (`prefers-reduced-motion`)

### Theming
- Light mode: warm yellow background (`#FFDE42`) with teal glass cards
- Dark mode: deep slate background (`#0B1215`) with muted teal cards
- Manual toggle + `prefers-color-scheme` detection
- Smooth animated transitions between themes

---

## Design System

The project uses a **token-based design system** defined in `src/styles.css`:

- **Colors:** oklch-based semantic tokens (`--primary`, `--background`, `--foreground`, etc.)
- **Glass cards:** `@utility glass-card` — backdrop blur + subtle border + shadow
- **Custom utilities:**
  - `.font-display` — serif headings (`Instrument Serif`)
  - `.lift` — hover elevation with shadow transition
- **Micro-interactions:** Global CSS applies `translateY(-1px) scale(1.02)` on hover and `scale(0.97)` on active for all buttons, links, and cards
- **No hardcoded colors** in components — everything uses Tailwind semantic utilities

---

## Available Scripts

```bash
# Development server
bun dev

# Production build
bun run build

# Development build
bun run build:dev

# Preview production build
bun run preview

# Lint
bun run lint

# Format
bun run format
```

> **Note:** This project uses `bun` as the package manager. If you use npm/pnpm, replace `bun` accordingly.

---

## How Server Functions Work

If you add backend logic (e.g., persisting to a database, calling an external API), use `createServerFn` in a `*.functions.ts` file:

```ts
// src/lib/api/myFeature.functions.ts
import { createServerFn } from "@tanstack/react-start";

export const myServerAction = createServerFn({ method: "POST" })
  .handler(async () => {
    // This code ONLY runs on the server (Cloudflare Worker)
    return { success: true };
  });
```

Call it from any React component:

```ts
import { useServerFn } from "@tanstack/react-start";
const myAction = useServerFn(myServerAction);
const result = await myAction({ data: {} });
```

The bundler automatically separates server code from the client bundle.

---

## Adding a New Page

1. Create a file in `src/routes/` matching the URL path you want:
   - `src/routes/about.tsx` → `/about`
   - `src/routes/blog.$slug.tsx` → `/blog/:slug`

2. Export a route using `createFileRoute`:
   ```ts
   import { createFileRoute } from "@tanstack/react-router";
   export const Route = createFileRoute("/about")({
     head: () => ({ meta: [{ title: "About — Lumen Quotes" }] }),
     component: AboutPage,
   });
   ```

3. The TanStack Router Vite plugin will auto-register it in `routeTree.gen.ts`.

---

## Deployment

This project is built for **edge deployment** via Lovable / Cloudflare Workers. The build output is a single Worker bundle with SSR support.

- **Preview:** `https://id-preview--d54860fa-99a9-404a-b305-9211f3ef932c.lovable.app`
- **Production:** `https://mellow-quotes.lovable.app`

---

## License

Private — built with [Lovable](https://lovable.dev).
