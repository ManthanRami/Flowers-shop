<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	const services = $derived([
		{ name: m.service_wedding_name(), desc: m.service_wedding_desc() },
		{ name: m.service_haldi_name(), desc: m.service_haldi_desc() },
		{ name: m.service_mehndi_name(), desc: m.service_mehndi_desc() },
		{ name: m.service_sangeet_name(), desc: m.service_sangeet_desc() },
		{ name: m.service_reception_name(), desc: m.service_reception_desc() },
		{ name: m.service_corporate_name(), desc: m.service_corporate_desc() }
	]);
</script>

<section class="section" id="services">
	<div class="wrap">
		<p class="eyebrow">{m.services_eyebrow()}</p>
		<h2 class="section-title">{m.services_title()}</h2>
		<p class="lede">{m.services_body()}</p>

		<ul class="grid">
			{#each services as s (s.name)}
				<li class="card">
					<span class="card__mark" aria-hidden="true"></span>
					<h3 class="card__name">{s.name}</h3>
					<p class="card__desc">{s.desc}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
		gap: 1px;
		margin-top: 2.5rem;
		background: var(--color-line);
		border: 1px solid var(--color-line);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}
	.card {
		background: var(--color-base);
		padding: 1.75rem;
		transition: background 0.25s ease;
	}
	.card:hover {
		background: var(--color-surface);
	}
	.card__mark {
		display: block;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: var(--radius-full);
		background: radial-gradient(circle at 30% 30%, var(--color-marigold), var(--color-marigold-deep));
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-marigold) 18%, transparent);
	}
	.card:nth-child(3n + 2) .card__mark {
		background: radial-gradient(circle at 30% 30%, var(--color-rani), #9b1f54);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-rani) 18%, transparent);
	}
	.card:nth-child(3n) .card__mark {
		background: radial-gradient(circle at 30% 30%, var(--color-leaf), #2c4f39);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-leaf) 18%, transparent);
	}
	.card__name {
		margin-top: 1.1rem;
		font-size: 1.3rem;
		font-weight: 500;
	}
	.card__desc {
		margin-top: 0.5rem;
		color: var(--color-ink-soft);
		line-height: 1.55;
	}
</style>
