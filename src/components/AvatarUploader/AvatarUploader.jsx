import { useState, useEffect, useRef } from "react";
import LazyImage from "../LazyImage/LazyImage";
import avatarImg from "../../assets/images/avatar.png";
import { LocalStorageService, LS_KEYS } from "../../services/localStorage";
import "./AvatarUploader.css";

function validateFile(file) {
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    return "Only JPG or PNG are allowed";
  }
  if (file.size > 1 * 1024 * 1024) {
    return "The file cannot be larger than 1MB";
  }
  return null;
}

function AvatarUploader({ className = "", size = "10rem" }) {
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const avatarImgContainerRef = useRef(null);

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

    // Validate file type and size (max 1MB, only JPG/PNG)
    const errorMsg = validateFile(file);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      LocalStorageService.set(LS_KEYS.AVATAR, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setAvatar(null);
    LocalStorageService.remove(LS_KEYS.AVATAR);
  };

  const handleImageKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      handleImageClick();
    }
  };

  const handleImgRemoveKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      handleImageRemove();
      avatarImgContainerRef.current.focus();
    }
  };

  return (
    <>
      <div className={className} style={{ width: size }}>
        <div
          className="avatar-img-container fancy-background"
          style={{ width: "100%", height: size }}
          title="Click to change avatar"
          aria-label="Change avatar"
          role="button"
          aria-pressed={!!avatar}
          tabIndex={0}
          onClick={handleImageClick}
          onKeyDown={handleImageKeyDown}
          ref={avatarImgContainerRef}
        >
          <LazyImage
            src={avatar || avatarImg}
            style={{ lineHeight: size }}
            alt="User Avatar"
          />
          <div className="avatar-overlay">
            📷{/* &#128247; */}
            {avatar && (
              <button
                type="button"
                className="btn-text btn-effect-3d"
                aria-label="Remove avatar"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageRemove();
                }}
                onKeyDown={handleImgRemoveKeyDown}
              >
                &times;
              </button>
            )}
          </div>
        </div>
        {error && <p role="alert">{error}</p>}
      </div>
      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
}

export default AvatarUploader;
