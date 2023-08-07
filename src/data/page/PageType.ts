const PAGES = ["landing", "recording", "results"] as const;
export type PageType = (typeof PAGES)[number];

export const parsePage = (string: string): PageType => {
    const page = PAGES.find((validName) => validName === string);
    if (page) {
        return page;
    }
    throw new Error(`${string} is not a page`);
};
