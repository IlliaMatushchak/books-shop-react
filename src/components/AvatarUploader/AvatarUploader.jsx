import { useState, useRef, useEffect } from "react";
import { useTimedMessage } from "../../hooks/useTimedMessage";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileService } from "../../services/profileService";
import LazyImage from "../LazyImage/LazyImage";
import Loader from "../Loader/Loader";
import avatarImg from "../../assets/images/avatar.png";
import "./AvatarUploader.css";

const MAX_SIZE = 1 * 1024 * 1024; // max file size = 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function validateFile(file) {
  if (!ALLOWED_TYPES.includes(file.type))
    return "Allowed formats: JPG, PNG, WEBP";
  if (file.size > MAX_SIZE) return "The file cannot be larger than 1MB";

  return null;
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AvatarUploader({ className = "", size = "16rem" }) {
  const {
    user: { avatar },
    updateAvatar,
    deleteAvatar,
  } = useAuth();
  const { message, type, showMessage, clearMessage } = useTimedMessage();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const avatarImgContainerRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true; // Fix bug in StrictMode
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleImageClick = () => {
    if (!loading) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size (max 1MB, only JPG/PNG)
    const errorMsg = validateFile(file);
    if (errorMsg) {
      showMessage(errorMsg, "error", 8000);
      return;
    }
    clearMessage();

    try {
      setLoading(true);
      const base64 = await toBase64(file);
      const { avatar: updatedAvatar } = await ProfileService.updateAvatar(
        base64
      );
      if (isMounted.current) updateAvatar(updatedAvatar);
    } catch (err) {
      if (isMounted.current) showMessage(err.message, "error", 8000);
    } finally {
      if (isMounted.current) setLoading(false);
      if (isMounted.current) avatarImgContainerRef.current.blur();
    }
  };

  const handleImageRemove = async () => {
    clearMessage();
    try {
      setLoading(true);
      await ProfileService.deleteAvatar();
      if (isMounted.current) deleteAvatar();
    } catch (err) {
      if (isMounted.current) showMessage(err.message);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleImageKeyDown = (e) => {
    if (loading) return;
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
          {loading ? (
            <div className="avatar-overlay">
              <Loader type="small" />
            </div>
          ) : (
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
          )}
        </div>
        {message && (
          <p className={`message message-${type}`} role="alert">
            {message}
          </p>
        )}
      </div>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
}

export default AvatarUploader;
