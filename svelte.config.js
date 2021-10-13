import { resolve } from 'path';
import adapter from '@sveltejs/adapter-cloudflare-workers';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#root',
		adapter: adapter(),

		vite: {
			resolve: {
				alias: {
					$api: resolve('./src/api'),
					$utils: resolve('./src/utils')
				}
			}
		}
	}
};

export default config;
