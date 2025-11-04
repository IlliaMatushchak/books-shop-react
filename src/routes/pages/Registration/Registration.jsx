import { useState } from "react";
import { AuthService } from "../../../services/authService";
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    if (validateForm(form)) {
      try {
        const data = await AuthService.register(form);
        setMessage(data.message || "User registered successfully!");
        setForm({
          username: "",
          password: "",
          role: "USER",
          email: "",
          phoneNumber: "",
          gender: "MALE",
        });
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Invalid form data");
    }
  };

  return (
    <>
      <div className="register-container">
        <form className="fancy-background" onSubmit={handleSubmit}>
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
    </>
  );
}

export default Registration;
