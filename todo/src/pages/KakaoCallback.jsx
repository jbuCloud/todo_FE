import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function KakaoCallback({ setIsLoggedIn, setUser, setNeedsSignup }) {
  const navigate   = useNavigate();
  const calledRef  = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    // 인가코드 추출
    const params = new URLSearchParams(window.location.search);
    const code   = params.get('code');
    console.log('[KakaoCallback] 콜백 진입, code:', code);
    alert('인가코드: ' + code);

    if (!code) {
      console.error('[KakaoCallback] 인가코드 없음! /login 이동');
      alert('인가코드가 없습니다. 다시 로그인해주세요.');
      navigate('/login', { replace: true });
      return;
    }

    // 서버에 인가코드로 로그인 요청
    api.post('/kakao/login', { code })
      .then(res => res.data)
      .then(data => {
        console.log('[KakaoCallback] 서버 응답 data:', data);
        localStorage.setItem('accessToken', data.accessToken);

        if (data.isNewUser || !data.user) {
          setNeedsSignup(true);
          setIsLoggedIn(false);
          console.warn('[KakaoCallback] 신규유저, /signup 이동');
          navigate('/signup', { replace: true });
          return;
        }

        setIsLoggedIn(true);
        setNeedsSignup(false);
        setUser({
          name:          data.user.name,
          profileImage:  data.user.avatar,
          statusMessage: data.user.statusMessage,
        });
        console.log('[KakaoCallback] 기존 유저 로그인 성공, /calendar 이동');
        navigate('/calendar', { replace: true });
      })
      .catch(err => {
        console.error('[KakaoCallback] 카카오 로그인 실패:', err);

        if (err.response?.status === 401 || err.response?.status === 404) {
          setNeedsSignup(true);
          setIsLoggedIn(false);
          console.warn('[KakaoCallback] 401/404 발생, /signup 이동');
          navigate('/signup', { replace: true });
        } else {
          setIsLoggedIn(false);
          setNeedsSignup(false);
          alert('카카오 로그인 실패! 콘솔 로그를 확인하세요.');
          navigate('/login', { replace: true });
        }
      });
  }, [navigate, setIsLoggedIn, setUser, setNeedsSignup]);

  return null;
}