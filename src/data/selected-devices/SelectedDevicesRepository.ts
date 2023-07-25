import { DeviceName } from "../constants/DeviceEmissions";
import { IStorageRepository } from "../storage/IStorageRepository";
import { JSONtoMap, maptoJSON } from "../utils";
import { ISelectedDevicesRepository } from "./ISelectedDevicesRepository";

export class SelectedDevicesRepository implements ISelectedDevicesRepository {
    remoteDataSource: IStorageRepository = IStorageRepository.instance;

    async getSelectedDevicesAndPercentages(): Promise<Map<DeviceName, number>> {
        try {
            const data = await this.remoteDataSource.get({
                getSelectedDevicesAndPercentages: maptoJSON(
                    new Map<DeviceName, number>([])
                ),
            });

            return JSONtoMap(
                data["selectedDevicesAndPercentages"] as DeviceName
            ) as Map<DeviceName, number>;
        } catch (e: unknown) {
            throw Error(e as DeviceName);
        }
    }

    async addSelectedDevice(deviceName: DeviceName): Promise<void> {
        try {
            const newMap = await this.getSelectedDevicesAndPercentages();

            if (!newMap.has(deviceName)) {
                newMap.set(deviceName, 0);
            }

            await this.remoteDataSource.set({
                selectedDevicesAndPercentages: maptoJSON(newMap),
            });
        } catch (e: unknown) {
            throw Error(e as DeviceName);
        }
    }

    async removeSelectedDevice(deviceName: DeviceName): Promise<void> {
        try {
            const newMap = await this.getSelectedDevicesAndPercentages();

            if (newMap.has(deviceName)) {
                newMap.delete(deviceName);
            }

            await this.remoteDataSource.set({
                selectedDevicesAndPercentages: maptoJSON(newMap),
            });
        } catch (e: unknown) {
            throw Error(e as DeviceName);
        }
    }

    async setSelectedDevicePercentage(
        deviceName: DeviceName,
        percentage: number
    ): Promise<void> {
        try {
            const newMap = await this.getSelectedDevicesAndPercentages();

            if (newMap.has(deviceName)) {
                newMap.set(deviceName, percentage);
            } else {
                throw Error(
                    `SelectedDevicesRemoteDataSource.setSelectedDevicePercentage: DeviceName ${deviceName} not found`
                );
            }

            await this.remoteDataSource.set({
                selectedDevicesAndPercentages: maptoJSON(newMap),
            });
        } catch (e: unknown) {
            throw Error(e as DeviceName);
        }
    }
}
