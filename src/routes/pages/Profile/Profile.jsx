import useResponsiveValue from "../../../hooks/useResponsiveValue";
import AvatarUploader from "../../../components/AvatarUploader/AvatarUploader";
import UserInfoForm from "../../../components/UserInfoForm/UserInfoForm";
import PasswordForm from "../../../components/PasswordForm/PasswordForm";
import "./Profile.css";

export default function Profile() {
  const avatarSize = useResponsiveValue({
    320: "12.5rem",
    480: "14rem",
    default: "16rem",
  });

  return (
    <div className="profile-container flex">
      <AvatarUploader className="avatar" size={avatarSize} />
      <UserInfoForm />
      <PasswordForm />
    </div>
  );
}
