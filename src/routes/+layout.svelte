<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import { site } from '$lib/config/site';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	const localeLabel: Record<string, string> = { en: 'EN', gu: 'ગુ' };
	const current = $derived(getLocale());

	const nav = $derived([
		{ href: '#work', label: m.nav_work() },
		{ href: '#services', label: m.nav_services() },
		{ href: '#about', label: m.nav_about() },
		{ href: '#contact', label: m.nav_contact() }
	]);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="site-header">
	<a class="wordmark" href={resolve('/')}>
		<span class="wordmark__dot" aria-hidden="true"></span>
		{site.name}
	</a>

	<nav class="site-nav" aria-label="Primary">
		{#each nav as item (item.href)}
			<a href={item.href}>{item.label}</a>
		{/each}
	</nav>

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
</header>

{@render children()}

<footer class="site-footer">
	<div class="site-footer__brand">
		<span class="wordmark__dot" aria-hidden="true"></span>
		<span>{site.name}</span>
	</div>
	<p class="site-footer__meta">{site.address}</p>
	<p class="site-footer__meta">
		<a href="tel:{site.contact.phone}">{site.contact.phoneDisplay}</a> ·
		<a href="mailto:{site.contact.email}">{site.contact.email}</a>
	</p>
	{#if site.social.instagram}
		<p class="site-footer__meta">
			<a href={site.social.instagram} target="_blank" rel="noopener external">Instagram</a>
		</p>
	{/if}
	<p class="site-footer__fine">© {site.name}. {m.footer_rights()}</p>
</footer>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem clamp(1rem, 4vw, 3rem);
		background: color-mix(in srgb, var(--color-base) 82%, transparent);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--color-line);
	}

	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.35rem;
		letter-spacing: -0.01em;
		color: var(--color-ink);
		text-decoration: none;
	}
	.wordmark__dot {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: var(--radius-full);
		background: radial-gradient(circle at 35% 35%, var(--color-marigold), var(--color-rani));
	}

	.site-nav {
		display: none;
		gap: 1.75rem;
		font-size: 0.95rem;
	}
	.site-nav a {
		color: var(--color-ink-soft);
		text-decoration: none;
		transition: color 0.2s ease;
	}
	.site-nav a:hover {
		color: var(--color-rani);
	}
	@media (min-width: 820px) {
		.site-nav {
			display: flex;
		}
	}

	.lang {
		display: inline-flex;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-full);
		overflow: hidden;
	}
	.lang__opt {
		padding: 0.3rem 0.7rem;
		font-size: 0.8rem;
		letter-spacing: 0.02em;
		color: var(--color-ink-soft);
		text-decoration: none;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}
	.lang__opt.is-active {
		background: var(--color-ink);
		color: var(--color-base);
	}

	.site-footer {
		margin-top: 6rem;
		padding: 3rem clamp(1rem, 4vw, 3rem) 2.5rem;
		border-top: 1px solid var(--color-line);
		background: var(--color-surface);
		text-align: center;
	}
	.site-footer__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--color-ink);
	}
	.site-footer__meta {
		margin-top: 0.6rem;
		color: var(--color-ink-soft);
		font-size: 0.95rem;
	}
	.site-footer__meta a {
		color: var(--color-ink-soft);
		text-decoration: none;
		border-bottom: 1px solid var(--color-line);
	}
	.site-footer__meta a:hover {
		color: var(--color-rani);
	}
	.site-footer__fine {
		margin-top: 1.25rem;
		color: var(--color-ink-soft);
		font-size: 0.8rem;
		opacity: 0.75;
	}
</style>
