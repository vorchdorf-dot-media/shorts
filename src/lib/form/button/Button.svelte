<script lang="ts">
	export let disabled: boolean;
</script>

<button type="submit" {disabled}><slot /></button>

<style>
	button {
		--color-main: var(--color-secondary);
	}
</style>
