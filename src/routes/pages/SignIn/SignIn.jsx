import "./SignIn.css";
import avatarImg from "../../../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import LazyImage from "../../../components/LazyImage/LazyImage";

function SignIn({
  userNameState: { userName, setUserName },
  isLoggedInState: { setIsLoggedIn },
}) {
  console.log('SignIn render');
  
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
        <LazyImage className="fancy-background" src={avatarImg} alt="User avatar" />
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
          <button type="submit" className="btn-styled-1" disabled={!validateUserName(userName)}>
            Sign-in
          </button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
