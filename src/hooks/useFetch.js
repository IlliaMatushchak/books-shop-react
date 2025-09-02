import { useState, useEffect } from "react";
import fetchBooks from "../services/fetchBooks";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let ignore = false;
    setLoading(true);
    setError(null);

    fetchBooks(url)
      .then((response) => {
        if (!ignore) setData(response);
      })
      .catch((error) => {
        if (!ignore) {
          setError(error.message);
          console.error(error);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true; // щоб уникнути setState на розмонтованому компоненті
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
