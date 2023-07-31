import { useState } from "react";

import { DeviceName } from "../../../data/constants/DeviceEmissions";
import { ISelectedDevicesRepository } from "../../../data/selected-devices/ISelectedDevicesRepository";
import { percentageAboveHundredString } from "../../../utils/messages/errorMessages";
import { useMountEffect } from "../../popup/useOnceAfterFirstMount";
import { SelectedDevicesContextType } from "./SelectedDevicesProvider";

export const useSelectedDevicesContext = (): SelectedDevicesContextType => {
    const selectedDevicesRepository: ISelectedDevicesRepository =
        ISelectedDevicesRepository.instance;
    const [selectedDevices, setSelectedDevices] = useState<
        Map<DeviceName, number>
    >(new Map<DeviceName, number>());
    const addSelectedDevice = async (device: DeviceName) => {
        await selectedDevicesRepository.addSelectedDevice(device);
        const newSelectedDevices =
            await selectedDevicesRepository.getSelectedDevices();
        setSelectedDevices(newSelectedDevices);
    };

    const removeSelectedDevice = async (device: DeviceName) => {
        await selectedDevicesRepository.removeSelectedDevice(device);
        const newSelectedDevices =
            await selectedDevicesRepository.getSelectedDevices();
        setSelectedDevices(newSelectedDevices);
    };

    const setDevicePercentage = async (
        device: DeviceName,
        percentage: number
    ) => {
        await selectedDevicesRepository.setSelectedDevicePercentage(
            device,
            percentage
        );
        const newSelectedDevices =
            await selectedDevicesRepository.getSelectedDevices();
        setSelectedDevices(newSelectedDevices);
    };
    const validatePercentages = () => {
        const percentage = Array.from(selectedDevices.values()).reduce(
            (accumulator, device) => {
                return accumulator + device;
            },
            0
        );

        if (percentage > 1) {
            throw new Error(percentageAboveHundredString(percentage * 100));
        }
    };

    useMountEffect(() => {
        const getSelectedDevicesAndSetState = async () => {
            const selectedDevices =
                await selectedDevicesRepository.getSelectedDevices();
            setSelectedDevices(selectedDevices);
        };
        getSelectedDevicesAndSetState();
    });

    return {
        selectedDevices,
        addSelectedDevice,
        removeSelectedDevice,
        setDevicePercentage,
        validatePercentages,
    };
};
