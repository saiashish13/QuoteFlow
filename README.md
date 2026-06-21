# Quote Flow

<div align="center">

  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" />
  <img src="https://img.shields.io/badge/Version-Preview-blue.svg" alt="Version" />
  <img src="https://img.shields.io/badge/Responsive-Yes-success.svg" alt="Responsive" />
  <img src="https://img.shields.io/badge/Stack-React%20%7C%20TypeScript-3178C6.svg" alt="Tech stack" />
  <img src="https://img.shields.io/badge/Build-Vite-646CFF.svg" alt="Build tool" />

  <br />
  <br />

  <h3>Curated inspiration, beautifully organized.</h3>
  <p>
    Quote Flow is a thoughtful, local-first quote experience designed for discovering ideas,
    saving what resonates, and turning inspiration into something you can revisit anytime.
  </p>

</div>

---

##   Overview

Quote Flow is a refined, local-first quote experience built to turn everyday moments into meaningful inspiration. The app helps you discover quotes that resonate, save favorites instantly, and organize ideas into collections that fit your mood, goals, and creative rhythm.

> Built for focus, reflection, and a calmer way to engage with ideas every day.

### Why this project matters

- Make inspiration accessible exactly when you need it
- Create a calmer, more intentional way to revisit meaningful words
- Deliver a premium, distraction-free interface that feels effortless to use
- Keep the experience lightweight, private, and beautifully simple

### Highlights

- ⚡ Discover quotes instantly with curated category filters
- 🧠 Explore a searchable library of quotes and authors
- ❤️ Save favorites with persistent browser storage
- 🗂️ Organize quotes into collections for work, motivation, and reflection
- 🌙 Switch seamlessly between light and dark themes
- ♿ Navigate with a layout designed for clarity and accessibility

### Project snapshot

| Area | What it delivers |
| --- | --- |
| Experience | A clean, distraction-free quote browsing flow |
| Personalization | Favorites and collections that stay available locally |
| Design | A premium UI with responsive layouts and strong readability |
| Accessibility | Keyboard-friendly interactions and thoughtful layout structure |

---

## 📱 App Preview

A polished snapshot of the experience across devices, showcasing the calm design, clean typography, and effortless browsing flow that define Quote Flow.

### Desktop experience

![Desktop preview](https://via.placeholder.com/1400x900?text=Quote+Flow+Desktop)

### Mobile experience

![Mobile preview](https://via.placeholder.com/430x900?text=Quote+Flow+Mobile)

### Dark mode

![Dark mode preview](https://via.placeholder.com/1400x900?text=Quote+Flow+Dark+Mode)

> These previews capture the product’s core identity: elegant visuals, intuitive navigation, and a distraction-free way to engage with quotes.

---

## 🌟 Features

### Discovery

- Browse a curated pool of quotes across multiple themes
- Shuffle to a new inspiration instantly
- Filter quotes by category to match your current mindset

### Personalization

- Save favorite quotes for quick access later
- Organize quotes into custom collections
- Revisit quotes that resonate most with your journey

### Organization

- Search by quote text or author name
- Group content by categories and personal collections
- Keep everything in a clear, minimal structure

### User Experience

- Smooth transitions and responsive interaction feedback
- Theme switching with preference-aware behavior
- Clean navigation across discover, library, and collections views

---

## 🧭 How it works

1. Start with a fresh quote recommendation tailored to your current mood.
2. Refine the experience using category filters and quick search.
3. Save quotes you connect with and group them into custom collections.
4. Revisit your favorite ideas whenever you want a moment of clarity or inspiration.

---

## 🏗️ Architecture Overview

Quote Flow is built as a modern React application with route-based navigation, browser persistence for user state, and a clear separation between UI, content, and app flow.

### Flow at a glance

1. The user opens the discovery view and loads a quote from the curated dataset.
2. Category filters and search inputs refine the available quote pool.
3. Favorites and collections are stored locally in the browser.
4. The routing structure separates discovery, library, and collection experiences cleanly.

### Design approach

- **Frontend**: React with TypeScript for predictable component behavior
- **Routing**: TanStack Router for structured page navigation
- **Data layer**: Static quote dataset plus local storage-backed user preferences
- **UI system**: Tailwind CSS and reusable UI primitives for consistency
- **State handling**: Component-local state and browser storage for lightweight persistence

---

## 🛠️ Tech Stack

A carefully selected toolchain that keeps the app fast, maintainable, and visually polished.

| Area | Technology | Why it was chosen |
| --- | --- | --- |
| Language | TypeScript | Improves maintainability and prevents runtime issues during development |
| UI Library | React 19 | Delivers a modern, component-driven interface |
| Framework | TanStack Start | Combines SSR-friendly architecture with excellent routing and app structure |
| Routing | TanStack Router | Offers type-safe, scalable route management |
| Styling | Tailwind CSS v4 | Enables fast UI design with utility-first consistency |
| Component Primitives | Radix UI | Provides accessible, composable building blocks |
| Icons | Lucide React | Keeps the interface clean and visually coherent |
| Build Tool | Vite | Delivers fast development speed and efficient production builds |
| Data Handling | localStorage + React hooks | Keeps the app lightweight and local-first |

---

## 📁 Project Structure

```txt
src/
  components/
    QuoteGenerator.tsx   Main quote-generation experience and action controls
    SiteShell.tsx        Global layout, navigation, theme toggle, and branding
    ui/                  Reusable UI primitives and design system components
  hooks/
    use-mobile.tsx        Utility hook for responsive behavior detection
  lib/
    collections.ts       Helpers for loading, saving, and creating collections
    quotes.ts            Quote dataset, categories, and metadata
    utils.ts             Shared utility helpers
  routes/
    __root.tsx           Root layout, metadata, error handling, and shell setup
    index.tsx            Discover page
    library.tsx          Searchable quote library
    collections.tsx      Collection management screen
  router.tsx             Router configuration
  server.ts              Server entry point for the app runtime
  start.ts               TanStack Start bootstrap setup
  styles.css             Global styles, tokens, and visual design system
```

---

## 🚀 Installation

### Prerequisites

- Node.js 18+
- npm or another package manager compatible with the project

### 1. Clone the repository

```bash
git clone https://github.com/nsaiashish135/QuoteFlow.git
cd QuoteFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### Windows PowerShell note

If `npm` is blocked by your execution policy, use:

```powershell
npm.cmd run dev
```

The app is typically available at:

- `http://localhost:5173/`
- or `http://127.0.0.1:8080/`

---

## 🔐 Environment Setup

Quote Flow is currently designed as a local-first application and does not require a backend setup for core usage.

### Example environment file

```env
# Optional future configuration
VITE_APP_NAME=Quote Flow
VITE_APP_ENV=development
```

### Notes

- No database connection is required for the current version
- User data is stored in the browser using `localStorage`
- Future integrations may add API-based syncing or auth configuration

---

## 📜 Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production output locally |
| `npm run lint` | Run ESLint checks |
| `npm run format` | Format the codebase with Prettier |

---

## 🧭 Application Workflow

### Quote generation flow

1. A quote is selected from the curated dataset.
2. The user can shuffle for a new quote or filter by category.
3. Actions such as favorite, copy, and share are available instantly.

### Collection management flow

1. Users create named collections.
2. Quotes can be added or removed from collections.
3. Collections are stored locally and remain available across sessions.

### Theme switching flow

1. The app checks the browser preference on first load.
2. Users can toggle between light and dark modes manually.
3. The selection is stored so the interface stays consistent.

---

## ⚡ Performance & Optimization

Quote Flow is optimized for a fast, lightweight browsing experience:

- Minimal runtime overhead through a focused data model
- Responsive components designed for quick interactions
- Efficient local storage usage for favorites and collections
- Clear separation of concerns to keep rendering predictable

---

## ♿ Accessibility

The project is built with accessibility in mind:

- Semantic navigation and content structure
- Keyboard-friendly controls and focus states
- Clear contrast and readable typography
- Support for screen-reader-friendly labels and metadata

---

## 📱 Responsive Design

Quote Flow is designed to work across multiple screen sizes:

- **Mobile**: optimized for touch-first quote browsing and collection actions
- **Tablet**: balanced layouts for quick inspiration and organization
- **Desktop**: spacious layouts with stronger visual hierarchy
- **Large screens**: wide content areas that preserve readability and usability

---

## 🔒 Security Considerations

- The current app is **local-first** and does not depend on external user data storage
- Quote content is served directly from the application
- Favorites and collections are stored securely in the browser environment
- No sensitive credentials are required for the current workflow

---

## 🗺️ Future Roadmap

Planned improvements include:

- User authentication and personalized accounts
- Cloud sync for favorites and collections
- AI-powered quote recommendations
- Public collection sharing
- Social sharing integrations
- REST API support for external integrations
- Offline support for uninterrupted access
- Progressive Web App (PWA) capabilities

---

## 🌐 Deployment

Quote Flow can be deployed in several ways:

- **Vercel** for quick static hosting
- **Netlify** for modern frontend deployment workflows
- **Docker** for containerized environments
- **Self-hosting** for full control over runtime setup

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch
3. Make your changes and commit them
4. Open a pull request with a clear description

If you’re improving documentation, UI behavior, or architecture, your help is appreciated.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

Built with care by [@nsaiashish135](https://github.com/nsaiashish135).

You can connect for feedback, collaboration, or portfolio discussion.

- GitHub: [@nsaiashish135](https://github.com/nsaiashish135)
- Portfolio / socials: add your links here
