import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Signup({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state || {};

  const [form, setForm] = useState({
    email: userData.email || '',
    nickname: userData.nickname || '',
    introText: '',
    kakaoId: userData.kakaoId || '',
    profileUrl: userData.profileUrl || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://192.168.0.67:8080/kakao/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setIsLoggedIn(true);
        navigate('/calendar');
      } else {
        alert('회원가입 실패');
      }
    } catch (err) {
      console.error('회원가입 오류:', err);
      alert('서버 오류 발생');
    }
  };

  return (
    <div className="signup-container">
      <h2>카카오 회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={form.email}
          readOnly
        />
        <input
          type="text"
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          placeholder="닉네임"
        />
        <textarea
          name="introText"
          value={form.introText}
          onChange={handleChange}
          placeholder="자기소개"
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
