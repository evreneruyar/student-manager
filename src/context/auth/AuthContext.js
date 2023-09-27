import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const controller = new AbortController();

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await axios(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        { signal: controller.signal }
      );
      const users = response.data;
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      setIsLoading(false);
      if (user) {
        setUserData(user);
        return true;
      } else {
        setUserData(null);
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      if (error.name === "AxiosError") {
        console.log(error.message);
        return false;
      } else {
        console.log("Something went wrong!", error.message);
        return false;
      }
    }
  };

  //   controller.abort();

  const logout = () => {
    setUserData(null);
    navigate("/");
  };

  const signup = async ({ userId, username, email, password }) => {
    try {
      setIsLoading(true);
      const newUser = { userId, username, email, password };
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        newUser
      );
      setIsLoading(false);
      if (response.status === 201) {
        setUserData(response.data);
        return true;
      } else {
        setUserData(null);
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      if (error.name === "AxiosError") {
        console.log(error.message);
        return false;
      } else {
        console.log("Something went wrong!", error.message);
        return false;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ userData, isLoading, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
