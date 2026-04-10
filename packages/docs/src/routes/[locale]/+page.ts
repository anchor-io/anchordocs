import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';
import { getHomePage, getLocales, getLocaleUi, isKnownLocale } from '$lib/docs/locale';
import { config } from '$lib';

export const prerender = true;

export const entries: EntryGenerator = () =>
	getLocales().map((locale) => ({
		locale
	}));

export const load = ({ params }) => {
	const locale = params.locale;

	if (!isKnownLocale(locale)) {
		error(404, `Unknown locale ${locale}`);
	}

	const page = getHomePage(locale);

	if (!page) {
		error(404, 'Home page not found');
	}

	return {
		locale,
		site: config.site,
		ui: getLocaleUi(locale),
		page
	};
};
