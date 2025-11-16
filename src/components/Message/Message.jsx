import "./Message.css";

function Message({ message, type }) {
  const className = type ? `message-${type}` : "";

  return (
    <p className={"message " + className} role="alert">
      {message}
    </p>
  );
}

export default Message;
