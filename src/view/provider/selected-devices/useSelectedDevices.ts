import { useState } from "react";

import { DeviceName } from "../../../data/constants/DeviceEmissions";
import { SelectedDevicesRepository } from "../../../data/selected-devices/SelectedDevicesRepository";
import { useMountEffect } from "../../../utils/hooks/useOnceAfterFirstMount";
import { percentageAboveHundredString } from "../../../utils/messages/errorMessages";
import { SelectedDevicesContextType } from "./SelectedDevicesProvider";

export const useSelectedDevices = (): SelectedDevicesContextType => {
    const [selectedDevices, setSelectedDevices] = useState<
        Map<DeviceName, number>
    >(new Map<DeviceName, number>());
    const addSelectedDevice = async (device: DeviceName) => {
        await SelectedDevicesRepository.addSelectedDevice(device);
        const newSelectedDevices =
            await SelectedDevicesRepository.getSelectedDevices();
        setSelectedDevices(newSelectedDevices);
    };

    const removeSelectedDevice = async (device: DeviceName) => {
        await SelectedDevicesRepository.removeSelectedDevice(device);
        const newSelectedDevices =
            await SelectedDevicesRepository.getSelectedDevices();
        setSelectedDevices(newSelectedDevices);
    };

    const setDevicePercentage = async (
        device: DeviceName,
        percentage: number
    ) => {
        await SelectedDevicesRepository.setSelectedDevicePercentage(
            device,
            percentage
        );
        const newSelectedDevices =
            await SelectedDevicesRepository.getSelectedDevices();
        setSelectedDevices(newSelectedDevices);
    };
    const validatePercentages = () => {
        const percentage = Array.from(selectedDevices.values()).reduce(
            (accumulator, device) => {
                return accumulator + device;
            },
            0
        );

        if (percentage > 100) {
            throw new Error(percentageAboveHundredString(percentage));
        }
    };

    useMountEffect(() => {
        const getSelectedDevicesAndSetState = async () => {
            const selectedDevices =
                await SelectedDevicesRepository.getSelectedDevices();
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
