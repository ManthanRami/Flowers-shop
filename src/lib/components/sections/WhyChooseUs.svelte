<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { reveal } from '$lib/actions/reveal';
	import { Users, Flower2, IndianRupee, Clock, Palette, ShieldCheck } from '@lucide/svelte';

	const features = $derived([
		{ name: m.why_1_name(), desc: m.why_1_desc(), icon: Users },
		{ name: m.why_2_name(), desc: m.why_2_desc(), icon: Flower2 },
		{ name: m.why_3_name(), desc: m.why_3_desc(), icon: IndianRupee },
		{ name: m.why_4_name(), desc: m.why_4_desc(), icon: Clock },
		{ name: m.why_5_name(), desc: m.why_5_desc(), icon: Palette },
		{ name: m.why_6_name(), desc: m.why_6_desc(), icon: ShieldCheck }
	]);
</script>

<section class="section why">
	<div class="ring--a ring" aria-hidden="true"></div>
	<div class="ring--b ring" aria-hidden="true"></div>

	<div class="wrap">
		<header class="head" use:reveal={0}>
			<p class="badge badge--dark">{m.why_badge()}</p>
			<h2 class="section-title">{m.why_title()}</h2>
			<hr class="divider divider--center" />
		</header>

		<ul class="grid">
			{#each features as f, i (f.name)}
				<li class="item" use:reveal={i * 80}>
					<span class="item__icon"><f.icon size={24} aria-hidden="true" /></span>
					<h3 class="item__name">{f.name}</h3>
					<p class="item__desc">{f.desc}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.why {
		position: relative;
		background: var(--color-plum-deep);
		color: color-mix(in srgb, #fff 85%, transparent);
		overflow: hidden;
	}
	.why .section-title {
		color: #fff;
		margin-inline: auto;
	}
	.head {
		text-align: center;
	}
	.badge--dark {
		background: color-mix(in srgb, var(--color-gold) 20%, transparent);
		color: var(--color-gold-light);
	}

	/* Decorative gold outline circles. */
	.ring {
		position: absolute;
		border: 1px solid color-mix(in srgb, var(--color-gold) 25%, transparent);
		border-radius: var(--radius-full);
		pointer-events: none;
	}
	.ring--a {
		width: 26rem;
		height: 26rem;
		top: -8rem;
		right: -8rem;
	}
	.ring--b {
		width: 18rem;
		height: 18rem;
		bottom: -6rem;
		left: -5rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
		gap: 2rem 1.5rem;
		margin-top: 3rem;
	}
	.item__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, #fff 10%, transparent);
		color: var(--color-gold-light);
		transition:
			background 0.25s ease,
			color 0.25s ease;
	}
	.item:hover .item__icon {
		background: var(--color-gold);
		color: var(--color-plum-deep);
	}
	.item__name {
		margin-top: 1rem;
		font-size: 1.2rem;
		color: var(--color-gold-light);
	}
	.item__desc {
		margin-top: 0.45rem;
		line-height: 1.6;
	}
</style>
