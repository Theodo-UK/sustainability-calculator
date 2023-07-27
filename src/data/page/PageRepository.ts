import { IStorageRepository } from "../storage/IStorageRepository";
import { IPageRepository, Page } from "./IPageRepository";

export class PageRepository implements IPageRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getCurrentPage(): Promise<Page> {
        try {
            const data = await this.remoteDataSource.get({
                currentPage: "landing",
            });

            return data["currentPage"] as Page;
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async setCurrentPage(page: Page): Promise<void> {
        try {
            await this.remoteDataSource.set({
                currentPage: page,
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
