import { useCallback, useMemo } from "react";
import { useTimedValue } from "./useTimedValue";

export function useTimedMessage(delay) {
  const initialValue = useMemo(() => ({ text: "", type: "" }), []);
  const { value, showValue, clearValue } = useTimedValue(initialValue, delay);

  const showMessage = useCallback(
    (text = "", type = "", overrideDelay) => {
      showValue(
        (prev) =>
          prev.text === text && prev.type === type ? prev : { text, type },
        overrideDelay
      );
    },
    [showValue]
  );

  return {
    message: value,
    showMessage,
    clearMessage: clearValue,
  };
}
