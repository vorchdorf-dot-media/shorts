<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import Button from '$lib/form/button/Button.svelte';
	import Input from '$lib/form/input/Input.svelte';
	import Tooltip from '$lib/tooltip/Tooltip.svelte';

	import { enhance } from '$lib/form';
	import { getShortLink, handleCopyToClipboard, testURLFormat } from '$utils';

	let error: string;
	let id: string;
	let value: string;
	let result: string;
	let showTooltip: boolean = false;
	let timeout: NodeJS.Timeout;

	const { shorts } = getContext<{ shorts: Writable<Short[]> }>('shorts');
	const url = getContext<string>('url');

	if (testURLFormat(url)) {
		value = url;
	}

	const deferValidate = (val: string): void => {
		if (timeout) {
			clearTimeout(timeout);
		}

		if (val?.length) {
			timeout = setTimeout(() => validate(val), 800);
		}
	};

	const handleChange = ({ detail }: CustomEvent<string>) => {
		error = undefined;
		value = detail.trim();
		deferValidate(value);
	};

	const handleError = async (res, e, form) => {
		if (e) {
			error = e.message;
			return;
		}
		if (res) {
			const { errors } = await res.json();
			error = Array.isArray(errors) ? errors[0]?.message : 'Something went wrong. Try again.';
			return;
		}

		error = undefined;
	};

	const handleResult = async (res) => {
		const { data, errors } = await res.json();

		if (errors) {
			error = errors[0]?.message;
		}

		if (data?.createShort) {
			id = data.createShort.id;
			const url = getShortLink(id);
			await navigator.clipboard.writeText(url).then(handleTooltip);
			value = url;
			result = url;

			shorts.set([data.createShort, ...$shorts]);
		}
	};

	const handleTooltip = () => {
		showTooltip = true;
		setTimeout(() => {
			showTooltip = false;
		}, 1000);
	};

	const validate = (val: string): void => {
		if (!testURLFormat(val)) {
			error = 'Invalid URL format.';
		}
	};
</script>

<form
	action="/shorts.json"
	method="POST"
	use:enhance={{
		error: handleError,
		result: handleResult
	}}
>
	{#if error}
		<span class="error">{error}</span>
	{/if}
	<Input
		label="URL to shorten"
		placeholder="e.g. https://google.com"
		name="url"
		on:change={handleChange}
		bind:value
	/>
	{#if !value?.length || value !== result}
		<Button disabled={!!error || !value?.length}>Squeeze!</Button>
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
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 1em;
		font-size: 1.25em;
	}

	button {
		position: relative;
	}

	.error {
		position: absolute;
		display: block;
		width: 100%;
		top: -1.5rem;
		left: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		overflow: hidden;
	}

	@media (min-width: 768px) {
		form {
			flex-direction: row;
		}
	}
</style>
