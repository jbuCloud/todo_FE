import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar';
import My from './pages/My';
import Routine from './pages/Routine';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './component/Header';
import Navi from './component/Navi';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />

        <div className="page-content">
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

        <Navi />
      </div>
    </Router>
  );
}

export default App;
