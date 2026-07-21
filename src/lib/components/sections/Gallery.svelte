<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { reveal } from '$lib/actions/reveal';
	import { ZoomIn, X } from '@lucide/svelte';

	type Category = 'wedding' | 'stage' | 'car' | 'room' | 'event';

	const filters = $derived([
		{ key: 'all' as const, label: m.gallery_all() },
		{ key: 'wedding' as const, label: m.gallery_cat_wedding() },
		{ key: 'stage' as const, label: m.gallery_cat_stage() },
		{ key: 'car' as const, label: m.gallery_cat_car() },
		{ key: 'room' as const, label: m.gallery_cat_room() },
		{ key: 'event' as const, label: m.gallery_cat_event() }
	]);

	// Stand-in images from the Lovable prototype, filed under what they depict.
	// Real photos will come from Cloudinary via the DB.
	const photos: { id: number; src: string; category: Category }[] = [
		{ id: 1, src: '/images/gallery-wedding.jpg', category: 'wedding' },
		{ id: 2, src: '/images/gallery-stage.jpg', category: 'stage' },
		{ id: 3, src: '/images/gallery-car.jpg', category: 'car' },
		{ id: 4, src: '/images/gallery-room.jpg', category: 'room' },
		{ id: 5, src: '/images/gallery-event.jpg', category: 'event' }
	];

	let active = $state<'all' | Category>('all');
	let lightbox = $state<(typeof photos)[number] | null>(null);

	const visible = $derived(active === 'all' ? photos : photos.filter((p) => p.category === active));
	const categoryLabel = $derived(
		Object.fromEntries(filters.map((f) => [f.key, f.label])) as Record<string, string>
	);
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') lightbox = null;
	}}
/>

<section class="section" id="gallery">
	<div class="wrap">
		<header class="head" use:reveal={0}>
			<p class="badge">{m.gallery_badge()}</p>
			<h2 class="section-title">{m.gallery_title()}</h2>
			<hr class="divider divider--center" />
			<p class="lede">{m.gallery_body()}</p>
		</header>

		<div class="filters" role="tablist" aria-label={m.gallery_badge()}>
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

		{#if visible.length === 0}
			<p class="empty">{m.gallery_empty()}</p>
		{:else}
			<ul class="grid">
				{#each visible as photo, i (photo.id)}
					<li use:reveal={i * 70}>
						<button class="tile" onclick={() => (lightbox = photo)}>
							<img src={photo.src} alt={categoryLabel[photo.category]} loading="lazy" />
							<span class="tile__zoom" aria-hidden="true"><ZoomIn size={18} /></span>
							<span class="tile__caption">
								<span class="tile__cat">{categoryLabel[photo.category]}</span>
								<span class="sr-only">— {m.gallery_zoom()}</span>
							</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

{#if lightbox}
	<!-- Backdrop closes on click; the dialog stops propagation so image clicks do not. -->
	<div
		class="lightbox"
		role="dialog"
		aria-modal="true"
		aria-label={categoryLabel[lightbox.category]}
		tabindex="-1"
		onclick={() => (lightbox = null)}
		onkeydown={() => {}}
	>
		<button class="lightbox__close" aria-label={m.gallery_close()}>
			<X size={24} />
		</button>
		<img src={lightbox.src} alt={categoryLabel[lightbox.category]} />
	</div>
{/if}

<style>
	.head {
		text-align: center;
	}
	.head .section-title,
	.head .lede {
		margin-inline: auto;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		margin-top: 2.25rem;
	}
	.filter {
		padding: 0.65rem 1.25rem;
		border: 1px solid var(--color-line);
		border-radius: var(--radius-full);
		background: #fff;
		color: var(--color-ink-soft);
		font: inherit;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
	}
	.filter:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.filter.is-active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: #fff;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr));
		gap: 1.1rem;
		margin-top: 2.5rem;
	}
	.tile {
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--color-surface);
		cursor: pointer;
	}
	.tile img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		transition: transform 0.45s ease;
	}
	.tile:hover img {
		transform: scale(1.06);
	}

	.tile__zoom {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: var(--radius-full);
		background: var(--color-gold);
		color: var(--color-plum-deep);
		opacity: 0;
		transform: scale(0.8);
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}
	.tile:hover .tile__zoom,
	.tile:focus-visible .tile__zoom {
		opacity: 1;
		transform: none;
	}

	.tile__caption {
		position: absolute;
		inset: auto 0 0 0;
		padding: 2.75rem 1rem 0.9rem;
		background: linear-gradient(to top, rgb(0 0 0 / 0.8), transparent);
		color: #fff;
		text-align: left;
	}
	.tile__cat {
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.empty {
		margin-top: 2.5rem;
		text-align: center;
		color: var(--color-ink-soft);
	}

	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-items: center;
		padding: clamp(1rem, 5vw, 3rem);
		background: rgb(0 0 0 / 0.8);
		backdrop-filter: blur(8px);
		animation: fade 0.2s ease-out;
	}
	.lightbox img {
		max-width: min(100%, 60rem);
		max-height: 85vh;
		border-radius: var(--radius-md);
		object-fit: contain;
	}
	.lightbox__close {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border: 0;
		border-radius: var(--radius-full);
		background: rgb(255 255 255 / 0.15);
		color: #fff;
		cursor: pointer;
	}
	.lightbox__close:hover {
		background: rgb(255 255 255 / 0.3);
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
	}
</style>
