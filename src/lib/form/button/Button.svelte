<button type="submit"><slot /></button>

<style>
	button {
		--color-main: var(--color-secondary);

		padding: 0.75em 1em;
		border: 3px solid var(--color-main);
		color: var(--color-main);
		background-color: inherit;
		font-weight: bold;
	}

	button:active,
	button:focus {
		background-color: var(--color-main);
		color: var(--color-bg);
		outline: none;
	}
</style>
