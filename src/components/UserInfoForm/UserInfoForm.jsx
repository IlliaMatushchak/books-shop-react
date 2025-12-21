import { useState, useEffect } from "react";
import { useTimedMessages } from "../../hooks/useTimedMessages";
import { ProfileService } from "../../services/profileService";
import { useAuth } from "../../contexts/AuthContext";
import useControlledFetch from "../../hooks/useControlledFetch";
import Loader from "../../components/Loader/Loader";
import Message from "../Message/Message";
import { validateUserInfoForm } from "../../utils/validation/formValidation";

const initialForm = {
  username: "",
  role: "",
  email: "",
  phoneNumber: "",
  gender: "MALE",
};

function UserInfoForm() {
  const { updateUser } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(false);
  const { messages, type, showMessages, clearMessages } = useTimedMessages(8000);
  const {
    data: profile,
    loading,
    error,
    fetch: fetchProfile,
  } = useControlledFetch({
    requestFn: ProfileService.getProfile,
    onSuccess: (profile) => {
      setForm(profile);
    },
    auto: true,
  });

  useEffect(() => {
    if (error) showMessages({ error: error.message }, "error");
  }, [error, showMessages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearMessages();
    const { valid, errors } = validateUserInfoForm(form);

    if (!valid) {
      showMessages(errors, "error");
      return;
    }

    const { email, phoneNumber, gender } = form;
    fetchProfile({
      requestFn: ProfileService.updateProfile,
      args: [
        {
          email,
          phoneNumber,
          gender,
        },
      ],
      onSuccess: (newProfile) => {
        updateUser(newProfile);
        setEditing(false);
        showMessages({ success: "Profile updated!" }, "success");
      },
    });
  };

  if (loading && !profile)
    return (
      <form className="fancy-background">
        <Loader />
      </form>
    );

  return (
    <form className={`fancy-background ${type || ""}`} onSubmit={handleSubmit}>
      <h2>My profile</h2>
      {(messages?.success || messages?.error) && (
        <Message message={messages?.success || messages?.error} type={type} />
      )}
      <label htmlFor="user-name">User name</label>
      <input
        id="user-name"
        type="text"
        name="username"
        value={form?.username || ""}
        disabled
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        value={form?.email || ""}
        onChange={handleChange}
        required
        disabled={!editing || loading}
      />
      {messages?.email && <Message message={messages.email} type={type} />}

      <label htmlFor="phone-number">Phone Number</label>
      <input
        id="phone-number"
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={form?.phoneNumber || ""}
        onChange={handleChange}
        required
        disabled={!editing || loading}
      />
      {messages?.phoneNumber && (
        <Message message={messages.phoneNumber} type={type} />
      )}

      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        value={form?.gender || ""}
        onChange={handleChange}
        disabled={!editing || loading}
      >
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>

      <label htmlFor="role">Role</label>
      <input
        id="role"
        type="text"
        name="role"
        value={form?.role || ""}
        disabled
      />

      <hr />

      {!editing ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setEditing(true);
          }}
        >
          Edit
        </button>
      ) : (
        <>
          <button type="submit" disabled={loading}>
            Save
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setEditing(false);
              setForm(profile ?? form);
              clearMessages();
            }}
          >
            Cancel
          </button>
        </>
      )}
      {loading && <Loader type="local" />}
    </form>
  );
}

export default UserInfoForm;
