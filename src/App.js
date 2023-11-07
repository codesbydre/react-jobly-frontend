import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import AppRoutes from "./AppRoutes";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";
import "./App.css";

export const UserContext = createContext(); // Creating a context for user state

function App() {
  // Initial state for the user and token might come from local storage
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jobly-token"));
  const [appliedJobs, setAppliedJobs] = useState(new Set()); // hold IDs of applied jobs for a user

  // Runs when the token changes. If there's a token, it will get the user info, otherwise, it will nullify the currentUser
  useEffect(() => {
    async function getUserInfo() {
      if (token) {
        JoblyApi.token = token;
        try {
          let { username } = jwtDecode(token);
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("Problem with getUserInfo", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }

    getUserInfo();
  }, [token]);

  // Functions to handle login, signup, and logout
  async function handleLogin(formData) {
    try {
      let token = await JoblyApi.login(formData);
      setToken(token);
      localStorage.setItem("jobly-token", token); // Storing the token in local storage
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function handleSignup(formData) {
    try {
      let token = await JoblyApi.signup(formData);
      setToken(token);
      localStorage.setItem("jobly-token", token); // Storing the token in local storage
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  function handleLogout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("jobly-token"); // Removing the token from local storage
  }

  function onLoginSuccess(newToken) {
    setToken(newToken);
  }

  function hasAppliedToJob(id) {
    return appliedJobs.has(id);
  }

  async function applyToJob(jobId) {
    if (!currentUser || hasAppliedToJob(jobId)) {
      // Handle the case where the user is not logged in or has already applied to the job
      return false;
    }
    try {
      await JoblyApi.applyToJob(currentUser.username, jobId);
      setAppliedJobs(new Set([...appliedJobs, jobId])); // Add the job to the applied jobs set
      return true;
    } catch (errors) {
      console.error("applyToJob failed", errors);
      return false;
    }
  }

  return (
    <div className="App">
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <Router>
          <Navbar
            isLogged={!!currentUser}
            handleLogout={handleLogout}
            username={currentUser?.username}
          />
          <AppRoutes
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            handleLogout={handleLogout}
            onLoginSuccess={onLoginSuccess}
          />
        </Router>
      </UserContext.Provider>{" "}
    </div>
  );
}

export default App;
