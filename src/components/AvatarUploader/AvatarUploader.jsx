import { useState, useEffect, useRef } from "react";
import LazyImage from "../LazyImage/LazyImage";
import avatarImg from "../../assets/images/avatar.png";
import { LocalStorageService, LS_KEYS } from "../../services/localStorage";

function AvatarUploader() {
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
      <LazyImage
        className="fancy-background"
        src={avatar || avatarImg}
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
        alt="User Avatar"
        title="Click to change avatar"
      />
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
