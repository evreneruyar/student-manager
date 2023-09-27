import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ooops from "../../../images/ooops.jpg";

const NotFoundView = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const timeoutId = setTimeout(() => navigate("/"), 5000);
    const intervalId = setInterval(
      () => setSecondsLeft((prev) => prev - 1),
      1000
    );

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [navigate]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "200px",
      }}
    >
      <img src={ooops} alt="not-found-icon" />
      <h2>There is nothing here!</h2>
      <h3>You will be redirected to homepage in {secondsLeft} seconds...</h3>
    </div>
  );
};

export default NotFoundView;
