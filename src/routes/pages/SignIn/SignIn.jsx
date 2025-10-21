import { useNavigate } from "react-router-dom";
import useResponsiveValue from "../../../hooks/useResponsiveValue";
import { useAuth } from "../../../contexts/AuthContext";
import AvatarUploader from "../../../components/AvatarUploader/AvatarUploader";
import "./SignIn.css";

function SignIn() {
  console.log("SignIn render");
  const { userName, setUserName, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const avatarSize = useResponsiveValue({
    320: "12.5rem",
    480: "14rem",
    default: "10rem",
  });

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
