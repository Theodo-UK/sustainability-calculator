import { IPageRepository, Page } from "./IPageRepository";

export class TestPageRepository implements IPageRepository {
    private _page: Page = "landing";

    async getCurrentPage(): Promise<Page> {
        return this._page;
    }

    async setCurrentPage(page: Page): Promise<void> {
        this._page = page;
    }
}
