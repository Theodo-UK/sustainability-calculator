import { IPageRepository, PageType } from "./IPageRepository";

export class TestPageRepository implements IPageRepository {
    private _page: PageType = "landing";

    async getCurrentPage(): Promise<PageType> {
        return this._page;
    }

    async setCurrentPage(page: PageType): Promise<void> {
        this._page = page;
    }
}
