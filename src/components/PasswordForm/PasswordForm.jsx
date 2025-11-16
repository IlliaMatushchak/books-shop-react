import { useState } from "react";
import { useTimedMessage } from "../../hooks/useTimedMessage";
import { ProfileService } from "../../services/profileService";

function PasswordForm() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const { message, type, showMessage, clearMessage } = useTimedMessage();

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault(e);
    clearMessage();
    if (passwordData.newPassword !== passwordData.confirm) {
      showMessage("New passwords do not match!", "error", 8000);
      return;
    }
    try {
      setLoading(true);
      const data = await ProfileService.changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      showMessage(data.message, "success", 8000);
      setPasswordData({ oldPassword: "", newPassword: "", confirm: "" });
    } catch (error) {
      showMessage(error.message, "error", 8000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`fancy-background ${type || ""}`}
      onSubmit={handlePasswordChange}
    >
      <h2>Change password</h2>
      {message && (
        <p className={`message message-${type || ""}`} role="alert">
          {message}
        </p>
      )}
      <input
        type="password"
        name="oldPassword"
        placeholder="Old password"
        value={passwordData.oldPassword}
        onChange={handleChangePassword}
        required
      />
      <input
        type="password"
        name="newPassword"
        placeholder="New password"
        value={passwordData.newPassword}
        onChange={handleChangePassword}
        required
      />
      <input
        type="password"
        name="confirm"
        placeholder="Confirm password"
        value={passwordData.confirm}
        onChange={handleChangePassword}
        required
      />
      <hr />
      <button type="submit" disabled={loading}>
        Change
      </button>
    </form>
  );
}

export default PasswordForm;
