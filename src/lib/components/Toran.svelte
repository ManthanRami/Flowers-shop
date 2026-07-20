<script lang="ts">
	/**
	 * Signature element: a hanging marigold-garland "toran".
	 * A row of stylised genda (marigold) flowers strung on a thread — the same
	 * motif that hangs over doorways at Gujarati celebrations. Purely decorative.
	 */
	let { count = 24, class: klass = '' }: { count?: number; class?: string } = $props();

	// One marigold = concentric petal rings. Precompute petal positions per ring.
	const ring = (n: number, r: number) =>
		Array.from({ length: n }, (_, i) => {
			const a = (i / n) * Math.PI * 2;
			return { x: 20 + Math.cos(a) * r, y: 22 + Math.sin(a) * r };
		});
	const outer = ring(12, 12.5);
	const inner = ring(9, 7.5);

	const flowers = $derived(Array.from({ length: count }, (_, i) => i));
	// Alternate hang length slightly for a hand-strung feel.
	const drop = (i: number) => (i % 2 === 0 ? 0 : 5);
</script>

<div class={'toran ' + klass} role="presentation" aria-hidden="true">
	{#each flowers as i (i)}
		<svg class="toran__unit" viewBox="0 0 40 {44 + drop(i)}" preserveAspectRatio="xMidYMin meet">
			<!-- thread -->
			<line x1="20" y1="0" x2="20" y2={6 + drop(i)} stroke="var(--color-leaf)" stroke-width="1.4" />
			<!-- leaves -->
			<path d="M20 {8 + drop(i)} q -7 -1 -9 5 q 6 2 9 -5" fill="var(--color-leaf)" opacity="0.9" />
			<path d="M20 {8 + drop(i)} q 7 -1 9 5 q -6 2 -9 -5" fill="var(--color-leaf)" opacity="0.9" />
			<g transform="translate(0 {drop(i)})">
				<!-- petals -->
				{#each outer as p (p.x + '-' + p.y)}
					<circle cx={p.x} cy={p.y} r="4.4" fill="var(--color-marigold-deep)" />
				{/each}
				{#each inner as p (p.x + '-' + p.y)}
					<circle cx={p.x} cy={p.y} r="4" fill="var(--color-marigold)" />
				{/each}
				<circle cx="20" cy="22" r="6.5" fill="var(--color-gold)" />
				<circle cx="20" cy="22" r="2.6" fill="var(--color-marigold-deep)" />
			</g>
		</svg>
	{/each}
</div>

<style>
	.toran {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 0.15rem;
		overflow: hidden;
		width: 100%;
		line-height: 0;
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
		mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
	}
	.toran__unit {
		width: clamp(24px, 4.5vw, 40px);
		flex: 0 0 auto;
	}
</style>
