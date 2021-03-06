import React, { useState } from "react";
import { connect } from "react-redux";
import "./auth.css";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../redux/actions/authActions";
import Swal from "sweetalert2";

const Register = ({ registerUser }) => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
    role: "Customer",
    contactNumber: "",
  });

  const history = useHistory();

  const resetForm = () => {
    setUserDetails({
      userName: "",
      password: "",
      role: "Customer",
      contactNumber: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(userDetails);
    if (response && response.data.user) {
      localStorage.setItem("loggedInUser", JSON.stringify(response));
      localStorage.setItem("token", response.data.token);
      history.push("/items");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User registered successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "User already exists!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    resetForm();
  };

  return (
    <div className="center">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div className="txt_field">
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            value={userDetails.userName}
            required
          />
          <span></span>
          <label htmlFor="userName">Username</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={userDetails.password}
            required
          />
          <span></span>
          <label htmlFor="password">Password</label>
        </div>
        <div className="txt_field">
          <input
            type="number"
            name="contactNumber"
            onChange={handleChange}
            value={userDetails.contactNumber}
            required
          />
          <span></span>
          <label>Contact Number</label>
        </div>
        <button type="submit" className="btn-submit">
          Register
        </button>
        <div className="signup_link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default connect(null, { registerUser })(Register);
