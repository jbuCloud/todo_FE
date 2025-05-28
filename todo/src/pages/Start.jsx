// src/pages/Start.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="start-container">
      <h1>Welcome to TimeRoutine
      </h1>
      <button onClick={() => navigate("/signup")}>회원가입</button>
      <button onClick={() => navigate("/login")}>로그인</button>
    </div>
  );
};

export default Start;