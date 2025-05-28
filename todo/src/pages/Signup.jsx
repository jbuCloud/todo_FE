// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const SocialSignup = () => {
  const [form, setForm] = useState({
    email: "",
    nickName: "",
    password: "", // added
    introText: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 임의 테스트용 응답 시뮬레이션
    const mockResponse = {
      email: form.email,
      username: form.email,
      password: form.password,
      nickname: form.nickName,
      introText: form.introText,
    };

    console.log("회원가입 성공 (mock):", mockResponse);
    alert("회원가입 성공 (테스트 모드)");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nickname
          <input
            type="text"
            name="nickName"
            value={form.nickName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Introduction
          <textarea
            name="introText"
            value={form.introText}
            onChange={handleChange}
            rows="4"
          />
        </label>
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SocialSignup;