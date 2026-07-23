/**
 * White-label site configuration.
 *
 * This is the single source of truth for per-business branding and contact
 * details. To rebrand the platform for another decoration business, this file
 * (and the theme tokens in `src/lib/styles/theme.css`) is all that changes —
 * nothing here should be hardcoded elsewhere in the app.
 *
 * Values below are for the first instance: a family business in Mehsana, Gujarat.
 */

export interface SiteConfig {
	/** Brand name shown in the header, footer, and page titles. */
	name: string;
	/** Short tagline / positioning line. */
	tagline: string;
	/** One-sentence description used for meta tags and hero copy. */
	description: string;
	/** Year the business was founded. Drives the "since" copy and the About stat. */
	foundedYear: number;
	/** Primary city / base of operations. */
	city: string;
	/** Full postal address, shown in the footer and used for local SEO. */
	address: string;
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
	name: 'Jay Mahakali Flowers',
	tagline: 'Premier event decorators since 1949',
	description:
		'Mehsana’s premier event decorators since 1949. Weddings, haldi, car decoration, home functions, temple events and office galas — premium floral and traditional décor across Gujarat.',
	foundedYear: 1949,
	city: 'Mehsana, Gujarat',
	address: 'Mahakali Chowk, Station Rd, nr. Azad Chowk, Shakti Nagar, Mehsana, Gujarat 384001',
	serviceArea: 'All of Gujarat & destination events',
	contact: {
		phone: '+917016250272',
		phoneDisplay: '+91 70162 50272',
		whatsapp: '917016250272',
		email: 'jmahakaliflowers@gmail.com'
	},
	social: {
		instagram: 'https://instagram.com/jay_mahakali_flowers'
	}
};

/** Prebuilt wa.me link with an optional prefilled message. */
export function whatsappLink(message = "Hi! I'd like to enquire about event decoration."): string {
	return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
