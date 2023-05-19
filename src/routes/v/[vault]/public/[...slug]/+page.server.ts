import { db_pages, deta } from "$lib/server/deta";
import { mdRenderOptions } from "$lib/server/mdRender";
import { error } from "@sveltejs/kit";
import { compile } from "mdsvex";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { vault, slug } = params;

    const pageEntry = await db_pages.get(`${slug}.md`);
    if (!pageEntry) throw error(404, "Not found");

    if (pageEntry.visibility === "private") {
        throw error(404, "Not found"); // We throw a 404 here to prevent leaking of private pages
    }

    if (pageEntry.visibility === "protected") {
        // Server markdown -> make
    }

    if (pageEntry.visibility === "public") {
        const vaultDrive = deta.Drive(vault);
        const file = await vaultDrive.get(pageEntry.absolutePath);
        if (!file) throw error(404, "File not found");
        const pageContent = await compile(await file.text(), mdRenderOptions);
        return {
            protected: false,
            pageContent
        };
    }

    /*const frontmatter: { spacevault_password?: string; spacevault_public?: boolean } = rendered?.data?.fm as { spacevault_password?: string; spacevault_public?: boolean };
    if (frontmatter["spacevault_password"]) {
        console.log("protected")
    }

    if (frontmatter["spacevault_public"]) {
        return {
            rendered
        };
    }*/


    //const buf = await drive.get("hello.txt");
    /*if (post) {
        return post;
    }

    const transformed_code = await compile(`
    # Hello World

    From this page.

    With **markdown** whoop whoop.
    `, {
        // TODO: add mdsvex options
    });

    */

    return {};

    //throw error(404, "Not found");
}
