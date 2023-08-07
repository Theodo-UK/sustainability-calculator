import { JSONtoMap, maptoJSON } from "../../utils/helpers/jsonHelpers";
import { DeviceName } from "../constants/DeviceEmissions";
import { IStorageRepository } from "../storage/IStorageRepository";
import { StorageKeys } from "../storage/StorageKeys";
import { isSelectedDevicesMap } from "./DeviceNames";

export const SelectedDevicesRepository = {
    getSelectedDevices: async function (): Promise<Map<DeviceName, number>> {
        const data = await IStorageRepository.instance.get<string>(
            StorageKeys.selectedDevices,
            maptoJSON(new Map<DeviceName, number>([]))
        );

        const map = JSONtoMap(data);
        if (!isSelectedDevicesMap(map)) {
            throw Error(`data ${data} is not a valid map`);
        }
        return map;
    },

    addSelectedDevice: async function (device: DeviceName): Promise<void> {
        const newMap = await this.getSelectedDevices();

        if (!newMap.has(device)) {
            newMap.set(device, 0);
        }

        await IStorageRepository.instance.set(
            StorageKeys.selectedDevices,
            maptoJSON(newMap)
        );
    },

    removeSelectedDevice: async function (device: DeviceName): Promise<void> {
        const newMap = await this.getSelectedDevices();

        if (newMap.has(device)) {
            newMap.delete(device);
        }

        await IStorageRepository.instance.set(
            StorageKeys.selectedDevices,
            maptoJSON(newMap)
        );
    },

    setSelectedDevicePercentage: async function (
        device: DeviceName,
        percentage: number
    ): Promise<void> {
        const newMap = await this.getSelectedDevices();

        if (newMap.has(device)) {
            newMap.set(device, percentage);
        } else {
            throw Error(
                `SelectedDevicesRemoteDataSource.setSelectedDevicePercentage: device ${device} not found`
            );
        }

        await IStorageRepository.instance.set(
            StorageKeys.selectedDevices,
            maptoJSON(newMap)
        );
    },
};
