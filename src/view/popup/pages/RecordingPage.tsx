import React from "react";
import { Button } from "../../components/atomic/Button";
import {
    formatBytes,
    formatEmissions,
} from "../../../utils/helpers/formatNumbersToString";
import { getEmissionsComparison } from "../../../utils/helpers/getEmissionComparison";

type RecordingPageProps = {
    onStopButtonPress: () => void;
    bytesTransferred: number;
    averageSpecificEmissions: number;
    emissions: number;
};

export const RecordingPage = ({
    onStopButtonPress,
    bytesTransferred,
    averageSpecificEmissions,
    emissions,
}: RecordingPageProps) => {
    return (
        <div className="p-10 w-80">
            <h1 className="text-3xl font-bold underline">
                Sustainability Calculator
            </h1>
            <p>Total Data Received: {formatBytes(bytesTransferred)}</p>
            <p>
                Specific Carbon Emissions:
                {` ${formatEmissions(averageSpecificEmissions)} per gigabyte`}
            </p>
            <p>Software Carbon Intensity: {formatEmissions(emissions)}</p>
            <p>
                CO2 emissions are equivalent to:{" "}
                {getEmissionsComparison(emissions)}
            </p>
            <Button onClick={onStopButtonPress} colour="red">
                Stop recording
            </Button>
        </div>
    );
};
