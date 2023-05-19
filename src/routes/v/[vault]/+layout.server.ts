import { db_vaults } from "$lib/server/deta";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import type { PageTreeItem } from "$lib/types/PageTree";
import { generatePageTree } from "$lib/server/mdRender";

// Disable prerendering //TODO: Reenable for public pages?
export const prerender = false;

export const load = (async ({ params }) => {
    const { vault } = params;

    const vaultEntry = await db_vaults.get(vault);

    if (!vaultEntry) {
        throw error(404, "Vault Not Found");
    }

    // Build tree
    const pages = vaultEntry.pages.filter(p => p.visibility !== "protected");

    const tree = generatePageTree(pages);


    return {
        vaultName: vaultEntry.key,
        vaultStyles: vaultEntry.styles,
        vaultPageTree: tree
    };
}) satisfies LayoutServerLoad;
