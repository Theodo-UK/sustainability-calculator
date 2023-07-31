import { useState } from "react";
import {
    DEVICE_LIFETIME_CO2_EMISSIONS_GRAMS,
    DeviceName,
} from "../../../../data/constants/DeviceEmissions";
import { removeWhiteSpace } from "../../../../utils/helpers/stringHelpers";
import { useRootContext } from "../../../provider/useRootContext";

export const useDeviceDropdown = () => {
    const {
        selectedDevicesContext: { selectedDevices, addSelectedDevice },
    } = useRootContext();
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
