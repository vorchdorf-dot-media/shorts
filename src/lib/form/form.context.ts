import { getContext, hasContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export type FormContext = {
	form: Writable<Short>;
	error: Writable<Map<string, string>>;
	options: Writable<boolean>;
};

export const CONTEXT_KEY = 'form';

export const getFormContext = (): FormContext => {
	if (!hasContext(CONTEXT_KEY)) {
		setContext(CONTEXT_KEY, {
			form: writable({}),
			error: writable(new Map()),
			options: writable(false)
		});
	}

	return getContext<FormContext>(CONTEXT_KEY);
};
