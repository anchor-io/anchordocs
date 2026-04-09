export type DocsTextDirection = 'ltr' | 'rtl';

export interface DocsSearchUiConfig {
	/** Text shown on the search button */
	buttonLabel: string;
	/** Text shown for the keyboard shortcut */
	shortcutLabel: string;
	/** Text shown in the search input field */
	placeholder: string;
	/** Text shown when no search results are found */
	emptyLabel: string;
}

export interface DocsTocUiConfig {
	/** Title for the table of contents */
	title: string;
	/** Text shown when the table of contents is empty */
	emptyLabel: string;
	/** Text for the "back to top" link at the end of the table of contents */
	backToTopLabel: string;
}

/** Configuration for a single locale UI */
export interface DocsLocaleUiConfig {
	search: DocsSearchUiConfig;
	toc: DocsTocUiConfig;
}

export interface DocsLocaleConfig {
	/** The human-readable name of the locale, e.g. "English" or "Español" */
	label: string;
	/** The language code for the locale, e.g. "en" or "es" */
	lang: string;
	/** The text direction for the locale */
	dir: DocsTextDirection;
	/** UI configuration for the locale */
	ui: DocsLocaleUiConfig;
}

export interface DocsSiteConfig {
	// TODO: Support for logo or component in the future
	/** Title of the site shown as logo */
	title: string;
	/** Tagline shown on the header bar */
	description: string;
}

/** Internationalization configuration */
export interface DocsI18nConfig {
	/** The default locale for the site */
	defaultLocale: string;
	/** A mapping of locale codes to their respective configurations */
	locales: Record<string, DocsLocaleConfig>;
}

/** Configuration object for Anchordocs */
export interface DocsConfig {
	site: DocsSiteConfig;
	i18n: DocsI18nConfig;
}

export function defineConfig(config: DocsConfig): DocsConfig {
	return config;
}
