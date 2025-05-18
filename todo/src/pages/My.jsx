// ✅ My.jsx
import React, { useState, useEffect } from 'react';
import { LogOut, Check, Pencil, Save } from 'lucide-react';
import './my.css';
import basicProfile from '../assets/basicProfile.jpeg';

const themeOptions = [
  { id: 'theme-blue', name: '블루', colors: { primary: '#1a73e8', secondary: '#4285f4', background: '#f0f4ff' } },
  { id: 'theme-green', name: '그린', colors: { primary: '#0f9d58', secondary: '#34a853', background: '#f0fff4' } },
  { id: 'theme-orange', name: '오렌지', colors: { primary: '#ff6f0f', secondary: '#ff8534', background: '#fff4e6' } },
  { id: 'theme-purple', name: '퍼플', colors: { primary: '#7e57c2', secondary: '#9575cd', background: '#f3e5f5' } },
];

const My = ({ setIsLoggedIn, user, setUser }) => {
  const [userInfo, setUserInfo] = useState(user || {});
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [tempStatusMessage, setTempStatusMessage] = useState('');
  const [currentTheme, setCurrentTheme] = useState('theme-blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('userTheme') || 'theme-blue';
    setCurrentTheme(savedTheme);
  }, []);

  useEffect(() => {
    const theme = themeOptions.find((t) => t.id === currentTheme);
    if (theme) {
      document.documentElement.style.setProperty('--primary-color', theme.colors.primary);
      document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary);
      document.documentElement.style.setProperty('--background-color', theme.colors.background);
    }
  }, [currentTheme]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      try {
        const res = await fetch('http://172.16.100.55:8080/kakao/user-info', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const updatedUser = {
            name: data.nickName || '',
            profileImage: data.profileUrl || '',
            statusMessage: data.introText || '안녕하세요! 반갑습니다.',
          };
          setUserInfo(updatedUser);
          setUser(updatedUser); // ✅ 전역 user도 동기화
        } else {
          console.error('❌ 사용자 정보 불러오기 실패');
        }
      } catch (err) {
        console.error('❌ 에러 발생:', err);
      }
    };
    fetchUserInfo();
  }, [setUser]);

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('userTheme', themeId);
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await fetch('http://172.16.100.55:8080/kakao/upload-profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('업로드 실패');

      const result = await response.json();
      const newImage = result.newProfileUrl;

      setUserInfo((prev) => ({ ...prev, profileImage: newImage }));
      setUser((prev) => ({ ...prev, profileImage: newImage })); // ✅ 전역 user 상태 동기화
    } catch (err) {
      console.error('❌ 이미지 업로드 실패:', err);
    }
  };

  const startEditingStatus = () => {
    setTempStatusMessage(userInfo.statusMessage);
    setIsEditingStatus(true);
  };

  const saveStatusMessage = () => {
    setUserInfo((prev) => ({ ...prev, statusMessage: tempStatusMessage }));
    setUser((prev) => ({ ...prev, statusMessage: tempStatusMessage })); // ✅ 전역 상태 반영
    setIsEditingStatus(false);
    // 백엔드 반영 필요 시 여기에 추가 fetch
  };

  const handleStatusChange = (e) => {
    setTempStatusMessage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <div className="my-container">
      <div className="my-content">
        <h1 className="my-title">내 프로필</h1>

        <div className="profile-section">
          <div className="profile-image-container">
            <div className="profile-image">
              <img
                src={userInfo.profileImage || basicProfile}
                alt="프로필 이미지"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = basicProfile;
                }}
              />
            </div>
            <div className="profile-image-upload">
              <label htmlFor="profile-upload" className="upload-label">사진 변경</label>
              <input type="file" id="profile-upload" accept="image/*" onChange={handleProfileImageChange} className="upload-input" />
            </div>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <div className="info-label">이름</div>
              <div className="info-value">{userInfo.name}</div>
            </div>
            <div className="info-row status-message-row">
              <div className="info-label">상태 메시지</div>
              <div className="info-value status-message-container">
                {isEditingStatus ? (
                  <div className="status-edit-container">
                    <input
                      type="text"
                      value={tempStatusMessage}
                      onChange={handleStatusChange}
                      className="status-input"
                      maxLength="50"
                      autoFocus
                    />
                    <button className="status-save-btn" onClick={saveStatusMessage}>
                      <Save size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="status-display">
                    <span>{userInfo.statusMessage}</span>
                    <button className="status-edit-btn" onClick={startEditingStatus}>
                      <Pencil size={16} />
                    </button>
                  </div>
                )}
              </div>
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
                <div className="theme-color" style={{ backgroundColor: theme.colors.primary }}>
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
