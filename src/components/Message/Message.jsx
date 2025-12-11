import "./Message.css";

function Message({ className, message, type }) {
  let newClassName = type ? `${className} message-${type}` : className;
  newClassName = className === "message" ? newClassName : "message " + newClassName;

  return (
    <p className={newClassName} role="alert">
      {message}
    </p>
  );
}

export default Message;
