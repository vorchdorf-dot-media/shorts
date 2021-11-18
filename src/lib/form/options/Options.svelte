<script lang="ts">
	import { onMount } from 'svelte';
	import NameInput from '$lib/form/options/NameInput.svelte';
	import TTLInput from '$lib/form/options/TTLInput.svelte';
	import Icon from '$lib/icon/Icon.svelte';
	import { chevronRight } from '$lib/icon/pack';

	let accordionEl: HTMLDivElement;

	const handleClick = (e: MouseEvent): void => {
		e.preventDefault();
	};

	onMount(() => {
		console.log(accordionEl.getBoundingClientRect());
	});
</script>

<div>
	<button type="button" id="options-toggle" on:click={handleClick}>
		<Icon d={chevronRight} />
		<span>Options</span>
	</button>
	<div role="region" aria-labelledby="options-toggle" bind:this={accordionEl}>
		<NameInput />
		<TTLInput />
	</div>
</div>

<style>
	div {
		flex: 1 0 100%;
	}
	div[role='region'] {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-color: transparent;
		font-size: 1rem;
	}

	button:focus {
		background-color: HSL(var(--color-t-raw, var(--color-text-raw)), 0.125);
		color: inherit;
	}

	@media (min-width: 768px) {
		div[role='region'] {
			flex-direction: row;
			gap: 2rem;
		}
	}
</style>
