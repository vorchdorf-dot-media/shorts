<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let id: string = 'input';
	export let label: string;
	export let name: string;
	export let placeholder: string;
	export let value: string = '';

	let inputRef: HTMLInputElement;

	const dispatch = createEventDispatcher();
</script>

<div>
	<label class="visually-hidden" for={id}>{label}</label>
	<input
		type="text"
		bind:this={inputRef}
		on:keyup={() => dispatch('change', inputRef?.value)}
		bind:value
		{id}
		{name}
		{placeholder}
	/>
</div>

<style>
	div {
		position: relative;
		flex: 1 0 auto;
	}

	div::before {
		content: '';
		position: absolute;
		border-bottom: var(--border-width) dotted var(--color-text);
		bottom: 0;
		height: var(--border-width);
		width: 100%;
	}
</style>
