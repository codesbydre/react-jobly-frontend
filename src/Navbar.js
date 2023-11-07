import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLogged }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Jobly
      </a>

      {!isLogged ? (
        <ul className="navbar-nav ml-lg-auto flex-row">
          <li className="nav-item mr-3">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-lg-auto flex-row">
          <li className="nav-item mr-3">
            <NavLink className="nav-link" to="/companies">
              Companies
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink className="nav-link" to="/jobs">
              Jobs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
