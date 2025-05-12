
import './header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="logo">중부대 구름톤 짱</h1>
    </header>
  );
}

export default Header;

/*
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import Logo from '../images/homiLogo.png';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-inner">
        { }
        <img 
          src={Logo} 
          alt="로고"
          className="logo" 
          style={{ cursor: 'pointer' }}
        />

        <div className="auth-links">
          {isLoggedIn ? (
            <>
              <span className="welcome">{username}님 환영합니다!</span>
              <button className="logout-button" onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login">로그인</Link>
              <Link to="/signup" className="signup">회원가입</Link>
              <Link to="/my" className="my">My</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
*/