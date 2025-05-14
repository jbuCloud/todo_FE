import './my.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

const themeColors = {
  black: ['#eeeeee', '#888888', '#444444', '#000000'],
  green: ['#eeeeee', '#a8e6a1', '#4ddf71', '#1ca94c'],
  blue:  ['#eeeeee', '#a4d4ff', '#4fa8ff', '#006eff'],
  orange:['#eeeeee', '#ffd59e', '#ffa94d', '#ff7200'],
  yellow:['#eeeeee', '#fff2a4', '#ffe04d', '#ffca00'],
};

function My() {
  const [selectedTheme, setSelectedTheme] = useState('black');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate(); // ✅ 추가

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/start'); // ✅ 로그아웃 후 Start.jsx로 이동
  };

  return (
    <div className="my-page">
      <h2>My Page</h2>

      {isLoggedIn && (
        <div className="profile-section">
          <h3>회원 프로필</h3>
          <div className="profile-info">
            <p><strong>이름:</strong> 홍길동</p>
            <p><strong>아이디:</strong> honggildong123</p>
            <p><strong>이메일:</strong> honggildong@example.com</p>
            <button className="logout-button" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      )}

      <div className="theme-section">
        <h3>📌 테마 선택</h3>
        <div className="theme-options">
          {Object.entries(themeColors).map(([themeName, colors]) => (
            <div
              key={themeName}
              className={`theme-option ${selectedTheme === themeName ? 'selected' : ''}`}
              onClick={() => setSelectedTheme(themeName)}
            >
              <div style={{ display: 'flex' }}>
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className="theme-color-box"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              <span className="theme-label">{themeName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default My;
