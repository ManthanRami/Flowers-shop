import * as m from '$lib/paraglide/messages';

export type ServiceKey = 'wedding' | 'haldi' | 'mehndi' | 'sangeet' | 'reception' | 'corporate';

export interface Service {
	key: ServiceKey;
	name: string;
	desc: string;
}

/**
 * The Services grid and the Gallery filters both render from this one list, so
 * a new service only has to be added here.
 *
 * It is a function rather than a constant because the names come from Paraglide
 * messages, which must be read inside a `$derived` to follow the active locale.
 */
export function serviceList(): Service[] {
	return [
		{ key: 'wedding', name: m.service_wedding_name(), desc: m.service_wedding_desc() },
		{ key: 'haldi', name: m.service_haldi_name(), desc: m.service_haldi_desc() },
		{ key: 'mehndi', name: m.service_mehndi_name(), desc: m.service_mehndi_desc() },
		{ key: 'sangeet', name: m.service_sangeet_name(), desc: m.service_sangeet_desc() },
		{ key: 'reception', name: m.service_reception_name(), desc: m.service_reception_desc() },
		{ key: 'corporate', name: m.service_corporate_name(), desc: m.service_corporate_desc() }
	];
}
