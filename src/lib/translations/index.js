import i18n from 'sveltekit-i18n';
import lang from './lang.js';

const en = [
    {
        locale: 'en',
        key: 'common',
        loader: async () => (await import('./en/common.json')).default,
    },
    {
        locale: 'en',
        key: 'menu',
        loader: async () => (await import('./en/menu.json')).default,
    },
    {
        locale: 'en',
        key: 'home',
        routes: ['', '/'],
        loader: async () => (await import('./en/home.json')).default,
    },
    {
        locale: 'en',
        key: 'error',
        routes: ['error'],
        loader: async () => (await import('./en/error.json')).default,
    },
]

const ru = [
    {
        locale: 'ru',
        key: 'common',
        loader: async () => (await import('./ru/common.json')).default,
    },
    {
        locale: 'ru',
        key: 'menu',
        loader: async () => (await import('./ru/menu.json')).default,
    },
    {
        locale: 'ru',
        key: 'home',
        routes: ['', '/'],
        loader: async () => (await import('./ru/home.json')).default,
    },
    {
        locale: 'ru',
        key: 'error',
        routes: ['error'],
        loader: async () => (await import('./ru/error.json')).default,
    },
]

/** @type {import('sveltekit-i18n').Config} */
const config = {
    translations: {
        en: {lang},
        ru: {lang},
    },
    loaders: [...en, ...ru],
};

export const defaultLocale = 'en';

export const {t, locale, locales, loading, loadTranslations, translations} = new i18n(config);

// Translations logs
loading.subscribe(async ($loading) => {
    if ($loading) {
        console.log('Loading translations...');

        await loading.toPromise();
        console.log('Updated translations', translations.get());
    }
});
