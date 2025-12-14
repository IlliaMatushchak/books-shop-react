import { useState, useRef, useEffect, useCallback } from "react";

export function useTimedValue(initialValue, globalDelay = null) {
  const [value, setValue] = useState(initialValue);
  const timerRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true; // Fix bug in StrictMode
    return () => {
      isMounted.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showValue = useCallback(
    (value, localDelay) => {
      const delay = localDelay !== undefined ? localDelay : globalDelay;
      setValue(value);

      if (timerRef.current) clearTimeout(timerRef.current);

      if (delay !== null && delay !== undefined) {
        timerRef.current = setTimeout(() => {
          if (isMounted.current) setValue(initialValue);
          timerRef.current = null;
        }, delay);
      }
    },
    [globalDelay, initialValue]
  );

  const clearValue = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    showValue,
    clearValue,
  };
}
