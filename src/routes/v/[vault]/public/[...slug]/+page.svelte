<script lang="ts">
    import type { PageServerData } from "./$types";


    export let data: PageServerData;

    console.log(data)

</script>

{#if data.protected}
todo: password prompt
{:else if data.pageContent}
{@html data.pageContent}
{/if}