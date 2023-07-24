import React from "react";
import {
    formatBytes,
    formatEmissions,
} from "../../../utils/helpers/formatNumbersToString";
import { Button } from "../../components/atomic/Button";
import { PageTooltip } from "../../components/atomic/PageTooltip";

type RecordingPageProps = {
    onStopButtonPress: () => void;
    bytesTransferred: number;
    emissions: number;
};

export const RecordingPage = ({
    onStopButtonPress,
    bytesTransferred,
    emissions,
}: RecordingPageProps) => {
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
                onClick={onStopButtonPress}
                colour="burgundy"
                type="icon"
            >
                -
            </Button>
            <div className="h-10" />
        </>
    );
};
