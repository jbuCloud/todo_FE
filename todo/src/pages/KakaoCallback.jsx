import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoCallback({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const fetchedRef = useRef(false);

  useEffect(() => {
    const isCallback = window.location.pathname === '/callback';
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    console.log('✅ useEffect 실행됨');
    console.log('📍 현재 경로:', window.location.pathname);
    console.log('📍 code:', code);

    if (isCallback && code && !fetchedRef.current) {
      fetchedRef.current = true;
      console.log('🚀 fetch 실행 시작! 전송할 code:', code);

      fetch('http://172.16.100.55:8080/kakao/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(async (response) => {
          console.log('🟢 서버 응답 상태:', response.status);
          const data = await response.json();
          console.log('📦 응답 데이터:', data);

          if (response.status === 200) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            setIsLoggedIn(true);
            navigate('/calendar');
          } else if (response.status === 401) {
            // ✅ temporaryToken을 꼭 포함해야 함
            navigate('/signup', {
              state: {
                email: data.email,
                nickname: data.nickname,
                kakaoId: data.kakaoId,
                profileUrl: data.profileUrl,
                temporaryToken: data.temporaryToken,
              },
            });
          } else {
            throw new Error('예상치 못한 응답입니다.');
          }
        })
        .catch((error) => {
          console.error('❌ fetch 에러:', error);
          alert('카카오 로그인 처리 중 오류가 발생했습니다.');
          navigate('/login');
        });
    }
  }, [navigate, setIsLoggedIn]);

  return <div>카카오 로그인 처리 중입니다...</div>;
}

export default KakaoCallback;
