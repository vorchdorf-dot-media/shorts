<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { getFormContext } from '$lib/form/form.context';
	import Button from '$lib/form/button/Button.svelte';
	import Options from '$lib/form/options/Options.svelte';
	import URLInput from '$lib/form/URLInput.svelte';
	import Tooltip from '$lib/tooltip/Tooltip.svelte';

	import { enhance } from '$lib/form';
	import { getShortLink, handleCopyToClipboard, testURLFormat } from '$utils';

	let id: string;
	let result: string;
	let showTooltip: boolean = false;

	const { form, error, options } = getFormContext();
	const { shorts } = getContext<{ shorts: Writable<Short[]> }>('shorts');
	const url = getContext<string>('url');

	if (testURLFormat(url)) {
		form.set({ ...$form, target: url });
	}

	const handleError = async (res, e) => {
		if (e) {
			return error.update((map) => map.set('api', e.message));
		}

		if (res) {
			const { errors } = await res.json();
			return error.update((map) =>
				map.set(
					'api',
					Array.isArray(errors) ? errors[0]?.message : 'Something went wrong. Try again.'
				)
			);
		}

		error.set(new Map());
	};

	const handleResult = async (res) => {
		const { data, errors } = await res.json();

		if (errors) {
			error.update((map) => map.set('api', errors[0]?.message));
		}

		if (data?.createShort) {
			id = data.createShort.id;
			const url = getShortLink(id);
			await navigator.clipboard.writeText(url).then(handleTooltip);
			result = url;

			form.set({ ...$form, id: null, target: url, ttl: null });
			shorts.set([data.createShort, ...$shorts]);
			options.set(false);
		}
	};

	const handleTooltip = () => {
		showTooltip = true;
		setTimeout(() => {
			showTooltip = false;
		}, 1000);
	};

	$: errorMsg = [...$error.values()].filter((val: string) => !!val).shift();
	$: value = $form.target;
</script>

<form
	action="/shorts.json"
	method="POST"
	use:enhance={{
		error: handleError,
		result: handleResult
	}}
>
	{#if errorMsg}
		<span class="error">{errorMsg}</span>
	{/if}
	<URLInput />
	{#if !value?.length || value !== result}
		<Button disabled={!!errorMsg || !value?.length}>Squeeze!</Button>
	{:else}
		<button on:click={(e) => handleCopyToClipboard(e, id, handleTooltip)}>
			<span>Copy</span>
			{#if showTooltip}
				<Tooltip direction="top">Copied!</Tooltip>
			{/if}
		</button>
	{/if}
	<Options />
</form>

<style>
	form {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
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
