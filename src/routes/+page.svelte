<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { site, whatsappLink } from '$lib/config/site';
	import Toran from '$lib/components/Toran.svelte';
	import Gallery from '$lib/components/sections/Gallery.svelte';
	import Services from '$lib/components/sections/Services.svelte';
	import Process from '$lib/components/sections/Process.svelte';
	import About from '$lib/components/sections/About.svelte';

	const stats = [
		{ value: '15+', label: m.hero_stat_years() },
		{ value: '800+', label: m.hero_stat_events() },
		{ value: site.serviceArea, label: m.hero_stat_area(), wide: true }
	];
</script>

<svelte:head>
	<title>{site.name} — {site.tagline}, {site.city}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<section class="hero">
	<!-- Placeholder backdrop. Swap for a full-bleed hero photo (or muted video). -->
	<div class="hero__media" aria-hidden="true"></div>
	<div class="hero__scrim" aria-hidden="true"></div>

	<div class="hero__inner wrap">
		<Toran class="hero__toran" count={20} />
		<p class="hero__eyebrow">{m.hero_eyebrow({ city: site.city })}</p>
		<h1 class="hero__title">
			<span>{m.hero_title_line1()}</span>
			<span class="hero__accent">{m.hero_title_line2()}</span>
		</h1>
		<p class="hero__body">{m.hero_body()}</p>
		<div class="hero__cta">
			<a class="btn btn--primary" href={whatsappLink(m.whatsapp_prefill())}>
				{m.cta_whatsapp()}
			</a>
			<a class="btn btn--ghost" href="#contact">{m.cta_enquire()}</a>
		</div>
	</div>
</section>

<dl class="hero-stats wrap">
	{#each stats as s (s.label)}
		<div class="stat" class:stat--wide={s.wide}>
			<dt class="stat__value">{s.value}</dt>
			<dd class="stat__label">{s.label}</dd>
		</div>
	{/each}
</dl>

<Gallery />
<Services />
<Process />
<About />

<style>
	.hero {
		position: relative;
		min-height: min(88svh, 46rem);
		display: flex;
		align-items: center;
		overflow: hidden;
		isolation: isolate;
	}

	/* Warm floral placeholder — stands in for a real hero photo. */
	.hero__media {
		position: absolute;
		inset: 0;
		z-index: -2;
		background:
			radial-gradient(60% 55% at 30% 25%, color-mix(in srgb, var(--color-marigold) 65%, #000), transparent),
			radial-gradient(55% 55% at 78% 30%, color-mix(in srgb, var(--color-rani) 60%, #000), transparent),
			radial-gradient(70% 60% at 60% 100%, color-mix(in srgb, var(--color-leaf) 55%, #000), transparent),
			var(--color-ink);
	}
	.hero__scrim {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(
			180deg,
			rgb(0 0 0 / 0.45) 0%,
			rgb(0 0 0 / 0.15) 40%,
			rgb(0 0 0 / 0.55) 100%
		);
	}

	.hero__inner {
		text-align: center;
		padding-block: 2.5rem;
		color: #fff;
	}
	:global(.hero__toran) {
		margin-bottom: 1.5rem;
	}

	.hero__eyebrow {
		font-size: 0.85rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--color-gold);
	}
	.hero__title {
		margin-top: 0.75rem;
		font-size: clamp(2.75rem, 9vw, 6rem);
		font-weight: 400;
	}
	.hero__title span {
		display: block;
	}
	.hero__accent {
		font-style: italic;
		color: color-mix(in srgb, var(--color-rani) 60%, #fff);
	}
	.hero__body {
		max-width: 42rem;
		margin: 1.5rem auto 0;
		font-size: clamp(1.05rem, 2.2vw, 1.2rem);
		line-height: 1.6;
		color: color-mix(in srgb, #fff 85%, transparent);
	}

	.hero__cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		justify-content: center;
		margin-top: 2rem;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.85rem 1.6rem;
		border-radius: var(--radius-full);
		font-weight: 600;
		font-size: 1rem;
		text-decoration: none;
		transition:
			transform 0.18s ease,
			background 0.18s ease;
	}
	.btn:hover {
		transform: translateY(-2px);
	}
	.btn--primary {
		background: var(--color-marigold);
		color: #fff;
	}
	.btn--primary:hover {
		background: var(--color-marigold-deep);
	}
	.btn--ghost {
		background: rgb(255 255 255 / 0.12);
		color: #fff;
		border: 1px solid rgb(255 255 255 / 0.6);
	}
	.btn--ghost:hover {
		background: #fff;
		color: var(--color-ink);
	}

	.hero-stats {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: clamp(1.5rem, 6vw, 4rem);
		padding-block: 2.5rem;
		text-align: center;
		border-bottom: 1px solid var(--color-line);
	}
	.stat__value {
		font-family: var(--font-display);
		font-size: clamp(1.6rem, 4vw, 2.25rem);
		font-weight: 500;
		color: var(--color-ink);
	}
	.stat--wide .stat__value {
		font-size: clamp(1.15rem, 3vw, 1.4rem);
	}
	.stat__label {
		margin-top: 0.35rem;
		font-size: 0.85rem;
		letter-spacing: 0.03em;
		color: var(--color-ink-soft);
	}
</style>
