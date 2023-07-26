import React from "react";
import { createRoot } from "react-dom/client";
import "./../../input.css";

import { RootProvider } from "../provider/RootProvider";
import { Router } from "../router/Router";

export const Popup = () => {
    return (
        <RootProvider>
            <Router />
        </RootProvider>
    );
};

const rootElement = document.getElementById("react-target");

if (!rootElement) {
    throw new Error("Couldn't find react target");
}

createRoot(rootElement).render(<Popup />);
