<script lang="ts">
	export let direction: 'top' | 'bottom';
</script>

<span class={direction}>
	<slot />
</span>

<style>
	@keyframes fade-out-down {
		0% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
			transform: translateX(-50%) translateY(50%);
		}
	}

	@keyframes fade-out-up {
		0% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
			transform: translateX(-50%) translateY(-50%);
		}
	}

	span {
		--color-main: var(--color-secondary);

		display: block;
		position: absolute;
		border-radius: 8px;
		padding: var(--padding-default) calc(var(--padding-default) * 2);
		bottom: 100%;
		left: 50%;
		background-color: var(--color-main);
		color: hsl(var(--color-text-raw));
		font-weight: bold;
		transform: translateX(-50%);
		opacity: 0;
	}

	span::before {
		content: '';
		position: absolute;
		border: 15px solid transparent;
		border-top-color: var(--color-main);
		height: 0;
		width: 0;
		top: 100%;
		left: 50%;
		background-color: transparent;
		transform: translateX(-50%);
	}

	.top {
		animation: fade-out-up 1000ms ease-out;
	}

	.bottom {
		animation: fade-out-down 1000ms ease-out;
		bottom: unset;
		top: 100%;
	}

	.bottom::before {
		border-top-color: transparent;
		border-bottom-color: var(--color-main);
		top: unset;
		bottom: 100%;
	}
</style>
