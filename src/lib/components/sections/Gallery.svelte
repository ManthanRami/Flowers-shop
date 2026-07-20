<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { serviceList, type ServiceKey } from '$lib/config/services';

	const filters = $derived([
		{ key: 'all' as const, label: m.gallery_all() },
		...serviceList().map((s) => ({ key: s.key, label: s.name }))
	]);

	// Stand-in images from the Lovable prototype, each filed under the event type
	// it actually depicts. Real photos will come from Cloudinary via the DB.
	const photos: { id: number; src: string; category: ServiceKey; tall: boolean }[] = [
		{ id: 1, src: '/images/gallery-wedding.jpg', category: 'wedding', tall: true },
		{ id: 2, src: '/images/gallery-stage.jpg', category: 'reception', tall: false },
		{ id: 3, src: '/images/gallery-event.jpg', category: 'sangeet', tall: false },
		{ id: 4, src: '/images/gallery-car.jpg', category: 'wedding', tall: false },
		{ id: 5, src: '/images/gallery-room.jpg', category: 'wedding', tall: true }
	];

	let active = $state<'all' | ServiceKey>('all');
	const visible = $derived(active === 'all' ? photos : photos.filter((p) => p.category === active));

	const serviceName = $derived(Object.fromEntries(serviceList().map((s) => [s.key, s.name])));
</script>

<section class="section" id="work">
	<div class="wrap">
		<p class="eyebrow">{m.work_eyebrow()}</p>
		<h2 class="section-title">{m.work_title()}</h2>
		<p class="lede">{m.work_body()}</p>

		<div class="filters" role="tablist" aria-label={m.work_eyebrow()}>
			{#each filters as f (f.key)}
				<button
					class="filter"
					class:is-active={active === f.key}
					role="tab"
					aria-selected={active === f.key}
					onclick={() => (active = f.key)}
				>
					{f.label}
				</button>
			{/each}
		</div>

		<div class="wall">
			{#each visible as photo (photo.id)}
				<figure class="photo" class:photo--tall={photo.tall}>
					<img src={photo.src} alt={serviceName[photo.category]} loading="lazy" />
					<figcaption class="photo__label">{serviceName[photo.category]}</figcaption>
				</figure>
			{/each}
		</div>

		{#if visible.length === 0}
			<p class="wall__empty">{m.work_placeholder()}</p>
		{/if}
	</div>
</section>

<style>
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 2rem;
	}
	.filter {
		padding: 0.7rem 1.15rem;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--color-ink-soft);
		font: inherit;
		font-size: 0.9rem;
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
	}
	.filter:hover {
		border-color: var(--color-primary);
		color: var(--color-ink);
	}
	.filter.is-active {
		background: var(--color-ink);
		border-color: var(--color-ink);
		color: var(--color-base);
	}

	/* Masonry via CSS columns — simple and dependency-free. */
	.wall {
		columns: 3;
		column-gap: 0.85rem;
		margin-top: 2rem;
	}
	@media (max-width: 900px) {
		.wall {
			columns: 2;
		}
	}
	@media (max-width: 560px) {
		.wall {
			columns: 1;
		}
	}

	.photo {
		position: relative;
		break-inside: avoid;
		margin: 0 0 0.85rem;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--color-surface);
	}
	.photo img {
		display: block;
		width: 100%;
		height: 14rem;
		object-fit: cover;
		transition: transform 0.4s ease;
	}
	.photo--tall img {
		height: 20rem;
	}
	.photo:hover img {
		transform: scale(1.05);
	}

	/* Gradient rather than a flat tint: keeps the label legible over any photo
	   without dimming the whole image. */
	.photo__label {
		position: absolute;
		inset: auto 0 0 0;
		padding: 2.5rem 0.9rem 0.75rem;
		background: linear-gradient(to top, rgb(0 0 0 / 0.75), transparent);
		color: #fff;
		font-size: 0.8rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.wall__empty {
		margin-top: 2rem;
		color: var(--color-ink-soft);
	}
</style>
