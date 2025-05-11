import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Calendar from './pages/Calendar';
import My from './pages/My';
import Routine from './pages/Routine';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div>
        {/* 내비게이션 바 */}
        <nav>
          <ul>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/my">My</Link></li>
            <li><Link to="/routine">Routine</Link></li>
            <li><Link to="/todo">Todo</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </nav>

        {/* 페이지 경로 설정 */}
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/my" element={<My />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<h2>홈 페이지입니다</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
