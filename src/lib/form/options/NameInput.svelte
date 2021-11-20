<script lang="ts">
	import { getFormContext } from '$lib/form/form.context';
	import Input from '$lib/form/input/Input.svelte';
	import { defer } from '$utils';

	const ID_REGEX = /^[a-zA-Z0-9\-]+$/;

	const name = 'id';

	const { form, error } = getFormContext();

	const validate = (value: string) => {
		const sanitized = value.trim();
		error.update((map) => map.set(name, null));

		if (!sanitized.length) {
			return;
		}

		if (!ID_REGEX.test(sanitized)) {
			return error.update((map) => map.set(name, 'Only characters a-z, A-Z, 0-9, - are allowed.'));
		}
		form.set({ ...$form, id: sanitized });
	};

	const deferredValidate = defer(validate);

	const handleChange = ({ detail }: CustomEvent<string>) => deferredValidate(detail);
</script>

<Input
	id="custom-id"
	label="Custom name"
	placeholder="Enter custom name"
	{name}
	on:change={handleChange}
	value={$form[name]}
/>
