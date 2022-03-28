<script context="module">
    import {loadTranslations} from '$lib/translations';

    /** @type {import('@sveltejs/kit').Load} */
    export const load = async ({stuff, props}) => {
        await loadTranslations(stuff.lang, 'error');
        return {};
    }
</script>

<script>
    import {t, locale} from '$lib/translations';
    import {page} from '$app/stores';

    export let status = $page.status;
    export let url = $page.url;
</script>

<div class="d-block mx-auto vw-100 vh-100">
    <div class="error--wrapper h-100 d-flex flex-wrap flex-column align-items-center justify-content-center">
        <h1>{$t('error.oops')} </h1>
        <h2>{$t(`error.${status}`, {default: $t('error.default')})}</h2>
        <p>
            <small class="text-secondary">{status}</small>
        </p>
        <div>
            <a href="{url.origin}" class="btn btn-primary">
                {$t(`error.[backToHome]`)}
            </a>
        </div>
    </div>
</div>

<style lang="scss">
  :global {
    html, body {
      height: 100%;
    }
  }

  .error {
    &--wrapper {
      background-color: #ccc;
    }
  }
</style>
