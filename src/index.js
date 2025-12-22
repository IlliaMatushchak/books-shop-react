import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "normalize.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { installFakeServerAxios } from "./fakeServer/FakeServerCore";

installFakeServerAxios();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
