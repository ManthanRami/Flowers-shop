<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { site, whatsappLink } from '$lib/config/site';
	import { serviceList } from '$lib/config/services';
	import { reveal } from '$lib/actions/reveal';
	import { Phone, MessageCircle, MapPin, Clock } from '@lucide/svelte';

	let name = $state('');
	let phone = $state('');
	let eventType = $state('');
	let date = $state('');
	let message = $state('');

	const enquiry = $derived(
		`${m.form_name()}: ${name}\n` +
			`${m.form_phone()}: ${phone}\n` +
			`${m.form_event_type()}: ${eventType}\n` +
			`${m.form_date()}: ${date}\n` +
			`${m.form_message()}: ${message}`
	);

	const infoCards = $derived([
		{
			icon: Phone,
			label: m.info_phone(),
			value: site.contact.phoneDisplay,
			href: `tel:${site.contact.phone}`
		},
		{
			icon: MessageCircle,
			label: m.info_whatsapp(),
			value: site.contact.phoneDisplay,
			href: whatsappLink(m.whatsapp_prefill())
		},
		{ icon: MapPin, label: m.info_location(), value: site.address, href: undefined },
		{ icon: Clock, label: m.info_hours(), value: m.info_hours_value(), href: undefined }
	]);

	// No inquiry backend yet, so the two buttons are two real channels rather
	// than one server POST: email opens the mail client, WhatsApp opens the chat.
	// Native `required` on the form does the validating — no schema library needed.
	function send(channel: 'email' | 'whatsapp') {
		return (event: SubmitEvent) => {
			event.preventDefault();
			const url =
				channel === 'whatsapp'
					? whatsappLink(`${m.whatsapp_prefill()}\n\n${enquiry}`)
					: `mailto:${site.contact.email}?subject=${encodeURIComponent(
							`${m.contact_badge()} — ${name}`
						)}&body=${encodeURIComponent(enquiry)}`;
			window.open(url, '_blank');
		};
	}

	let channel = $state<'email' | 'whatsapp'>('email');
</script>

<section class="section contact" id="contact">
	<div class="wrap">
		<header class="head" use:reveal={0}>
			<p class="badge">{m.contact_badge()}</p>
			<h2 class="section-title">{m.contact_title()}</h2>
			<hr class="divider divider--center" />
			<p class="lede">{m.contact_body()}</p>
		</header>

		<div class="layout">
			<ul class="info">
				{#each infoCards as card, i (card.label)}
					<li class="info-card" use:reveal={i * 80}>
						<span class="info-card__icon"><card.icon size={20} aria-hidden="true" /></span>
						<div>
							<p class="info-card__label">{card.label}</p>
							{#if card.href}
								<a class="info-card__value" href={card.href} rel="external">{card.value}</a>
							{:else}
								<p class="info-card__value">{card.value}</p>
							{/if}
						</div>
					</li>
				{/each}
			</ul>

			<form use:reveal={120} onsubmit={send(channel)}>
				<div class="row">
					<label class="field">
						<span class="field__label">{m.form_name()}</span>
						<input bind:value={name} type="text" required autocomplete="name" />
					</label>
					<label class="field">
						<span class="field__label">{m.form_phone()}</span>
						<input bind:value={phone} type="tel" required autocomplete="tel" />
					</label>
				</div>

				<div class="row">
					<label class="field">
						<span class="field__label">{m.form_event_type()}</span>
						<select bind:value={eventType} required>
							<option value="" disabled>{m.form_event_type_placeholder()}</option>
							{#each serviceList() as s (s.key)}
								<option value={s.name}>{s.name}</option>
							{/each}
						</select>
					</label>
					<label class="field">
						<span class="field__label">{m.form_date()}</span>
						<input bind:value={date} type="date" required />
					</label>
				</div>

				<label class="field">
					<span class="field__label">{m.form_message()}</span>
					<textarea bind:value={message} rows="4"></textarea>
				</label>

				<div class="buttons">
					<button class="submit submit--primary" type="submit" onclick={() => (channel = 'email')}>
						{m.form_submit()}
					</button>
					<button
						class="submit submit--whatsapp"
						type="submit"
						onclick={() => (channel = 'whatsapp')}
					>
						<MessageCircle size={18} aria-hidden="true" />
						{m.form_whatsapp()}
					</button>
				</div>
				<p class="note">{m.form_note()}</p>
			</form>
		</div>
	</div>
</section>

<style>
	.head {
		text-align: center;
	}
	.head .section-title,
	.head .lede {
		margin-inline: auto;
	}

	.layout {
		display: grid;
		gap: 2rem;
		margin-top: 3rem;
	}
	@media (min-width: 900px) {
		.layout {
			grid-template-columns: 2fr 3fr;
			gap: 3rem;
			align-items: start;
		}
	}

	.info {
		display: grid;
		gap: 1rem;
	}
	.info-card {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.25rem;
		border-radius: var(--radius-md);
		background: #fff;
		border: 1px solid var(--color-line);
		box-shadow: var(--shadow-soft);
	}
	.info-card__icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
		color: var(--color-primary);
	}
	.info-card__label {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-ink-soft);
	}
	.info-card__value {
		display: block;
		margin-top: 0.2rem;
		color: var(--color-ink);
		text-decoration: none;
		line-height: 1.5;
	}
	a.info-card__value:hover {
		color: var(--color-primary);
	}

	form {
		padding: 1.75rem;
		border-radius: var(--radius-md);
		background: #fff;
		border: 1px solid var(--color-line);
		box-shadow: var(--shadow-soft);
	}
	.row {
		display: grid;
		gap: 1.25rem;
	}
	@media (min-width: 560px) {
		.row {
			grid-template-columns: 1fr 1fr;
		}
	}

	.field {
		display: block;
		margin-bottom: 1.25rem;
	}
	.field__label {
		display: block;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-ink-soft);
		margin-bottom: 0.4rem;
	}
	/* Gold underline rather than a boxed border — "luxury letterhead" per spec. */
	.field :is(input, select, textarea) {
		width: 100%;
		padding: 0.6rem 0;
		background: transparent;
		border: 0;
		border-bottom: 1px solid color-mix(in srgb, var(--color-gold) 55%, transparent);
		color: var(--color-ink);
		font: inherit;
		font-size: 1rem;
		border-radius: 0;
		resize: vertical;
	}
	.field :is(input, select, textarea):focus {
		outline: none;
		border-bottom-color: var(--color-gold-ink);
	}

	.buttons {
		display: grid;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}
	@media (min-width: 560px) {
		.buttons {
			grid-template-columns: 1fr 1fr;
		}
	}
	.submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.9rem 1.25rem;
		border: 0;
		border-radius: var(--radius-full);
		font: inherit;
		font-weight: 700;
		color: #fff;
		cursor: pointer;
		transition:
			filter 0.2s ease,
			transform 0.2s ease;
	}
	.submit:hover {
		transform: translateY(-2px);
		filter: brightness(1.07);
	}
	.submit--primary {
		background: var(--color-primary);
	}
	.submit--whatsapp {
		background: #128c4a;
	}

	.note {
		margin-top: 0.9rem;
		font-size: 0.82rem;
		line-height: 1.5;
		color: var(--color-ink-soft);
	}
</style>
