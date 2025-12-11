import { useState, useEffect } from "react";
import { useTimedMessages } from "../../hooks/useTimedMessages";
import { ProfileService } from "../../services/profileService";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../components/Loader/Loader";
import Message from "../Message/Message";
import { validateUserInfoForm } from "../../utils/validation/formValidation";

function UserInfoForm() {
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    username: "",
    role: "",
    email: "",
    phoneNumber: "",
    gender: "MALE",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { messages, type, showMessages, clearMessages } = useTimedMessages();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const data = await ProfileService.getProfile();
        setProfile(data);
        setForm(data);
      } catch (error) {
        showMessages({ error: error.message }, "error");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    let { valid, errors } = validateUserInfoForm(form);

    if (!valid) {
      showMessages(errors, "error", 8000);
      return;
    }

    try {
      setLoading(true);
      const { email, phoneNumber, gender } = form;
      const data = await ProfileService.updateProfile({
        email,
        phoneNumber,
        gender,
      });
      setProfile(data);
      updateUser(data);
      setEditing(false);
      showMessages({ success: "Profile updated!" }, "success", 8000);
    } catch (error) {
      showMessages({ error: error.message }, "error", 8000);
    } finally {
      setLoading(false);
    }
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
        disabled={!editing}
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
        disabled={!editing}
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
        disabled={!editing}
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
