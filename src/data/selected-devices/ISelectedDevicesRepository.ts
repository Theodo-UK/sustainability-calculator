import { DeviceName } from "../constants/DeviceEmissions";
import { SelectedDevicesRepository } from "./SelectedDevicesRepository";
import { TestSelectedDevicesRepository } from "./TestSelectedDevicesRepository";

export abstract class ISelectedDevicesRepository {
    private static singleton: ISelectedDevicesRepository;
    static get instance(): ISelectedDevicesRepository {
        if (!this.singleton) {
            switch (process.env.ENV) {
                case "development":
                    this.singleton = new SelectedDevicesRepository();
                    break;
                case "test":
                    this.singleton = new TestSelectedDevicesRepository();
                    break;
                default:
                    throw new Error(`Unknown environment: ${process.env.ENV}`);
            }
        }
        return this.singleton;
    }

    abstract getSelectedDevices(): Promise<Map<DeviceName, number>>;

    abstract addSelectedDevice(device: DeviceName): Promise<void>;

    abstract removeSelectedDevice(device: DeviceName): Promise<void>;

    abstract setSelectedDevicePercentage(
        device: DeviceName,
        percentage: number
    ): Promise<void>;
}
