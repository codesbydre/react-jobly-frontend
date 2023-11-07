import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Homepage">
      <div className="container text-center mt-5">
        <h1 className="fw-bold">Jobly</h1>
        <p>All the jobs in one, convenient place.</p>
        {currentUser ? (
          <h2>Welcome Back, {currentUser.firstName}!</h2>
        ) : (
          <>
            <button
              className="btn btn-primary m-2 fw-bold "
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
            <button
              className="btn btn-primary m-2 fw-bold"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
