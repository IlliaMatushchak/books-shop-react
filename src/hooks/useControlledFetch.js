import { useState, useEffect, useCallback, useRef } from "react";

function useControlledFetch(initialState = null) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true; // Fix bug in StrictMode
    return () => {
      isMounted.current = false; // щоб уникнути setState на розмонтованому компоненті
    };
  }, []);

  const fetchData = useCallback((requestFunc, args = [], onSuccessFunc) => {
    if (!requestFunc) return;
    if (args === undefined || args === null) args = [];
    if (!Array.isArray(args)) throw new Error("args must be an array!");

    setError(null);
    setLoading(true);

    requestFunc(...args)
      .then((data) => {
        if (isMounted.current) {
          setData(data);
          onSuccessFunc && onSuccessFunc(data);
        }
      })
      .catch((error) => {
        if (isMounted.current)
          setError(error);
      })
      .finally(() => {
        if (isMounted.current)
          setLoading(false);
      });
  }, []);

  return { data, setData, loading, error, fetchData };
}

export default useControlledFetch;
