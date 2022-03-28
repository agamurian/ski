<script>
    // Components
    // Libraries
    import {locale, t} from '$lib/translations';
    import {marked} from 'marked';
</script>
<div class="container">
    <div class="my-5">
        <h1>{$t('home.welcome')}</h1>
        <p>{@html marked(`樣式內容，使用了 **marked** 庫.`)}</p>
    </div>
</div>
