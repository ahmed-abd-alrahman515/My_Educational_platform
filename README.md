# 🎮 CodeQuest

A **bilingual (Arabic 🇸🇦 / English 🇬🇧), frontend-only, gamified programming quiz platform** built with Next.js. Master frontend and backend tracks, earn XP, build streaks, and unlock badges — all stored privately in your browser via `localStorage`.

> Design direction: modern, premium, dark-futuristic — inspired by Vercel, Linear, Raycast, Stripe, and gaming dashboards. Glassmorphism, gradients, glowing cards, and smooth Framer Motion animations.

---

## ✨ Features

- **13 tracks** across two paths
  - **Frontend:** HTML, CSS, JavaScript, TypeScript, React.js, Next.js
  - **Backend:** PHP, Laravel, Node.js, Express.js, SQL, REST API, Authentication
- **3 difficulty levels** per track (Beginner / Intermediate / Advanced)
- **Gamification:** XP system, ranks, daily streaks, and tiered badges
- **Bilingual** UI + content with full **RTL** support for Arabic
- **Dark / Light / System** theme with no flash on load
- **Progress persistence** via `localStorage` (no backend, no accounts)
- **SEO-friendly:** per-route metadata, sitemap, robots, static params

## 🧱 Tech Stack

| Concern    | Choice                          |
| ---------- | ------------------------------- |
| Framework  | Next.js (App Router)            |
| Language   | TypeScript                      |
| Styling    | Tailwind CSS (CSS-variable theme) |
| Animation  | Framer Motion                   |
| Icons      | lucide-react                    |
| Storage    | Browser `localStorage`          |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint
npm run type-check  # tsc --noEmit
```

## 📁 Project Structure

```
src/
├── app/                      # App Router routes
│   ├── layout.tsx            # Root layout: fonts, providers, navbar/footer, theme script
│   ├── page.tsx              # Landing page
│   ├── tracks/               # Tracks catalog
│   ├── quiz/[track]/         # Dynamic quiz route per track
│   ├── dashboard/            # Player dashboard
│   ├── about/                # About page
│   ├── sitemap.ts / robots.ts
│   └── globals.css           # Theme tokens (CSS variables) + utilities
│
├── components/
│   ├── providers/            # Theme, Language, Progress React contexts
│   ├── layout/               # Navbar, Footer, Container
│   ├── ui/                   # Reusable primitives (Button, Card, GlowCard, ...)
│   ├── features/             # Domain components (TrackCard, QuizRunner, BadgeCard, ...)
│   └── sections/             # Landing-page sections (Hero, Features, ...)
│
├── data/
│   ├── tracks.ts             # Track registry (bilingual metadata + theming)
│   ├── levels.ts             # Shared difficulty levels
│   ├── badges.ts             # Badge registry + unlock evaluation
│   └── questions/            # JSON question bank, one file per track + loader
│
├── i18n/
│   ├── translations.ts       # UI string dictionary (EN/AR, type-checked parity)
│   └── config.ts             # Languages, direction, defaults
│
├── lib/
│   ├── types live in src/types
│   ├── storage.ts            # localStorage progress system (load/save/reducers)
│   ├── xp.ts                 # XP curve, ranks, multipliers
│   ├── constants.ts          # Keys, thresholds, config
│   └── utils.ts              # cn, t, formatting, shuffle, dates
│
└── types/
    └── index.ts              # Core domain types (Track, Question, UserProgress, Badge, ...)
```

## 🧩 Core Types

All domain types live in [`src/types/index.ts`](src/types/index.ts):
`Language`, `Track`, `TrackCategory`, `Level`, `Question`, `Quiz`,
`UserProgress`, `TrackProgress`, `QuizResult`, `Badge`, `PlayerRank`, `Theme`.

## 🌍 Adding Questions

1. Create `src/data/questions/<track>.json` (see existing files for the shape).
2. Import and register it in `src/data/questions/index.ts`.

Questions are bilingual via `LocalizedText` (`{ en, ar }`), so a single entry
serves both languages.

## 🎨 Theming

Colors are defined as RGB-channel CSS variables in `globals.css` and mapped to
Tailwind tokens in `tailwind.config.ts`, so utilities like `bg-surface`,
`text-muted`, and `bg-primary/40` work identically in light and dark mode.

## 🗺️ Roadmap

The scaffold ships sample questions for HTML, CSS, JavaScript, React, Node.js,
and SQL. Remaining tracks (TypeScript, Next.js, PHP, Laravel, Express, REST API,
Authentication) have registered slots ready for their JSON banks.
