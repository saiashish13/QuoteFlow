<div align="center">

<img src="https://placehold.co/140x140/0D0D0E/00F2FE?text=QF" width="120" height="120" alt="Quote Flow logo" />

# Quote Flow

### Curated inspiration, beautifully organized.

Quote Flow is a polished, local-first quote workspace for discovering meaningful ideas, saving favorites, and organizing inspiration into personal collections.

<br />

[![GitHub stars](https://img.shields.io/github/stars/nsaiashish135/QuoteFlow?style=for-the-badge&logo=github&color=FFD166)](https://github.com/nsaiashish135/QuoteFlow/stargazers)
[![License](https://img.shields.io/badge/License-Not%20Added-8B5CF6?style=for-the-badge)](#-license)
[![Version](https://img.shields.io/badge/Version-Preview-118AB2?style=for-the-badge)](#-roadmap)
[![Build](https://img.shields.io/badge/Build-Local%20Ready-06D6A0?style=for-the-badge)](#-installation)
[![Stack](https://img.shields.io/badge/Stack-React%20%2B%20TypeScript-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)

</div>

<br />

## 📖 Table of Contents

- [📌 Overview](#-overview)
- [✨ Features](#-features)
- [📸 Screenshots](#-screenshots)
- [🏗️ Architecture](#-architecture)
- [🧰 Technology Stack](#-technology-stack)
- [🚀 Installation](#-installation)
- [🔐 Environment Variables](#-environment-variables)
- [🧭 Usage Guide](#-usage-guide)
- [📁 Project Structure](#-project-structure)
- [⚙️ Technical Highlights](#-technical-highlights)
- [⚡ Performance](#-performance)
- [🔒 Security](#-security)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🔄 CI/CD](#-ci/cd)
- [🗺️ Future Improvements](#-future-improvements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## 📌 Overview

Quote Flow exists to solve a simple but common problem: inspiration is easy to find and much harder to keep organized. The app gives users a focused place to browse curated quotes, filter by category, save what resonates, and group ideas into personal collections for later use.

This project is intentionally lightweight and polished. It demonstrates modern frontend engineering patterns, responsive UI design, accessible component composition, and local-first persistence without introducing unnecessary complexity.

| Area | Details |
| --- | --- |
| Problem | Quotes and ideas are scattered across notes, bookmarks, screenshots, and social feeds. |
| Solution | A dedicated quote workspace with discovery, favorites, search, categories, and collections. |
| Target users | Creators, writers, students, founders, designers, coaches, and productivity-focused professionals. |
| Current model | Local-first browser experience with no backend required for core use. |
| Strength | Fast, private, and easy to run locally while remaining ready for future growth. |

### Why it exists

- To make inspiration feel intentional rather than accidental.
- To provide a clean, elegant interface for interacting with meaningful ideas.
- To serve as a strong foundation for a future SaaS experience with auth, sync, analytics, and AI recommendations.

---

## ✨ Features

### Core Experience

- 🎲 Random quote discovery with a polished hero experience
- 🏷️ Category-based filtering for focused browsing
- 🔎 Searchable quote library for quick discovery
- ❤️ Favorites persisted in the browser for easy revisit
- 🗂️ Custom collections for organizing inspiration by theme or project
- 📋 Copy-to-clipboard and native share support for quick reuse
- 🌗 Light and dark theme support with saved preference

### Product Quality

- 📱 Responsive layout for desktop, tablet, and mobile screens
- ♿ Accessible UI primitives built with Radix-based components
- 🔔 Toast feedback for key actions such as favorite, copy, and collection updates
- 🧱 Clear separation between routes, reusable UI, and supporting helpers

---

## 📸 Screenshots

### 🎲 Discover (On Demand)
*Curated quote generator with tags, stats, copy/share, and instant refresh.*
![Discover Screen](screenshots/discover.png)

### 📚 Full Library
*Comprehensive searchable library with multi-category filters.*
![Library Screen](screenshots/library.png)

### 🗂️ Collections
*Custom user-created collections to organize quotes by theme.*
![Collections Screen](screenshots/collections.png)

---

## 🏗️ Architecture

The current architecture is a modern frontend application with local persistence. It is intentionally simple today and designed to scale cleanly as the product grows.

### High-level flow

```mermaid
flowchart LR
  User["User"] --> Browser["Browser"]
  Browser --> App["Quote Flow App"]
  App --> Router["TanStack Router"]
  App --> UI["Reusable UI Components"]
  App --> Data["Quote + Collection Helpers"]
  App --> Storage["localStorage"]
```

### Component responsibilities

- Route components define the main experience for discovery, library, and collections.
- The quote generator owns quote selection, filtering, favorite toggling, and collection interactions.
- Shared UI components provide consistent layout, accessibility, and interaction patterns.
- Helper modules manage quote data and collection persistence.

### Data flow

1. The user opens the app and loads a quote from the curated dataset.
2. The UI updates based on selected category, favorites, or collection state.
3. User actions persist to browser storage so the experience remains local and responsive.
4. Future expansion can add API-backed sync, auth, analytics, and recommendation services.

---

## 🧰 Technology Stack

| Category | Stack |
| --- | --- |
| Frontend | React 19, TypeScript, Vite |
| Routing | TanStack Router, TanStack Start |
| Styling | Tailwind CSS, CSS variables, modern UI tokens |
| Component System | Radix UI, shadcn-style primitives |
| Icons & Feedback | Lucide React, Sonner |
| Persistence | Browser localStorage |
| Build Tools | ESLint, Prettier |
| Deployment Target | Static hosting such as Vercel, Netlify, or similar |
| Programming Languages | TypeScript, HTML, CSS |
| Frameworks | React, Vite |
| Libraries | Zustand-style local state patterns, Radix primitives, Tailwind utilities |

---

## 🚀 Installation

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- Git

### Clone the repository

```bash
git clone https://github.com/nsaiashish135/QuoteFlow.git
cd QuoteFlow
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview
```

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## 🔐 Environment Variables

No environment variables are currently required for the local app experience.

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| `VITE_APP_NAME` | No | Optional app label for future UI branding | `Quote Flow` |
| `VITE_APP_ENV` | No | Optional environment identifier | `development` |
| `DATABASE_URL` | No | Planned for future backend persistence | `postgres://user:pass@host/db` |
| `JWT_SECRET` | No | Planned for future authentication | `super-secret-value` |
| `OAUTH_CLIENT_ID` | No | Planned for future OAuth integration | `your-client-id` |
| `OAUTH_CLIENT_SECRET` | No | Planned for future OAuth integration | `your-client-secret` |

> For the current version, the app runs entirely client-side and relies on browser storage.

---

## 🧭 Usage Guide

### How users interact with the app

1. Open the home experience to see a featured quote.
2. Use the category chips to narrow the quote pool.
3. Click the refresh action to generate a new quote.
4. Favorite a quote to save it for later.
5. Add quotes to named collections for organization.
6. Copy or share a quote when needed.

### Example workflow

- Discover a quote that fits a specific mood.
- Save it to favorites.
- Add it to a collection such as “Leadership Notes” or “Design Inspiration”.
- Return later to revisit the saved ideas.

## 📚 API Documentation

No REST API is currently implemented for the shipped experience. The project is currently a local-first frontend application.

If a backend is added later, the planned API surface would likely include endpoints for:

- authentication
- user profile and preferences
- favorites
- collections
- analytics
- quote administration

### Current status

- ✅ Client-side quote browsing
- ✅ Local persistence for favorites and collections
- ⏳ Future API layer planned for multi-device sync and account-based experiences

---

## 📁 Project Structure

```text
QuoteFlow/
├── src/
│   ├── components/
│   │   ├── QuoteGenerator.tsx
│   │   ├── SiteShell.tsx
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   │   ├── api/
│   │   ├── collections.ts
│   │   ├── quotes.ts
│   │   └── utils.ts
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── library.tsx
│   │   └── collections.tsx
│   ├── router.tsx
│   ├── routeTree.gen.ts
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
├── components.json
├── eslint.config.js
├── package.json
├── tsconfig.json
└── vite.config.ts
```

| Path | Purpose |
| --- | --- |
| `src/components` | Main feature UI and application shell |
| `src/components/ui` | Reusable UI primitives and accessible controls |
| `src/hooks` | Shared hooks for behavior such as responsive state |
| `src/lib` | Quote data, collection helpers, utilities, and config |
| `src/lib/api` | Place for future API integration logic |
| `src/routes` | Page-level routes for the current experience |
| `src/styles.css` | Global styling and Tailwind-driven theme setup |

---

## ⚙️ Technical Highlights

- 🧩 Component-based architecture with clear separation of layout, routes, and logic
- 🛡️ Type-safe development with TypeScript and route-level structure
- ♿ Accessible UI patterns built into shared primitives
- ⚡ Lightweight client-side state updates with minimal runtime overhead
- 🧠 Future-ready design for cloud sync, auth, analytics, and AI recommendations
- 🧪 Strong foundation for test-driven growth as the app evolves

### Design and engineering practices

- Small, focused modules with clearly scoped responsibilities
- Responsive interactions designed for a polished product feel
- Local persistence that avoids unnecessary backend complexity for v1
- A structure that is easy to extend without rewriting the app shell

---

## ⚡ Performance

The current experience is optimized for fast local interaction:

- Quote data is loaded from a lightweight in-app dataset
- Favorites and collections update immediately with no network round-trip
- Vite-based development and build tooling keeps iteration fast
- The UI is intentionally simple, which helps maintain smooth interactions

Benchmarks are not yet published, but the current architecture is designed for low-latency browsing and simple scaling.

---

## 🔒 Security

The current version is a client-only experience, which keeps sensitive data local to the browser. As the product grows, the following protections should be added:

- authentication and authorization for account-based features
- secure password handling and token storage
- input validation for future API requests
- rate limiting and abuse protection for public endpoints
- secret management through environment-based configuration

---

## 🧪 Testing

The repository currently includes linting and build validation. As the project grows, the next steps should include:

- unit tests for quote selection and persistence behavior
- integration tests for collection and favorite flows
- end-to-end tests for navigation and core user journeys
- coverage reporting to track quality over time

Suggested commands for future test coverage:

```bash
npm run lint
npm run build
```

---

## 🚀 Deployment

The app is currently designed as a static frontend and can be deployed to any modern hosting provider.

### Vercel

```bash
npm run build
```

### Netlify

```bash
npm run build
```

### Docker

```bash
docker build -t quote-flow .
docker run -p 3000:3000 quote-flow
```

### Additional targets

- Railway
- Render
- AWS Amplify or S3 + CloudFront
- Azure Static Web Apps
- Google Cloud Storage / Firebase Hosting

---

## 🔄 CI/CD

A CI pipeline is not yet defined in the repository. A recommended workflow would include:

- install dependencies
- run linting
- run tests
- build the app
- deploy on merge to the main branch

Example GitHub Actions outline:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

---

## 🗺️ Future Improvements

- [x] Curated quote discovery experience
- [x] Favorites, categories, search, and collections
- [x] Responsive polished UI with theme support
- [ ] Hosted demo and screenshots
- [ ] Unit, integration, and end-to-end test suite
- [ ] Authentication and cloud sync
- [ ] Admin content management workflows
- [ ] Analytics and recommendation features
- [ ] Mobile app or PWA experience

---

## 🤝 Contributing

Contributions are welcome. To keep the project healthy and easy to review:

1. Fork the repository.
2. Create a feature branch.
3. Make focused changes with clear intent.
4. Run linting and build validation.
5. Open a pull request with context and screenshots where relevant.

Example:

```bash
git checkout -b feature/your-feature-name
npm install
npm run lint
npm run build
```

---

## 📄 License

No license file is currently included in the repository. Before publishing or sharing it broadly, add an appropriate license such as MIT.

---

## 👤 Author

- Name: N.Sai Ashish
- LinkedIn: https://www.linkedin.com/in/nakshatram-saiashish-85a166338/
- GitHub: [@nsaiashish135](https://github.com/nsaiashish135)
- Email: nsaiashish2@gmail.com

---

## 🙏 Acknowledgements

- React, TypeScript, Vite, TanStack, Tailwind CSS, Radix UI, Lucide, and the broader open-source community
- Contributors who improve the experience, the architecture, and the documentation
- Writers, thinkers, and creators who inspire the quote-centered experience

---

## 🆘 Support

If you run into issues, have a feature request, or want to discuss an improvement:

- Open an issue on GitHub
- Start a discussion for ideas or feedback
- Reach out through the contact details in the Author section

---

## 📝 Missing Information

The following details are still recommended to make the repository feel fully production-ready:

- a proper license file
- a live demo URL
- screenshot assets for the dashboard and key flows
- CI workflow configuration
- contact details for support or maintenance
- a deployment target and environment setup guide if the app grows into a backend-backed product

---

<div align="center">

### Built with care for thoughtful, intentional product design.

⭐ If this project is useful to you, consider starring the repository.

</div>
