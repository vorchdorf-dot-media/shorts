<script lang="ts">
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.css';

	const isProd = import.meta.env.VITE_PROD === 'true';
</script>

<svelte:head>
	{#if !isProd}
		<meta name="robots" content="noindex,noflollow" />
	{/if}
</svelte:head>

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: var(--padding-default);
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
