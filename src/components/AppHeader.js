import React, { useEffect } from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <Header className="flex justify-between items-center bg-blue-600 shadow-md p-4">
      <div className="text-lg font-semibold text-white">Driver License Tests</div>
      <Button type="default" onClick={handleLogout}>
        Logout
      </Button>
    </Header>
  );
};

export default AppHeader;
