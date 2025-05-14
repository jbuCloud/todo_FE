// src/pages/Login.jsx

import React, { useState } from 'react';
import './login.css';
import Logo from '../assets/kakao_login.png'; // ✅ 올바른 경로
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '1234' && password === '1234') {
      alert('로그인에 성공했습니다!');
      setIsLoggedIn(true); // App.jsx의 상태 업데이트
      localStorage.setItem('isLoggedIn', 'true'); // 선택 사항
      localStorage.setItem('username', '최고의감자🥔');
      navigate('/calendar');
    } else {
      alert('아이디 또는 비밀번호는 1234로 입력해주세요.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">로그인</button>
      </form>

      <div className="divider">또는</div>

      <div className="kakao-login">
        <img
          src={Logo}
          alt="카카오 로그인"
          className="kakao-login-img"
        />
      </div>

      <div className="login-links">
        <a href="/kakao-signup">카카오로 회원가입</a>
        <a href="/signup">회원가입</a>
      </div>
    </div>
  );
}

export default Login;
