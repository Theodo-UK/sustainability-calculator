import { DeviceName } from "../constants/DeviceEmissions";
import { SelectedDevicesRepository } from "./SelectedDevicesRepository";
import { TestSelectedDevicesRepository } from "./TestSelectedDevicesRepository";

export abstract class ISelectedDevicesRepository {
    private static _instance: ISelectedDevicesRepository;
    static get instance(): ISelectedDevicesRepository {
        if (!this._instance) {
            switch (process.env.ENV) {
                case "development":
                    this._instance = new SelectedDevicesRepository();
                    break;
                case "test":
                    this._instance = new TestSelectedDevicesRepository();
                    break;
                default:
                    throw new Error(`Unknown environment: ${process.env.ENV}`);
            }
        }
        return this._instance;
    }

    abstract getSelectedDevicesAndPercentages(): Promise<
        Map<DeviceName, number>
    >;

    abstract addSelectedDevice(deviceName: DeviceName): Promise<void>;

    abstract removeSelectedDevice(deviceName: DeviceName): Promise<void>;

    abstract setSelectedDevicePercentage(
        deviceName: DeviceName,
        percentage: number
    ): Promise<void>;
}
