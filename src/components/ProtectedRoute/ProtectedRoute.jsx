import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    let isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/dashboard");
    }
  });

  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoute;
