import React from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useUser from "../hooks/useUser";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useUser();

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          padding: "2rem",
          boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
          borderRadius: "0.5rem",
          backgroundColor: "#ffffff",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Profile</h2>
        <div className="mb-3">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
        {user.role === "user" ? (
          <>
            <button
              className="btn btn-primary w-100"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate("/take-test")}
            >
              Take a Test
            </button>
            <button
              className="btn btn-secondary w-100"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate("/test-history")}
            >
              View Test History
            </button>
          </>
        ) : user.role === "admin" ? (
          <>
            <button
              className="btn btn-primary w-100"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate("/view-bank-question")}
            >
              View Bank Question
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
