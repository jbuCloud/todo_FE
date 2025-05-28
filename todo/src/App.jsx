import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Start from "./pages/Start";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CalendarPage from "./pages/Calendar";
import Todo from "./pages/Todo";
import Routine from "./pages/Routine";
import My from "./pages/My";

function App() {
  // 🔑 전역 상태로 user 및 로그인 여부 관리
  const [user, setUser] = useState({
    name: "김종민",
    statusMessage: "오늘도 화이팅!",
    profileImage: "/default-avatar.png",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<CalendarPage user={user} />} />
        <Route path="/todo" element={<Todo user={user} />} />
        <Route path="/routine" element={<Routine user={user} />} />
        <Route path="/my" element={<My user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;