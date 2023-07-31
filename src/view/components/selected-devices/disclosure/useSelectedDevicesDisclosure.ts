import {
    SelectedDevicesContext,
    SelectedDevicesContextType,
} from "../../../provider/selected-devices/SelectedDevicesProvider";
import { useNullSafeContext } from "../../../provider/useNullSafeContext";

export const useSelectedDevicesDisclosure = () => {
    const { selectedDevices } = useNullSafeContext<SelectedDevicesContextType>(
        SelectedDevicesContext
    );

    return {
        selectedDevices,
    };
};
