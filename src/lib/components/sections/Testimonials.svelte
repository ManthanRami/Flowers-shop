<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { reveal } from '$lib/actions/reveal';
	import { Quote, Star } from '@lucide/svelte';

	// PLACEHOLDER: names and quotes come from the design brief, not from real
	// customers. Replace with genuine reviews or remove the section before launch.
	const testimonials = $derived([
		{ quote: m.testimonial1_quote(), name: m.testimonial1_name(), place: m.testimonial1_place() },
		{ quote: m.testimonial2_quote(), name: m.testimonial2_name(), place: m.testimonial2_place() },
		{ quote: m.testimonial3_quote(), name: m.testimonial3_name(), place: m.testimonial3_place() },
		{ quote: m.testimonial4_quote(), name: m.testimonial4_name(), place: m.testimonial4_place() }
	]);
</script>

<section class="section" id="reviews">
	<div class="wrap">
		<header class="head" use:reveal={0}>
			<p class="badge">{m.testimonials_badge()}</p>
			<h2 class="section-title">{m.testimonials_title()}</h2>
			<hr class="divider divider--center" />
		</header>

		<ul class="grid">
			{#each testimonials as t, i (t.name)}
				<li class="card" use:reveal={i * 100}>
					<span class="card__mark" aria-hidden="true"><Quote size={40} /></span>

					<div class="stars" aria-label="5 / 5">
						{#each { length: 5 }, s (s)}
							<Star size={16} fill="currentColor" aria-hidden="true" />
						{/each}
					</div>

					<blockquote class="card__quote">{t.quote}</blockquote>

					<div class="card__author">
						<span class="avatar" aria-hidden="true">{t.name.charAt(0)}</span>
						<span>
							<span class="card__name">{t.name}</span>
							<span class="card__place">{t.place}</span>
						</span>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.head {
		text-align: center;
	}
	.head .section-title {
		margin-inline: auto;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
		gap: 1.25rem;
		margin-top: 3rem;
	}
	.card {
		position: relative;
		padding: 2rem 1.75rem;
		border-radius: var(--radius-md);
		background: #fff;
		border: 1px solid var(--color-line);
		box-shadow: var(--shadow-soft);
		overflow: hidden;
	}
	.card__mark {
		position: absolute;
		top: 1rem;
		right: 1rem;
		color: color-mix(in srgb, var(--color-gold) 35%, transparent);
		transition:
			transform 0.3s ease,
			color 0.3s ease;
	}
	.card:hover .card__mark {
		color: var(--color-gold);
		transform: rotate(-12deg) scale(1.1);
	}

	.stars {
		display: flex;
		gap: 0.15rem;
		color: var(--color-gold);
	}
	.card__quote {
		margin: 1rem 0 0;
		font-style: italic;
		font-size: 1.02rem;
		line-height: 1.65;
		color: var(--color-ink);
	}

	.card__author {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}
	.avatar {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: var(--radius-full);
		background: var(--color-primary);
		color: #fff;
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 700;
	}
	.card__name {
		display: block;
		font-weight: 700;
	}
	.card__place {
		display: block;
		font-size: 0.88rem;
		color: var(--color-ink-soft);
	}
</style>
