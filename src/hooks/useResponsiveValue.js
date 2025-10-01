import { useState, useEffect } from "react";

/**
 * useResponsiveValue({
 *   320: "12.5rem",
 *   480: "14rem",
 *   default: "10rem"
 * })
 */
function useResponsiveValue(breakpoints) {
  const [value, setValue] = useState(breakpoints.default);

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Iterate through breakpoints
        for (const bp in breakpoints) {
          if (bp !== "default" && window.innerWidth <= bp) {
            setValue(breakpoints[bp]);
            break;
          } else if (bp === "default") {
            setValue(breakpoints[bp]);
            break;
          }
        }
      }, 500);
    };

    handleResize(); // Set initial size based on current window width
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoints]);

  return value;
}

export default useResponsiveValue;
