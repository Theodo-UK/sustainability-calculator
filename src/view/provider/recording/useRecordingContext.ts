import { useState } from "react";
import {
    ICalculationsRepository,
    UserType,
} from "../../../data/calculations/ICalculationsRepository";
import { calculateAverageSpecificEmissionsHelper } from "../../popup/utils/calculateAverageSpecificEmissions";
import { refreshActiveTabAndRecordBytes } from "../../popup/utils/refreshActiveTabAndRecordBytes";
import { useRootContext } from "../useRootContext";
import { RecordingContextType } from "./RecordingProvider";

export const useRecordingContext = (): RecordingContextType => {
    const {
        selectedCountriesContext: { selectedCountries, validatePercentages },
    } = useRootContext();

    const calculationsRepository: ICalculationsRepository =
        ICalculationsRepository.instance;

    const [error, setError] = useState<string>();
    const [averageSpecificEmissions, setAverageSpecificEmissions] = useState(0);
    const [userType, setUserType] = useState<UserType>("new user");

    const startRecording = async (): Promise<boolean> => {
        try {
            validatePercentages();
            setAverageSpecificEmissions(
                calculateAverageSpecificEmissionsHelper(selectedCountries)
            );
            await calculationsRepository.setOngoingCalculation(true);
            await refreshActiveTabAndRecordBytes(userType === "new user");
            setError(undefined);

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
            return false;
        }
    };
    return { startRecording };
};
