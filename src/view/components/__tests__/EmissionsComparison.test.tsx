import React from "react";

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { CountryName } from "../../../data/constants/CountryEmissions";
import { EmissionsComparison } from "../emissions-comparison/EmissionsComparison";

describe("EmissionsComparison", () => {
    it("renders the correct image and description", () => {
        const { getByText, getByTestId } = render(
            <EmissionsComparison
                calculation={{
                    bytes: 0,
                    emissions: 0.199,
                    specificEmissions: 0,
                    selectedCountries: new Map<CountryName, number>(),
                    unixTimeMs: 0,
                    userType: "new user",
                }}
            />
        );

        expect(getByText("1 Google Search")).toBeInTheDocument();
        expect(getByTestId("Google Search")).toBeInTheDocument();
    });
});
