import React, { useState } from 'react';
import {
  FiLogOut, FiEdit3, FiSave, FiX
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navi from '../component/Navi';
import './my.css';

export default function My() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: '김종인',
    statusMessage: '오늘도 화이팅!',
    profileImage: 'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=김',
    email: 'kim@example.com'
  });

  const [form, setForm] = useState({
    name: user.name,
    statusMessage: user.statusMessage,
    avatar: user.profileImage,
    email: user.email
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      if (files && files[0]) {
        setForm(prev => ({ ...prev, avatar: URL.createObjectURL(files[0]) }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    setUser({
      ...user,
      name: form.name,
      statusMessage: form.statusMessage,
      profileImage: form.avatar,
      email: form.email
    });
    setEditing(false);
  };

  const handleLogout = () => {
    // 예시: 토큰/세션/사용자 정보 삭제 (로그인 구현 방식에 따라 다름)
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("회원id"); // 사용중인 키가 다르면 맞게 수정
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <div className="my-bg">
      <div className="my-header">
        <h1>마이페이지</h1>
        <button className="my-logout-btn" onClick={handleLogout}>
          <FiLogOut size={22} />
        </button>
      </div>
      <div className="my-content">
        <div className="my-profile-card">
          <div className="my-profile-top">
            <div className="my-profile-img-wrap">
              <img
                src={form.avatar}
                alt="프로필"
                className="my-profile-img"
              />
              {editing && (
                <label className="my-avatar-edit" title="이미지 변경">
                  <FiEdit3 size={18} />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                </label>
              )}
            </div>
            <div className="my-profile-main">
              {editing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="my-profile-name-input"
                    placeholder="이름"
                  />
                  <input
                    type="text"
                    name="statusMessage"
                    value={form.statusMessage}
                    onChange={handleChange}
                    className="my-profile-status-input"
                    placeholder="상태메시지"
                  />
                </>
              ) : (
                <>
                  <div className="my-profile-name">{user.name}</div>
                  <div className="my-profile-status">{user.statusMessage}</div>
                </>
              )}
              {/* 이메일은 항상 상태메시지 바로 아래에 표시 */}
              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="my-profile-status-input"
                  placeholder="이메일"
                  style={{ marginTop: '7px' }}
                />
              ) : (
                <div
                  className="my-profile-email"
                  style={{
                    color: '#a18cd1',
                    fontSize: '1rem',
                    marginTop: '7px',
                    wordBreak: 'break-all'
                  }}
                >
                  {user.email}
                </div>
              )}
            </div>
            {!editing && (
              <button className="my-edit-btn" onClick={() => setEditing(true)}>
                <FiEdit3 />
              </button>
            )}
          </div>
          {editing && (
            <div className="my-edit-actions">
              <button className="my-save-btn" onClick={handleSave}><FiSave />저장</button>
              <button className="my-cancel-btn" onClick={() => setEditing(false)}><FiX />취소</button>
            </div>
          )}
        </div>
      </div>
      <Navi />
    </div>
  );
}