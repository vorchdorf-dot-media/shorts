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
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: var(--padding-default);
	}
</style>
