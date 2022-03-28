<script>
    import {onMount} from "svelte";
    import {t} from '$lib/translations'
    import {page} from '$app/stores'

    $: ({route, lang} = $page.stuff)

    $: mapping = {
        en: 'ru',
        ru: 'en'
    }

    $: toLang = mapping[lang]
</script>

<a class="colinher" href={`/${toLang}${route}`}>
    {$t(`lang.${toLang}`)}
</a>
