<script lang="ts">
	const YEAR = 2021;
	const currentYear = new Date().getFullYear();
</script>

<footer>
	<span>
		&copy; <a href="https://sascha.work" rel="external">Sascha Zarhuber</a>, {currentYear - YEAR
			? YEAR + '—' + currentYear
			: YEAR}.
	</span>
	<nav>
		<strong>Navigation:</strong>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/legal">Legal Notice</a></li>
		</ul>
	</nav>
	<span
		>Yes, this website is <a rel="external" href="https://github.com/vorchdorf-dot-media/shorts"
			>Open Source</a
		>.</span
	>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: var(--padding-default);
	}

	nav,
	ul {
		display: flex;
		gap: calc(var(--padding-default) * 0.5);
	}

	nav {
		margin: var(--padding-default) 0;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	li + li::before {
		content: '•';
		margin-right: calc(var(--padding-default) * 0.5);
	}
</style>
