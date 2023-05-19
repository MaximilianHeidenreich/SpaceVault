<script lang="ts">
    import { getContext } from "svelte";
    import type { PageServerData } from "./$types";
    import type { VaultMeta } from "../+layout.svelte";


    export let data: PageServerData;

    const vaultMeta = getContext<VaultMeta>("vault_meta");

</script>

<svelte:head>
    <title>{data.slug} - {vaultMeta.vaultName}</title>
</svelte:head>

{#if data.pageContent}
{@html data.pageContent}
{/if}