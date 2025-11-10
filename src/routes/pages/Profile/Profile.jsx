import { useEffect, useState } from "react";
import { ProfileService } from "../../../services/profileService";
import { useAuth } from "../../../contexts/AuthContext";
import Loader from "../../../components/Loader/Loader";
import "./Profile.css";

function validateForm(form) {
  // Needs improvement !!!!!!!!!!!!!!!!!
  return form?.email?.length >= 4 && form?.email?.length <= 16;
}

export default function Profile() {
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const data = await ProfileService.getProfile();
        setProfile(data);
        setForm(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const removeNotification = () => {
    setError(null);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    removeNotification();
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
        setMessage("Profile updated!");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Invalid form data");
    }
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

  if (loading && !profile) return <Loader />;

  return (
    <div className="profile-container">
      <div className="forms-container flex">
      <form className="fancy-background" onSubmit={handleSubmit}>
        <h2 className="">My profile</h2>
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
              removeNotification();
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
                removeNotification();
              }}
            >
              Cancel
            </button>
          </>
        )}
      </form>

        <form className="fancy-background" onSubmit={handlePasswordChange}>
          <h2>Change password</h2>
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
      </div>
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
    </div>
  );
}
