export type PageVisibility = "public" | "private" | "protected";

export interface Page {
    absolutePath: string; // Full path to page file (e.g. /quotes/2023/example.md) -> IS unique identifier!
    folder: string; // Path to folder without file name (e.g. /quotes/2023)
    fileName: string; // Name of page file (e.g. example.md)
    slug: string; // Slug of page (displayName), can be overriden by frontmatter
    hash: string; // Sha hash of file
    visibility: PageVisibility;
}