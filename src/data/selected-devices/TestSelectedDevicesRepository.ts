import { DeviceName } from "../constants/DeviceEmissions";
import { ISelectedDevicesRepository } from "./ISelectedDevicesRepository";

export class TestSelectedDevicesRepository
    implements ISelectedDevicesRepository
{
    private _selectedDevices: Map<DeviceName, number> = new Map<
        DeviceName,
        number
    >([]);

    async getSelectedDevices(): Promise<Map<DeviceName, number>> {
        return this._selectedDevices;
    }

    async addSelectedDevice(device: DeviceName): Promise<void> {
        const newMap = new Map(this._selectedDevices);
        if (!newMap.has(device)) {
            newMap.set(device, 0);
        }
        this._selectedDevices = newMap;
    }

    async removeSelectedDevice(device: DeviceName): Promise<void> {
        const newMap = new Map(this._selectedDevices);
        if (newMap.has(device)) {
            newMap.delete(device);
        }
        this._selectedDevices = newMap;
    }

    async setSelectedDevicePercentage(
        device: DeviceName,
        percentage: number
    ): Promise<void> {
        const newMap = new Map(this._selectedDevices);
        if (newMap.has(device)) {
            newMap.set(device, percentage);
        }
        this._selectedDevices = newMap;
    }
}
