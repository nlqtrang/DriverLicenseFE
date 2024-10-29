import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // Điều hướng về trang chủ
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-8">Oops! The page you are looking for does not exist.</p>
      <Button type="primary" onClick={goHome}>
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
