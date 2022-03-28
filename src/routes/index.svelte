<script>
    import {browser} from '$app/env';

    const goToLanguageSite = () => {
        const language = window.navigator.language;
        const redirect = {
            'ru': ['ru', 'ru-RU']
        };
        let redirectTo = 'en';
        Object.entries(redirect).forEach(([langKey, langList]) => {
            if (langList.includes(language)) {
                redirectTo = langKey

            }
        })
        if (redirectTo) {
            window.location.replace(`/${redirectTo}`);
        }
    }
    ;(() => {
        if (browser) {
            goToLanguageSite()
        }
    })()
</script>

<svelte:head>
    <link rel="stylesheet" href="../lib/shares/scss/global.scss">
</svelte:head>
