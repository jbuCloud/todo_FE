import React, { useState, useEffect, useCallback } from 'react';
import { LogOut, Check } from 'lucide-react'; // 아이콘 오류 해결: lucide-react 설치 필요
import './my.css';
import defaultProfile from '../assets/profile.jpg'; // 기본 프로필 이미지

const My = () => {
  const [userInfo, setUserInfo] = useState({
    id: 'user123',
    name: '홍길동',
    email: 'user123@example.com',
    profileImage: null,
  });

  const themeOptions = [
    {
      id: 'theme-blue',
      name: '블루',
      colors: {
        primary: '#1a73e8',
        secondary: '#4285f4',
        background: '#f0f4ff',
      },
    },
    {
      id: 'theme-green',
      name: '그린',
      colors: {
        primary: '#0f9d58',
        secondary: '#34a853',
        background: '#f0fff4',
      },
    },
    {
      id: 'theme-orange',
      name: '오렌지',
      colors: {
        primary: '#ff6f0f',
        secondary: '#ff8534',
        background: '#fff4e6',
      },
    },
    {
      id: 'theme-purple',
      name: '퍼플',
      colors: {
        primary: '#7e57c2',
        secondary: '#9575cd',
        background: '#f3e5f5',
      },
    },
  ];

  const [currentTheme, setCurrentTheme] = useState('theme-blue');

  // useCallback으로 감싼 테마 변경 함수
  const changeTheme = useCallback(
    (themeId) => {
      setCurrentTheme(themeId);
      localStorage.setItem('userTheme', themeId);

      const theme = themeOptions.find((t) => t.id === themeId);
      if (theme) {
        document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
        document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);
        document.documentElement.style.setProperty('--background-color', theme.colors.background);
      }
    },
    [themeOptions]
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme) {
      changeTheme(savedTheme);
    } else {
      changeTheme('theme-blue');
    }
  }, [changeTheme]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserInfo({
          ...userInfo,
          profileImage: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    console.log('로그아웃 처리');
    // 실제 로그아웃 처리 로직 삽입 필요
  };

  return (
    <div className="my-container">
      <div className="my-content">
        <h1 className="my-title">내 프로필</h1>

        <div className="profile-section">
          <div className="profile-image-container">
            <div className="profile-image">
              <img src={userInfo.profileImage || defaultProfile} alt="프로필 이미지" />
            </div>
            <div className="profile-image-upload">
              <label htmlFor="profile-upload" className="upload-label">
                사진 변경
              </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="upload-input"
              />
            </div>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <div className="info-label">아이디</div>
              <div className="info-value">{userInfo.id}</div>
            </div>
            <div className="info-row">
              <div className="info-label">이름</div>
              <div className="info-value">{userInfo.name}</div>
            </div>
            <div className="info-row">
              <div className="info-label">이메일</div>
              <div className="info-value">{userInfo.email}</div>
            </div>
          </div>
        </div>

        <div className="theme-section">
          <h2 className="section-title">테마 설정</h2>
          <p className="section-description">원하는 색상 테마를 선택하세요</p>

          <div className="theme-options">
            {themeOptions.map((theme) => (
              <div
                key={theme.id}
                className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => changeTheme(theme.id)}
              >
                <div
                  className="theme-color"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  {currentTheme === theme.id && <Check size={20} color="#fff" />}
                </div>
                <span className="theme-name">{theme.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="account-actions">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default My;
