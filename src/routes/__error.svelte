<script context="module" lang="ts">
	export const load = ({ error, status }) => {
		return {
			props: {
				error,
				status
			}
		};
	};
</script>

<script lang="ts">
	export let error: Error;
	export let status: number;
</script>

<svelte:head>
	<title>Error</title>
</svelte:head>

<h1>Uh, oh</h1>

<p>We're sorry, but our systems detected an error. That's all we know for now.</p>

<strong><code>{status}: {error.message}</code></strong>

<p>Go back to the <a href="/">home page</a>.</p>
