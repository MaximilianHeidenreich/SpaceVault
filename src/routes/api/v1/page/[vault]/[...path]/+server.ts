import { db_vaults } from "$lib/server/deta";
import { buildResponse, respondNotFound } from "$lib/utils/responseHelper";
import type { RequestHandler } from "./$types";

export const GET = (async ({ params }) => {
    const { vault: vaultName, path: pagePath } = params;

    const vault = await db_vaults.get(vaultName);
    if (!vault)
        return respondNotFound(`Vault ${vaultName} not found!`);

    const page = vault.pages.find(p => p.absolutePath === pagePath);

    if (!page)
        return respondNotFound(`Page @ ${pagePath} not found!`);

    return buildResponse().status(200).statusText("OK").json(page).build();
}) satisfies RequestHandler;

/*export const DELETE = (async ({ params }) => {
    const { eventID } = params;

    // TODO: Check auth?

    try {
        await server_deleteEvent(eventID);
    } catch (e) {
        if (e instanceof NotFound) return respondNotFound(e.message);
        else if (e instanceof DetaBaseError) return respondInternalError(e.message);

        console.error(e);
        return respondInternalError("Internal error");
    }

    return buildResponse().status(200).statusText("OK").json({}).build();
}) satisfies RequestHandler;*/
