import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupForm.scss";
import { AuthContext } from "../../../context/auth/AuthContext";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { isLoading, signup } = useContext(AuthContext);

  const [values, setValues] = useState({
    userId: crypto.randomUUID(),
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    usernameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId, username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        confirmPasswordError: true,
      }));
    } else {
      const isSignedUp = await signup({ userId, username, email, password });
      if (isSignedUp) {
        navigate("/");
      }
      setValues({ username: "", email: "", password: "", confirmPassword: "" });
      setErrorMessages({
        usernameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const userNamePattern = /^[a-zA-Z0-9]{3,16}$/;
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  const handleBlurUsername = () => {
    if (!userNamePattern.test(values.username)) {
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        usernameError: true,
      }));
    } else {
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        usernameError: false,
      }));
    }
  };

  const handleBlurPassword = () => {
    if (!passwordPattern.test(values.password)) {
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        passwordError: true,
      }));
    } else {
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        passwordError: false,
      }));
    }
  };

  const handleBlurConfirmPassword = () => {
    if (values.password !== values.confirmPassword) {
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        confirmPasswordError: true,
      }));
    } else {
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        confirmPasswordError: false,
      }));
    }
  };

  const handleBlurEmail = () => {
    if (!values.email.includes("@")) {
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        emailError: true,
      }));
    } else {
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        emailError: false,
      }));
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-input">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username..."
            required={true}
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlurUsername}
          />
          {errorMessages.usernameError && (
            <p className="error-message">
              Username should be 3-16 characters and shouldn't include any
              special character!
            </p>
          )}
        </div>
        <div className="form-input">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email..."
            required={true}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlurEmail}
          />
          {errorMessages.emailError && (
            <p className="error-message">It should be a valid email address!</p>
          )}
        </div>
        <div className="form-input">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password..."
            required={true}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlurPassword}
          />
          {errorMessages.passwordError && (
            <p className="error-message">
              Password should be 8-20 characters and include at least 1 lower
              case, 1 upper case, 1 number, and 1 special character!
            </p>
          )}
        </div>
        <div className="form-input">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password..."
            required={true}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlurConfirmPassword}
          />
          {errorMessages.confirmPasswordError && (
            <p className="error-message">Passwords don't match!</p>
          )}
        </div>
        <button className="btn" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <p className="click-here">
          <Link to="/login">Click here</Link> if you already have an account!
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
