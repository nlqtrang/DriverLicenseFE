import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TakeTestPage from "./pages/TakeTestPage";
import BankQuestionsPage from "./pages/BankQuestionsPage";
import TestDetailPage from "./pages/TestDetailPage";
import TestHistoryPage from "./pages/TestHistoryPage";
import AppHeader from "./components/AppHeader";
import NotFoundPage from "./pages/NotFoundPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import useUser from "./hooks/useUser";

function App() {
  const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
  const user = useUser();// Lấy role từ localStorage, bạn nên lưu khi người dùng đăng nhập

  // Tạo ProtectedRoute hiển thị header và kiểm tra token
  const ProtectedRoute = () => {
    return (
      <>
        <AppHeader />
        <Outlet /> {/* Render nội dung trang */}
      </>
    );
  };

  // Tạo AdminRoute để bảo vệ các route dành cho admin
  const AdminRoute = () => {
    return user?.role === "admin" ? (
      <>
        <AppHeader />
        <Outlet />
      </>
    ) : (
      <Navigate to="/no-access" /> // Điều hướng đến trang không có quyền nếu không phải admin
    );
  };

  return (
    <Router>
      <Routes>
        {/* Các trang không cần header */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Điều hướng người dùng đã đăng nhập từ "/" đến "/profile" */}
        <Route path="/" element={token ? <Navigate to="/profile" /> : <HomePage />} />

        {/* Các trang cần header */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/take-test" element={<TakeTestPage />} />
          <Route path="/test-result-detail" element={<TestDetailPage />} />
          <Route path="/test-history" element={<TestHistoryPage />} />
        </Route>

        {/* Trang dành riêng cho admin */}
        <Route element={<AdminRoute />}>
          <Route path="/view-bank-question" element={<BankQuestionsPage />} />
        </Route>

        {/* Route không có quyền truy cập */}
        <Route path="/no-access" element={<AccessDeniedPage/>} />

        {/* Route không tìm thấy */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
