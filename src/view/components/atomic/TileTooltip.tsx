import React from "react";
import { Tooltip } from "react-tooltip";

export const TileTooltip = ({ text, id }: { text: string; id: string }) => {
    return (
        <>
            <a
                className="country-tile-button rounded-full font-mono cursor-pointer"
                data-tooltip-id={"tooltip-" + id}
                data-tooltip-html={text}
            >
                i
            </a>
            <Tooltip id={"tooltip-" + id} />
        </>
    );
};
