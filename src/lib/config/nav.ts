import * as m from '$lib/paraglide/messages';

export interface NavItem {
	href: string;
	label: string;
}

/**
 * The section links, rendered by the header nav, the mobile menu and the
 * footer's Quick Links list.
 *
 * It is a function rather than a constant because the labels come from
 * Paraglide messages, which must be read inside a `$derived` to follow the
 * active locale (same pattern as `serviceList` in services.ts).
 */
export function navList(): NavItem[] {
	return [
		{ href: '#top', label: m.nav_home() },
		{ href: '#about', label: m.nav_about() },
		{ href: '#services', label: m.nav_services() },
		{ href: '#gallery', label: m.nav_gallery() },
		{ href: '#reviews', label: m.nav_reviews() },
		{ href: '#contact', label: m.nav_contact() }
	];
}
