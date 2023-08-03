import React from "react";
import { FaSyncAlt } from "react-icons/fa";
import { useMountEffect } from "../../utils/hooks/useOnceAfterFirstMount";
import { Button } from "../components/atomic/Button";
import { SwitchAtom } from "../components/atomic/SwitchAtom";
import { CalculationHistory } from "../components/calculation-history/CalculationHistory";
import { SelectedCountriesDisclosure } from "../components/countries/SelectedCountriesDisclosure";
import { Results } from "../components/results/Results";
import { SelectedDevicesDisclosure } from "../components/selected-devices/disclosure/SelectedDevicesDisclosure";
import {
    HistoryContext,
    HistoryContextType,
} from "../provider/history/HistoryProvider";
import {
    RecordingContext,
    RecordingContextType,
} from "../provider/recording/RecordingProvider";
import {
    RouterContext,
    RouterContextType,
} from "../provider/router/RouterProvider";
import { useNullSafeContext } from "../provider/useNullSafeContext";

export const ResultsPage = () => {
    const { startRecording, userType, setUserType, error } =
        useNullSafeContext<RecordingContextType>(RecordingContext);
    const { goToPage } = useNullSafeContext<RouterContextType>(RouterContext);
    const { calculationHistory, refreshCalculationHistory } =
        useNullSafeContext<HistoryContextType>(HistoryContext);
    const isReturningUser = userType === "returning user";

    useMountEffect(() => {
        refreshCalculationHistory();
    });

    if (!calculationHistory) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center">
                Sustainability Calculator
            </h1>
            <SelectedCountriesDisclosure />
            <SelectedDevicesDisclosure />
            <Results />
            <Button
                onClick={async () => {
                    if (await startRecording()) {
                        goToPage("recording");
                    }
                }}
                colour="light-green"
            >
                <div className="flex flex-row gap-2 items-center">
                    <FaSyncAlt />
                    <p>Restart recording</p>
                </div>
            </Button>
            <div className="h-6 text-base flex justify-between items-center">
                <p>Returning user?</p>
                <div className="flex flex-row gap-2 items-center">
                    <p>{isReturningUser ? "Yes" : "No"}</p>
                    <SwitchAtom
                        checked={isReturningUser}
                        onChange={(checked) =>
                            setUserType(checked ? "returning user" : "new user")
                        }
                    />
                </div>
            </div>
            <CalculationHistory />
            {error && <p>{error}</p>}
        </>
    );
};
