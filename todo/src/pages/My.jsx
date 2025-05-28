import React, { useState } from 'react';
import { FiSettings, FiLogOut, FiEdit3, FiSave, FiX, FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import './my.css';

const Navi = () => (
  <nav className="navi-bar">
    <a href="/calendar" className="navi-item">
      <FiCalendar /><span>캘린더</span>
    </a>
    <a href="/todo" className="navi-item">
      <FiEdit3 /><span>할일</span>
    </a>
    <a href="/routine" className="navi-item">
      <FiSettings /><span>루틴</span>
    </a>
    <a href="/my" className="navi-item active">
      <FiUser /><span>마이</span>
    </a>
  </nav>
);

export default function My() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: '김종인',
    statusMessage: '오늘도 화이팅!',
    profileImage: 'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=김',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    joinDate: '2024.01.15'
  });

  const [form, setForm] = useState({
    name: user.name,
    statusMessage: user.statusMessage,
    avatar: user.profileImage,
    email: user.email,
    phone: user.phone
  });

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
      email: form.email,
      phone: form.phone
    });
    setEditing(false);
  };

  const handleLogout = () => {
    alert('로그아웃 되었습니다.');
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
        {/* 프로필 카드 */}
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

        {/* 개인정보 */}
        <div className="my-info-card">
          <div className="my-info-title">개인정보</div>
          <div className="my-info-list">
            <div className="my-info-item">
              <div className="my-info-icon email"><FiMail /></div>
              <div className="my-info-value">
                <div className="my-info-label">이메일</div>
                {editing
                  ? <input type="email" name="email" value={form.email} onChange={handleChange} className="my-info-input" />
                  : <span>{user.email}</span>
                }
              </div>
            </div>
            <div className="my-info-item">
              <div className="my-info-icon phone"><FiPhone /></div>
              <div className="my-info-value">
                <div className="my-info-label">전화번호</div>
                {editing
                  ? <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="my-info-input" />
                  : <span>{user.phone}</span>
                }
              </div>
            </div>
            <div className="my-info-item">
              <div className="my-info-icon date"><FiCalendar /></div>
              <div className="my-info-value">
                <div className="my-info-label">가입일</div>
                <span>{user.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 설정 */}
        <div className="my-setting-card">
          <div className="my-setting-title">설정</div>
          <div className="my-setting-list">
            <button className="my-setting-btn">
              <div className="my-setting-icon"><FiSettings /></div>
              <div>
                <div className="my-setting-main">계정 설정</div>
                <div className="my-setting-desc">비밀번호 변경, 알림 설정</div>
              </div>
              <div className="my-setting-arrow"></div>
            </button>
            <button className="my-setting-btn">
              <div className="my-setting-icon"><FiUser /></div>
              <div>
                <div className="my-setting-main">개인정보 관리</div>
                <div className="my-setting-desc">프라이버시, 데이터 관리</div>
              </div>
              <div className="my-setting-arrow"></div>
            </button>
          </div>
        </div>
      </div>
      <Navi />
    </div>
  );
}