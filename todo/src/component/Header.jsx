import React from 'react';
import './header.css'; // (아바타, 이름, 자기소개 꾸미는 css)

export default function Header({ user = {} }) {
  return (
    <div className="profile-section">
      <div className="profile-wrapper">
        <div className="profile-avatar">
          {user.name?.[0] || '김'}
        </div>
        <div>
          <h2 className="profile-name">{user.name || '김종민'}</h2>
          <p className="profile-status">{user.statusMessage || '오늘도 화이팅!'}</p>
        </div>
      </div>
    </div>
  );
}