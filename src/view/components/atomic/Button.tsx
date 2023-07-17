import React from "react";

export const Button = ({
    onClick,
    children,
    colour = "blue",
}: {
    onClick: () => void;
    children: React.ReactNode;
    colour?: "blue" | "green" | "red" | "gray";
}) => {
    const className = `my-1 shadow bg-${colour}-500 marker:hover:bg-${colour}-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full`;
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
};
