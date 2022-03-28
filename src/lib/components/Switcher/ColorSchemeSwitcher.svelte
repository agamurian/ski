<script>
    import {onMount} from "svelte";
    import {t} from '$lib/translations'
    import {ClassColorScheme, colorScheme} from "$lib/shares/js/ClassColorScheme/ClassColorScheme"

    let colorSchemeController
    let elementClassName = ['curPoi', 'notSel']
    const elementTitleText = `common.colorScheme.${$colorScheme}`
    export let mode,
        className

    if (className) {
        elementClassName.push(className)
    }

    const switcherColorScheme = () => {
        colorSchemeController.switch()
    }

    onMount(async () => {
        colorSchemeController = new ClassColorScheme()
    })
</script>

{#if mode === 'string'}
    <a class={elementClassName.join(' ')} title={$t(elementTitleText)} on:click={switcherColorScheme}
       href={"javascript:void(0)"}>
        {$t(`common.colorScheme.${$colorScheme}To`)}
    </a>
{:else}
    <span class={elementClassName.join(' ')} title={$t(elementTitleText)} on:click={switcherColorScheme}>
        <i class="fa-solid fa-circle-half-stroke"></i>
    </span>
{/if}
