import { config } from '$lib';
import type { DocsLocaleUiConfig } from './config';
import { homeModules, type HomePage } from './source';

/** Deduplicated list of locales as set on the config */
const knownLocales = new Set(Object.keys(config.i18n.locales));

/** Returns true if the given locale is known */
export function isKnownLocale(locale: string): boolean {
	return knownLocales.has(locale);
}

/** Returns a list of all known locales */
export function getLocales(): string[] {
	return Array.from(knownLocales);
}

/** Returns locale based on svelte component filepath */
function parseHomeLocale(filePath: string): string | null {
	if (!filePath.startsWith('/content/home/')) {
		return null;
	}

	const relativePath = filePath.replace('/content/home/', '');
	const locale = relativePath.replace(/\.svelte$/u, '');

	if (!locale || !isKnownLocale(locale)) {
		return null;
	}

	return locale;
}

/** Returns a record of all locale -> homepage pairs */
function buildHomeManifest(): Record<string, HomePage> {
	const byLocale: Record<string, HomePage> = {};

	for (const [modulePath, module] of Object.entries(homeModules)) {
		const locale = parseHomeLocale(modulePath);

		if (!locale) {
			continue;
		}

		byLocale[locale] = {
			locale,
			title: module.metadata?.title ?? config.site.title,
			description: module.metadata?.description,
			sourcePath: modulePath,
			component: module.default
		};
	}

	return byLocale;
}

export const allHomePagesByLocale = buildHomeManifest();

/** Returns the HomePage for a given locale */
export function getHomePage(locale: string): HomePage | undefined {
	return allHomePagesByLocale[locale];
}

/** returns the UI config for a given locale */
export function getLocaleUi(locale: string): DocsLocaleUiConfig {
	return config.i18n.locales[locale].ui;
}
