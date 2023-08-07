import { IStorageRepository } from "../storage/IStorageRepository";
import { StorageKeys } from "../storage/StorageKeys";
import { PageType, parsePage } from "./PageType";

export const PageRepository = {
    getCurrentPage: async (): Promise<PageType> => {
        const data = await IStorageRepository.instance.get<string>(
            StorageKeys.currentPage,
            "landing"
        );

        return parsePage(data);
    },
    setCurrentPage: async (page: PageType): Promise<void> => {
        await IStorageRepository.instance.set(StorageKeys.currentPage, page);
    },
};
