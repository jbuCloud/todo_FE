import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // 예시 로그인 조건
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);          // ✅ 로그인 상태 업데이트
      navigate('/calendar');        // ✅ 캘린더로 이동
    } else {
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="아이디"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button onClick={handleLogin}>로그인</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
