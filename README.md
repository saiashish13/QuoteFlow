# Quote Flow

Quote Flow is a polished quote discovery app built with TanStack Start, React, TypeScript, and Tailwind CSS. It lets users generate fresh quotes, browse a searchable quote library, save favorites, and organize meaningful quotes into custom collections.

## Highlights

- Random quote generator with category filtering
- Searchable quote library with author and text matching
- Favorite quotes with local browser persistence
- Create, rename, and delete custom quote collections
- Add and remove quotes from collections
- Light and dark theme support
- Responsive layout for desktop and mobile
- Accessible navigation, focus states, and semantic page metadata

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | TanStack Start |
| UI | React 19 |
| Routing | TanStack Router |
| State and Data | React hooks, localStorage, TanStack Query |
| Styling | Tailwind CSS v4 |
| Components | Radix UI primitives with local shadcn-style components |
| Icons | Lucide React |
| Build Tool | Vite |
| Language | TypeScript |

## Project Structure

```txt
src/
  components/
    QuoteGenerator.tsx   Main quote generator experience
    SiteShell.tsx        App shell, navigation, theme toggle, and logo
    ui/                  Reusable UI primitives
  hooks/                 Shared React hooks
  lib/
    collections.ts       Collection storage helpers
    quotes.ts            Quote dataset and categories
    utils.ts             Shared utility helpers
  routes/
    __root.tsx           Root route, metadata, providers, and error UI
    index.tsx            Discover page
    library.tsx          Searchable quote library
    collections.tsx      Collection manager
  router.tsx             Router setup
  server.ts              SSR entry point
  start.ts               TanStack Start setup
  styles.css             Global styles and design tokens
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```powershell
npm.cmd run dev
```

Then open the local URL printed by Vite, usually `http://127.0.0.1:8080/` or `http://localhost:5173/`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run build:dev` | Create a development-mode build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the project with Prettier |

## Data and Storage

Quote Flow currently uses a local quote dataset in `src/lib/quotes.ts`. Favorites and collections are stored in the browser with `localStorage`, so the app works without a database or external API.

## Customization

- Update quote content in `src/lib/quotes.ts`.
- Adjust app branding and the SVG logo in `src/components/SiteShell.tsx`.
- Tune colors, tokens, and global motion in `src/styles.css`.
- Add new pages by creating route files in `src/routes/`.

## Build

Create a production build with:

```bash
npm run build
```

The generated output is written to `dist/`.
