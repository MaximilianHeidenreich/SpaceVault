import type { Page, PageVisibility } from "$lib/types/Page";
import { db_pages, db_vaults, deta } from "$lib/server/deta";
import { buildResponse, respondNotFound } from "$lib/utils/responseHelper";
import type { RequestHandler } from "@sveltejs/kit";

interface PostBody {
    vault: string;
    absolutePath: string;
    folder: string;
    fileName: string;
    slug: string;
    hash: string;
    visibility?: PageVisibility;
    contents: string; // Base64 encoded file contents
}

export const POST = (async ({ request }) => {
    //const { vault: vaultName } = request.params;
    const body = (await request.json()) as PostBody;

    const vaultEntry = await db_vaults.get(body.vault);
    if (!vaultEntry)
        return respondNotFound(`Vault ${body.vault} not found!`);

    const p = vaultEntry.pages.find((p) => p.absolutePath === body.absolutePath);
    if (p?.hash === body.hash) // "Not modified"
        return buildResponse().status(200).statusText("OK").json(p).build();

    // Create DB entry
    const pageEntry: Page = {
        absolutePath: body.absolutePath,
        folder: body.folder,
        fileName: body.fileName,
        slug: body.slug,
        hash: "foo",
        visibility: body.visibility || "private"
    };

    const vaultDrive = deta.Drive(body.vault);
    vaultDrive.put(pageEntry.absolutePath, {
        data: Buffer.from(body.contents, "base64"),
        contentType: "text/plain"
    });

    const i = vaultEntry.pages.findIndex((p) => p.absolutePath === body.absolutePath);
    if (i !== -1) vaultEntry.pages.splice(i, 1);
    vaultEntry.pages.push(pageEntry);
    await db_vaults.update({ pages: vaultEntry.pages }, vaultEntry.key);

    return buildResponse().status(200).statusText("OK").json(pageEntry).build();
}) satisfies RequestHandler;
