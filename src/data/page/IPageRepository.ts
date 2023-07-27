import { PageRepository } from "./PageRepository";
import { TestPageRepository } from "./TestPageRepository";

export abstract class IPageRepository {
    private static _instance: IPageRepository;
    static get instance(): IPageRepository {
        if (!this._instance) {
            switch (process.env.ENV) {
                case "development":
                    this._instance = new PageRepository();
                    break;
                case "test":
                    this._instance = new TestPageRepository();
                    break;
                default:
                    throw new Error(`Unknown environment: ${process.env.ENV}`);
            }
        }
        return this._instance;
    }

    abstract getCurrentPage(): Promise<PageType>;

    abstract setCurrentPage(page: PageType): Promise<void>;
}

const PAGES = ["landing", "recording", "results"] as const;

export type PageType = (typeof PAGES)[number];

export const parsePage = (string: string): PageType => {
    const page = PAGES.find((validName) => validName === string);
    if (page) {
        return page;
    }
    throw new Error(`${string} is not a page`);
};
