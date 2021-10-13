<script lang="ts">
	export let id: string = 'input';
	export let label: string;
	export let name: string;
	export let placeholder: string;
	export let value: string = '';
</script>

<div>
	<label class="visually-hidden" for={id}>{label}</label>
	<input {id} type="text" bind:value {name} {placeholder} />
</div>

<style>
	div {
		--border-width: 3px;

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

	input {
		--color-placeholder: hsla(var(--color-t-raw), 0.333);

		display: block;
		border-radius: 0;
		border: var(--border-width) solid transparent;
		padding: 0.75em 1em;
		width: 100%;
		font-family: var(--font-mono);
		font-weight: bold;
		background-color: transparent;
		color: inherit;
	}

	input:active,
	input:focus {
		border: var(--border-width) solid var(--color-text);
		outline: none;
	}

	input::placeholder {
		color: var(--color-placeholder, darkgrey);
	}
</style>
