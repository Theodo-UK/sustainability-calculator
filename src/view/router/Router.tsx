import React from "react";
import {
    RouterContext,
    RouterContextType,
} from "../provider/router/RouterProvider";
import { useNullSafeContext } from "../provider/useNullSafeContext";

export const Router = () => {
    const { renderPage } = useNullSafeContext<RouterContextType>(RouterContext);

    return (
        <div className="p-10 w-96 flex flex-col justify-stretch gap-6">
            {renderPage()}
        </div>
    );
};
