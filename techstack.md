# Tech Stack — Flower Decoration Platform

> Living document. We add/confirm choices here as we discuss.
> Status legend: ✅ Decided · 🤔 Proposed (needs confirm) · ❓ Open question

---

## 1. Product Overview

- **What it is:** A full-stack web platform for a flower / event decoration business.
- **First customer:** Family business in **Mehsana, Gujarat** (weddings, mandap, garba, haldi, mehndi, sangeet, corporate & temple/festival decor).
- **Key trait:** **White-label** — the product is rebrandable so it can be deployed/sold to other decoration businesses. The family business is instance #1.
- **Content is media-heavy:** a **dynamically growing** library of **photos and videos** of past work, managed via an admin panel (no code editing).
- **Look & feel:** elegant, animation-rich (this is a decoration brand — visuals sell the work).

---

## 2. Core Stack (Proposed)

| Layer             | Choice                                            | Status | Notes                                                                                   |
| ----------------- | ------------------------------------------------- | ------ | --------------------------------------------------------------------------------------- |
| **Framework**     | SvelteKit (full-stack)                            | ✅     | Server routes + admin + frontend in one app. Compiles away → light JS, great on mobile. |
| **Language**      | TypeScript                                        | ✅     | Type safety across DB, API, and UI.                                                     |
| **Styling**       | Tailwind CSS                                      | ✅     | Fast, consistent, easy to theme for white-label.                                        |
| **Animations**    | GSAP + Svelte transitions + Lenis (smooth scroll) | ✅     | See §4.                                                                                 |
| **Database**      | PostgreSQL (via Supabase)                         | ✅     | Relational — fits albums/events/tags/tenants. Managed.                                  |
| **ORM**           | Drizzle ORM                                       | ✅     | Lightweight, TS-native, great SvelteKit fit.                                            |
| **Media storage** | Cloudinary (image + video CDN)                    | ✅     | Auto compression, thumbnails, video streaming — key for mobile.                         |
| **Auth**          | Supabase Auth                                     | ✅     | For admin login (and tenant owners if multi-tenant later).                              |
| **i18n**          | Paraglide JS (inlang)                             | ✅     | Type-safe, tree-shakeable. English ⇄ Gujarati toggle from day one.                      |
| **Hosting**       | TBD (Vercel / Netlify / Cloudflare / VPS)         | ❓     | Decide after build. Adapter chosen accordingly.                                         |

---

## 3. White-Label Architecture — KEY DECISION ❓

Two very different models. This choice shapes everything else:

**A. Single-tenant, rebrandable (config-per-deployment)**

- One deployment = one business. Branding (logo, colors, fonts, name, content) comes from a config/theme stored in that instance's DB or env.
- To onboard a new client: clone/deploy a new instance, set their config.
- ✅ Simpler. ✅ Full data isolation. ❌ Manual per-client deploys.

**B. Multi-tenant SaaS (one deployment, many businesses)**

- One app serves many businesses via subdomains (`family.app.com`, `client2.app.com`) or custom domains.
- Each tenant has its own branding/theme, media, and admin — all rows tagged by `tenant_id`.
- ✅ Onboard clients without redeploying. ❌ More complex (tenant isolation, routing, billing).

> **✅ DECIDED (Option A, theme-driven):** Codebase is **theme-driven from day one** (branding pulled from a `tenant`/`site_config` table, never hardcoded), launched as **single-tenant** for the family business. Multi-tenant stays a later switch, not a rewrite.

---

## 4. Animations — Approach 🤔

- **GSAP** (+ ScrollTrigger) — hero reveals, scroll-driven storytelling, gallery parallax. Framework-agnostic, industry standard.
- **Svelte built-in transitions/motion** — page transitions, list/gallery item enter/leave, micro-interactions. Free, no bundle cost.
- **Lenis** — smooth momentum scrolling that makes scroll animations feel premium.
- **Principle:** tasteful and fast — respect `prefers-reduced-motion`, never block content or hurt mobile load.

---

## 5. Data Model (early sketch) 🤔

- `tenant` / `site_config` — branding: name, logo, palette, fonts, contact, WhatsApp, socials.
- `media` — url, type (image/video), Cloudinary id, thumbnail, caption, event_type, tags, album_id, sort order.
- `album` / `project` — a decorated event grouping multiple media.
- `service` — event types offered (wedding, mandap, haldi…), description, hero image.
- `inquiry` — contact/booking form submissions (event type, date, venue, budget, message).
- `user` — admin accounts (scoped by tenant if multi-tenant).

---

## 6. Open Questions

1. ❓ **Booking depth:** inquiry form + WhatsApp only, or online payments / calendar availability later.
2. ❓ **Language:** English only, English + Gujarati toggle, or English with Gujarati accent terms.
3. ❓ **Hosting target:** decided after build (adapter chosen accordingly).

---

## 7. Pre-Commit Checklist & Considerations

**Hygiene / tooling (defaults, low stakes):**

- [x] `git init` + `.gitignore` (excludes `.env`, `node_modules`, build output).
- [x] `.env` gitignored; committed `.env.example` with Supabase + Cloudinary placeholders.
- [x] Package manager: **pnpm** (installed via `npm i -g pnpm`).
- [x] Prettier + ESLint + `svelte-check` (via `sv` add-ons).
- [x] `.nvmrc` pinning Node **24**.
- [x] README (setup + run instructions). First commit = clean scaffold only, no secrets.

**Product shape (needs user input):**

- ❓ Business name, tagline, phone/WhatsApp, service areas (drives theme config + meta).
- ❓ Visual direction: traditional (marigold/red/gold, serif) vs modern-luxe (pastel/minimal).
- ❓ Design system base: proposed **shadcn-svelte (bits-ui) + Lucide icons**, restyled. 🤔
- ❓ Existing media: form (phone/Drive/Instagram/disk) and rough volume → shapes upload + seeding.

**Decide soon (non-blocking):**

- ❓ SEO/local: meta + Open Graph + `LocalBusiness` structured data + sitemap (hooks baked in from start).
- ❓ Privacy handling for inquiry-form personal data.
- ❓ Analytics: Plausible vs GA vs none.
- ❓ Booking depth + Language (see §6).

---

## 8. Decisions Log

- **2026-07-17** — Framework: **SvelteKit + TypeScript**. (Chosen over Next.js for light JS, mobile perf, strong built-in animation primitives.)
- **2026-07-17** — White-label: **Theme-driven from day one, launch single-tenant** (Option A). Multi-tenant deferred as a later switch.
- **2026-07-17** — Media: **Cloudinary** (image + video CDN, auto compression/thumbnails/streaming).
- **2026-07-17** — Backend: **Supabase** (managed Postgres + Auth) queried via **Drizzle ORM**.
- **2026-07-17** — Confirmed: **TypeScript**, **Tailwind CSS**, animation stack **GSAP + Lenis + Svelte transitions**.
- **2026-07-17** — Visual direction: **Blend** — modern-minimal layout base + traditional accents (gold/marigold) + serif display font for headings.
- **2026-07-17** — Media seeding: build with **placeholders + a solid admin upload flow**; real photos/videos seeded later (source is a mix/TBD).
- **2026-07-17** — Booking: **Inquiry form (saved to DB, visible in admin) + floating WhatsApp button**. Payments/calendar deferred to phase 2.
- **2026-07-17** — Language: **Full English ⇄ Gujarati toggle from day one** via **Paraglide JS (inlang)**. All content is translatable keys.
- **2026-07-17** — Branding: **placeholder brand in `site.config`** for now (swap later — white-label makes it one-file).
- **2026-07-17** — Coverage: **All of Gujarat + destination events** (premium, travel-friendly positioning).
- **2026-07-17** — Identity: **propose a palette** (gold/marigold + minimal), **text wordmark** logo for now.
- **2026-07-17** — Scaffolded via `sv` CLI: SvelteKit + TS + Tailwind + ESLint + Prettier + Drizzle (postgresql/postgres.js) + Paraglide (en, gu). Verified `pnpm run build` + `pnpm run check` (0 errors). First commit = clean scaffold + hygiene only.

---

## 9. Design Tokens ✅ — "Genda" identity

Grounded in real marigold garlands, not a generic cream+terracotta template.
Implemented in `src/lib/styles/theme.css` (Tailwind v4 `@theme`).

**Palette:**

| Role                    | Name              | Hex       |
| ----------------------- | ----------------- | --------- |
| Background              | Petal ivory       | `#FBF3EF` |
| Surface                 | Warm surface      | `#F6E8E0` |
| Text / ink              | Deep maroon-plum  | `#2A1620` |
| Muted text              | Soft maroon       | `#6B4A55` |
| Hairline / borders      | Line              | `#E6D3CA` |
| Primary accent          | Marigold          | `#EA7A24` |
| Primary (deep)          | Marigold deep     | `#C85F13` |
| Secondary (the risk)    | Rani pink         | `#C42A6B` |
| Fresh accent            | Leaf green        | `#3E6B4F` |
| Metallic detail         | Gold              | `#C79A3E` |

**Type (self-hosted via Fontsource):**

- Display / headings: **Fraunces** (variable, optical) — festive-elegant, used with restraint.
- Body / UI: **Hanken Grotesk** (variable) — warm, quiet, modern.
- Gujarati: **Hind Vadodara** — auto-swapped via `html:lang(gu)`.

**Signature element:** hanging marigold-garland **toran** (`src/lib/components/Toran.svelte`).

> Exposed as CSS variables in Tailwind's `@theme` so a white-label rebrand = editing this
> file + `src/lib/config/site.ts`. Quality floor baked in: visible `:focus-visible`,
> `prefers-reduced-motion` respected, responsive to mobile.
