import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./HomePage";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import AuthForm from "./AuthForm";
import UserProfile from "./UserProfile";
import DataDetail from "./DataDetail";
import Logout from "./Logout";

function AppRoutes({ handleLogout, onLoginSuccess }) {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/companies"
        element={<ProtectedRoute element={<CompanyList />} />}
      />
      <Route
        path="/companies/:handle"
        element={<ProtectedRoute element={<DataDetail type="companies" />} />}
      />
      <Route path="/jobs" element={<ProtectedRoute element={<JobList />} />} />
      <Route
        path="/login"
        element={
          <AuthForm
            type="login"
            onLoginSuccess={onLoginSuccess}
            navigate={navigate}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <AuthForm
            type="signup"
            onLoginSuccess={onLoginSuccess}
            navigate={navigate}
          />
        }
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<UserProfile />} />}
      />

      <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
    </Routes>
  );
}

export default AppRoutes;
