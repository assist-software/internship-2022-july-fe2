import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { AuthProvider } from "./context/AuthProvider";
import { StateProvider } from "./context/StateProvider";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <StateProvider>
      <App />
    </StateProvider>
  </AuthProvider>
  // </React.StrictMode>
);
