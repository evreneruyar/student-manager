import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { isLoading, login } = useContext(AuthContext);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({
    usernameError: false,
    passwordError: false,
  });
  const [message, setMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = values;
    if (username && password) {
      setErrorMessages({
        usernameError: false,
        passwordError: false,
      });
      const isLoggedIn = await login(username, password);
      if (isLoggedIn) {
        navigate("/");
        setMessage(false);
        setValues({
          username: "",
          password: "",
        });
      } else {
        setMessage(true);
      }
    } else {
      setErrorMessages({
        usernameError: !username,
        passwordError: !password,
      });
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-input">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username..."
            // required={true}
            value={values.username}
            onChange={handleChange}
          />
          {errorMessages.usernameError && (
            <p className="error-message">Username cannot be empty!</p>
          )}
        </div>
        <div className="form-input">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password..."
            // required={true}
            value={values.password}
            onChange={handleChange}
          />
          {errorMessages.passwordError && (
            <p className="error-message">Password cannot be empty!</p>
          )}
        </div>
        <button className="btn" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
        {message && (
          <p className="message">Username or password is incorrect!</p>
        )}
        <p className="click-here">
          <Link to="/sign-up">Click here</Link> to sign up!
        </p>
      </form>
    </div>
  );
};

export default Login;
