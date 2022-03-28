<script>
    // Libraries
    import {browser} from '$app/env'
    import {t} from '$lib/translations'

    // Components
    import ColorSchemeSwitcher from '$lib/components/Switcher/ColorSchemeSwitcher.svelte'
    import LocaleSwitcher from '$lib/components/Switcher/LocaleSwitcher.svelte'
</script>

{#if browser}
    <footer class="container-fluid z-5 agray p-5 text-center">
        <div class="d-flex flex-wrap flex-row">
            <div class="text-center lead">
                {$t(`common.copyright`, {
                    crYear: new Date().getFullYear()
                })}
            </div>
        </div>
        
    </footer>
{/if}

<style lang="scss">
  footer {
    width: 100%;
    display: block;
    font-size: calc(var(--bs-body-font-size) * 0.75);
    display: flex;
	flex-direction: column;
    position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 10em;
  }
  .agray{
    background-color: gray;
    padding: 4em;
  }
</style>
