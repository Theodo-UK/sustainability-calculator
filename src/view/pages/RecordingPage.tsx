import React from "react";
import { FaPause } from "react-icons/fa";
import {
    formatBytes,
    formatEmissions,
} from "../../utils/helpers/formatNumbersToString";
import { Button } from "../components/atomic/Button";
import { PageTooltip } from "../components/atomic/PageTooltip";
import {
    RecordingContext,
    RecordingContextType,
} from "../provider/recording/RecordingProvider";
import {
    RouterContext,
    RouterContextType,
} from "../provider/router/RouterProvider";
import { useNullSafeContext } from "../provider/useNullSafeContext";

export const RecordingPage = () => {
    const { emissions, bytesTransferred, stopRecording } =
        useNullSafeContext<RecordingContextType>(RecordingContext);
    const { goToPage } = useNullSafeContext<RouterContextType>(RouterContext);
    return (
        <>
            <div className="absolute top-1 right-1">
                <PageTooltip
                    text="Stopping this recording will store<br />the data in your calculations history"
                    id="recording-page"
                />
            </div>
            <h1 className="text-2xl font-bold text-center">
                Recording in progress
            </h1>
            <p className="h-24 text-base bg-nyanza flex flex-column flex-wrap content-evenly justify-center text-center rounded-2xl shadow font-medium">
                {formatBytes(bytesTransferred)}
                <br />
                {`${formatEmissions(emissions)} grams of CO2`}
            </p>
            <Button
                text="Stop Recording"
                onClick={async () => {
                    await stopRecording();
                    goToPage("results");
                }}
                colour="burgundy"
                type="icon"
            >
                <FaPause />
            </Button>
            <div className="h-10" />
        </>
    );
};
