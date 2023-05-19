import { db_vaults } from "$lib/server/deta";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ }) => {
    const [vaults, primaryVault] = await Promise.all([
        db_vaults.fetch({}, { limit: 2 }),
        db_vaults.fetch({ primary: true }, { limit: 1 })
    ]);

    if (vaults.items.length <= 0)  {
        throw redirect(307, "_setup");
    }

    if (primaryVault.items.length > 0) {
        throw redirect(307, `v/${primaryVault.items[0].key}`);
    }

}) satisfies PageServerLoad;
