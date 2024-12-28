import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	postcss: {
		plugins: [postcssImport(), tailwindcss(), autoprefixer()]
	},
	kit: {
		adapter: adapter()
	}
};

export default config;
