import { useState } from "react";
import "./LazyImage.css";

function LazyImage({src, alt, className, ...otherProps}) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  // console.log("Img render");
  if(isError){
    return <div className="on-error-fallback flex">{alt}</div>
  } 
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
          onError={() => {
            // console.error("Img loading error");
            setIsError(true);
          }}
        />
    </>
  );
}

export default LazyImage;