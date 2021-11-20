<script lang="ts">
	import { getFormContext } from '$lib/form/form.context';
	import NameInput from '$lib/form/options/NameInput.svelte';
	import TTLInput from '$lib/form/options/TTLInput.svelte';
	import Icon from '$lib/icon/Icon.svelte';
	import { chevronRight } from '$lib/icon/pack';

	let accordionEl: HTMLDivElement;

	const { options } = getFormContext();

	const handleClick = (e: MouseEvent): void => {
		e.preventDefault();
		options.update((state) => !state);
	};

	$: height = accordionEl?.getBoundingClientRect().height;
</script>

<div class="wrapper" class:open={$options}>
	<button type="button" id="options-toggle" on:click={handleClick}>
		<Icon d={chevronRight} />
		<span>Options</span>
	</button>
	<div role="region" aria-labelledby="options-toggle" style={$options && `height: ${height}px;`}>
		<div class="content" bind:this={accordionEl}>
			<NameInput />
			<TTLInput />
		</div>
	</div>
</div>

<style>
	div {
		flex: 1 0 100%;
	}
	div[role='region'] {
		transition: height var(--transition-duration) ease-in-out;
		height: 0;
		overflow: hidden;
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

	.wrapper {
		border: var(--border-width) solid transparent;
		margin: 0 calc(var(--padding-default) * -1);
		padding: var(--padding-default);
	}

	.wrapper.open {
		border-color: HSL(var(--color-t-raw), 0.25);
	}

	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.content {
			flex-direction: row;
			gap: 2rem;
		}
	}
</style>
