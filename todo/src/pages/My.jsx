import './my.css';
import { useState } from 'react';

const themeColors = {
  black: ['#eeeeee', '#888888', '#444444', '#000000'],
  green: ['#eeeeee', '#a8e6a1', '#4ddf71', '#1ca94c'],
  blue:  ['#eeeeee', '#a4d4ff', '#4fa8ff', '#006eff'],
  orange:['#eeeeee', '#ffd59e', '#ffa94d', '#ff7200'],
  yellow:['#eeeeee', '#fff2a4', '#ffe04d', '#ffca00'],
};

function My() {
  const [selectedTheme, setSelectedTheme] = useState('black');

  return (
    <div className="my-page">
      <h2>My Page</h2>

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
