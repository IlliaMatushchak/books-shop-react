import { useState } from "react";
import { useTimedMessages } from "../../../hooks/useTimedMessages";
import { AuthService } from "../../../services/authService";
import Message from "../../../components/Message/Message";
import Loader from "../../../components/Loader/Loader";
import { validateRegistrationForm } from "../../../utils/validation/formValidation";
import "./Registration.css";

function Registration() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "USER",
    email: "",
    phoneNumber: "",
    gender: "MALE",
  });
  const [loading, setLoading] = useState(false);
  const { messages, type, showMessages, clearMessages } = useTimedMessages();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    let { valid, errors } = validateRegistrationForm(form);

    if (!valid) {
      showMessages(errors, "error", 8000);
      return;
    }

    try {
      setLoading(true);
      const data = await AuthService.register(form);
      showMessages(
        { success: data.message || "Successful registration!" },
        "success",
        8000
      );
      setForm({
        username: "",
        password: "",
        role: "USER",
        email: "",
        phoneNumber: "",
        gender: "MALE",
      });
    } catch (error) {
      showMessages({ error: error.message }, "error", 8000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-container">
        <form
          className={`fancy-background ${type || ""}`}
          onSubmit={handleSubmit}
        >
          <h2>Registration</h2>
          {(messages?.success || messages?.error) && (
            <Message
              message={messages?.success || messages?.error}
              type={type}
            />
          )}
          <label htmlFor="user-name">User name</label>
          <input
            id="user-name"
            type="text"
            name="username"
            placeholder="Type your name"
            value={form.username}
            onChange={handleChange}
            required
          />
          {messages?.username && (
            <Message message={messages.username} type={type} />
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {messages?.email && <Message message={messages.email} type={type} />}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {messages?.password && (
            <Message message={messages.password} type={type} />
          )}

          <label htmlFor="phone-number">Phone Number</label>
          <input
            id="phone-number"
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
          {messages?.phoneNumber && (
            <Message message={messages.phoneNumber} type={type} />
          )}

          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <hr />

          <button
            type="submit"
            className="btn-effect-3d"
            disabled={loading}
          >
            Register
          </button>
          {loading && <Loader type="local" />}
        </form>
      </div>
    </>
  );
}

export default Registration;
