import { useState, useEffect, useCallback, useRef } from "react";

function useFetch(asyncFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ignore = useRef(false);
  // const abortControllerRef = useRef(null);

  const fetchData = useCallback(() => {
    if (!asyncFunction) return;
    ignore.current = false;

    // if (abortControllerRef.current) {
    //   abortControllerRef.current.abort();
    // }
    // const controller = new AbortController();
    // abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    // asyncFunction({ signal: controller.signal })
    asyncFunction()
      .then((data) => {
        if (!ignore.current) setData(data);
      })
      .catch((error) => {
        // if (error.original.name !== "CanceledError") {
        if (!ignore.current) setError(error);
        // }
      })
      .finally(() => {
        if (!ignore.current) setLoading(false);
      });
  }, dependencies);

  useEffect(() => {
    fetchData();
    return () => {
      ignore.current = true; // щоб уникнути setState на розмонтованому компоненті
      // if (abortControllerRef.current) {
      //   abortControllerRef.current.abort();
      // }
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
