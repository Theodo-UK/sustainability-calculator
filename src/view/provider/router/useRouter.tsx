import React, { useState } from "react";
import { PageRepository } from "../../../data/page/PageRepository";
import { PageType } from "../../../data/page/PageType";
import { useMountEffect } from "../../../utils/hooks/useOnceAfterFirstMount";
import { ErrorPage } from "../../pages/ErrorPage";
import { RecordingPage } from "../../pages/RecordingPage";
import { ResultsPage } from "../../pages/ResultsPage";
import { LandingPage } from "../../pages/landing/LandingPage";
import { RouterContextType } from "./RouterProvider";

export const useRouter = (): RouterContextType => {
    const [page, setPage] = useState<PageType>("landing");

    const goToPage = (page: PageType) => {
        setPage(page);
        PageRepository.setCurrentPage(page);
    };

    useMountEffect(() => {
        PageRepository.getCurrentPage().then((page) => {
            setPage(page);
        });
    });

    const pageComponents: Record<PageType, React.JSX.Element> = {
        landing: <LandingPage />,
        recording: <RecordingPage />,
        results: <ResultsPage />,
    };

    const renderPage = () => {
        try {
            return pageComponents[page];
        } catch (error: unknown) {
            return <ErrorPage />;
        }
    };
    return {
        goToPage,
        renderPage,
    };
};
