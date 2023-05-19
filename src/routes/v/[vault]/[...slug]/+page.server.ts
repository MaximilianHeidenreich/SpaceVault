import { deta } from "$lib/server/deta.js";
import { error } from "@sveltejs/kit";
import { compile } from "mdsvex";
import type { PageServerLoad } from "./$types.js";
import { mdRenderOptions, mdRenderer } from "$lib/server/mdRender.js";

export const load = (async ({ params }) => {
    const { vault, slug } = params;

    const vaultDrive = deta.Drive(vault);

    // Build path to file in drive.
    const path = `${slug}.md`;
    const file = await vaultDrive.get(path);
    console.log(path);

    if (!file) {
        throw error(404, "Not found");
    }

    // Render
    //const pageContent = await compile(await file.text(), mdRenderOptions);
    const pageContent = await mdRenderer(await file.text());

    /*const frontmatter: { spacevault_password?: string; spacevault_public?: boolean } = rendered?.data?.fm as { spacevault_password?: string; spacevault_public?: boolean };
    if (frontmatter["spacevault_password"]) {
        console.log("protected")
    }

    if (frontmatter["spacevault_public"]) {
        return {
            rendered
        };
    }*/
    return {
        pageContent,
        slug
    };
}) satisfies PageServerLoad;
