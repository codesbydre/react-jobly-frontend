import React, { useState } from "react";
import JoblyApi from "./api";
import "./AuthForm.css";

function AuthForm({ type, onLoginSuccess, navigate }) {
  const isLogin = type === "login";
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setErrors([]);

    const loginData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      let result;
      if (isLogin) {
        result = await JoblyApi.login(loginData);
      } else {
        result = await JoblyApi.signup(formData);
      }
      localStorage.setItem("jobly-token", result); // Store the token
      onLoginSuccess(result);
      navigate("/");
    } catch (errs) {
      setErrors(errs);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  return (
    <div className="AuthForm container mt-5 col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>{isLogin ? "Log In" : "Sign Up"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-bold">
            Username
          </label>
          <input
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {!isLogin && (
          <>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label fw-bold">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label fw-bold">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </div>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
