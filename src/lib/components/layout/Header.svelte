<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import { site } from '$lib/config/site';
	import { navList } from '$lib/config/nav';
	import { Phone, Menu, X } from '@lucide/svelte';

	const localeLabel: Record<string, string> = { en: 'EN', gu: 'ગુ' };
	const current = $derived(getLocale());
	const nav = $derived(navList());

	let menuOpen = $state(false);
	let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 40)} />

<header class="site-header" class:is-solid={scrolled || menuOpen}>
	<div class="bar wrap">
		<a class="wordmark" href={resolve('/')}>
			<span class="brand-mark" aria-hidden="true"></span>
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
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 1.4rem;
		font-weight: 700;
		text-decoration: none;
		white-space: nowrap;
	}
	/* The wreath monogram from the logo, recoloured via CSS mask so it can
	   follow the same white-over-photo / maroon-when-solid switch as the text. */
	.brand-mark {
		width: 34px;
		height: 34px;
		background: var(--color-primary);
		mask: url('/logos/medallion.png') center / contain no-repeat;
	}
	.site-header:not(.is-solid) .brand-mark {
		background: #fff;
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
</style>
