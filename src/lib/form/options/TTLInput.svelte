<script lang="ts">
	import NumberInput from '$lib/form/input/NumberInput.svelte';

	const handleChange = (e: CustomEvent<string>) => {
		console.log(e.detail);
	};
</script>

<NumberInput
	id="ttl-id"
	label="Lifespan"
	name="ttl"
	placeholder="Lifespan"
	on:change={handleChange}
/>
