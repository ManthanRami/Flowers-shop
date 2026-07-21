<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { serviceList } from '$lib/config/services';
	import { reveal } from '$lib/actions/reveal';

	const services = $derived(serviceList());
</script>

<section class="section services" id="services">
	<div class="wrap">
		<header class="head" use:reveal={0}>
			<p class="badge">{m.services_badge()}</p>
			<h2 class="section-title">{m.services_title()}</h2>
			<hr class="divider divider--center" />
			<p class="lede">{m.services_body()}</p>
		</header>

		<ul class="grid">
			{#each services as s, i (s.key)}
				<li class="card" use:reveal={i * 80}>
					<span class="card__icon"><s.icon size={26} aria-hidden="true" /></span>
					<h3 class="card__name">{s.name}</h3>
					<p class="card__desc">{s.desc}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.services {
		background: var(--color-surface);
	}
	.head {
		text-align: center;
	}
	.head .section-title,
	.head .lede {
		margin-inline: auto;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
		gap: 1.25rem;
		margin-top: 3rem;
	}
	.card {
		padding: 1.9rem 1.6rem;
		border-radius: var(--radius-md);
		background: #fff;
		border: 1px solid var(--color-line);
		box-shadow: var(--shadow-soft);
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
	}
	.card:hover {
		transform: translateY(-8px);
		box-shadow: var(--shadow-lift);
	}
	.card__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 4rem;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
		color: var(--color-primary);
		transition: transform 0.25s ease;
	}
	.card:hover .card__icon {
		transform: scale(1.1);
	}
	.card__name {
		margin-top: 1.2rem;
		font-size: 1.3rem;
	}
	.card__desc {
		margin-top: 0.5rem;
		color: var(--color-ink-soft);
		line-height: 1.6;
	}
</style>
