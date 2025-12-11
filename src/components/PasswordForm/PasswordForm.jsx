import { useState } from "react";
import { useTimedMessages } from "../../hooks/useTimedMessages";
import { ProfileService } from "../../services/profileService";
import { validatePasswordForm } from "../../utils/validation/formValidation";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";

function PasswordForm() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const { messages, type, showMessages, clearMessages } = useTimedMessages();

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault(e);
    clearMessages();
    let { valid, errors } = validatePasswordForm(passwordData);

    if (!valid) {
      showMessages(errors, "error", 8000);
      return;
    }
    try {
      setLoading(true);
      const data = await ProfileService.changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      showMessages(
        { success: data.message || "Password changed!" },
        "success",
        8000
      );
      setPasswordData({ oldPassword: "", newPassword: "", confirm: "" });
    } catch (error) {
      showMessages({ error: error.message }, "error", 8000);
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
      {(messages?.success || messages?.error) && (
        <Message message={messages?.success || messages?.error} type={type} />
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
      {messages?.newPassword && (
        <Message message={messages.newPassword} type={type} />
      )}
      <input
        type="password"
        name="confirm"
        placeholder="Confirm password"
        value={passwordData.confirm}
        onChange={handleChangePassword}
        required
      />
      {messages?.confirm && <Message message={messages.confirm} type={type} />}
      <hr />
      <button type="submit" disabled={loading}>
        Change
      </button>
      {loading && <Loader type="local" />}
    </form>
  );
}

export default PasswordForm;
