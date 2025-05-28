import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 테스트용 강제 로그인 로직
    if (form.username === '1234' && form.password === '1234') {
      alert('로그인 성공!');
      navigate('/main');
      return;
    }

    try {
      const response = await fetch('/api/members/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        alert('로그인 성공!');
        navigate('/calendar');
      } else {
        navigate('/calendar');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>로그인</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">로그인</button>
        </form>
      </div>
    </div>
  );
}