import React from "react";
import { Button } from "../../../view/components/atomic/Button";
import { PageTooltip } from "../../components/atomic/PageTooltip";

export const LandingPage = ({
    onRecordButtonPress,
}: {
    onRecordButtonPress: () => void;
}) => {
    return (
        <>
            <div className="absolute top-1 right-1">
                <PageTooltip
                    text="Starting this recording will calculate<br/>the carbon emissions of users on this webpage"
                    id="landing-page"
                />
            </div>
            <h1 className="text-2xl font-bold text-center">
                Sustainability Calculator
            </h1>
            <div className="h-24 text-base bg-nyanza flex flex-column flex-wrap content-evenly justify-center rounded-2xl shadow font-medium">
                <p>Click below to get started</p>
            </div>
            <Button
                text="Start Recording"
                onClick={onRecordButtonPress}
                colour="light-green"
                type="icon"
            >
                +
            </Button>
            <div className="h-10" />
        </>
    );
};
