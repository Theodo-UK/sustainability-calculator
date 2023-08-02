import React, { createContext } from "react";
import { DeviceName } from "../../../data/constants/DeviceEmissions";
import { useSelectedDevices } from "./useSelectedDevices";

interface Props {
    children: React.ReactNode;
}

export type SelectedDevicesContextType = {
    selectedDevices: Map<DeviceName, number>;
    addSelectedDevice: (device: DeviceName) => Promise<void>;
    removeSelectedDevice: (device: DeviceName) => Promise<void>;
    setDevicePercentage: (
        device: DeviceName,
        percentage: number
    ) => Promise<void>;
    validatePercentages: () => void;
};

export const SelectedDevicesContext =
    createContext<SelectedDevicesContextType | null>(null);

export const SelectedDevicesProvider = ({ children }: Props) => {
    const selectedDevicesContext = useSelectedDevices();

    return (
        <SelectedDevicesContext.Provider value={selectedDevicesContext}>
            {children}
        </SelectedDevicesContext.Provider>
    );
};
