import { useState } from "react";
import "./LazyImage.css";

function LazyImage({ src, alt, className, ...otherProps }) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  if (isError) {
    return <div className="on-error-fallback flex">{alt}</div>;
  }
  return (
    <>
      <img
        src={src}
        alt={alt}
        {...otherProps}
        className={`${className} lazy-img ${isImgLoaded ? "loaded" : ""}`}
        onLoad={() => {
          setIsImgLoaded(true);
        }}
        onError={() => {
          setIsError(true);
        }}
      />
    </>
  );
}

export default LazyImage;