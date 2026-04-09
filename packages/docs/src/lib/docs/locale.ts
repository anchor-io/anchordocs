import { config } from '$lib';

const knownLocales = new Set(Object.keys(config.i18n.locales));

export function isKnownLocale(locale: string): boolean {
	return knownLocales.has(locale);
}
