/* SSR ONLY, did not work on CSR */
import { defaultLocale, locales } from '$lib/translations';

const routeRegex = new RegExp(/^\/[^.]*([?#].*)?$/);

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    const { url, request } = event;
    const { pathname } = url;

    // If this request is a route request
    if (routeRegex.test(pathname)) {
        // Get defined locales
        const supportedLocales = locales.get();

        // Try to get locale from `pathname`.
        let locale = supportedLocales.find((l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase());

        // If route locale is not supported
        if (!locale) {
            // Get user preferred locale
            locale = `${`${request.headers['accept-language']}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();

            // Set default locale if user preferred locale does not match
            if (!supportedLocales.includes(locale)) locale = defaultLocale;

            // 301 redirect
            return new Response(undefined, { headers: { 'location': `/${locale}${pathname}` }, status: 301 });
        }

        // Add html `lang` attribute
        const response = await resolve(event);
        const body = await response.text();

        return new Response(`${body}`.replace(/<html.*>/, `<html lang="${locale}">`), response);
    }

    return resolve(event);
};

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
    return event.locals.user
        ? {
            user: {
                // only include properties needed client-side —
                // exclude anything else attached to the user
                // like access tokens etc
                name: event.locals.user.name,
                email: event.locals.user.email,
                avatar: event.locals.user.avatar
            }
        }
        : {};
};
