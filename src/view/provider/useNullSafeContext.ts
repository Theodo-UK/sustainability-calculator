import { useContext } from "react";

export const useNullSafeContext = <T>(context: React.Context<T | null>): T => {
    const value = useContext(context);
    if (value === null) {
        throw Error(`${context.displayName} is null`);
    }
    return value;
};
