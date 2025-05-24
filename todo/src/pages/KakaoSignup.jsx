// src/pages/KakaoSignup.jsx
import React, { useState } from 'react';
import { useNavigate }     from 'react-router-dom';
import api                 from '../api';
import { FiUpload }        from 'react-icons/fi';
import './kakaoSignup.css';

export default function KakaoSignup({ setIsLoggedIn, setUser, setNeedsSignup }) {
  const navigate = useNavigate();
  const [form, setForm]       = useState({
    nickname:      '',
    statusMessage: '',
    avatarFile:    null,
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setForm(f => ({ ...f, avatarFile: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append('nickname',      form.nickname);
      fd.append('statusMessage', form.statusMessage);
      if (form.avatarFile) fd.append('avatar', form.avatarFile);

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('토큰 없음! 다시 로그인 해주세요.');
        setLoading(false);
        return;
      }

      const { data } = await api.post('/users/signup', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      });

      // 여기서 실제 컬럼명에 맞춰서 값을 세팅
      localStorage.setItem('accessToken', data.accessToken);
      setIsLoggedIn(true);
      setNeedsSignup(false);
      setUser({
        name:          data.user.nickname,      // nickname
        profileImage:  data.user.profileUrl,    // profileUrl
        statusMessage: data.user.introText,     // introText
      });

      navigate('/calendar', { replace: true });
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <h1>회원가입</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="avatar-section">
          <div className="avatar-preview">
            {form.avatarFile
              ? <img
                  src={URL.createObjectURL(form.avatarFile)}
                  alt="프로필 미리보기"
                />
              : <div className="avatar-placeholder">+</div>
            }
          </div>
          <label className="avatar-label">
            <FiUpload size={20}/>
            <span>프로필 사진 업로드</span>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="field">
          <span>닉네임</span>
          <input
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력하세요"
          />
        </label>

        <label className="field">
          <span>상태메시지</span>
          <textarea
            name="statusMessage"
            value={form.statusMessage}
            onChange={handleChange}
            placeholder="자기소개를 입력하세요"
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? '가입 중…' : '가입하기'}
        </button>
      </form>
    </div>
  );
}