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
			},
			es: {
				label: 'Español',
				lang: 'es',
				dir: 'ltr',
				ui: {
					search: {
						buttonLabel: 'Buscar',
						shortcutLabel: 'Ctrl + K',
						placeholder: 'Buscar la documentacion...',
						emptyLabel: 'No se encontraron resultados'
					},
					toc: {
						title: 'En esta pagina',
						emptyLabel: 'No se encontraron secciones',
						backToTopLabel: 'Volver arriba'
					}
				}
			}
		}
	}
});
