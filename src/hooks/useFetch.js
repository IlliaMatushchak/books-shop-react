import { useState, useEffect, useCallback, useRef } from "react";
import fetchBooks from "../services/fetchBooks";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ignore = useRef(false);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(() => {
    if (!url) return;

    ignore.current = false;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    fetchBooks(url, { signal: controller.signal })
      .then((response) => {
        if (!ignore.current) setData(response);
      })
      .catch((error) => {
        if (!ignore.current) {
          setError(error);
          console.error(error);
        }
      })
      .finally(() => {
        if (!ignore.current) setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    fetchData();
    return () => {
      ignore.current = true; // щоб уникнути setState на розмонтованому компоненті
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
