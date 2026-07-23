<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { site } from '$lib/config/site';
	import { reveal } from '$lib/actions/reveal';
	import { Clock, Users, Heart, Award } from '@lucide/svelte';

	// The founding year is confirmed by the business. The three figures below are
	// UNVERIFIED — they came from the design brief and must be confirmed or
	// removed before launch.
	const stats = $derived([
		{ value: String(site.foundedYear), label: m.stat_since_label(), icon: Clock },
		{ value: '5000+', label: m.stat_clients_label(), icon: Users },
		{ value: '10000+', label: m.stat_events_label(), icon: Heart },
		{ value: '100%', label: m.stat_satisfaction_label(), icon: Award }
	]);

	const tags = $derived([
		{ emoji: '✨', label: m.about_tag1() },
		{ emoji: '🌸', label: m.about_tag2() },
		{ emoji: '💝', label: m.about_tag3() }
	]);
</script>

<section class="section about" id="about">
	<div class="wrap layout">
		<div use:reveal={0}>
			<p class="badge">{m.about_badge()}</p>
			<h2 class="section-title">
				{m.about_title()}
				<span class="accent">{m.about_title_accent()}</span>
			</h2>
			<hr class="divider" />
			<p class="lede">{m.about_body1()}</p>
			<p class="lede">{m.about_body2()}</p>

			<ul class="tags">
				{#each tags as tag (tag.label)}
					<li class="tag"><span aria-hidden="true">{tag.emoji}</span> {tag.label}</li>
				{/each}
			</ul>
		</div>

		<ul class="stats">
			{#each stats as stat, i (stat.label)}
				<li class="stat" use:reveal={150 + i * 100}>
					<span class="stat__icon"><stat.icon size={22} aria-hidden="true" /></span>
					<p class="stat__value">{stat.value}</p>
					<p class="stat__label">{stat.label}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.about {
		position: relative;
		overflow: hidden;
	}
	/* Faint floral wash so the section is not a flat block of cream. */
	.about::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			radial-gradient(
				28rem 28rem at 88% 12%,
				color-mix(in srgb, var(--color-rose) 16%, transparent),
				transparent
			),
			radial-gradient(
				22rem 22rem at 4% 88%,
				color-mix(in srgb, var(--color-gold) 12%, transparent),
				transparent
			);
	}

	.layout {
		display: grid;
		gap: 3rem;
		align-items: center;
	}
	@media (min-width: 900px) {
		.layout {
			grid-template-columns: 1.05fr 1fr;
			gap: 4rem;
		}
	}

	.accent {
		color: var(--color-primary);
	}
	.lede + .lede {
		margin-top: 0.9rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-top: 1.75rem;
	}
	.tag {
		padding: 0.5rem 1rem;
		border-radius: var(--radius-full);
		background: var(--color-surface);
		border: 1px solid var(--color-line);
		font-size: 0.9rem;
		font-weight: 600;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}
	.stat {
		padding: 1.75rem 1.25rem;
		border-radius: var(--radius-md);
		background: #fff;
		border: 1px solid var(--color-line);
		box-shadow: var(--shadow-soft);
		text-align: center;
	}
	.stat__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
		color: var(--color-primary);
		transition:
			background 0.25s ease,
			color 0.25s ease,
			transform 0.25s ease;
	}
	.stat:hover .stat__icon {
		background: var(--color-primary);
		color: #fff;
		transform: scale(1.1);
	}
	.stat__value {
		margin-top: 0.9rem;
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		color: var(--color-primary);
	}
	.stat__label {
		margin-top: 0.2rem;
		font-size: 0.85rem;
		color: var(--color-ink-soft);
	}
</style>
