<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { whatsappLink } from '$lib/config/site';
	import { MessageCircle } from '@lucide/svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<Header />

{@render children()}

<Footer />

<!-- Floating WhatsApp button, visible on every section. -->
<a
	class="whatsapp-float"
	href={whatsappLink(m.whatsapp_prefill())}
	target="_blank"
	rel="noopener external"
	aria-label={m.whatsapp_float()}
>
	<MessageCircle size={26} aria-hidden="true" />
</a>

<style>
	.whatsapp-float {
		position: fixed;
		right: clamp(1rem, 3vw, 2rem);
		bottom: clamp(1rem, 3vw, 2rem);
		z-index: 60;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: var(--radius-full);
		background: #25d366;
		color: #fff;
		box-shadow: 0 8px 24px -6px rgb(37 211 102 / 0.7);
	}
	/* Ping ring, drawn behind the button. */
	.whatsapp-float::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: #25d366;
		opacity: 0.65;
		animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
		z-index: -1;
	}
	@keyframes ping {
		75%,
		100% {
			transform: scale(1.8);
			opacity: 0;
		}
	}
</style>
