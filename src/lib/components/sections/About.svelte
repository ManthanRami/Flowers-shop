<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	const values = $derived([m.about_value1(), m.about_value2(), m.about_value3()]);
</script>

<section class="section" id="about">
	<div class="wrap about">
		<div class="about__intro">
			<p class="eyebrow">{m.about_eyebrow()}</p>
			<h2 class="section-title">{m.about_title()}</h2>
		</div>

		<div class="about__body">
			<p>{m.about_body1()}</p>
			<p>{m.about_body2()}</p>

			<ul class="values">
				{#each values as value (value)}
					<li class="value">
						<span class="value__petal" aria-hidden="true"></span>
						{value}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.about {
		display: grid;
		gap: 2.5rem;
	}
	@media (min-width: 820px) {
		.about {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
			align-items: start;
		}
	}
	.about__body p {
		font-size: 1.1rem;
		line-height: 1.65;
		color: var(--color-ink-soft);
	}
	.about__body p + p {
		margin-top: 1rem;
	}
	.values {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.75rem;
	}
	.value {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-full);
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-ink);
	}
	.value__petal {
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0 var(--radius-full) 0 var(--radius-full);
		background: var(--color-primary);
	}
</style>
