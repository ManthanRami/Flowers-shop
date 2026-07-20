<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	const testimonials = $derived([
		{ quote: m.testimonial1_quote(), name: m.testimonial1_name(), place: m.testimonial1_place() },
		{ quote: m.testimonial2_quote(), name: m.testimonial2_name(), place: m.testimonial2_place() },
		{ quote: m.testimonial3_quote(), name: m.testimonial3_name(), place: m.testimonial3_place() }
	]);
</script>

<section class="section testimonials">
	<div class="wrap">
		<p class="eyebrow">{m.testimonials_eyebrow()}</p>
		<h2 class="section-title">{m.testimonials_title()}</h2>

		<ul class="grid">
			{#each testimonials as t (t.name)}
				<li class="card">
					<span class="card__quote" aria-hidden="true">&ldquo;</span>
					<blockquote class="card__text">{t.quote}</blockquote>
					<p class="card__author">
						{t.name}<span class="card__place"> · {t.place}</span>
					</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.testimonials {
		background: var(--color-surface);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
		gap: 1.25rem;
		margin-top: 2.5rem;
	}
	.card {
		background: var(--color-base);
		border: 1px solid color-mix(in srgb, var(--color-gold) 35%, transparent);
		border-radius: var(--radius-lg);
		padding: 1.75rem;
	}
	.card__quote {
		display: block;
		font-family: var(--font-display);
		font-size: 3.5rem;
		line-height: 0.6;
		color: var(--color-gold);
	}
	.card__text {
		margin: 1.25rem 0 0;
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--color-ink);
	}
	.card__author {
		margin-top: 1.25rem;
		font-weight: 600;
		font-size: 0.95rem;
	}
	.card__place {
		font-weight: 400;
		color: var(--color-ink-soft);
	}
</style>
