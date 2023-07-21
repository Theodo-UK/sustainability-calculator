import { Switch } from "@headlessui/react";
import React from "react";

type SwitchAtomProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
};
export const SwitchAtom = ({ checked, onChange }: SwitchAtomProps) => {
    return (
        <Switch
            checked={checked}
            onChange={onChange}
            className={`${checked ? "bg-light-green" : "bg-raisin-black"}
                    relative inline-flex h-[23px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${checked ? "translate-x-4" : "translate-x-0"}
                        mt-[1px] pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    );
};
