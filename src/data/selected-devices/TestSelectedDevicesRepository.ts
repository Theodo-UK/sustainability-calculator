import { DeviceName } from "../constants/DeviceEmissions";
import { ISelectedDevicesRepository } from "./ISelectedDevicesRepository";

export class TestSelectedDevicesRepository
    implements ISelectedDevicesRepository
{
    private _selectedDevices: Map<DeviceName, number> = new Map<
        DeviceName,
        number
    >([]);

    async getSelectedDevicesAndPercentages(): Promise<Map<DeviceName, number>> {
        return this._selectedDevices;
    }

    async addSelectedDevice(deviceName: DeviceName): Promise<void> {
        const newMap = new Map(this._selectedDevices);
        if (!newMap.has(deviceName)) {
            newMap.set(deviceName, 0);
        }
        this._selectedDevices = newMap;
    }

    async removeSelectedDevice(deviceName: DeviceName): Promise<void> {
        const newMap = new Map(this._selectedDevices);
        if (newMap.has(deviceName)) {
            newMap.delete(deviceName);
        }
        this._selectedDevices = newMap;
    }

    async setSelectedDevicePercentage(
        deviceName: DeviceName,
        percentage: number
    ): Promise<void> {
        const newMap = new Map(this._selectedDevices);
        if (newMap.has(deviceName)) {
            newMap.set(deviceName, percentage);
        }
        this._selectedDevices = newMap;
    }
}
