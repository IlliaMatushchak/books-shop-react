import { useState, useEffect } from "react";

export default function useWindowLoaded() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function handleLoad() {
      setLoaded(true);
    }

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return loaded;
}
