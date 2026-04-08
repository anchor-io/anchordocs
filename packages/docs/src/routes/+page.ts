import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import { preferences } from '$lib/preferences';

export const prerender = true;

export function load() {
	throw redirect(307, resolve('/[locale]', { locale: preferences.current.locale }));
}
