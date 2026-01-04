import { useState, useEffect } from "react";
import { useTimedMessages } from "../../../hooks/useTimedMessages";
import { useAuth } from "../../../contexts/AuthContext";
import Message from "../../../components/Message/Message";
import Loader from "../../../components/Loader/Loader";
import { validateLoginForm } from "../../../utils/validation/formValidation";
import "./Login.css";

const initialForm = { username: "", password: "" };

function Login() {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState(initialForm);
  const { messages, type, showMessages, clearMessages } = useTimedMessages(8000);

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
    const { valid, errors } = validateLoginForm(form);

    if (!valid) {
      showMessages(errors, "error");
      return;
    }

    login(form);
  };

  return (
    <>
      <div className="login-container">
        <form
          className={`fancy-background ${type || ""}`}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          {messages?.error && <Message message={messages.error} type={type} />}
          <label htmlFor="user-name">User name</label>
          <input
            id="user-name"
            type="text"
            name="username"
            placeholder="Type your name"
            value={form.username}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="username"
          />
          {messages?.username && (
            <Message message={messages.username} type={type} />
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="current-password"
          />
          {messages?.password && (
            <Message message={messages.password} type={type} />
          )}

          <button
            type="submit"
            className="btn-effect-3d"
            disabled={loading}
          >
            Login
          </button>
        </form>
        {loading && <Loader type="global" />}
      </div>
    </>
  );
}

export default Login;
