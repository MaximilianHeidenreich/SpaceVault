<script lang="ts">
    import type { FolderObject } from "$lib/server/mdRender";
    import { getContext } from "svelte";
    import type { VaultMeta } from "../../../routes/v/[vault]/+layout.svelte";

    export let item: FolderObject,
        depth: number = 0;

    const vaultMeta = getContext<VaultMeta>("vault_meta");
</script>

<li style="margin-left: {depth}em;">
    {#if item.children?.length > 0}
    <details>
        <summary>{item.name}</summary>
        <ul>
            {#each item.children as child}
            <svelte:self item={child} depth={depth + 1}/>
            {/each}
        </ul>
    </details>
    {:else}
    <a href="/v/{vaultMeta.vaultName}{item.path}{item.name.replace(".md", "")}">{item.name}</a>
    {/if}
</li>