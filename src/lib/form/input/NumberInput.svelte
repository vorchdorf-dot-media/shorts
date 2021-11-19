<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let id = 'number-input';
	export let label: string;
	export let min = 0;
	export let max = Number.MAX_SAFE_INTEGER;
	export let name: string;
	export let placeholder: string;
	export let step: number = 10;
	export let value: number = undefined;

	const dispatch = createEventDispatcher();

	const handleStep = (e: MouseEvent, val: number): void => {
		e.preventDefault();
		value = (value ?? 0) + val * step;
		dispatch('change', value);
	};

	const handleSubtract = (e: MouseEvent): void => handleStep(e, -1);
	const handleAdd = (e: MouseEvent): void => handleStep(e, 1);

	let inputRef: HTMLInputElement;
</script>

<div class="wrapper">
	<button aria-label={`Subtract ${step} from ${value}`} type="button" on:click={handleSubtract}
		>-</button
	>
	<div class="input-wrapper">
		<label class="visually-hidden" for={id}>{label}</label>
		<input
			type="number"
			bind:this={inputRef}
			on:keyup={() => dispatch('change', inputRef?.value)}
			{id}
			{min}
			{max}
			{name}
			{placeholder}
			{step}
			bind:value
		/>
	</div>
	<button aria-label={`Add ${step} to ${value}`} type="button" on:click={handleAdd}>+</button>
</div>

<style>
	input {
		text-align: center;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}

	.wrapper {
		display: flex;
		flex: 0 1 38.2%;
		gap: 0.5ch;
	}

	.input-wrapper {
		position: relative;
		padding: 0;
	}

	.input-wrapper::before {
		content: '';
		position: absolute;
		border-bottom: var(--border-width) dotted var(--color-text);
		bottom: 0;
		left: 0;
		height: var(--border-width);
		width: 100%;
	}
</style>
