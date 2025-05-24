import React, { useState } from 'react';
import Navi from '../component/Navi';
import './my.css';

export default function My({ user, setUser, setIsLoggedIn }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    statusMessage: user.statusMessage,
    avatar: user.profileImage,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setForm(f => ({ ...f, avatar: URL.createObjectURL(files[0]) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSave = () => {
    setUser({
      ...user,
      name: form.name,
      statusMessage: form.statusMessage,
      profileImage: form.avatar,
    });
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <div className="my-page">
      <div className="profile-card">
        <div className="avatar-container">
          <img className="avatar-img" src={form.avatar} alt="avatar" />
          <button className="edit-btn" onClick={() => setEditing(true)}>
            ⚙️
          </button>
        </div>
        {editing ? (
          <div className="edit-fields">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              style={{ marginBottom: '8px' }}
            />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름"
            />
            <input
              type="text"
              name="statusMessage"
              value={form.statusMessage}
              onChange={handleChange}
              placeholder="상태메시지"
            />
            <button onClick={handleSave} className="btn-save">저장</button>
            <button onClick={() => setEditing(false)} className="btn-cancel">취소</button>
          </div>
        ) : (
          <>
            <h2>{user.name}</h2>
            <p>{user.statusMessage}</p>
          </>
        )}
      </div>
      <button onClick={handleLogout} className="btn-logout">로그아웃</button>
      <Navi />
    </div>
  );
}
