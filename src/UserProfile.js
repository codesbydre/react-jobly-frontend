import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./App";
import JoblyApi from "./api";
import "./UserProfile.css";

function UserProfile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false); // state to handle success message

  // Populate the form with the current user's data
  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user details with the API
      let updatedUser = await JoblyApi.updateUser(
        currentUser.username,
        formData
      );
      setCurrentUser(updatedUser); // Update user details in context
      setUpdateSuccess(true); // Show success message
      setErrors([]);
    } catch (err) {
      setUpdateSuccess(false);
      setErrors(err);
    }
  };

  // If no user is logged in, or while the data is being loaded, show a loading message or redirect
  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="UserProfile container mt-5 col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h2>Profile</h2>
      {updateSuccess && (
        <div className="alert alert-success">Profile updated successfully.</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-bold">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={currentUser.username}
            disabled // username seen but uneditable
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label fw-bold">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label fw-bold">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {errors.length > 0 && (
          <div className="alert alert-danger">{errors.join(", ")}</div>
        )}
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
