import { useState, useEffect, useCallback, useRef } from "react";

function useControlledFetch(initialState = null) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lastFetchId = useRef(0); // для ігнорування застарілих запитів (стан гонки)
  const abortControllerRef = useRef(null); // для відміни застарілих запитів

  useEffect(() => {
    return () => {
      lastFetchId.current = 0;
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

    const fetchId = ++lastFetchId.current;

    setError(null);
    setLoading(true);

    requestFunc(...args, { signal: controller.signal })
      .then((data) => {
        if (lastFetchId.current === fetchId) {
          setData(data);
          onSuccessFunc && onSuccessFunc(data);
        }
      })
      .catch((error) => {
        const isCanceled =
          error?.name === "AbortError" || //native fetch
          error?.name === "CanceledError" || //axios
          error?.code === "ERR_CANCELED" ||
          error?.original?.name === "CanceledError";
        if (isCanceled) return;
        if (lastFetchId.current === fetchId) setError(error);
      })
      .finally(() => {
        if (lastFetchId.current === fetchId) setLoading(false);
      });
  }, []);

  return { data, setData, loading, error, fetchData };
}

export default useControlledFetch;
