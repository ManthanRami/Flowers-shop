<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { site, whatsappLink } from '$lib/config/site';
	import { navList } from '$lib/config/nav';
	import { serviceList } from '$lib/config/services';
	import { MessageCircle } from '@lucide/svelte';

	const nav = $derived(navList());
</script>

<footer class="site-footer">
	<div class="wrap footer-grid">
		<div>
			<p class="footer-brand">
				<span class="wordmark__name">{m.hero_brand()}</span>
				<span class="wordmark__accent">{m.hero_brand_accent()}</span>
			</p>
			<p class="footer-tagline">{m.footer_tagline()}</p>
			<div class="socials">
				{#if site.social.instagram}
					<a
						class="social"
						href={site.social.instagram}
						target="_blank"
						rel="noopener external"
						aria-label="Instagram"
					>
						<!-- Inlined: Lucide 1.x dropped brand icons, and no generic icon reads
						     as "Instagram" to a visitor. -->
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							aria-hidden="true"
						>
							<rect x="2" y="2" width="20" height="20" rx="5" />
							<circle cx="12" cy="12" r="4" />
							<circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
						</svg>
					</a>
				{/if}
				<a
					class="social"
					href={whatsappLink(m.whatsapp_prefill())}
					target="_blank"
					rel="noopener external"
					aria-label="WhatsApp"
				>
					<MessageCircle size={18} />
				</a>
			</div>
		</div>

		<div>
			<h2 class="footer-heading">{m.footer_links()}</h2>
			<ul class="footer-list">
				{#each nav as item (item.href)}
					<li><a href={item.href}>{item.label}</a></li>
				{/each}
			</ul>
		</div>

		<div>
			<h2 class="footer-heading">{m.footer_services()}</h2>
			<ul class="footer-list">
				{#each serviceList() as s (s.key)}
					<li><a href="#services">{s.name}</a></li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="wrap footer-fine">
		<p>© {site.name}. {m.footer_rights()}</p>
		<p>{m.footer_made()}</p>
	</div>
</footer>

<style>
	.site-footer {
		background: var(--color-plum-deep);
		color: color-mix(in srgb, #fff 82%, transparent);
		padding-top: 3.5rem;
	}
	.footer-grid {
		display: grid;
		gap: 2.5rem;
	}
	@media (min-width: 760px) {
		.footer-grid {
			grid-template-columns: 1.4fr 1fr 1fr;
		}
	}
	.footer-brand {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 700;
	}
	.footer-brand .wordmark__name {
		color: #fff;
	}
	.footer-brand .wordmark__accent {
		color: var(--color-gold-light);
	}
	.footer-tagline {
		margin-top: 0.6rem;
		max-width: 30ch;
		line-height: 1.6;
	}
	.socials {
		display: flex;
		gap: 0.6rem;
		margin-top: 1.25rem;
	}
	.social {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: var(--radius-full);
		border: 1px solid color-mix(in srgb, #fff 30%, transparent);
		color: #fff;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}
	.social:hover {
		background: var(--color-gold);
		border-color: var(--color-gold);
		color: var(--color-plum-deep);
	}

	.footer-heading {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-gold-light);
		margin-bottom: 0.9rem;
	}
	.footer-list {
		display: grid;
		gap: 0.5rem;
		font-size: 0.95rem;
	}
	.footer-list a {
		color: inherit;
		text-decoration: none;
	}
	.footer-list a:hover {
		color: #fff;
	}

	.footer-fine {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem;
		margin-top: 3rem;
		padding-block: 1.5rem;
		border-top: 1px solid color-mix(in srgb, #fff 15%, transparent);
		font-size: 0.85rem;
	}
</style>
