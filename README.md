# Flower Decoration Platform

> **This is the `static-site` branch** — the simple static webapp with no database,
> no environment variables and no server-side dependencies. Dynamic features
> (database, photos/videos, admin) are being built on the `development` branch.

A web platform for an Indian (Gujarati) flower & event decoration business —
weddings, mandap, garba, haldi, mehndi, sangeet, corporate and temple/festival decor.

Built as a **white-label** product: one codebase, rebranded per business by editing a
small, fixed set of files. See [Rebranding](#rebranding-white-label) below.

First instance: a family business based in Mehsana, Gujarat, serving all of Gujarat +
destination events.

> See [`docs/techstack.md`](./docs/techstack.md) for the full stack rationale and decisions
> log. The original design brief and review notes live in [`docs/`](./docs) too.

## Branches

| Branch        | Purpose                                                         |
| ------------- | --------------------------------------------------------------- |
| `main`        | Stable snapshot of the static marketing site                    |
| `development` | Active work: database + dynamic photo/video integration         |
| `static-site` | The simple static webapp, with all database scaffolding removed |

## Stack

| Layer     | Choice                                                                  | Status    |
| --------- | ----------------------------------------------------------------------- | --------- |
| Framework | SvelteKit + TypeScript                                                  | ✅ in use |
| Styling   | Tailwind CSS v4 (`@theme` tokens)                                       | ✅ in use |
| Icons     | Lucide                                                                  | ✅ in use |
| i18n      | Paraglide JS — English ⇄ Gujarati                                       | ✅ in use |
| Animation | CSS + a small IntersectionObserver action (`src/lib/actions/reveal.ts`) | ✅ in use |

This branch is a fully static marketing homepage — no database, auth or media
pipeline. Those live on the `development` branch.

## Prerequisites

- Node.js (see [`.nvmrc`](./.nvmrc) — run `nvm use`)
- pnpm (`npm install -g pnpm`)

## Setup

```sh
pnpm install
```

No environment variables are needed on this branch.

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

### 7. Favicons — [`static/`](./static) + [`src/app.html`](./src/app.html)

`favicon.ico`, `favicon.png` and `apple-touch-icon.png` are generated from the
business logo (currently the MF medallion cropped from `static/images/logo.jpg`).
Regenerate them from the new logo, and update the `theme-color` hex in `app.html`
to match the new brand's primary colour — it tints the mobile browser chrome.

### Rebrand checklist

- [ ] `site.ts` — business name, contact details, social links
- [ ] `theme.css` — palette + type tokens (verify contrast)
- [ ] `layout.css` — font imports, if changing typefaces
- [ ] `en.json` + `gu.json` — all copy, **including real testimonials**
- [ ] `services.ts` — the service list for this business
- [ ] `static/images/` — replace hero + gallery photography (including `logo.jpg`)
- [ ] `static/favicon.*` + `apple-touch-icon.png` — regenerate from the new logo
- [ ] `src/app.html` — `theme-color` to the new brand colour
- [ ] `package.json` — the `name` field

## Internationalization

Message catalogs live in [`messages/`](./messages) — `en.json` (English) and `gu.json`
(Gujarati). All user-facing copy should be added as translatable message keys, not
hardcoded strings. Paraglide compiles these at build time; the compiled output in
`src/lib/paraglide/` is generated and should not be edited by hand.

## Deployment

Hosting target is not yet chosen; the app uses `@sveltejs/adapter-auto`. Pick a specific
adapter (Vercel / Netlify / Cloudflare / Node) when the deploy platform is decided.
