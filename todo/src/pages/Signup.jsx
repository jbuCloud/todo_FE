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

  const [idMsg, setIdMsg] = useState('*필수 질문입니다');
  const [idColor, setIdColor] = useState('#ff4d4f');

  const [pwMsg, setPwMsg] = useState('*필수 질문입니다');
  const [pwColor, setPwColor] = useState('#ff4d4f');

  const [matchMsg, setMatchMsg] = useState('*필수 질문입니다');
  const [matchColor, setMatchColor] = useState('#ff4d4f');

  const [nameMsg, setNameMsg] = useState('*필수 질문입니다');
  const [nameColor, setNameColor] = useState('#ff4d4f');

  const [emailMsg, setEmailMsg] = useState('*필수 질문입니다');
  const [emailColor, setEmailColor] = useState('#ff4d4f');

  const [invalidFields, setInvalidFields] = useState({
    username: false,
    password: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'username') {
      const usernameValid = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/.test(value);
      setIdMsg(usernameValid ? '' : '아이디는 영어와 숫자 조합, 6자 이상 16자 이하이어야 합니다');
      setIdColor(usernameValid ? 'green' : '#ff4d4f');
      setInvalidFields(prev => ({ ...prev, username: !usernameValid }));
    }

    if (name === 'password') {
      const pwValid = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value);
      setPwMsg(pwValid ? '*사용가능한 비밀번호입니다' : '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다');
      setPwColor(pwValid ? 'green' : '#ff4d4f');
      setInvalidFields(prev => ({ ...prev, password: !pwValid }));

      if (form.confirmPassword !== '') {
        const match = value === form.confirmPassword;
        setMatchMsg(match ? '*비밀번호가 일치합니다' : '*비밀번호가 일치하지 않습니다');
        setMatchColor(match ? 'green' : '#ff4d4f');
        setInvalidFields(prev => ({ ...prev, confirmPassword: !match }));
      }
    }

    if (name === 'confirmPassword') {
      const match = form.password === value;
      setMatchMsg(match ? '*비밀번호가 일치합니다' : '*비밀번호가 일치하지 않습니다');
      setMatchColor(match ? 'green' : '#ff4d4f');
      setInvalidFields(prev => ({ ...prev, confirmPassword: !match }));
    }

    if (name === 'name') {
      const valid = value.trim() !== '';
      setNameMsg(valid ? '' : '*필수 질문입니다');
      setNameColor(valid ? 'green' : '#ff4d4f');
    }

    if (name === 'email') {
      const valid = value.trim() !== '';
      setEmailMsg(valid ? '' : '*필수 질문입니다');
      setEmailColor(valid ? 'green' : '#ff4d4f');
    }
  };

  const handleIdCheck = () => {
    // 실제 중복확인 API 제거됨 — 더미 로직 예시
    const dummyCheck = form.username === 'takenid';
    setIdMsg(dummyCheck ? '이미 사용 중인 아이디입니다' : '사용 가능한 아이디입니다');
    setIdColor(dummyCheck ? '#ff4d4f' : 'green');
    setInvalidFields(prev => ({ ...prev, username: dummyCheck }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.values(invalidFields).some(Boolean) ||
      !form.name.trim() ||
      !form.email.trim()
    ) {
      alert('입력한 정보를 다시 확인해주세요.');
      return;
    }

    alert('회원가입 입력 완료! (API는 연결되어 있지 않음)');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <div className="signup-line" />

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" style={{ color: invalidFields.username ? '#ff4d4f' : 'inherit' }}>
            아이디
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="username"
              name="username"
              className={invalidFields.username ? 'invalid-input' : ''}
              placeholder="아이디를 입력해주세요"
              value={form.username}
              onChange={handleChange}
            />
            <button type="button" className="check-btn-inside" onClick={handleIdCheck}>
              중복확인
            </button>
          </div>
        </div>
        <p className="error-msg" style={{ color: idColor }}>{idMsg}</p>

        <div className="form-group">
          <label htmlFor="password" style={{ color: invalidFields.password ? '#ff4d4f' : 'inherit' }}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={invalidFields.password ? 'invalid-input' : ''}
            placeholder="영문, 숫자 8자리 이상의 비밀번호를 입력해주세요"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <p className="error-msg" style={{ color: pwColor }}>{pwMsg}</p>

        <div className="form-group">
          <label htmlFor="confirmPassword" style={{ color: invalidFields.confirmPassword ? '#ff4d4f' : 'inherit' }}>
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={invalidFields.confirmPassword ? 'invalid-input' : ''}
            placeholder="비밀번호를 다시 입력해주세요"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <p className="error-msg" style={{ color: matchColor }}>{matchMsg}</p>

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
        </div>
        <p className="error-msg" style={{ color: nameColor }}>{nameMsg}</p>

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
        </div>
        <p className="error-msg" style={{ color: emailColor }}>{emailMsg}</p>

        <div className="signup-btn-wrapper">
          <button type="submit" className="signup-btn">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
