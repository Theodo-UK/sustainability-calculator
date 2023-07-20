import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { usePopup } from "./usePopup";
import "./../../input.css";
import { LandingPage } from "./pages/LandingPage";
import { RecordingPage } from "./pages/RecordingPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { IStorageRepository } from "../../data/storage/IStorageRepository";

type Page = "landing" | "recording" | "results";

export const Popup = () => {
    const {
        bytesTransferred,
        emissions,
        selectedCountries,
        addSelectedCountry,
        removeSelectedCountry,
        setCountryPercentage,
        averageSpecificEmissions,
        refreshAndGetSize,
        stopRecording,
        refreshCalculationHistory,
        calculationHistory,
        error,
    } = usePopup();

    const [page, setPage] = useState<Page>("landing");
    const remoteRepository = IStorageRepository.instance;

    const goToPage = (page: Page) => {
        setPage(page);
        remoteRepository.set({ currentPage: page });
    };

    return (
        <>
            {page === "landing" ? (
                <LandingPage
                    onRecordButtonPress={async () => {
                        goToPage("recording");
                        await refreshAndGetSize(true);
                    }}
                />
            ) : page === "recording" ? (
                <RecordingPage
                    onStopButtonPress={async () => {
                        await stopRecording();
                        goToPage("results");
                    }}
                    bytesTransferred={bytesTransferred}
                    averageSpecificEmissions={averageSpecificEmissions}
                    emissions={emissions}
                />
            ) : page === "results" ? (
                <ResultsPage
                    onRestartButtonPress={async () => {
                        goToPage("recording");
                        await refreshAndGetSize(false);
                    }}
                    recordings={calculationHistory}
                    selectedCountries={selectedCountries}
                    addSelectedCountry={addSelectedCountry}
                    removeSelectedCountry={removeSelectedCountry}
                    setCountryPercentage={setCountryPercentage}
                    refreshCalculationHistory={refreshCalculationHistory}
                    error={error}
                />
            ) : (
                <ErrorPage />
            )}
        </>
    );
};

const rootElement = document.getElementById("react-target");

if (!rootElement) {
    throw new Error("Couldn't find react target");
}

createRoot(rootElement).render(<Popup />);
