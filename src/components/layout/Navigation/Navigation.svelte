<script lang="ts">
    import { getContext } from "svelte";
    import type { VaultMeta } from "../../../routes/v/[vault]/+layout.svelte";
    import type { PageTreeItem } from "$lib/types/PageTree";
    import NavItem from "./NavItem.svelte";

    export let pageTree: PageTreeItem[];

    const vaultMeta = getContext<VaultMeta>("vault_meta");
</script>

<aside>
    <header>
        <h1 class="text-xl font-bold">{vaultMeta.vaultName}</h1>
    </header>
    <section>
        <ul>
            {#if pageTree[0].children?.length > 0}
            {#each pageTree[0].children as child}
            <NavItem item={child} depth={0}/>
            {/each}
            {/if}
        </ul>
    </section>
</aside>

<style>
    aside {
        position: sticky;
        top: 0;
        height: 100vh;

        display: flex;
        flex-direction: column;
        gap: 2rem;

        background: #f8f8f8;
        border-right: 2px solid #e8e8e8;
    }

    aside header {
        padding: 2.5rem;
    }
    aside section {
        padding-inline: 1.5rem;
    }
    aside section ul {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    aside section ul li {
        display: flex;
        width: 100%;
    }
    aside section ul li a {
        flex-grow: 1;
        padding-inline: 1rem;
        padding-block: 0.25rem;
        @apply rounded-lg;
    }
    aside section ul li a:hover {
        @apply bg-neutral-200;
    }
</style>
