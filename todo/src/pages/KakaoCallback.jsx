import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function KakaoCallback({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    const fetchKakaoUser = async () => {
      try {
        const tokenRes = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          null,
          {
            params: {
              grant_type: 'authorization_code',
              client_id: '52c4872fc30d423c710bb20bb07f874e',
              redirect_uri: 'http://localhost:3000/callback',
              code: code,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        );

        const { access_token } = tokenRes.data;

        const userRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const email = userRes.data.kakao_account.email;

        const backendRes = await axios.post(
          'http://192.168.0.164:8000/myapp/users/kakao-login/',
          {
            email: email,
            password: 'securePassword123',
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (backendRes.data.success) {
          setIsLoggedIn(true);
          navigate('/calendar');
        } else {
          alert('카카오 계정이 등록되어 있지 않습니다.');
          navigate('/login');
        }
      } catch (err) {
        console.error('카카오 로그인 처리 실패:', err);
        alert('카카오 로그인에 실패했습니다.');
        navigate('/login');
      }
    };

    if (code) {
      fetchKakaoUser();
    }
  }, [location.search, navigate, setIsLoggedIn]);

  return <div>카카오 로그인 처리 중입니다...</div>;
}

export default KakaoCallback;
