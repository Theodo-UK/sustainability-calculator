
import { useEffect } from "react";

// Only calls function on first render and never again
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (fun: React.EffectCallback) => useEffect(fun, [])