# Flower Decoration Platform

A full-stack web platform for an Indian (Gujarati) flower & event decoration business —
weddings, mandap, garba, haldi, mehndi, sangeet, corporate and temple/festival decor.

Built as a **white-label** product (theme-driven, single-tenant launch) with a
dynamically growing, admin-managed library of photos and videos. First instance:
a family business based in Mehsana, Gujarat, serving all of Gujarat + destination events.

> See [`techstack.md`](./techstack.md) for the full stack rationale and decisions log.

## Stack

| Layer     | Choice                                |
| --------- | ------------------------------------- |
| Framework | SvelteKit + TypeScript                |
| Styling   | Tailwind CSS                          |
| Animation | GSAP + Lenis + Svelte transitions     |
| Database  | PostgreSQL (Supabase) via Drizzle ORM |
| Auth      | Supabase Auth (admin)                 |
| Media     | Cloudinary (photo + video CDN)        |
| i18n      | Paraglide JS — English ⇄ Gujarati     |

## Prerequisites

- Node.js (see [`.nvmrc`](./.nvmrc) — run `nvm use`)
- pnpm (`npm install -g pnpm`)

## Setup

```sh
pnpm install
cp .env.example .env   # then fill in Supabase + Cloudinary credentials
```

## Develop

```sh
pnpm run dev            # start dev server
pnpm run dev -- --open  # and open in browser
```

## Common scripts

```sh
pnpm run check    # type-check (svelte-check)
pnpm run lint     # prettier + eslint
pnpm run format   # auto-format
pnpm run build    # production build
pnpm run preview  # preview the production build

pnpm run db:push      # push Drizzle schema to the database
pnpm run db:generate  # generate SQL migrations
pnpm run db:studio    # open Drizzle Studio
```

## Internationalization

Message catalogs live in [`messages/`](./messages) — `en.json` (English) and `gu.json`
(Gujarati). All user-facing copy should be added as translatable message keys, not
hardcoded strings.

## Deployment

Hosting target is not yet chosen; the app uses `@sveltejs/adapter-auto`. Pick a specific
adapter (Vercel / Netlify / Cloudflare / Node) when the deploy platform is decided.
