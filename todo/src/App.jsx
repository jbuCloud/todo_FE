/*
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Calendar from './pages/Calendar';
import My from './pages/My';
import Routine from './pages/Routine';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './component/Header';
import Navi from './component/Navi';
import Start from './pages/Start';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-wrapper">
        {isLoggedIn && <Header />}

        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/calendar" replace /> : <Start />
              }
            />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/calendar"
              element={
                isLoggedIn ? <Calendar /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/my"
              element={
                isLoggedIn ? <My /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/routine"
              element={
                isLoggedIn ? <Routine /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/todo"
              element={
                isLoggedIn ? <Todo /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </div>

        {isLoggedIn && <Navi />}
      </div>
    </Router>
  );
}

export default App;
*/
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Calendar from './pages/Calendar';
import My from './pages/My';
import Routine from './pages/Routine';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './component/Header';
import Navi from './component/Navi';
import Start from './pages/Start';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-wrapper">
        {isLoggedIn && <Header />}

        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/calendar" replace /> : <Start />
              }
            />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/calendar"
              element={
                isLoggedIn ? <Calendar /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/my"
              element={
                isLoggedIn ? <My setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/routine"
              element={
                isLoggedIn ? <Routine /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/todo"
              element={
                isLoggedIn ? <Todo /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </div>

        {isLoggedIn && <Navi />}
      </div>
    </Router>
  );
}

export default App;
