<script lang="ts">
	export let d: string;
</script>

<svg aria-hidden="true" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path {d} />
</svg>

<style>
	svg {
		height: 1em;
		width: 1em;
		stroke: currentColor;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 0.2em;
		fill: transparent;
	}
</style>
