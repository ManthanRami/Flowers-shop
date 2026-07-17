<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	type Category =
		| 'wedding'
		| 'haldi'
		| 'mehndi'
		| 'sangeet'
		| 'reception'
		| 'corporate';

	const filters = $derived([
		{ key: 'all' as const, label: m.gallery_all() },
		{ key: 'wedding' as const, label: m.service_wedding_name() },
		{ key: 'haldi' as const, label: m.service_haldi_name() },
		{ key: 'mehndi' as const, label: m.service_mehndi_name() },
		{ key: 'sangeet' as const, label: m.service_sangeet_name() },
		{ key: 'reception' as const, label: m.service_reception_name() },
		{ key: 'corporate' as const, label: m.service_corporate_name() }
	]);

	// Placeholder tiles. Each becomes a real Cloudinary photo from the DB later;
	// `tall` just varies the masonry rhythm so the wall reads like a photo grid.
	const photos: { id: number; category: Category; tall: boolean }[] = [
		{ id: 1, category: 'wedding', tall: true },
		{ id: 2, category: 'haldi', tall: false },
		{ id: 3, category: 'sangeet', tall: false },
		{ id: 4, category: 'mehndi', tall: true },
		{ id: 5, category: 'reception', tall: false },
		{ id: 6, category: 'wedding', tall: false },
		{ id: 7, category: 'corporate', tall: true },
		{ id: 8, category: 'haldi', tall: false },
		{ id: 9, category: 'sangeet', tall: true },
		{ id: 10, category: 'reception', tall: false },
		{ id: 11, category: 'mehndi', tall: false },
		{ id: 12, category: 'wedding', tall: true }
	];

	let active = $state<'all' | Category>('all');
	const visible = $derived(
		active === 'all' ? photos : photos.filter((p) => p.category === active)
	);
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
				<figure class="photo photo--{photo.category}" class:photo--tall={photo.tall}>
					<figcaption class="photo__label">{m.work_placeholder()}</figcaption>
				</figure>
			{/each}
		</div>
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
		padding: 0.45rem 1rem;
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
		border-color: var(--color-marigold);
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
		break-inside: avoid;
		margin: 0 0 0.85rem;
		height: 14rem;
		border-radius: var(--radius-md);
		display: grid;
		place-items: end start;
		padding: 0.75rem;
		overflow: hidden;
	}
	.photo--tall {
		height: 20rem;
	}
	.photo__label {
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: color-mix(in srgb, #fff 85%, transparent);
		background: rgb(0 0 0 / 0.2);
		padding: 0.3rem 0.6rem;
		border-radius: var(--radius-full);
	}

	/* Placeholder colour per event type — replaced by real photos later. */
	.photo--wedding {
		background: linear-gradient(150deg, var(--color-marigold), var(--color-marigold-deep));
	}
	.photo--haldi {
		background: linear-gradient(150deg, var(--color-gold), var(--color-marigold-deep));
	}
	.photo--mehndi {
		background: linear-gradient(150deg, var(--color-rani), #8a1a4c);
	}
	.photo--sangeet {
		background: linear-gradient(150deg, var(--color-rani), var(--color-marigold));
	}
	.photo--reception {
		background: linear-gradient(150deg, var(--color-ink), var(--color-gold));
	}
	.photo--corporate {
		background: linear-gradient(150deg, var(--color-leaf), #2c4f39);
	}
</style>
