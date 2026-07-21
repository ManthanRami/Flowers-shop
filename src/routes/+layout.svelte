<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import { site, whatsappLink } from '$lib/config/site';
	import { serviceList } from '$lib/config/services';
	import { Phone, Menu, X, MessageCircle } from '@lucide/svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const localeLabel: Record<string, string> = { en: 'EN', gu: 'ગુ' };
	const current = $derived(getLocale());

	const nav = $derived([
		{ href: '#top', label: m.nav_home() },
		{ href: '#about', label: m.nav_about() },
		{ href: '#services', label: m.nav_services() },
		{ href: '#gallery', label: m.nav_gallery() },
		{ href: '#reviews', label: m.nav_reviews() },
		{ href: '#contact', label: m.nav_contact() }
	]);

	let menuOpen = $state(false);
	let scrolled = $state(false);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<svelte:window onscroll={() => (scrolled = window.scrollY > 40)} />

<header class="site-header" class:is-solid={scrolled || menuOpen}>
	<div class="bar wrap">
		<a class="wordmark" href={resolve('/')}>
			<span class="wordmark__name">{m.hero_brand()}</span>
			<span class="wordmark__accent">{m.hero_brand_accent()}</span>
		</a>

		<nav class="site-nav" aria-label="Primary">
			{#each nav as item (item.href)}
				<a href={item.href}>{item.label}</a>
			{/each}
		</nav>

		<div class="actions">
			<div class="lang" role="group" aria-label="Language">
				{#each locales as locale (locale)}
					<a
						class="lang__opt"
						class:is-active={locale === current}
						aria-current={locale === current ? 'true' : undefined}
						href={resolve(localizeHref(page.url.pathname, { locale }) as Pathname)}
					>
						{localeLabel[locale] ?? locale}
					</a>
				{/each}
			</div>

			<a class="call" href="tel:{site.contact.phone}">
				<Phone size={16} aria-hidden="true" />
				<span>{m.nav_call()}</span>
			</a>

			<button
				class="burger"
				aria-expanded={menuOpen}
				aria-label={menuOpen ? m.nav_menu_close() : m.nav_menu_open()}
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}<X size={22} />{:else}<Menu size={22} />{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav class="mobile-nav" aria-label="Primary">
			{#each nav as item (item.href)}
				<a href={item.href} onclick={() => (menuOpen = false)}>{item.label}</a>
			{/each}
		</nav>
	{/if}
</header>

{@render children()}

<footer class="site-footer">
	<div class="wrap footer-grid">
		<div>
			<p class="footer-brand">
				<span class="wordmark__name">{m.hero_brand()}</span>
				<span class="wordmark__accent">{m.hero_brand_accent()}</span>
			</p>
			<p class="footer-tagline">{m.footer_tagline()}</p>
			<div class="socials">
				{#if site.social.instagram}
					<a
						class="social"
						href={site.social.instagram}
						target="_blank"
						rel="noopener external"
						aria-label="Instagram"
					>
						<!-- Inlined: Lucide 1.x dropped brand icons, and no generic icon reads
						     as "Instagram" to a visitor. -->
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							aria-hidden="true"
						>
							<rect x="2" y="2" width="20" height="20" rx="5" />
							<circle cx="12" cy="12" r="4" />
							<circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
						</svg>
					</a>
				{/if}
				<a
					class="social"
					href={whatsappLink(m.whatsapp_prefill())}
					target="_blank"
					rel="noopener external"
					aria-label="WhatsApp"
				>
					<MessageCircle size={18} />
				</a>
			</div>
		</div>

		<div>
			<h2 class="footer-heading">{m.footer_links()}</h2>
			<ul class="footer-list">
				{#each nav as item (item.href)}
					<li><a href={item.href}>{item.label}</a></li>
				{/each}
			</ul>
		</div>

		<div>
			<h2 class="footer-heading">{m.footer_services()}</h2>
			<ul class="footer-list">
				{#each serviceList() as s (s.key)}
					<li><a href="#services">{s.name}</a></li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="wrap footer-fine">
		<p>© {site.name}. {m.footer_rights()}</p>
		<p>{m.footer_made()}</p>
	</div>
</footer>

<a
	class="whatsapp-float"
	href={whatsappLink(m.whatsapp_prefill())}
	target="_blank"
	rel="noopener external"
	aria-label={m.whatsapp_float()}
>
	<MessageCircle size={26} aria-hidden="true" />
</a>

<style>
	/* Transparent over the hero, solid once scrolled past it. */
	.site-header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		transition:
			background 0.3s ease,
			box-shadow 0.3s ease;
	}
	.site-header.is-solid {
		background: color-mix(in srgb, var(--color-base) 88%, transparent);
		backdrop-filter: blur(12px);
		box-shadow: var(--shadow-soft);
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0.9rem;
	}

	.wordmark {
		font-family: var(--font-display);
		font-size: 1.4rem;
		font-weight: 700;
		text-decoration: none;
		white-space: nowrap;
	}
	.wordmark__name {
		color: var(--color-primary);
	}
	.wordmark__accent {
		color: var(--color-gold-ink);
	}
	/* Over the photo the maroon/gold wordmark would disappear — go white. */
	.site-header:not(.is-solid) .wordmark__name {
		color: #fff;
	}
	.site-header:not(.is-solid) .wordmark__accent {
		color: var(--color-gold-light);
	}

	.site-nav {
		display: none;
		gap: 1.6rem;
		font-size: 0.95rem;
	}
	.site-nav a {
		position: relative;
		color: var(--color-ink);
		text-decoration: none;
		padding-block: 0.35rem;
	}
	.site-header:not(.is-solid) .site-nav a {
		color: #fff;
	}
	/* Gold underline sliding in from the left. */
	.site-nav a::after {
		content: '';
		position: absolute;
		inset: auto 0 0 0;
		height: 2px;
		background: var(--color-gold);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.25s ease;
	}
	.site-nav a:hover::after {
		transform: scaleX(1);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.lang {
		display: inline-flex;
		border: 1px solid color-mix(in srgb, currentcolor 25%, transparent);
		border-radius: var(--radius-full);
		overflow: hidden;
	}
	.lang__opt {
		padding: 0.3rem 0.6rem;
		font-size: 0.78rem;
		color: var(--color-ink-soft);
		text-decoration: none;
	}
	.site-header:not(.is-solid) .lang__opt {
		color: color-mix(in srgb, #fff 80%, transparent);
	}
	.lang__opt.is-active {
		background: var(--color-primary);
		color: #fff;
	}

	.call {
		display: none;
		align-items: center;
		gap: 0.4rem;
		padding: 0.55rem 1.05rem;
		border-radius: var(--radius-full);
		background: var(--color-primary);
		color: #fff;
		font-size: 0.9rem;
		font-weight: 700;
		text-decoration: none;
		transition: background 0.2s ease;
	}
	.call:hover {
		background: var(--color-primary-deep);
	}

	.burger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border: 0;
		border-radius: var(--radius-md);
		background: transparent;
		color: inherit;
		cursor: pointer;
	}
	.site-header:not(.is-solid) .burger {
		color: #fff;
	}

	@media (min-width: 900px) {
		.site-nav,
		.call {
			display: flex;
		}
		.burger {
			display: none;
		}
	}

	.mobile-nav {
		display: grid;
		gap: 0.25rem;
		padding: 0.5rem clamp(1.25rem, 5vw, 3rem) 1.25rem;
		background: var(--color-base);
		border-top: 1px solid var(--color-line);
		animation: slide-down 0.25s ease-out;
	}
	.mobile-nav a {
		padding: 0.85rem 0.25rem;
		color: var(--color-ink);
		text-decoration: none;
		border-bottom: 1px solid var(--color-line);
	}
	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
	}

	/* ── Footer ─────────────────────────────────────────── */
	.site-footer {
		background: var(--color-plum-deep);
		color: color-mix(in srgb, #fff 82%, transparent);
		padding-top: 3.5rem;
	}
	.footer-grid {
		display: grid;
		gap: 2.5rem;
	}
	@media (min-width: 760px) {
		.footer-grid {
			grid-template-columns: 1.4fr 1fr 1fr;
		}
	}
	.footer-brand {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 700;
	}
	.footer-brand .wordmark__name {
		color: #fff;
	}
	.footer-brand .wordmark__accent {
		color: var(--color-gold-light);
	}
	.footer-tagline {
		margin-top: 0.6rem;
		max-width: 30ch;
		line-height: 1.6;
	}
	.socials {
		display: flex;
		gap: 0.6rem;
		margin-top: 1.25rem;
	}
	.social {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: var(--radius-full);
		border: 1px solid color-mix(in srgb, #fff 30%, transparent);
		color: #fff;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}
	.social:hover {
		background: var(--color-gold);
		border-color: var(--color-gold);
		color: var(--color-plum-deep);
	}

	.footer-heading {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-gold-light);
		margin-bottom: 0.9rem;
	}
	.footer-list {
		display: grid;
		gap: 0.5rem;
		font-size: 0.95rem;
	}
	.footer-list a {
		color: inherit;
		text-decoration: none;
	}
	.footer-list a:hover {
		color: #fff;
	}

	.footer-fine {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem;
		margin-top: 3rem;
		padding-block: 1.5rem;
		border-top: 1px solid color-mix(in srgb, #fff 15%, transparent);
		font-size: 0.85rem;
	}

	/* ── Floating WhatsApp ──────────────────────────────── */
	.whatsapp-float {
		position: fixed;
		right: clamp(1rem, 3vw, 2rem);
		bottom: clamp(1rem, 3vw, 2rem);
		z-index: 60;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: var(--radius-full);
		background: #25d366;
		color: #fff;
		box-shadow: 0 8px 24px -6px rgb(37 211 102 / 0.7);
	}
	/* Ping ring, drawn behind the button. */
	.whatsapp-float::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: #25d366;
		opacity: 0.65;
		animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
		z-index: -1;
	}
	@keyframes ping {
		75%,
		100% {
			transform: scale(1.8);
			opacity: 0;
		}
	}
</style>
