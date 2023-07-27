import { useContext } from "react";
import { SelectedCountriesContext } from "./selected-countries/SelectedCountriesProvider";

export const useRootContext = () => {
    const selectedCountriesContext = useContext(SelectedCountriesContext);
    if (selectedCountriesContext === null) {
        throw Error("SelectedCountriesContext is null");
    }
    return {
        selectedCountriesContext,
    };
};
