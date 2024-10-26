import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/index";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const response = await instance.post("/auth/register", {
        username,
        password,
      });
      const { resultCode, message } = response.data;
      if (resultCode === 0) {
        toast.success(message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Đăng ký thất bại");
    }
  };

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
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Create an Account
        </h2>
        <ToastContainer position="top-center" autoClose={2000} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              style={{ borderRadius: "0.25rem" }}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control input-custom"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control input-custom"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ marginTop: "1rem" }}
          >
            Register
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span>
            Already have an account? <a href="/login">Login here</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
