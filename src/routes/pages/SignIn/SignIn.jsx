import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import AvatarUploader from "../../../components/AvatarUploader/AvatarUploader";
import "./SignIn.css";

function SignIn() {
  console.log("SignIn render");
  const { userName, setUserName, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [avatarSize, setAvatarSize] = useState("10rem");

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth <= 320) {
          setAvatarSize("12.5rem");
        } else if (window.innerWidth <= 480) {
          setAvatarSize("14rem");
        } else {
          setAvatarSize("10rem");
        }
      }, 500);
    };

    handleResize(); // Set initial size based on current window width
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function validateUserName(name) {
    return name.length >= 4 && name.length <= 16;
  }

  function autorisizeUser() {
    setIsLoggedIn(true);
    navigate("/shop");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateUserName(userName)) {
      autorisizeUser(userName);
    }
  }

  return (
    <>
      <div className="signin-container">
        <AvatarUploader className="avatar" size={avatarSize} />
        <form
          className="fancy-background"
          action="#"
          method="post"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="user-name">User name</label>
          <input
            type="text"
            name="userName"
            id="user-name"
            placeholder="Type your name"
            required
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <button
            type="submit"
            className="btn-effect-3d"
            disabled={!validateUserName(userName)}
          >
            Sign-in
          </button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
