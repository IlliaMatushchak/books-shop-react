import { useState } from "react";
import { useTimedMessage } from "../../../hooks/useTimedMessage";
import { useAuth } from "../../../contexts/AuthContext";
import "./Login.css";

function validateForm(form) {
  // Needs improvement !!!!!!!!!!!!!!!!!
  return form?.username?.length >= 4 && form?.username?.length <= 16;
}

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const { message, type, showMessage, clearMessage } = useTimedMessage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessage();
    if (validateForm(form)) {
      try {
        await login(form);
        setForm({
          username: "",
          password: "",
        });
      } catch (error) {
        showMessage(error.message, "error");
      }
    } else {
      showMessage("Invalid form data", "error");
    }
  };

  return (
    <>
      <div className="login-container">
        <form
          className={`fancy-background ${type || ""}`}
          onSubmit={handleSubmit}
        >
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

          <button
            type="submit"
            className="btn-effect-3d"
            // disabled={!validateForm(form)}
          >
            Login
          </button>
        </form>
        {message && (
          <p className={`message message-${type || ""}`} role="alert">
            {message}
          </p>
        )}
      </div>
    </>
  );
}

export default Login;
