import { useState, useRef, useEffect } from "react";

export function useTimedMessages() {
  const [state, setState] = useState({ messages: {}, type: null });
  const timerRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true; // Fix bug in StrictMode
    return () => {
      isMounted.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showMessages = (messages = {}, type = "error", delay = null) => {
    setState({ messages, type });

    if (timerRef.current) clearTimeout(timerRef.current);

    if (delay) {
      timerRef.current = setTimeout(() => {
        if (isMounted.current) setState({ messages: {}, type: null });
        timerRef.current = null;
      }, delay);
    }
  };

  const clearMessages = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setState({ messages: {}, type: null });
  };

  return {
    messages: state.messages,
    type: state.type,
    showMessages,
    clearMessages,
  };
}
