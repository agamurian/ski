import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import lang from './src/lib/translations/lang.js';

const filePath = dirname(fileURLToPath(import.meta.url));

const supportedLocales = Object.keys(lang);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	preprocess: [
		preprocess({
			scss: {
				prependData: `@import '${filePath}/src/lib/shares/scss/global.scss';`
			}
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false
		}),
		trailingSlash: 'always', // 'never', 'always', 'ignore'
		prerender: {
			default: true, // Build *.svelte as *.html
			entries: supportedLocales.reduce(
				(acc, locale) => [
					...acc,
					`/${locale}`,
					`/${locale}/401`,
					`/${locale}/403`,
					`/${locale}/404`,
					`/${locale}/500`
				],
				['*']
			)
		}
	}
};

export default config;
