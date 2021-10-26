<script lang="ts">
	import { ChevronRightIcon } from 'svelte-feather-icons';
</script>

<button>
	<ChevronRightIcon strokeWidth={3} size="24" aria-hidden="true" />
	<span>Options</span>
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-width: 1px;
		border-color: transparent;
		font-size: 1rem;
	}

	button:focus {
		border-color: inherit;
		background-color: transparent;
		color: inherit;
	}
</style>
