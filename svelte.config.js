import fs from 'fs';
import adapter from '@sveltejs/adapter-cloudflare-workers';
import preprocess from 'svelte-preprocess';

const pkg = JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url), 'utf8'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#root',
		adapter: adapter()
	}
};

export default config;
