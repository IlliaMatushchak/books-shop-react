import { useState } from "react";
import useWindowLoaded from "../../hooks/useWindowLoaded";
import backgroundImg from "../../assets/images/background.jpg";
import "./BackgroundImg.css";

function BackgroundImg() {
  const isWindowLoaded = useWindowLoaded();
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <>
      {isWindowLoaded && (
        <img
          src={backgroundImg}
          alt=""
          aria-hidden="true"
          className={`background-img ${isImgLoaded ? "loaded" : ""}`}
          onLoad={() => {
            setIsImgLoaded(true);
          }}
        />
      )}
    </>
  );
}

export default BackgroundImg;
