import { useEffect, useState } from "react";
import {
    SelectedDevicesContext,
    SelectedDevicesContextType
} from "../../../provider/selected-devices/SelectedDevicesProvider";
import { useNullSafeContext } from "../../../provider/useNullSafeContext";

export const useSelectedDevices = () => {
    const { selectedDevices, removeSelectedDevice, setDevicePercentage } =
        useNullSafeContext<SelectedDevicesContextType>(SelectedDevicesContext);
    const [averagePercentage, setWorldPercentage] = useState(1);
    const [isPercentageError, setIsPercentageError] = useState(false);

    useEffect(() => {
        const totalPercentage = Array.from(selectedDevices.values()).reduce(
            (total, entry) => total + entry,
            0
        );
        setWorldPercentage(100 - totalPercentage);
    }, [selectedDevices]);

    useEffect(() => {
        const hasPercentageError = Array.from(selectedDevices.values()).some(
            (percentage) => percentage > 100 || percentage < 0
        );
        const worldHasError = averagePercentage > 100 || averagePercentage < 0;
        setIsPercentageError(hasPercentageError || worldHasError);
    }, [selectedDevices, averagePercentage]);

    return {
        isPercentageError,
        averagePercentage,
        selectedDevices,
        removeSelectedDevice,
        setDevicePercentage,
    };
};
