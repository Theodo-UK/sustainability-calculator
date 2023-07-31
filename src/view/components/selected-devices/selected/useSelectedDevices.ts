import { useEffect, useState } from "react";
import { useRootContext } from "../../../provider/useRootContext";

export const useSelectedDevices = () => {
    const {
        selectedDevicesContext: {
            selectedDevices,
            removeSelectedDevice,
            setDevicePercentage,
        },
    } = useRootContext();
    const [averagePercentage, setWorldPercentage] = useState(1);
    const [isPercentageError, setIsPercentageError] = useState(false);

    useEffect(() => {
        const totalPercentage = Array.from(selectedDevices.values()).reduce(
            (total, entry) => total + entry,
            0
        );
        setWorldPercentage(1 - totalPercentage);
    }, [selectedDevices]);

    useEffect(() => {
        const hasPercentageError = Array.from(selectedDevices.values()).some(
            (percentage) => percentage > 1 || percentage < 0
        );
        const worldHasError = averagePercentage > 1 || averagePercentage < 0;
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
