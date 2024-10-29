import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/index";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { handleResponse } from "../utils/request";
import { notification } from "antd";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await instance.post("/auth/login", {
        username,
        password,
      });
      const { resultCode, message, data: token } = response.data;
      localStorage.setItem("accessToken", token);
      handleResponse(response.data);
      navigate("/profile");
    } catch (error) {
      notification.error({
        message: "Hệ thống đang gặp lỗi, vui lòng thử lại sau",
      });
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
          Welcome Back!
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
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
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ marginTop: "1rem" }}
          >
            Login
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span>
            Don't have an account? <a href="/register">Register here</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
