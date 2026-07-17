/**
 * White-label site configuration.
 *
 * This is the single source of truth for per-business branding and contact
 * details. To rebrand the platform for another decoration business, this file
 * (and the theme tokens in `src/lib/styles/theme.css`) is all that changes —
 * nothing here should be hardcoded elsewhere in the app.
 *
 * Values below are PLACEHOLDERS for the first instance (a family business in
 * Mehsana, Gujarat). Swap them for the real brand when available.
 */

export interface SiteConfig {
	/** Brand name shown in the header, footer, and page titles. */
	name: string;
	/** Short tagline / positioning line. */
	tagline: string;
	/** One-sentence description used for meta tags and hero copy. */
	description: string;
	/** Primary city / base of operations. */
	city: string;
	/** Human-readable coverage area (drives copy + local SEO). */
	serviceArea: string;
	contact: {
		/** E.164 phone for tel: links (no spaces), e.g. "+919999999999". */
		phone: string;
		/** Same number, formatted for display. */
		phoneDisplay: string;
		/** WhatsApp number in international format without "+", for wa.me links. */
		whatsapp: string;
		email: string;
	};
	social: {
		instagram?: string;
		facebook?: string;
		youtube?: string;
	};
}

export const site: SiteConfig = {
	name: 'Genda Decor', // placeholder brand
	tagline: 'Flower & event decoration',
	description:
		'Wedding, mandap, haldi, sangeet and event flower decoration across Gujarat — from intimate ceremonies to grand celebrations.',
	city: 'Mehsana, Gujarat',
	serviceArea: 'All of Gujarat & destination events',
	contact: {
		phone: '+910000000000',
		phoneDisplay: '+91 00000 00000',
		whatsapp: '910000000000',
		email: 'hello@example.com'
	},
	social: {
		instagram: 'https://instagram.com/',
		facebook: 'https://facebook.com/',
		youtube: 'https://youtube.com/'
	}
};

/** Prebuilt wa.me link with an optional prefilled message. */
export function whatsappLink(message = "Hi! I'd like to enquire about event decoration."): string {
	return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
