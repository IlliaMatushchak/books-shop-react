import { useCallback, useMemo } from "react";
import { useTimedValue } from "./useTimedValue";

export function useTimedMessages(delay) {
  const initialValue = useMemo(() => ({ messages: {}, type: "" }), []);
  const { value, showValue, clearValue } = useTimedValue(initialValue, delay);

  const showMessages = useCallback(
    (messages = {}, type = "", overrideDelay) => {
      showValue(
        (prev) =>
          prev.type === type && prev.messages === messages
            ? prev
            : { messages, type },
        overrideDelay
      );
    },
    [showValue]
  );

  return {
    messages: value.messages,
    type: value.type,
    showMessages,
    clearMessages: clearValue,
  };
}
