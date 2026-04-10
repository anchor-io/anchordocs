<script lang="ts">
	import { resolve } from '$app/paths';
	import { CubeIcon } from 'phosphor-svelte';

	const { data } = $props();
	const HomeComponent = $derived(data.page.component);
</script>

<div class="mx-auto flex h-full w-full max-w-home-width flex-col justify-items-center">
	<header
		class="flex w-full items-center rounded-b-2xl border-x border-b border-border/50 px-5 py-4"
	>
		<div class="flex flex-col gap-3">
			<a
				href={resolve('/[locale]', { locale: data.locale })}
				class="text-md inline-flex items-center gap-2 font-semibold tracking-tight text-foreground no-underline"
			>
				<CubeIcon size={20} weight="duotone" />
				{data.site.title}
			</a>
		</div>
		<nav class="ml-6 text-sm text-foreground/50">
			<a href={resolve('/[locale]/docs', { locale: data.locale })}> Documentation </a>
		</nav>
	</header>

	<main class="mt-10 h-full w-full">
		<HomeComponent />
	</main>
</div>
