<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, page }) => {
		const res = await fetch('/shorts.json');
		const { data, errors } = await res.json();

		return res.ok && data
			? { props: { shorts: data.shorts.data, after: data.shorts.after, query: page.query } }
			: {
					status: res.status,
					error: errors[0]?.message || 'Error while fetching previous short links.'
			  };
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, Writable } from 'svelte/store';
	import Form from '$lib/form/Form.svelte';
	import Shorts from '$lib/shorts/Shorts.svelte';
	import { testURLFormat } from '$utils';

	export let after: string;
	export let query: URLSearchParams;
	export let shorts: Short[];

	const text = query.get('text')?.trim();
	const url = query.get('url')?.trim();

	if (text && testURLFormat(text)) {
		setContext('url', text);
	}
	if (url && testURLFormat(url)) {
		setContext('url', url);
	}

	setContext<{ after: Writable<string>; shorts: Writable<Short[]> }>('shorts', {
		after: writable(after),
		shorts: writable(shorts)
	});
</script>

<svelte:head>
	<title>Shorts</title>
</svelte:head>

<h1>Shorts</h1>

<p>
	<code>{url || text}</code><br />
	<code>{query.toString()}</code>
</p>

<p>Squeeze massive hyperlinks into short, recognizeable ones. You know, for sharing.</p>

<div class="full-bleed">
	<Form />
</div>

<Shorts />

<style>
	.full-bleed {
		--color-text: hsl(var(--color-bg-raw));
		--color-bg: hsl(var(--color-text-raw));
		--color-t-raw: var(--color-bg-raw);

		position: sticky;
		box-shadow: 0 0 25px -2px hsla(var(--color-text-raw), 0.75);
		margin-top: 2rem;
		margin-bottom: 2rem;
		top: 0;
		background-color: var(--color-bg);
		color: var(--color-text);
		z-index: 9999;
	}
</style>
