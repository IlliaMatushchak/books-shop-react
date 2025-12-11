import "./Loader.css";

export default function Loader({ className = "", type = "" }) {
  let loader;
  const containerClassName = "spiner-container " + className;

  switch (type) {
    case "global":
      loader = (
        <div className={"global " + containerClassName}>
          <div className="spinner"></div>
          <h2>Loading...</h2>
        </div>
      );
      break;
    case "named":
      loader = (
        <div className={containerClassName}>
          <div className="spinner"></div>
          <h2>Loading...</h2>
        </div>
      );
      break;
    case "small":
      loader = (
        <div className={containerClassName}>
          <div className="spinner"></div>
        </div>
      );
      break;
    default:
      loader = (
        <div className={containerClassName}>
          <h2>Loading...</h2>
        </div>
      );
      break;
  }

  return loader;
}
