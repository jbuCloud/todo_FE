
// src/pages/Start.jsx
// src/pages/Start.jsx

import { useNavigate } from 'react-router-dom';
import './start.css';
import kakaoLoginImg from '../assets/kakao_login.png';

function Start() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/Start');
  };

  return (
    <div className="start-container">
      <div className="logo-box">로고</div>

      <h1 className="start-title">TimeRoutine</h1>
      <p className="start-subtext">일정관리와 루틴관리를 매일 기록해보세요</p>

      <button className="btn signup-btn" onClick={handleSignupClick}>
        회원가입
      </button>

      <button
        className="btn kakao-login-btn"
        onClick={handleLoginClick}
        aria-label="카카오 로그인"
      >
        <img src={kakaoLoginImg} alt="카카오 로그인 버튼" />
      </button>

      <button className="btn login-btn" onClick={handleLoginClick}>
        일반 로그인
      </button>
    </div>
  );
}

export default Start;
