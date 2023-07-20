import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { IStorageRepository } from "../../data/storage/IStorageRepository";
import "./../../input.css";
import { ErrorPage } from "./pages/ErrorPage";
import { LandingPage } from "./pages/LandingPage";
import { RecordingPage } from "./pages/RecordingPage";
import { ResultsPage } from "./pages/ResultsPage";
import { useMountEffect } from "./useOnceAfterFirstMount";
import { usePopup } from "./usePopup";

type Page = "landing" | "recording" | "results";

export const Popup = () => {
    const {
        bytesTransferred,
        emissions,
        selectedCountries,
        addSelectedCountry,
        removeSelectedCountry,
        setCountryPercentage,
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

    useMountEffect(() => {
        remoteRepository
            .get({ currentPage: "landing" })
            .then((data) => data.currentPage as Page)
            .then(async (storedPage) => {
                if (storedPage === "results") {
                    await refreshCalculationHistory();
                }
                setPage(storedPage);
            });
    });

    return (
        <div className="p-10 pb-20 w-96 flex flex-col justify-stretch gap-6">
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
        </div>
    );
};

const rootElement = document.getElementById("react-target");

if (!rootElement) {
    throw new Error("Couldn't find react target");
}

createRoot(rootElement).render(<Popup />);
