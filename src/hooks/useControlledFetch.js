import { useState, useEffect, useCallback, useRef } from "react";

function useControlledFetch(initialState = null) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMounted = useRef(true);
  const lastFetchId = useRef(null); // для ігнорування застарілих запитів (стан гонки)
  const abortControllerRef = useRef(null); // для відміни застарілих запитів

  useEffect(() => {
    isMounted.current = true; // Fix bug in StrictMode
    return () => {
      isMounted.current = false; // щоб уникнути setState на розмонтованому компоненті
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const fetchData = useCallback((requestFunc, args = [], onSuccessFunc) => {
    if (!requestFunc) return;
    if (args === undefined || args === null) args = [];
    if (!Array.isArray(args)) throw new Error("args must be an array!");

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchId = Symbol();
    lastFetchId.current = fetchId;

    setError(null);
    setLoading(true);

    requestFunc(...args, { signal: controller.signal })
      .then((data) => {
        if (isMounted.current && lastFetchId.current === fetchId) {
          setData(data);
          onSuccessFunc && onSuccessFunc(data);
        }
      })
      .catch((error) => {
        if (error.original.name !== "CanceledError") {
          if (isMounted.current && lastFetchId.current === fetchId)
            setError(error);
        }
      })
      .finally(() => {
        if (isMounted.current && lastFetchId.current === fetchId)
          setLoading(false);
      });
  }, []);

  return { data, setData, loading, error, fetchData };
}

export default useControlledFetch;
