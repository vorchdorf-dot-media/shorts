<script lang="ts">
	import { getFormContext } from '$lib/form/form.context';
	import Input from '$lib/form/input/Input.svelte';
	import { defer, testURLFormat } from '$utils';

	const name = 'target';

	const { form, error } = getFormContext();

	const validate = (value: string) => {
		const sanitized = value.trim();
		error.update((map) => map.set(name, null));

		if (!sanitized.length) {
			return;
		}

		if (!testURLFormat(value)) {
			return error.update((map) => map.set(name, 'Invalid URL format.'));
		}

		form.set({ ...$form, [name]: value });
	};

	const deferredValidate = defer(validate);

	const handleChange = ({ detail }: CustomEvent<string>) => deferredValidate(detail);
</script>

<Input
	label="URL to shorten"
	placeholder="e.g. https://google.com"
	{name}
	value={$form[name]}
	on:change={handleChange}
/>
