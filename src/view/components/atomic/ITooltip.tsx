import React from "react";
import { Tooltip } from "react-tooltip";

export const ITooltip = ({ text, id }: { text: string; id: string }) => {
    return (
        <div>
            <a
                className="m-2 rounded-full bg-gray-600 hover:bg-gray-500 w-6 h-6 text-gray-100 hover:text-white font-bold text-md font-mono flex items-center justify-center cursor-pointer"
                data-tooltip-id={"tooltip-" + id}
                data-tooltip-html={text}
            >
                i
            </a>
            <Tooltip id={"tooltip-" + id} />
        </div>
    );
};
