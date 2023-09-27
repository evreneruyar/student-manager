import React, { useContext } from "react";
import { AuthContext } from "../../../../context/auth/AuthContext";

const HomePage = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="home">
      {userData ? (
        <h1>Welcome {userData.username}!</h1>
      ) : (
        <h1>Welcome to Student Manager</h1>
      )}
    </div>
  );
};

export default HomePage;
