<script lang="ts">
	import { browser } from '$app/environment';

	interface Props {
		path: string;
		width?: number;
		height?: number;
		start?: number; // 0–1
		end?: number; // 0–1
		dot?: 'start' | 'end' | 'none';
		dotRadius?: number;
		trackColor?: string;
		activeColor?: string;
		strokeWidth?: number;
	}

	let {
		path,
		width = 24,
		height = 400,
		start = 0,
		end = 1,
		dot = 'end',
		dotRadius = 3,
		trackColor = 'var(--color-border)',
		activeColor = 'var(--color-primary)',
		strokeWidth = 1.5
	}: Props = $props();

	const clipTop = $derived(start * height);
	const clipHeight = $derived(Math.max(0, (end - start) * height));

	let pathEl = $state<SVGPathElement | null>(null);

	// Binary search along arc length to find the point whose Y matches targetY.
	// Necessary because arc length != Y distance — a simple (frac * totalLength)
	// would be wrong whenever the path has curves or horizontal offsets.
	function getPointAtY(el: SVGPathElement, targetY: number): DOMPoint {
		const total = el.getTotalLength();
		let lo = 0;
		let hi = total;
		for (let i = 0; i < 64; i++) {
			const mid = (lo + hi) / 2;
			if (el.getPointAtLength(mid).y < targetY) lo = mid;
			else hi = mid;
		}
		return el.getPointAtLength((lo + hi) / 2);
	}

	const dotPoint = $derived.by(() => {
		if (!browser || !pathEl || dot === 'none') return null;
		const targetY = (dot === 'start' ? start : end) * height;
		return getPointAtY(pathEl, targetY);
	});
</script>

<svg
	aria-hidden="true"
	{width}
	{height}
	viewBox={`0 0 ${width} ${height}`}
	xmlns="http://www.w3.org/2000/svg"
	style="display: block; overflow: visible;"
>
	<defs>
		<clipPath id="rail-active-clip">
			<rect
				x="0"
				y={clipTop}
				{width}
				height={clipHeight}
				style="transition: y 0.2s ease, height 0.2s ease;"
			/>
		</clipPath>
	</defs>

	<!-- track (also used to measure path length for dot positioning) -->
	<path
		bind:this={pathEl}
		d={path}
		stroke={trackColor}
		stroke-width={strokeWidth}
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>

	<!-- active highlight -->
	<path
		d={path}
		stroke={activeColor}
		stroke-width={strokeWidth}
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
		clip-path="url(#rail-active-clip)"
	/>

	<!-- dot -->
	{#if dotPoint}
		<circle
			cx={dotPoint.x}
			cy={dotPoint.y}
			r={dotRadius}
			fill={activeColor}
			style="transition: cx 0.2s ease, cy 0.2s ease;"
		/>
	{/if}
</svg>
