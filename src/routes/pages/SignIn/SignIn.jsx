import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import LazyImage from "../../../components/LazyImage/LazyImage";
import "./SignIn.css";
import avatarImg from "../../../assets/images/avatar.png";

function SignIn() {
  console.log("SignIn render");
  const { userName, setUserName, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

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
        <LazyImage
          className="fancy-background"
          src={avatarImg}
          alt="User avatar"
        />
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
