import React from "react";
import { FaPlay } from "react-icons/fa";
import { Button } from "../../components/atomic/Button";
import { PageTooltip } from "../../components/atomic/PageTooltip";
import { useLandingPage } from "./useLandingPage";

export const LandingPage = () => {
    const { onRecordButtonPress } = useLandingPage();
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
                <FaPlay />
            </Button>
            <div className="h-10" />
        </>
    );
};
