import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
  const navigate    = useNavigate();
  const kakaoKey    = process.env.REACT_APP_KAKAO_KEY;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  useEffect(() => {
    console.log('KAKAO_KEY =', kakaoKey);
    console.log('REDIRECT_URI =', redirectUri);
  }, [kakaoKey, redirectUri]);

  const handleLogin = () => {
    const enc = encodeURIComponent(redirectUri);
    const loginUrl =
      `https://kauth.kakao.com/oauth/authorize`
      + `?client_id=${kakaoKey}`
      + `&redirect_uri=${enc}`
      + `&response_type=code`;

    // 로그인 URL 확인 로그
    console.log('[Login] 카카오 로그인 URL:', loginUrl);

    // 혹시 환경변수 누락됐을 때 에러 로그 남김
    if (!kakaoKey || !redirectUri) {
      console.error('[Login] KAKAO_KEY 또는 REDIRECT_URI가 없습니다.');
      return;
    }

    try {
      window.location.href = loginUrl;
    } catch (err) {
      console.error('[Login] 카카오 로그인 리다이렉트 실패:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>카카오로 로그인</h1>
        <button onClick={handleLogin} className="btn-kakao">
          카카오 로그인
        </button>
      </div>
    </div>
  );
}