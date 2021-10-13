<script lang="ts">
	import { getRelativeTime, getShortLink, handleCopyToClipboard } from '$utils';

	import Tooltip from '$lib/tooltip/Tooltip.svelte';

	export let created: string;
	export let id: string;
	export let target: string;
	export let proxy: boolean;
	export let visits: string[];

	let showTooltip = false;

	const visitors = visits.length < 10 ? visits.length : '10+';
	const [min, max] = getRelativeTime(created);

	const handleTooltip = () => {
		showTooltip = true;
		setTimeout(() => {
			showTooltip = false;
		}, 1000);
	};
</script>

<article>
	<h3>{getShortLink(id)}</h3>
	<span class="target">{target}</span>
	<aside>
		{#if proxy}
			<span class="proxy">Proxy</span>
		{:else}
			<span class="pill">Link</span>
		{/if}
		{#if created}
			<span class="pill" title={`Created at ${max}`}>{min}</span>
		{/if}
		{#if visitors}
			<span class="pill" title={`${visitors} unique visitors`}>{visitors}</span>
		{/if}
	</aside>
	<button on:click={(e) => handleCopyToClipboard(e, id, handleTooltip)}>
		<span>Copy</span>
		{#if showTooltip}
			<Tooltip direction="top">Copied!</Tooltip>
		{/if}
	</button>
</article>

<style>
	article {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: var(--padding-default);
		margin: 0 calc(var(--padding-default) * -1);
	}

	article:nth-child(2n) {
		background-color: hsla(var(--color-text-raw), 0.125);
	}

	h3,
	.target {
		max-width: 75%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	h3 {
		flex: 1 0 100%;
		font-size: 1em;
		font-family: var(--font-mono);
		margin: 0;
	}

	aside {
		position: absolute;
		display: inline-flex;
		flex-direction: column;
		gap: 0.5em;
		top: var(--padding-default);
		right: var(--padding-default);
		bottom: var(--padding-default);
	}

	button {
		position: relative;
		display: block;
		border-color: hsla(var(--color-text-raw), 0.5);
		margin: 1em auto;
		width: 50%;
	}

	.target,
	.proxy,
	.pill {
		font-size: 0.75em;
	}

	.proxy,
	.pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 2px solid transparent;
		border-radius: 8px;
		padding: 0.25em 0.5em;
		text-transform: uppercase;
		letter-spacing: 0.125em;
	}

	.proxy {
		background-color: var(--color-primary);
		color: var(--color-bg);
	}

	.pill {
		border-color: var(--color-text);
	}
</style>
