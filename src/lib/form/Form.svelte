<script lang="ts">
	import { getShortLink, handleCopyToClipboard } from '$utils';

	import Button from '$lib/form/button/Button.svelte';
	import Input from '$lib/form/input/Input.svelte';
	import Tooltip from '$lib/tooltip/Tooltip.svelte';

	import { enhance } from '$lib/form';

	let error: string;
	let id: string;
	let value: string;
	let result: string;
	let showTooltip: boolean = false;

	const handleTooltip = () => {
		showTooltip = true;
		setTimeout(() => {
			showTooltip = false;
		}, 1000);
	};

	const handleResult = async (res) => {
		const { data, errors } = await res.json();

		if (errors) {
			error = errors[0]?.message;
		}

		if (data?.createShort) {
			id = data.createShort.id;
			const url = getShortLink(id);
			await navigator.clipboard.writeText(url);
			value = url;
			result = url;
		}
	};
</script>

<form
	action="/shorts.json"
	method="POST"
	use:enhance={{
		result: handleResult
	}}
>
	<Input label="URL to shorten" placeholder="e.g. https://google.com" name="url" bind:value />
	{#if !value?.length || value !== result}
		<Button>Squeeze!</Button>
	{:else}
		<button on:click={(e) => handleCopyToClipboard(e, id, handleTooltip)}>
			<span>Copy</span>
			{#if showTooltip}
				<Tooltip direction="top">Copied!</Tooltip>
			{/if}
		</button>
	{/if}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1em;
		font-size: 1.25em;
	}

	button {
		position: relative;
	}

	@media (min-width: 768px) {
		form {
			flex-direction: row;
		}
	}
</style>
