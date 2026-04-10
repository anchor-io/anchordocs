<script>
	import RailController from '$lib/components/rail-controller.svelte';
	import RailPainter from '$lib/components/rail-painter.svelte';

	let railState = $state({
		width: 24,
		height: 200,
		start: 0.2,
		end: 0.65
	});
</script>

<div class="mt-2 flex flex-col rounded-2xl border border-border/50 text-svelte-deoranged">
	<div class="p-10 font-sans text-4xl">
		The documentation framework you can adapt to <span class="text-svelte-orange">your needs.</span>
		<RailPainter
			path="M 8.5 0 L 8.5 50 C 8.5 80 16.5 70 16.5 90 L 16.5 140"
			dot="start"
			width={railState.width}
			height={railState.height}
			start={railState.start}
			end={railState.end}
		/>
	</div>
	<RailController
		bind:width={railState.width}
		bind:height={railState.height}
		bind:start={railState.start}
		bind:end={railState.end}
	/>
</div>
