import type { Component } from 'svelte';

export interface HomeModule {
	default: Component;
	metadata?: {
		title?: string;
		description?: string;
	};
}

export interface HomePage {
	locale: string;
	title: string;
	description?: string;
	sourcePath: string;
	component: Component;
}

export const homeModules = import.meta.glob('/content/home/*.svelte', {
	eager: true
}) as Record<string, HomeModule>;
