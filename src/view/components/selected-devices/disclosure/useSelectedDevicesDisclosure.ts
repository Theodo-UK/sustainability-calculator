import { useRootContext } from "../../../provider/useRootContext";

export const useSelectedDevicesDisclosure = () => {
    const {
        selectedDevicesContext: { selectedDevices },
    } = useRootContext();

    return {
        selectedDevices,
    };
};
