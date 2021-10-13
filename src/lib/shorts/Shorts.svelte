<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { getContext, onMount, setContext } from 'svelte';
	import ShortEntry from '$lib/shorts/short/Short.svelte';

	let buttonRef: HTMLButtonElement;

	const { shorts, after }: { after: Writable<string>; shorts: Writable<Short[]> } =
		getContext('shorts');

	const handleClick = async (e: MouseEvent): Promise<void> => {
		e.preventDefault();
		const searchParams = new URLSearchParams({ cursor: $after });

		const res = await fetch('/shorts.json?' + searchParams.toString());

		if (res.ok) {
			const {
				data: {
					shorts: { data, after: cursor }
				}
			} = await res.json();
			after.set(cursor);
			shorts.set([...$shorts, ...data]);
		}
	};

	const handleObserved = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
		entries.forEach(
			(entry) =>
				entry.isIntersecting && $after?.length > 0 && handleClick(new MouseEvent('MouseEvent'))
		);
	};

	onMount(() => {
		const observer = new IntersectionObserver(handleObserved, {
			root: null,
			rootMargin: '0px',
			threshold: 0.25
		});
		buttonRef && observer.observe(buttonRef);
	});
</script>

{#if $shorts?.length > 0}
	<section>
		<h2 class="visually-hidden">Previous shortlinks</h2>

		{#each $shorts as short}
			<ShortEntry
				created={short.meta.createdAt}
				id={short.id}
				target={short.target}
				proxy={short.proxy}
				visits={short.meta.visits}
			/>
		{/each}
	</section>
	{#if $after}
		<button bind:this={buttonRef} on:click={handleClick}>Show more</button>
	{/if}
{/if}

<style>
	section {
		padding: var(--padding-default) 0;
	}

	button {
		margin: var(--padding-default);
	}
</style>
