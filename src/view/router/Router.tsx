import React, { useState } from "react";
import { IPageRepository, PageType } from "../../data/page/IPageRepository";
import { ErrorPage } from "../pages/ErrorPage";
import { LandingPage } from "../pages/LandingPage";
import { RecordingPage } from "../pages/RecordingPage";
import { ResultsPage } from "../pages/ResultsPage";
import { useMountEffect } from "../popup/useOnceAfterFirstMount";
import {
    HistoryContext,
    HistoryContextType,
} from "../provider/history/HistoryProvider";
import {
    RecordingContext,
    RecordingContextType,
} from "../provider/recording/RecordingProvider";
import {
    SelectedCountriesContext,
    SelectedCountriesContextType,
} from "../provider/selected-countries/SelectedCountriesProvider";
import { useNullSafeContext } from "../provider/useNullSafeContext";

export const Router = () => {
    const selectedCountriesContext =
        useNullSafeContext<SelectedCountriesContextType>(
            SelectedCountriesContext
        );

    const {
        bytesTransferred,
        emissions,
        startRecording,
        stopRecording,
        userType,
        setUserType,
        error,
    } = useNullSafeContext<RecordingContextType>(RecordingContext);

    const { calculationHistory, refreshCalculationHistory } =
        useNullSafeContext<HistoryContextType>(HistoryContext);

    const [page, setPage] = useState<PageType>("landing");
    const pageRepository = IPageRepository.instance;

    const goToPage = (page: PageType) => {
        setPage(page);
        pageRepository.setCurrentPage(page);
    };

    useMountEffect(() => {
        pageRepository.getCurrentPage().then(async (page) => {
            if (page === "results") {
                await refreshCalculationHistory();
            }
            setPage(page);
        });
    });

    const pageComponents: Record<PageType, React.JSX.Element> = {
        landing: (
            <LandingPage
                onRecordButtonPress={async () => {
                    if (await startRecording()) {
                        goToPage("recording");
                    }
                }}
            />
        ),
        recording: (
            <RecordingPage
                onStopButtonPress={async () => {
                    await stopRecording();
                    goToPage("results");
                }}
                bytesTransferred={bytesTransferred}
                emissions={emissions}
            />
        ),
        results: (
            <ResultsPage
                onRestartButtonPress={async () => {
                    if (await startRecording()) {
                        goToPage("recording");
                    }
                }}
                recordings={calculationHistory}
                selectedCountries={selectedCountriesContext.selectedCountries}
                addSelectedCountry={selectedCountriesContext.addSelectedCountry}
                removeSelectedCountry={
                    selectedCountriesContext.removeSelectedCountry
                }
                setCountryPercentage={
                    selectedCountriesContext.setCountryPercentage
                }
                userType={userType}
                setUserType={setUserType}
                error={error}
            />
        ),
    };

    const renderPage = () => {
        try {
            return pageComponents[page];
        } catch (error: unknown) {
            return <ErrorPage />;
        }
    };

    return (
        <div className="p-10 w-96 flex flex-col justify-stretch gap-6">
            {renderPage()}
        </div>
    );
};
