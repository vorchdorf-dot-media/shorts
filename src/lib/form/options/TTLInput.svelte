<script lang="ts">
	import { getFormContext } from '$lib/form/form.context';
	import NumberInput from '$lib/form/input/NumberInput.svelte';
	import { defer } from '$utils';

	const name = 'ttl';
	const min = 60;

	const { form, error } = getFormContext();

	const validate = (value: number) => {
		const parsed = typeof value === 'string' ? parseInt(value, 10) : value;
		error.update((map) => map.set(name, null));

		if (!value) {
			return;
		}

		if (isNaN(parsed)) {
			return error.update((map) => map.set(name, 'Lifespan must be of type number.'));
		}

		if (parsed < min) {
			return error.update((map) => map.set(name, 'Lifespan must be greater than 60, if set.'));
		}

		form.set({ ...$form, [name]: parsed });
	};

	const deferredValidate = defer(validate);

	const handleChange = ({ detail }: CustomEvent<string>) => deferredValidate(detail);
</script>

<NumberInput
	id="ttl-id"
	label="Lifespan"
	placeholder="Lifespan"
	{min}
	{name}
	value={$form[name]}
	on:change={handleChange}
/>
