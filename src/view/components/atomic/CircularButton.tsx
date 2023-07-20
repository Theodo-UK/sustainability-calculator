import React from "react";

export const CircularButton = ({
    text,
    onClick,
    children,
    colour = "light-green",
}: {
    text: string;
    onClick: () => void;
    children: React.ReactNode;
    colour?: "light-green" | "burgundy";
}) => {
    const buttonClass = `p-4 w-16 h-16 shadow-lg active:shadow-none focus:shadow-outline focus:outline-none duration-200 font-bold text-2xl rounded-2xl `;
    const greenClass =
        buttonClass +
        `bg-light-green text-myrtle-green hover:bg-myrtle-green hover:text-nyanza`;
    const redClass =
        buttonClass +
        `bg-red-500 text-raisin-black hover:bg-rose-quartz hover:text-black`;
    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <button
                className={colour === "light-green" ? greenClass : redClass}
                onClick={onClick}
            >
                {children}
            </button>
            <h2 className="font-medium text-lg">{text}</h2>
        </div>
    );
};
