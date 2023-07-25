import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { Dropdown } from "../atomic/Dropdown";

describe("Dropdown", () => {
    it("should show add an element", () => {
        const addSelectedElement = jest.fn();
        const selectedElements = new Map();
        const { getByPlaceholderText } = render(
            <Dropdown
                selectedElements={selectedElements}
                addSelectedElement={addSelectedElement}
                fullList={Object.keys({})}
                placeholder="Add an element"
            />
        );

        expect(getByPlaceholderText("Add an element")).toBeInTheDocument();
    });
});
