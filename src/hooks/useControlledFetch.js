import { useState, useEffect, useCallback, useRef, useMemo } from "react";

function useControlledFetch({
  requestFn,
  args = [],
  auto = false,
  initialData = null,
  onSuccess,
  onError,
} = {}) {
  if (args === undefined || args === null) args = [];
  if (!Array.isArray(args)) throw new Error("args must be an array");

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lastFetchId = useRef(0); // для ігнорування застарілих запитів (стан гонки)
  const abortControllerRef = useRef(null); // для відміни застарілих запитів

  const argsRef = useRef(null);
  const onSuccessRef = useRef(null);
  const onErrorRef = useRef(null);
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;
  argsRef.current = args;

  useEffect(() => {
    return () => {
      lastFetchId.current = 0;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const execute = useCallback(
    ({
      requestFn: overrideRequestFn,
      args: overrideArgs,
      onSuccess: overrideOnSuccess,
      onError: overrideOnError,
    } = {}) => {
      const finalRequestFn = overrideRequestFn ?? requestFn;
      const finalArgs = overrideArgs ?? argsRef.current;
      const finalOnSuccess = overrideOnSuccess ?? onSuccessRef.current;
      const finalOnError = overrideOnError ?? onErrorRef.current;

      if (typeof finalRequestFn !== "function") return;
      if (!Array.isArray(finalArgs))
        throw new Error("overrideArgs must be an array!");

      if (abortControllerRef.current) abortControllerRef.current.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const fetchId = ++lastFetchId.current;

      setError(null);
      setLoading(true);

      finalRequestFn(...finalArgs, { signal: controller.signal })
        .then((result) => {
          if (lastFetchId.current !== fetchId) return;
          setData(result);
          typeof finalOnSuccess === "function" && finalOnSuccess(result);
        })
        .catch((error) => {
          const isCanceled =
            error?.name === "AbortError" || //native fetch
            error?.name === "CanceledError" || //axios
            error?.code === "ERR_CANCELED" ||
            error?.original?.name === "CanceledError";
          if (isCanceled) return;
          if (lastFetchId.current !== fetchId) return;
          setError(error);
          typeof finalOnError === "function" && finalOnError(error);
        })
        .finally(() => {
          if (lastFetchId.current === fetchId) setLoading(false);
        });
    },
    [requestFn]
  );

  // auto mode
  useEffect(() => {
    if (!auto) return;
    execute();
  }, [auto, execute]);

  return {
    data,
    setData,
    loading,
    error,
    fetch: execute,
    refetch: execute,
  };
}

export default useControlledFetch;
