import { useState, useRef, useEffect } from "react";

export function useTimedMessage() {
  const [state, setState] = useState({ text: null, type: null });
  const timerRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true; // Fix bug in StrictMode
    return () => {
      isMounted.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showMessage = (text, type = "error", delay = null) => {
    setState({ text, type });

    if (timerRef.current) clearTimeout(timerRef.current);

    if (delay) {
      timerRef.current = setTimeout(() => {
        if (isMounted.current) setState({ text: null, type: null });
        timerRef.current = null;
      }, delay);
    }
  };

  const clearMessage = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setState({ text: null, type: null });
  };

  return {
    message: state.text,
    type: state.type,
    showMessage,
    clearMessage,
  };
}
