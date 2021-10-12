<script lang="ts">
	import Button from '$lib/form/button/Button.svelte';
	import Input from '$lib/form/input/Input.svelte';

	$: value = '';
</script>

<form action="/shorten" method="POST">
	<Input label="URL to shorten" placeholder="e.g. https://google.com" name="url" {value} />
	<Button>Squeeze!</Button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1em;
		font-size: 1.25em;
	}

	@media (min-width: 768px) {
		form {
			flex-direction: row;
		}
	}
</style>
