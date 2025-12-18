import { useRef, useEffect } from "react";
import { useTimedMessage } from "../../hooks/useTimedMessage";
import { useAvatar } from "../../contexts/AvatarContext";
import LazyImage from "../LazyImage/LazyImage";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import avatarImg from "../../assets/images/avatar.png";
import { validateAvatar } from "../../utils/validation/valueValidation";
import "./AvatarUploader.css";

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AvatarUploader({ className = "", size = "16rem" }) {
  const { avatar, loading, error, updateAvatar, deleteAvatar } = useAvatar();
  const { message, showMessage, clearMessage } = useTimedMessage(10000);
  const fileInputRef = useRef(null);
  const avatarImgContainerRef = useRef(null);

  useEffect(() => {
    if (error) showMessage(error.message, "error");
  }, [error, showMessage]);

  const handleImageClick = () => {
    if (!loading) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    clearMessage();
    let { valid, error } = validateAvatar(file);
    if (!valid) {
      showMessage(error, "error");
      return;
    }

    const base64 = await toBase64(file);
    updateAvatar(base64);
    avatarImgContainerRef.current.blur();
  };

  const handleImageRemove = () => {
    clearMessage();
    deleteAvatar();
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
        {message?.text && (
          <Message
            className="message"
            message={message.text}
            type={message.type}
          />
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
