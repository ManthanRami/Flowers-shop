import {
	Heart,
	Building2,
	Car,
	House,
	PartyPopper,
	Flower2,
	Sparkles,
	type Icon
} from '@lucide/svelte';
import * as m from '$lib/paraglide/messages';

export type ServiceKey = 'wedding' | 'corporate' | 'car' | 'room' | 'event' | 'custom' | 'haldi';

export interface Service {
	key: ServiceKey;
	name: string;
	desc: string;
	icon: typeof Icon;
}

/**
 * The Services grid, the footer list and the contact form's event-type dropdown
 * all render from this one list, so a new service is added in a single place.
 *
 * It is a function rather than a constant because the names come from Paraglide
 * messages, which must be read inside a `$derived` to follow the active locale.
 */
export function serviceList(): Service[] {
	return [
		{
			key: 'wedding',
			name: m.service_wedding_name(),
			desc: m.service_wedding_desc(),
			icon: Heart
		},
		{
			key: 'corporate',
			name: m.service_corporate_name(),
			desc: m.service_corporate_desc(),
			icon: Building2
		},
		{ key: 'car', name: m.service_car_name(), desc: m.service_car_desc(), icon: Car },
		{ key: 'room', name: m.service_room_name(), desc: m.service_room_desc(), icon: House },
		{
			key: 'event',
			name: m.service_event_name(),
			desc: m.service_event_desc(),
			icon: PartyPopper
		},
		{
			key: 'custom',
			name: m.service_custom_name(),
			desc: m.service_custom_desc(),
			icon: Flower2
		},
		{
			key: 'haldi',
			name: m.service_haldi_name(),
			desc: m.service_haldi_desc(),
			icon: Sparkles
		}
	];
}
