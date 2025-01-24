import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <>
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/dashboard" className="text-blue-500">
          Go back to dashboard
        </Link>
      </div>
    </>
  );
};

export default NoPage;
