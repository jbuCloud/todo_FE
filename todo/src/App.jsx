// ✅ App.jsx (수정된 전체 구조)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Calendar from './pages/Calendar';
import My from './pages/My';
import Routine from './pages/Routine';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './component/Header';
import Navi from './component/Navi';
import Start from './pages/Start';
import KakaoCallback from './pages/KakaoCallback';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      fetch('http://172.16.100.55:8080/kakao/user-info', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser({
            name: data.nickName,
            profileImage: data.profileUrl,
            statusMessage: data.introText,
          });
        })
        .catch((err) => console.error('❌ 사용자 정보 불러오기 실패:', err));
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Router>
      <div className="app-wrapper">
        {isLoggedIn && <Header />}
        <div className="page-content">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/calendar" replace /> : <Start />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/callback" element={<KakaoCallback setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/calendar" element={isLoggedIn ? <Calendar user={user} /> : <Navigate to="/login" replace />} />
            <Route path="/my" element={isLoggedIn ? <My user={user} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" replace />} />
            <Route path="/routine" element={isLoggedIn ? <Routine user={user} /> : <Navigate to="/login" replace />} />
            <Route path="/todo" element={isLoggedIn ? <Todo user={user} /> : <Navigate to="/login" replace />} />
          </Routes>
        </div>
        {isLoggedIn && <Navi />}
      </div>
    </Router>
  );
}

export default App;
