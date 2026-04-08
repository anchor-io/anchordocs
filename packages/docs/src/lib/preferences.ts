import { browser } from '$app/environment';
import { PersistedState } from 'runed';

export type ThemePreference = 'light' | 'dark';

export interface UserPreferences {
	locale: string;
	theme: ThemePreference;
}

const defaults: UserPreferences = {
	locale: 'en',
	theme: 'dark'
};

class PreferencesState {
	private state = new PersistedState<UserPreferences>('anchordocs.preferences', defaults, {
		connected: browser,
		syncTabs: true
	});

	get current(): UserPreferences {
		return this.state.current;
	}

	setLocale(locale: string): void {
		if (this.state.current.locale === locale) {
			return;
		}

		this.state.current.locale = locale;
	}

	setTheme(theme: ThemePreference): void {
		if (this.state.current.theme === theme) {
			return;
		}

		this.state.current.theme = theme;
	}
}

export const preferences = new PreferencesState();
