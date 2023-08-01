import {
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    DeviceName,
} from "../constants/DeviceEmissions";
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

const deviceNames = Object.keys(
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS
) as DeviceName[];

export const isSelectedDevicesMap = (
    data: unknown
): data is Map<DeviceName, number> => {
    if (!(data instanceof Map)) {
        return false;
    }

    const keys = Array.from(data.keys());
    const values = Array.from(data.values());

    if (
        keys.some((key) => !deviceNames.includes(key)) ||
        values.some((value) => typeof value !== "number")
    ) {
        return false;
    }

    return true;
};
