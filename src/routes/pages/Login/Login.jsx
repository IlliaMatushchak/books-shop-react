import { useState } from "react";
import { useTimedMessages } from "../../../hooks/useTimedMessages";
import { useAuth } from "../../../contexts/AuthContext";
import Message from "../../../components/Message/Message";
import Loader from "../../../components/Loader/Loader";
import { validateLoginForm } from "../../../utils/validation/formValidation";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { messages, type, showMessages, clearMessages } = useTimedMessages();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    let { valid, errors } = validateLoginForm(form);

    if (!valid) {
      showMessages(errors, "error");
      return;
    }

    try {
      setLoading(true);
      await login(form);
      setForm({
        username: "",
        password: "",
      });
    } catch (error) {
      showMessages({ error: error.message }, "error");
    } finally {
      setLoading(false);
    }
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
          {loading && <Loader type="global" />}
        </form>
      </div>
    </>
  );
}

export default Login;
