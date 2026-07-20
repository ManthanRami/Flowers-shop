<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { site, whatsappLink } from '$lib/config/site';

	let name = $state('');
	let phone = $state('');
	let date = $state('');
	let venue = $state('');

	const enquiry = $derived(
		whatsappLink(
			`${m.whatsapp_prefill()}\n\n` +
				`${m.form_name()}: ${name}\n` +
				`${m.form_phone()}: ${phone}\n` +
				`${m.form_date()}: ${date}\n` +
				`${m.form_venue()}: ${venue}`
		)
	);

	// There is no inquiry backend yet, so the form hands off to WhatsApp — which
	// is where this business already talks to customers. Using a submit handler
	// rather than a plain link keeps the browser's own `required` validation.
	function sendToWhatsApp(event: SubmitEvent) {
		event.preventDefault();
		window.open(enquiry, '_blank');
	}
</script>

<section class="section contact" id="contact">
	<div class="wrap layout">
		<div>
			<p class="eyebrow">{m.contact_eyebrow()}</p>
			<h2 class="section-title">{m.contact_title()}</h2>
			<p class="lede">{m.contact_body()}</p>

			<p class="direct">
				<a href="tel:{site.contact.phone}">{site.contact.phoneDisplay}</a>
				<span>{site.address}</span>
			</p>
		</div>

		<form onsubmit={sendToWhatsApp}>
			<label class="field">
				<span class="field__label">{m.form_name()}</span>
				<input bind:value={name} type="text" required autocomplete="name" />
			</label>
			<label class="field">
				<span class="field__label">{m.form_phone()}</span>
				<input bind:value={phone} type="tel" required autocomplete="tel" />
			</label>
			<label class="field">
				<span class="field__label">{m.form_date()}</span>
				<input bind:value={date} type="date" required />
			</label>
			<label class="field">
				<span class="field__label">{m.form_venue()}</span>
				<input bind:value={venue} type="text" required />
			</label>

			<button class="submit" type="submit">{m.form_submit()}</button>
			<p class="note">{m.form_note()}</p>
		</form>
	</div>
</section>

<style>
	.contact {
		background: var(--color-maroon);
		color: var(--color-base);
	}
	.contact .section-title,
	.contact .lede {
		color: var(--color-base);
	}
	.layout {
		display: grid;
		gap: 3rem;
	}
	@media (min-width: 820px) {
		.layout {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
			align-items: start;
		}
	}

	.direct {
		margin-top: 2rem;
		display: grid;
		gap: 0.35rem;
		font-size: 1.05rem;
	}
	.direct a {
		color: var(--color-gold);
		font-weight: 600;
	}
	.direct span {
		color: color-mix(in srgb, var(--color-base) 70%, transparent);
	}

	.field {
		display: block;
		margin-bottom: 1.5rem;
	}
	.field__label {
		display: block;
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-gold);
		margin-bottom: 0.4rem;
	}
	.field input {
		width: 100%;
		padding: 0.65rem 0;
		background: transparent;
		border: 0;
		border-bottom: 1px solid color-mix(in srgb, var(--color-gold) 45%, transparent);
		color: var(--color-base);
		font: inherit;
		font-size: 1.05rem;
		border-radius: 0;
	}
	.field input:focus {
		outline: none;
		border-bottom-color: var(--color-gold);
	}

	.submit {
		width: 100%;
		padding: 0.95rem 1.5rem;
		border: 0;
		border-radius: var(--radius-full);
		background: linear-gradient(90deg, var(--color-gold), #aa8c2c);
		color: var(--color-maroon);
		font: inherit;
		font-weight: 700;
		font-size: 1rem;
		cursor: pointer;
		transition: filter 0.2s ease;
	}
	.submit:hover {
		filter: brightness(1.08);
	}
	.note {
		margin-top: 0.9rem;
		font-size: 0.8rem;
		line-height: 1.5;
		color: color-mix(in srgb, var(--color-base) 60%, transparent);
	}
</style>
