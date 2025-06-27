import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
//This is global css file which applies to all the pages.
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
