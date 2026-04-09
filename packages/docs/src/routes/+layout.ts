import { resolve } from '$app/paths';
import { isKnownLocale } from '$lib/docs/locale.js';
import { preferences } from '$lib/preferences.svelte.js';
import { redirect } from '@sveltejs/kit';

export const prerender = true;

export const load = async ({ params }) => {
	// If the user is trying to access an invalid locale, redirect them to the same URL but with their preferred locale instead.
	if (!params.locale || !isKnownLocale(params.locale)) {
		throw redirect(307, resolve('/[locale]', { locale: preferences.current.locale }));
	}
};
