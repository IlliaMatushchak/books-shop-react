import { useState } from "react";
import "./LazyImage.css";

function LazyImage({src, alt, className, ...otherProps}) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  // console.log("Img render");
  return (
    <>  
        <img
          src={src}
          alt={alt}
          {...otherProps}
          className={`${className} lazy-img ${isImgLoaded ? "loaded" : ""}`}
          onLoad={() => {
            // console.log("Img loaded");
            setIsImgLoaded(true);
          }}
        />
    </>
  );
}

export default LazyImage;