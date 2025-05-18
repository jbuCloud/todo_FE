import React, { useState } from 'react';
import './login.css';
import Logo from '../assets/kakao_login.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ 테스트 로그인 (서버 없이 id: 1234, pw: 1234)
    if (username === '1234' && password === '1234') {
      alert('테스트 로그인에 성공했습니다!');
      setIsLoggedIn(true);
      navigate('/calendar');
      return;
    }

    // ✅ 실제 서버 요청
    try {
      const response = await axios.post(
        'http://192.168.0.67:8080/get-user/',
        {
          userId: username,
          userpwd: password,
        }
      );

      if (response.data.success) {
        alert('로그인에 성공했습니다!');
        setIsLoggedIn(true);
        navigate('/calendar');
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      alert('서버 오류로 로그인에 실패했습니다.');
    }
  };

  const handleKakaoLogin = () => {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=52c4872fc30d423c710bb20bb07f874e&redirect_uri=http://localhost:3000/callback';
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
          style={{ cursor: 'pointer' }}
          onClick={handleKakaoLogin}
        />
      </div>
    </div>
  );
}

export default Login;
