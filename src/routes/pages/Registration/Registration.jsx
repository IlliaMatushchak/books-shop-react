import { useState } from "react";
import { useTimedMessage } from "../../../hooks/useTimedMessage";
import { AuthService } from "../../../services/authService";
import Message from "../../../components/Message/Message";
import "./Registration.css";

function validateForm(form) {
  // Needs improvement !!!!!!!!!!!!!!!!!
  return form?.username?.length >= 4 && form?.username?.length <= 16;
}

function Registration() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "USER",
    email: "",
    phoneNumber: "",
    gender: "MALE",
  });
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
        const data = await AuthService.register(form);
        showMessage(
          data.message || "Successful registration!",
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
        showMessage(error.message, "error", 8000);
      }
    } else {
      showMessage("Invalid form data", "error", 8000);
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
          {message && <Message message={message} type={type} />}
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
            // disabled={!validateForm(form)}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Registration;
