import { IStorageRepository } from "../storage/IStorageRepository";
import { IBytesRepository } from "./IBytesRepository";

export class BytesRepository implements IBytesRepository {
    private remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getTotalBytesTransferred(): Promise<number> {
        const object = await this.remoteDataSource.get({
            bytesTransferred: 0,
        });
        return object.bytesTransferred as number;
    }

    async addBytesTransferred(bytes: number): Promise<void> {
        // ! get and set
        this.remoteDataSource.getAndSet("bytesTransferred", (object: any) => {
            // console.log(
            //     `BytesRepository.addBytesTransferred, ${object["bytesTransferred"]}`
            // );
            return object["bytesTransferred"] + bytes;
        });
        // ! then
        // this.getTotalBytesTransferred().then(async (currentBytes) => {
        //     console.log(`BytesRepository.addBytesTransferred, ${currentBytes}`);
        //     await this.remoteDataSource.set({
        //         bytesTransferred: currentBytes + bytes,
        //     });
        // });
        // ! Await only
        // const currentBytes = await this.getTotalBytesTransferred().then();
        // await this.remoteDataSource.set({
        //     bytesTransferred: currentBytes + bytes,
        // });
        // console.log(`BytesRepository.addBytesTransferred, ${currentBytes}`);
    }

    async clearTotalBytesTransferred(): Promise<void> {
        await this.remoteDataSource.set({
            bytesTransferred: 0,
        });
    }
}
