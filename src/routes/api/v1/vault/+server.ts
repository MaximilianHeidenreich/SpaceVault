import type { Vault } from "$lib/types/Vault";
import { db_vaults, deta } from "$lib/server/deta";
import { buildResponse, respondBadRequest } from "$lib/utils/responseHelper";
import type { RequestHandler } from "@sveltejs/kit";

interface PostBody {
    name: string;
    primary?: boolean;
    index?: string;
    styles?: string[];
}

export const POST = (async ({ request }) => {
    const body = (await request.json()) as PostBody;

    // Create DB entry
    const vaultEntry: Vault = {
        key: body.name,
        primary: body.primary || false,
        index: body.index || null,
        styles: body.styles || ["todo"], // TODO: Default stylesheet
        pages: []
    };

    try {
        db_vaults.put(vaultEntry, vaultEntry.key);
    } catch (e) {
        return respondBadRequest(`Vault ${body.name} already exists!`);
    }

    return buildResponse().status(200).statusText("OK").json(vaultEntry).build();
}) satisfies RequestHandler;
