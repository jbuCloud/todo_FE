/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: ''
  });

  const [messages, setMessages] = useState({
    username: '*필수 질문입니다',
    password: '*필수 질문입니다',
    confirmPassword: '*필수 질문입니다',
    name: '*필수 질문입니다',
    email: '*필수 질문입니다',
  });

  const [colors, setColors] = useState({
    username: '#ff4d4f',
    password: '#ff4d4f',
    confirmPassword: '#ff4d4f',
    name: '#ff4d4f',
    email: '#ff4d4f',
  });

  const [invalidFields, setInvalidFields] = useState({
    username: true,
    password: true,
    confirmPassword: true,
    name: true,
    email: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const updateMsgAndColor = (msg, color, isInvalid) => {
      setMessages(prev => ({ ...prev, [name]: msg }));
      setColors(prev => ({ ...prev, [name]: color }));
      setInvalidFields(prev => ({ ...prev, [name]: isInvalid }));
    };

    if (name === 'username') {
      const valid = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/.test(value);
      updateMsgAndColor(
        valid ? '' : '아이디는 영어와 숫자 조합, 6~16자여야 합니다',
        valid ? 'green' : '#ff4d4f',
        !valid
      );
    }

    if (name === 'password') {
      const valid = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value);
      updateMsgAndColor(
        valid ? '*사용가능한 비밀번호입니다' : '영문+숫자 포함 8자 이상',
        valid ? 'green' : '#ff4d4f',
        !valid
      );

      if (form.confirmPassword !== '') {
        const match = value === form.confirmPassword;
        setMessages(prev => ({ ...prev, confirmPassword: match ? '*비밀번호가 일치합니다' : '*비밀번호가 일치하지 않습니다' }));
        setColors(prev => ({ ...prev, confirmPassword: match ? 'green' : '#ff4d4f' }));
        setInvalidFields(prev => ({ ...prev, confirmPassword: !match }));
      }
    }

    if (name === 'confirmPassword') {
      const match = form.password === value;
      updateMsgAndColor(
        match ? '*비밀번호가 일치합니다' : '*비밀번호가 일치하지 않습니다',
        match ? 'green' : '#ff4d4f',
        !match
      );
    }

    if (name === 'name' || name === 'email') {
      const valid = value.trim() !== '';
      updateMsgAndColor(valid ? '' : '*필수 질문입니다', valid ? 'green' : '#ff4d4f', !valid);
    }
  };

  const handleIdCheck = () => {
    const taken = form.username === 'takenid';
    setMessages(prev => ({ ...prev, username: taken ? '이미 사용 중인 아이디입니다' : '사용 가능한 아이디입니다' }));
    setColors(prev => ({ ...prev, username: taken ? '#ff4d4f' : 'green' }));
    setInvalidFields(prev => ({ ...prev, username: taken }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(invalidFields).some(v => v)) {
      alert('입력한 정보를 다시 확인해주세요.');
      return;
    }

    alert('회원가입 완료! (API 미연결)');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <div className="signup-line" />

      <form className="signup-form" onSubmit={handleSubmit}>
        {}
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="아이디를 입력해주세요"
              value={form.username}
              onChange={handleChange}
              className={invalidFields.username ? 'invalid-input' : ''}
            />
            <button type="button" className="check-btn-inside" onClick={handleIdCheck}>
              중복확인
            </button>
          </div>
          <p className="error-msg" style={{ color: colors.username }}>{messages.username}</p>
        </div>

        { }
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="영문, 숫자 8자리 이상"
            value={form.password}
            onChange={handleChange}
            className={invalidFields.password ? 'invalid-input' : ''}
          />
          <p className="error-msg" style={{ color: colors.password }}>{messages.password}</p>
        </div>

        { }
        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요"
            value={form.confirmPassword}
            onChange={handleChange}
            className={invalidFields.confirmPassword ? 'invalid-input' : ''}
          />
          <p className="error-msg" style={{ color: colors.confirmPassword }}>{messages.confirmPassword}</p>
        </div>

        { }
        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            value={form.name}
            onChange={handleChange}
          />
          <p className="error-msg" style={{ color: colors.name }}>{messages.name}</p>
        </div>

        { }
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={form.email}
            onChange={handleChange}
          />
          <p className="error-msg" style={{ color: colors.email }}>{messages.email}</p>
        </div>

        <div className="signup-btn-wrapper">
          <button type="submit" className="signup-btn">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
*/


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
    name: '' // ✅ 이름 필드 추가
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
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
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
