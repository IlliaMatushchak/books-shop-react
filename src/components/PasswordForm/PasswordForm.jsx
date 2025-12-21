import { useState, useEffect } from "react";
import { useTimedMessages } from "../../hooks/useTimedMessages";
import useControlledFetch from "../../hooks/useControlledFetch";
import { ProfileService } from "../../services/profileService";
import { validatePasswordForm } from "../../utils/validation/formValidation";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";

const initialPasswordData = {
  oldPassword: "",
  newPassword: "",
  confirm: "",
};

function PasswordForm() {
  const [passwordData, setPasswordData] = useState(initialPasswordData);
  const { messages, type, showMessages, clearMessages } = useTimedMessages(8000);
  const { loading, error, fetch: passwordFetch } = useControlledFetch();

  useEffect(() => {
    if (error) showMessages({ error: error.message }, "error");
  }, [error, showMessages]);

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    clearMessages();
    const { valid, errors } = validatePasswordForm(passwordData);

    if (!valid) {
      showMessages(errors, "error");
      return;
    }
    passwordFetch({
      requestFn: ProfileService.changePassword,
      args: [
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
      ],
      onSuccess: (data) => {
        showMessages(
          { success: data.message || "Password changed!" },
          "success"
        );
        setPasswordData(initialPasswordData);
      },
    });
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
        disabled={loading}
      />
      <input
        type="password"
        name="newPassword"
        placeholder="New password"
        value={passwordData.newPassword}
        onChange={handleChangePassword}
        required
        disabled={loading}
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
        disabled={loading}
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
