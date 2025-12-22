import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "normalize.css";
import App from "./App";
import FakeServerApp from "./fakeServer/FakeServerApp";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FakeServerApp />
    <App />
  </React.StrictMode>
);

reportWebVitals();
