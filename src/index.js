import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
    <ToastContainer />
  </Router>
);
