import { defineConfig } from './src/lib/docs/config';

export default defineConfig({
	site: {
		title: 'Anchordocs',
		description: 'Anchordocs documentation'
	},
	i18n: {
		defaultLocale: 'en',
		locales: {
			en: {
				label: 'English',
				lang: 'en',
				dir: 'ltr',
				ui: {
					search: {
						buttonLabel: 'Search',
						shortcutLabel: 'Ctrl + K',
						placeholder: 'Search the docs...',
						emptyLabel: 'No results found'
					},
					toc: {
						title: 'On this page',
						emptyLabel: 'No sections found',
						backToTopLabel: 'Back to top'
					}
				}
			}
		}
	}
});
