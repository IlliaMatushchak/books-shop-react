import { useState, useEffect } from "react";
import { useTimedMessage } from "../../hooks/useTimedMessage";
import { ProfileService } from "../../services/profileService";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../components/Loader/Loader";
import Message from "../Message/Message";

function validateForm(form) {
  // Needs improvement !!!!!!!!!!!!!!!!!
  return form?.email?.length >= 4 && form?.email?.length <= 16;
}

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
  const { message, type, showMessage, clearMessage } = useTimedMessage();

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
        showMessage(error.message, "error");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage();
    if (validateForm(form)) {
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
        showMessage("Profile updated!", "success", 8000);
      } catch (error) {
        showMessage(error.message, "error", 8000);
      } finally {
        setLoading(false);
      }
    } else {
      showMessage("Invalid form data!", "error", 8000);
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
      {message && <Message message={message} type={type} />}
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
            }}
          >
            Cancel
          </button>
        </>
      )}
    </form>
  );
}

export default UserInfoForm;
