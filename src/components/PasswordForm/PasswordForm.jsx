import { useState } from "react";
import { ProfileService } from "../../services/profileService";

function PasswordForm() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const errorClass = error ? " error" : "";

  const removeNotification = () => {
    setError(null);
    setMessage("");
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault(e);
    removeNotification();
    if (passwordData.newPassword !== passwordData.confirm) {
      return setError("New passwords do not match!");
    }
    try {
      setLoading(true);
      const data = await ProfileService.changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage(data.message);
      setPasswordData({ oldPassword: "", newPassword: "", confirm: "" });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={"fancy-background" + errorClass}
      onSubmit={handlePasswordChange}
    >
      <h2>Change password</h2>
      {error && (
        <p className="alert error" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="alert message" role="alert">
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
