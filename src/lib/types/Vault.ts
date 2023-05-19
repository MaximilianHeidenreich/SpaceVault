import type { Page } from "./Page";

export interface Vault {
    key: string;
    primary: boolean;
    index: string | null;      // Full path to index file to redirect to
    styles: string[];
    pages: Page[];
}