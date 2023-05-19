import type { MdsvexCompileOptions } from "mdsvex";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

import remarkHtml from "remark-html";

export const mdRenderer = async (markdown: string) =>
    String(
        await unified()
            .use(remarkParse)
            //.use(remarkHtml)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeExternalLinks, { rel: ["nofollow"] })
            .use(rehypeStringify)
            .process(markdown)
    );

export const mdRenderOptions: MdsvexCompileOptions = {
    smartypants: true,
    //remarkPlugins: [remarkGfm({})],
    //remarkPlugins: []
};

export interface PageObject {
	absolutePath: string;
	fileName: string;
	folder: string;
	hash: string;
	slug: string;
	visibility: string;
}

export interface FolderObject {
	name: string;
	path: string;
	children: (FolderObject | PageObject)[];
}
export function generatePageTree(pages: PageObject[]): FolderObject[] {
	const rootFolder: FolderObject = {
		name: 'root',
		path: '/',
		children: []
	};

	const folderMap: { [path: string]: FolderObject } = {
		'/': rootFolder
	};

	pages.forEach(page => {
		const { absolutePath, fileName, folder } = page;

		const pathParts = folder.split('/').filter(part => part !== '');
		let currentPath = '/';
		let currentFolder = rootFolder;

		pathParts.forEach(part => {
			currentPath += `${part}/`;
			if (!folderMap[currentPath]) {
				const newFolder: FolderObject = {
					name: part,
					path: currentPath,
					children: []
				};
				currentFolder.children.push(newFolder);
				folderMap[currentPath] = newFolder;
			}

			currentFolder = folderMap[currentPath];
		});

		currentFolder.children.push({
			name: fileName,
			path: currentPath,
			children: []
		});
	});

	return [rootFolder];
}