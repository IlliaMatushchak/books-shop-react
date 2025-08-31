import React, { useState, useEffect } from "react";
import "./ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        type="button"
        onClick={scrollToTop}
        id="btn-scroll-up"
        className="btn-fixed btn-circle btn-effect-shadow"
        aria-label="Scroll up"
      >
        Up
      </button>
    )
  );
}
