import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TakeTestPage from "./pages/TakeTestPage";
import BankQuestionsPage from "./pages/BankQuestionsPage";
import TestDetailPage from "./pages/TestDetailPage";
import TestHistoryPage from "./pages/TestHistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/take-test" element={<TakeTestPage />} />
        <Route path="/view-bank-question" element={<BankQuestionsPage />} />
        <Route path="/test-result-detail" element={<TestDetailPage />} />
        <Route path="/test-history" element={<TestHistoryPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
