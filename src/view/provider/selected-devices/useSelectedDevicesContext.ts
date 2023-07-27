import { useState } from "react";

import { DeviceName } from "../../../data/constants/DeviceEmissions";
import { ISelectedDevicesRepository } from "../../../data/selected-devices/ISelectedDevicesRepository";
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
            throw new Error(
                `Error: The sum of the percentages is greater than 100%. Current sum: ${(
                    percentage * 100
                ).toFixed(0)}%`
            );
        }
    };

    useMountEffect(() => {
        const getSelectedDevicesAndSetState = async () => {
            const _selectedDevices =
                await selectedDevicesRepository.getSelectedDevices();
            setSelectedDevices(_selectedDevices);
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
