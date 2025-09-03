import "./Loader.css";

export default function Loader({ type = "" }) {
  let loader;

  switch (type) {
    case "global":
      loader = (
        <div className="spiner-container global">
          <div className="spinner"></div>
          <h2>Loading...</h2>
        </div>
      );
      break;
    case "named":
      loader = (
        <div className="spiner-container">
          <div className="spinner"></div>
          <h2>Loading...</h2>
        </div>
      );
      break;
    case "small":
      loader = (
        <div className="spiner-container">
          <div className="spinner"></div>
        </div>
      );
      break;
    default:
      loader = (
        <div className="spiner-container">
          <h2>Loading...</h2>
        </div>
      );
      break;
  }

  return loader;
}
