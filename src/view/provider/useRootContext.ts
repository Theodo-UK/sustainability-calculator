import { useContext } from "react";
import { RecordingContext } from "./recording/RecordingProvider";
import { SelectedCountriesContext } from "./selected-countries/SelectedCountriesProvider";
import { SelectedDevicesContext } from "./selected-devices/SelectedDevicesProvider";

export const useRootContext = () => {
    const selectedCountriesContext = useContext(SelectedCountriesContext);
    if (selectedCountriesContext === null) {
        throw Error("SelectedCountriesContext is null");
    }
    const selectedDevicesContext = useContext(SelectedDevicesContext);
    if (selectedDevicesContext === null) {
        throw Error("SelectedDevicesContext is null");
    }
    const recordingContext = useContext(RecordingContext);
    if (recordingContext === null) {
        throw Error("SelectedDevicesContext is null");
    }
    return {
        selectedCountriesContext,
        selectedDevicesContext,
        recordingContext,
    };
};
