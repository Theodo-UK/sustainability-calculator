import { JSONtoMap, maptoJSON } from "../../utils/helpers/jsonHelpers";
import { DeviceName } from "../constants/DeviceEmissions";
import { IStorageRepository } from "../storage/IStorageRepository";
import { ISelectedDevicesRepository } from "./ISelectedDevicesRepository";

export class SelectedDevicesRepository implements ISelectedDevicesRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getSelectedDevices(): Promise<Map<DeviceName, number>> {
        try {
            const data = await this.remoteDataSource.get({
                selectedDevices: maptoJSON(new Map<DeviceName, number>([])),
            });

            return JSONtoMap(data["selectedDevices"] as string) as Map<
                DeviceName,
                number
            >;
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async addSelectedDevice(device: DeviceName): Promise<void> {
        try {
            const newMap = await this.getSelectedDevices();

            if (!newMap.has(device)) {
                newMap.set(device, 0);
            }

            await this.remoteDataSource.set({
                selectedDevices: maptoJSON(newMap),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async removeSelectedDevice(device: DeviceName): Promise<void> {
        try {
            const newMap = await this.getSelectedDevices();

            if (newMap.has(device)) {
                newMap.delete(device);
            }

            await this.remoteDataSource.set({
                selectedDevices: maptoJSON(newMap),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }

    async setSelectedDevicePercentage(
        device: DeviceName,
        percentage: number
    ): Promise<void> {
        try {
            const newMap = await this.getSelectedDevices();

            if (newMap.has(device)) {
                newMap.set(device, percentage);
            } else {
                throw Error(
                    `SelectedDevicesRemoteDataSource.setSelectedDevicePercentage: device ${device} not found`
                );
            }

            await this.remoteDataSource.set({
                selectedDevices: maptoJSON(newMap),
            });
        } catch (e: unknown) {
            throw Error(e as string);
        }
    }
}
