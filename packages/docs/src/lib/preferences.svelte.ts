import { browser } from '$app/environment';
import { config } from '$lib';
import { PersistedState } from 'runed';
import type { DocsTextDirection } from './docs/config';

export type ThemePreference = 'light' | 'dark';

export interface UserPreferences {
	locale: string;
	dir: DocsTextDirection;
	theme: ThemePreference;
}

const defaults: UserPreferences = {
	locale: 'en',
	dir: config.i18n.locales['en'].dir,
	theme: 'dark'
};

class PreferencesState {
	#state = new PersistedState<UserPreferences>('anchordocs.preferences', defaults, {
		connected: browser,
		syncTabs: true
	});
	#lastTheme = this.#state.current.theme;

	constructor() {
		if (!browser) return;
		// Ignoring the cleanup is fine since this class is only instantiated once and should live for the entire duration of the app
		$effect.root(() => {
			$effect(() => {
				document.documentElement.classList.remove(this.#lastTheme);
				document.documentElement.classList.add(this.current.theme);

				this.#lastTheme = this.current.theme;
			});

			$effect(() => {
				document.documentElement.lang = this.current.locale;
				document.documentElement.dir = this.current.dir;
			});
		});
	}

	get current(): UserPreferences {
		return this.#state.current;
	}

	setLocale(locale: string): void {
		if (this.#state.current.locale === locale) return;
		this.#state.current.locale = locale;
		this.#state.current.dir = config.i18n.locales[locale].dir;
	}

	setTheme(theme: ThemePreference): void {
		if (this.#state.current.theme === theme) return;

		this.#state.current.theme = theme;
	}
}

export const preferences = new PreferencesState();
