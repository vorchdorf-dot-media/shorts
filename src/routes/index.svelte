<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Form from '$lib/form/Form.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Shorts</h1>

<p>Squeeze massive hyperlinks into short, recognizeable ones. You know, for sharing.</p>

<div class="full-bleed">
	<Form />
</div>

<style>
	.full-bleed {
		--color-text: hsl(var(--color-bg-raw));
		--color-bg: hsl(var(--color-text-raw));
		--color-t-raw: var(--color-bg-raw);

		background-color: var(--color-bg);
		color: var(--color-text);
	}
</style>
