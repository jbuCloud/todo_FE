/*
import React from 'react';
import './header.css';

export default function Header({ user }) {
  return (
    <header className="app-header">
      {user.profileImage && <img src={user.profileImage} alt="avatar" />}
      <div className="header-info">
        <h1>{user.name}님, 환영합니다!</h1>
        {user.statusMessage && <p>{user.statusMessage}</p>}
      </div>
    </header>
  );
}

*/

import React from 'react';
import './header.css';

export default function Header({ user }) {
  return (
    <header className="main-header">
      <div className="header-profile">
        <img className="header-avatar" src={user?.profileImage} alt="avatar" />
        <div>
          <div className="header-name">{user?.name || '이름없음'}</div>
          <div className="header-status">{user?.statusMessage || '상태메시지 없음'}</div>
        </div>
      </div>
    </header>
  );
}
