<script context="module" lang="ts">
    export type VaultMeta = {
        vaultName: string,
        vaultStyles: string[],
        vaultPageTree: PageTreeItem[]
    };
</script>
<script lang="ts">
    import App from "$cmp/layout/App.svelte";
    import type { PageTreeItem } from "$lib/types/PageTree";
    import { setContext } from "svelte";

    export let data: VaultMeta;

    setContext<VaultMeta>("vault_meta", data);
</script>

<svelte:head>
    <!-- TODO Add dynamic styles mvoe to page -->
    {#each data.vaultStyles as style}
        <link rel="stylesheet" href={style}/>
    {/each}

    <!-- tmp maxu styles -->
    <link rel="stylesheet" href="/styles/maxu/protection.css"/>
</svelte:head>

<App pageTree={data.vaultPageTree}>
    <slot/>
</App>