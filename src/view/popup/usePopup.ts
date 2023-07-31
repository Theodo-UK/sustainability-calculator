import { useRootContext } from "../provider/useRootContext";

export const usePopup = () => {
    const {
        selectedCountriesContext: { selectedCountries, validatePercentages },
    } = useRootContext();

    return {
        emissions,
        bytesTransferred,
        stopRecording,
        calculationHistory,
        refreshCalculationHistory,
        userType,
        setUserType,
    };
};
