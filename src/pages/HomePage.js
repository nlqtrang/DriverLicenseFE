import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Chào mừng đến với Trang Web Thi Bằng Lái Xe</h1>
      <p>Hãy ôn luyện và thi thử để chuẩn bị cho kỳ thi bằng lái xe của bạn!</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary mx-2">Đăng nhập</Link>
        <Link to="/register" className="btn btn-secondary mx-2">Đăng ký</Link>
      </div>
    </div>
  );
};

export default HomePage;