import { IStorageRepository } from "../storage/IStorageRepository";
import { StorageKeys } from "../storage/StorageKeys";
import { IPageRepository, PageType, parsePage } from "./IPageRepository";

export class PageRepository implements IPageRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getCurrentPage(): Promise<PageType> {
        const data = await this.remoteDataSource.get<string>(
            StorageKeys.currentPage,
            "landing"
        );

        return parsePage(data);
    }

    async setCurrentPage(page: PageType): Promise<void> {
        await this.remoteDataSource.set(StorageKeys.currentPage, page);
    }
}
