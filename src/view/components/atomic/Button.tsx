import React from "react";

export const Button = ({
    text,
    onClick,
    children,
    colour,
    type = "text",
}: {
    text?: string;
    onClick: () => void;
    children: React.ReactNode;
    colour: "light-green" | "burgundy";
    type?: "text" | "icon";
}) => {
    const buttonClass =
        "p-2 shadow-lg active:shadow-none focus:shadow-outline focus:outline-none duration-200 rounded-2xl ";

    const greenClass =
        buttonClass +
        `bg-light-green text-myrtle-green hover:bg-myrtle-green hover:text-nyanza`;
    const redClass =
        buttonClass +
        `bg-red-500 text-raisin-black hover:bg-rose-quartz hover:text-black`;

    const iconClass =
        "h-16 w-16 font-bold text-2xl flex flex-wrap content-center justify-center";
    const textClass = "px-6 text-lg";

    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <button
                className={colour === "light-green" ? greenClass : redClass}
                onClick={onClick}
            >
                <div className={type === "text" ? textClass : iconClass}>
                    {children}
                </div>
            </button>
            <h2 className="font-medium text-lg">{text}</h2>
        </div>
    );
};
