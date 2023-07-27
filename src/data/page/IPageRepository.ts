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

    abstract getCurrentPage(): Promise<Page>;

    abstract setCurrentPage(page: Page): Promise<void>;
}

export type Page = "landing" | "recording" | "results";
