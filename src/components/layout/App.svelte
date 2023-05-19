<script lang="ts">
    import PasswordProtection from "$cmp/core/PasswordProtection/PasswordProtection.svelte";
    import type { PageTreeItem } from "$lib/types/PageTree";
    import Article from "./Article.svelte";
    import Navigation from "./Navigation/Navigation.svelte";

    export let pageTree: PageTreeItem[];

</script>

<main>
    <Navigation {pageTree}/>
    <Article>
        <slot/>
    </Article>
</main>

<style>
    main {
        min-height: 100vh;

        display: grid;
        grid-template-columns: 30ch 1fr;
        grid-template-rows: 1fr;
    }
</style>