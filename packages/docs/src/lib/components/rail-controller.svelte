<script lang="ts">
	interface Props {
		width?: number;
		height?: number;
		start: number;
		end: number;
		onchange?: (state: { width: number; height: number; start: number; end: number }) => void;
	}

	let {
		width = $bindable(24),
		height = $bindable(200),
		start = $bindable(0.2),
		end = $bindable(0.65),
		onchange
	}: Props = $props();

	function clamp(v: number, lo: number, hi: number) {
		return Math.min(hi, Math.max(lo, v));
	}

	function onStartInput(e: Event) {
		const v = parseFloat((e.target as HTMLInputElement).value) / 100;
		start = clamp(v, 0, end - 0.01);
		onchange?.({ width, height, start, end });
	}

	function onEndInput(e: Event) {
		const v = parseFloat((e.target as HTMLInputElement).value) / 100;
		end = clamp(v, start + 0.01, 1);
		onchange?.({ width, height, start, end });
	}
</script>

<div class="bg-surface flex flex-col gap-3 rounded-xl border border-border/60 p-4 text-sm">
	<div class="flex flex-col gap-1.5">
		<div class="flex justify-between text-xs text-muted-foreground">
			<span>start</span>
			<span class="text-foreground tabular-nums">{Math.round(start * 100)}%</span>
		</div>
		<input
			type="range"
			min="0"
			max="100"
			step="1"
			value={Math.round(start * 100)}
			oninput={onStartInput}
			class="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
		/>
	</div>

	<div class="flex flex-col gap-1.5">
		<div class="flex justify-between text-xs text-muted-foreground">
			<span>end</span>
			<span class="text-foreground tabular-nums">{Math.round(end * 100)}%</span>
		</div>
		<input
			type="range"
			min="0"
			max="100"
			step="1"
			value={Math.round(end * 100)}
			oninput={onEndInput}
			class="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
		/>
	</div>
</div>
