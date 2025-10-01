import { useState, useEffect, useRef } from "react";
import LazyImage from "../LazyImage/LazyImage";
import avatarImg from "../../assets/images/avatar.png";
import { LocalStorageService, LS_KEYS } from "../../services/localStorage";
import "./AvatarUploader.css";

function AvatarUploader({ className = "", size = "10rem" }) {
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedAvatar = LocalStorageService.get(LS_KEYS.AVATAR);
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      LocalStorageService.set(LS_KEYS.AVATAR, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div
        className={`avatar-container fancy-background ${className}`}
        style={{ width: size, height: size }}
        title="Click to change avatar"
        onClick={handleImageClick}
      >
        <LazyImage
          src={avatar || avatarImg}
          style={{ lineHeight: size }}
          alt="User Avatar"
        />
        <div className="avatar-overlay">📷</div> {/* &#128247; */}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
}

export default AvatarUploader;
