<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { site } from '$lib/config/site';
	import { reveal } from '$lib/actions/reveal';
	import { Sparkles } from '@lucide/svelte';
	import About from '$lib/components/sections/About.svelte';
	import Services from '$lib/components/sections/Services.svelte';
	import Gallery from '$lib/components/sections/Gallery.svelte';
	import Testimonials from '$lib/components/sections/Testimonials.svelte';
	import WhyChooseUs from '$lib/components/sections/WhyChooseUs.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
</script>

<svelte:head>
	<title>{site.name} — {site.tagline}, {site.city}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<section class="hero" id="top">
	<div class="hero__media" aria-hidden="true"></div>
	<div class="hero__overlay" aria-hidden="true"></div>
	<div class="orb orb--gold" aria-hidden="true"></div>
	<div class="orb orb--pink" aria-hidden="true"></div>

	<div class="hero__inner wrap">
		<p class="hero__badge" use:reveal={0}>
			<Sparkles size={15} aria-hidden="true" />
			{m.hero_badge()}
		</p>

		<h1 class="hero__title" use:reveal={150}>
			<span>{m.hero_brand()}</span>
			<span class="hero__gold">{m.hero_brand_accent()}</span>
		</h1>

		<p class="hero__tagline" use:reveal={300}>{m.hero_tagline()}</p>
		<p class="hero__body" use:reveal={450}>{m.hero_body()}</p>

		<div class="hero__cta" use:reveal={600}>
			<a class="btn btn--gold" href="#gallery">{m.cta_view_work()}</a>
			<a class="btn btn--outline" href="#contact">{m.cta_book()}</a>
		</div>
	</div>

	<a class="scroll-hint" href="#about" aria-label={m.hero_scroll()}>
		<span class="scroll-hint__dot" aria-hidden="true"></span>
	</a>
</section>

<About />
<Services />
<Gallery />
<Testimonials />
<WhyChooseUs />
<Contact />

<style>
	.hero {
		position: relative;
		min-height: 100svh;
		display: flex;
		align-items: center;
		overflow: hidden;
		isolation: isolate;
	}
	.hero__media {
		position: absolute;
		inset: 0;
		z-index: -3;
		background: url('/images/hero-wedding.jpg') center / cover no-repeat;
		background-color: var(--color-plum-deep);
	}
	/* Maroon-to-plum wash at 80% keeps the white text legible over any photo. */
	.hero__overlay {
		position: absolute;
		inset: 0;
		z-index: -2;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--color-primary-deep) 80%, transparent),
			color-mix(in srgb, var(--color-plum-deep) 88%, transparent)
		);
	}

	.orb {
		position: absolute;
		z-index: -1;
		border-radius: var(--radius-full);
		filter: blur(70px);
		opacity: 0.5;
		animation: float 9s ease-in-out infinite;
	}
	.orb--gold {
		width: 20rem;
		height: 20rem;
		top: 12%;
		left: -4rem;
		background: var(--color-gold);
	}
	.orb--pink {
		width: 24rem;
		height: 24rem;
		bottom: 6%;
		right: -6rem;
		background: var(--color-rose);
		animation-delay: -4s;
	}
	@keyframes float {
		50% {
			transform: translateY(-26px);
		}
	}

	.hero__inner {
		text-align: center;
		color: #fff;
		padding-block: 6rem 4rem;
	}
	.hero__badge {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 1rem;
		border-radius: var(--radius-full);
		background: color-mix(in srgb, var(--color-gold) 22%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-gold) 55%, transparent);
		color: var(--color-gold-light);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
	}
	.hero__title {
		margin-top: 1.25rem;
		font-size: clamp(2.9rem, 9vw, 5.5rem);
		line-height: 1.05;
	}
	.hero__title span {
		display: block;
	}
	.hero__gold {
		color: var(--color-gold-light);
	}
	.hero__tagline {
		margin-top: 1rem;
		font-family: var(--font-display);
		font-style: italic;
		font-size: clamp(1.15rem, 3vw, 1.6rem);
		color: color-mix(in srgb, #fff 92%, transparent);
	}
	.hero__body {
		max-width: 44rem;
		margin: 1.25rem auto 0;
		font-size: clamp(1rem, 2.2vw, 1.15rem);
		line-height: 1.7;
		color: color-mix(in srgb, #fff 82%, transparent);
	}

	.hero__cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		justify-content: center;
		margin-top: 2.25rem;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.9rem 1.7rem;
		border-radius: var(--radius-full);
		font-weight: 700;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			color 0.2s ease;
	}
	.btn:hover {
		transform: translateY(-2px);
	}
	/* Gold solid always carries dark text — gold on white is 2.15:1. */
	.btn--gold {
		background: var(--color-gold);
		color: var(--color-plum-deep);
	}
	.btn--gold:hover {
		background: var(--color-gold-light);
	}
	.btn--outline {
		border: 1px solid color-mix(in srgb, #fff 70%, transparent);
		color: #fff;
	}
	.btn--outline:hover {
		background: #fff;
		color: var(--color-primary);
	}

	.scroll-hint {
		position: absolute;
		left: 50%;
		bottom: 1.75rem;
		translate: -50% 0;
		display: grid;
		place-items: start center;
		width: 26px;
		height: 42px;
		padding-top: 8px;
		border: 2px solid color-mix(in srgb, #fff 60%, transparent);
		border-radius: var(--radius-full);
	}
	.scroll-hint__dot {
		width: 4px;
		height: 8px;
		border-radius: var(--radius-full);
		background: #fff;
		animation: bounce 1.6s ease-in-out infinite;
	}
	@keyframes bounce {
		50% {
			transform: translateY(12px);
			opacity: 0.4;
		}
	}
</style>
