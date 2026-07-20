<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	const steps = $derived([
		{ name: m.process_step1_name(), desc: m.process_step1_desc() },
		{ name: m.process_step2_name(), desc: m.process_step2_desc() },
		{ name: m.process_step3_name(), desc: m.process_step3_desc() },
		{ name: m.process_step4_name(), desc: m.process_step4_desc() }
	]);
</script>

<section class="section process">
	<div class="wrap">
		<p class="eyebrow">{m.process_eyebrow()}</p>
		<h2 class="section-title">{m.process_title()}</h2>

		<ol class="steps">
			{#each steps as step, i (step.name)}
				<li class="step">
					<span class="step__num">{String(i + 1).padStart(2, '0')}</span>
					<h3 class="step__name">{step.name}</h3>
					<p class="step__desc">{step.desc}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.process {
		background: var(--color-surface);
	}
	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
		gap: 2rem;
		margin-top: 2.75rem;
		counter-reset: none;
	}
	.step {
		position: relative;
		padding-top: 1.25rem;
		border-top: 2px solid var(--color-primary);
	}
	.step__num {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-primary-deep);
		letter-spacing: 0.05em;
	}
	.step__name {
		margin-top: 0.4rem;
		font-size: 1.25rem;
		font-weight: 500;
	}
	.step__desc {
		margin-top: 0.5rem;
		color: var(--color-ink-soft);
		line-height: 1.55;
	}
</style>
