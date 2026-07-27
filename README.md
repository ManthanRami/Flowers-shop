# Flower Decoration Platform

A full-stack web platform for an Indian (Gujarati) flower & event decoration business —
weddings, mandap, garba, haldi, mehndi, sangeet, corporate and temple/festival decor.

Built as a **white-label** product: one codebase, rebranded per business by editing a
small, fixed set of files. See [Rebranding](#rebranding-white-label) below.

First instance: a family business based in Mehsana, Gujarat, serving all of Gujarat +
destination events.

> See [`docs/techstack.md`](./docs/techstack.md) for the full stack rationale and decisions
> log. The original design brief and review notes live in [`docs/`](./docs) too.

## Branches

| Branch        | Purpose                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| `main`        | Stable branch — updated by merging `development`                               |
| `development` | Active work: database + dynamic photo/video integration                        |
| `static-site` | Frozen simple static webapp (no database); only receives static-relevant fixes |

## Stack

| Layer     | Choice                                                                  | Status                                     |
| --------- | ----------------------------------------------------------------------- | ------------------------------------------ |
| Framework | SvelteKit + TypeScript                                                  | ✅ in use                                  |
| Styling   | Tailwind CSS v4 (`@theme` tokens)                                       | ✅ in use                                  |
| Icons     | Lucide                                                                  | ✅ in use                                  |
| i18n      | Paraglide JS — English ⇄ Gujarati                                       | ✅ in use                                  |
| Animation | CSS + a small IntersectionObserver action (`src/lib/actions/reveal.ts`) | ✅ in use                                  |
| Database  | PostgreSQL via Drizzle ORM                                              | ⚠️ configured, not yet wired up            |
| Auth      | Supabase Auth (admin)                                                   | ❌ planned, not installed                  |
| Media     | Cloudinary (photo + video CDN)                                          | ❌ planned — images are static files today |

Today the site is a static marketing homepage. The database, admin area and media
pipeline are scaffolded or planned, not built.

## Prerequisites

- Node.js (see [`.nvmrc`](./.nvmrc) — run `nvm use`)
- pnpm (`npm install -g pnpm`)

## Setup

```sh
pnpm install
cp .env.example .env   # then fill in credentials
```

## Develop

```sh
pnpm run dev                  # start dev server (http://localhost:5173)
pnpm run dev -- --open        # and open in browser
pnpm run dev -- --host 0.0.0.0  # expose on the local network (remote access)
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

## Rebranding (white-label)

To launch this platform for a different decoration business, these are the only
files that need to change. Nothing branded is hardcoded elsewhere in the app.

### 1. Business details — [`src/lib/config/site.ts`](./src/lib/config/site.ts)

The single source of truth for name, tagline, description, city, address, service
area, phone, WhatsApp, email and social links. The header, footer, page titles,
`tel:`/`wa.me` links and meta tags all read from here.

### 2. Visual identity — [`src/lib/styles/theme.css`](./src/lib/styles/theme.css)

All colour, typography, radius and shadow tokens live in one `@theme` block.
Override the values and the whole site follows.

> **Check contrast when changing colours.** The current palette is annotated with
> its contrast ratios, and some colours (gold, dusty rose) are deliberately split
> into decorative vs. text-safe variants because the brand colour alone fails WCAG
> on the background. Keep that discipline when substituting a new palette.

### 3. Fonts — [`src/routes/layout.css`](./src/routes/layout.css)

Fonts are self-hosted via `@fontsource` imports. To change them, install the new
package, update the imports here, and update `--font-display` / `--font-body` in
`theme.css`.

> **Keep a Gujarati-capable font in the stack.** `Hind Vadodara` is listed as a
> fallback on every font token because most Latin display faces (including
> Playfair Display) have no Gujarati glyphs. Dropping it breaks Gujarati rendering.

### 4. Copy — [`messages/en.json`](./messages/en.json) + [`messages/gu.json`](./messages/gu.json)

Every user-facing string, including section headings, service descriptions and
**testimonials**. Both files must be edited together — they are parallel catalogues,
so a key added to one must be added to the other.

### 5. Services offered — [`src/lib/config/services.ts`](./src/lib/config/services.ts)

The service list (keys + Lucide icons). The Services grid, the footer list and the
contact form's event-type dropdown all render from this one list, so adding or
removing a service is a single edit. The display names come from the message
catalogues.

### 6. Photography — [`static/images/`](./static/images)

Hero and gallery images, referenced from the Gallery and hero sections.

### 7. Logo & favicons — [`static/logos/`](./static/logos) + [`src/app.html`](./src/app.html)

The brand artwork lives in `static/logos/`. Three derived assets must be
regenerated from a new logo: `favicon.ico` / `favicon.png` /
`apple-touch-icon.png` in `static/`, and `logos/medallion.png` — a white-on-
transparent mark that the header and footer recolour via CSS `mask`, so it must
stay white artwork with the shape in the alpha channel. Also update the
`theme-color` hex in `app.html` to the new brand's dark colour — it tints the
mobile browser chrome.

### Rebrand checklist

- [ ] `site.ts` — business name, contact details, social links
- [ ] `theme.css` — palette + type tokens (verify contrast)
- [ ] `layout.css` — font imports, if changing typefaces
- [ ] `en.json` + `gu.json` — all copy, **including real testimonials**
- [ ] `services.ts` — the service list for this business
- [ ] `static/images/` — replace hero + gallery photography and `review-qr.png`
- [ ] `static/logos/` — new logo files + regenerated `medallion.png` mask
- [ ] `static/favicon.*` + `apple-touch-icon.png` — regenerate from the new logo
- [ ] `src/app.html` — `theme-color` to the new brand colour
- [ ] `package.json` — the `name` field
- [ ] `wrangler.jsonc` — the `name` field (Cloudflare Pages project name)

## Internationalization

Message catalogs live in [`messages/`](./messages) — `en.json` (English) and `gu.json`
(Gujarati). All user-facing copy should be added as translatable message keys, not
hardcoded strings. Paraglide compiles these at build time; the compiled output in
`src/lib/paraglide/` is generated and should not be edited by hand.

## Deployment

The app deploys to **Cloudflare Pages** via `@sveltejs/adapter-cloudflare`. The adapter is
configured inline in [`vite.config.ts`](./vite.config.ts) (this project has no separate
`svelte.config.js`). Runtime settings live in [`wrangler.jsonc`](./wrangler.jsonc). To
switch hosts, swap that adapter and its dev dependency for another.

[`wrangler.jsonc`](./wrangler.jsonc) pins the important bits so they are version-controlled
rather than hidden in the dashboard:

- `pages_build_output_dir` — the folder `pnpm build` produces (`.svelte-kit/cloudflare`).
- `compatibility_flags: ["nodejs_compat"]` — **required.** The SvelteKit server hooks use
  `AsyncLocalStorage` (`node:async_hooks`); without this flag the Worker builds but throws
  at runtime. It needs a `compatibility_date` of `2024-09-23` or later.
- `name` — the Pages project name. **Change this to match your project** (or override it
  per-deploy with `--project-name`).

In the Cloudflare dashboard, connect the GitHub repo and set the build configuration. On the
current (Workers Builds) runner the **Deploy command is required**, so we deploy the Pages
output explicitly with Wrangler (`wrangler` is a direct devDependency so it resolves on the
build runner, and it reads `wrangler.jsonc` for the output dir + compatibility flags):

| Setting                | Value                                                |
| ---------------------- | ---------------------------------------------------- |
| Build command          | `pnpm build`                                         |
| Deploy command         | `npx wrangler pages deploy --project-name=<PROJECT>` |
| Build output directory | `.svelte-kit/cloudflare`                             |
| Production branch      | `main` (or `development` for a preview deploy)       |

Replace `<PROJECT>` with the exact Pages project name (shown at the top of the project in the
dashboard). Wrangler authenticates automatically inside Cloudflare's build environment, so no
API token needs to be set. Note it is `wrangler pages deploy` — plain `wrangler deploy` is
the _Workers_ command and will fail here.

You can exercise the exact production artifact locally with the real Workers runtime:

```sh
pnpm build
npx wrangler pages dev .svelte-kit/cloudflare   # reads wrangler.jsonc; serves on :8788
```

No other environment variables are required today — nothing imports the Postgres database at
runtime, so the `postgres` driver is not bundled into the Worker.

> **When the database gets wired up:** the `postgres` driver does not run on Cloudflare's
> Workers runtime. Switch to an HTTP-based Postgres driver (e.g. Neon serverless, or
> Cloudflare Hyperdrive) or Cloudflare D1 before using the DB in server code.
