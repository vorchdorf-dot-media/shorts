<script lang="ts">
	import { onMount } from 'svelte';
	import Custom from '$lib/form/options/Custom.svelte';
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
	<button type="button" on:click={handleClick}>
		<Icon d={chevronRight} />
		<span>Options</span>
	</button>
	<div bind:this={accordionEl}>
		<Custom />
	</div>
</div>

<style>
	div {
		flex: 1 0 100%;
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
</style>
