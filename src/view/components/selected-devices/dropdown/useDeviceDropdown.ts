import { useState } from "react";
import {
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    DeviceName,
} from "../../../../data/constants/DeviceEmissions";
import { removeWhiteSpace } from "../../../../utils/helpers/stringHelpers";
import {
    SelectedDevicesContext,
    SelectedDevicesContextType,
} from "../../../provider/selected-devices/SelectedDevicesProvider";
import { useNullSafeContext } from "../../../provider/useNullSafeContext";

export const useDeviceDropdown = () => {
    const { selectedDevices, addSelectedDevice } =
        useNullSafeContext<SelectedDevicesContextType>(SelectedDevicesContext);
    const filteredCountries = Object.keys(
        DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS
    ).filter((device) => !selectedDevices.has(device as DeviceName));

    const [query, setQuery] = useState("");

    const displayedDevices =
        query === ""
            ? filteredCountries
            : filteredCountries.filter((country) =>
                  country
                      .toLowerCase()
                      .includes(removeWhiteSpace(query.toLowerCase()))
              );
    return {
        displayedDevices,
        addSelectedDevice,
        query,
        setQuery,
    };
};
