import { IStorageRepository } from "../storage/IStorageRepository";
import { IPageRepository, PageType, parsePage } from "./IPageRepository";

export class PageRepository implements IPageRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getCurrentPage(): Promise<PageType> {
        const data = await this.remoteDataSource.get({
            currentPage: "landing",
        });

        return parsePage(data["currentPage"] as string);
    }

    async setCurrentPage(page: PageType): Promise<void> {
        await this.remoteDataSource.set({
            currentPage: page,
        });
    }
}
