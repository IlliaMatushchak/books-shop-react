import "../../assets/styles/SignIn.css";
import avatarImg from "../../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";

function SignIn({
  userNameState: { userName, setUserName },
  isLoggedInState: { isLoggedIn, setIsLoggedIn },
}) {
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
        <img className="fancy-background" src={avatarImg} alt="Avatar" />
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
          <button type="submit" disabled={!validateUserName(userName)}>
            Sign-in
          </button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
