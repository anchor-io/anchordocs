<script lang="ts">
	import { page } from '$app/state';
	import { preferences } from '$lib/preferences.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { isKnownLocale } from '$lib/docs/locale';
	import { browser } from '$app/environment';

	let { children } = $props();

	$effect(() => {
		if (!browser) return;
		const locale = page.params.locale;

		if (locale && isKnownLocale(locale)) {
			preferences.setLocale(locale);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script>
		// This script prevents initial FUOC.
		(function () {
			try {
				const raw = localStorage.getItem('anchordocs.preferences');
				const prefs = raw ? JSON.parse(raw) : null;
				const theme = prefs?.theme ?? 'dark';
				const lang = prefs?.locale ?? 'en';
				const dir = prefs?.dir ?? 'ltr';
				document.documentElement.classList.add(theme);
				document.documentElement.lang = lang;
				document.documentElement.dir = dir;
			} catch (e) {}
		})();
	</script>
</svelte:head>

<div class="h-dvh w-dvw bg-background">
	{@render children()}
</div>
