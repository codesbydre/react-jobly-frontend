// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./App";

function ProtectedRoute({ element: Component, redirectTo = "/login" }) {
  const { currentUser } = useContext(UserContext);

  return currentUser ? Component : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
