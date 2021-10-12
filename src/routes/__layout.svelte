<script lang="ts">
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.css';
</script>

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
