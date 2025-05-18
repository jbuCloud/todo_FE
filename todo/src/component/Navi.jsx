import { useNavigate } from 'react-router-dom';
import './navi.css';

function Navi() {
  const navigate = useNavigate();

  return (
    <nav className="navi">
      <button onClick={() => {
        console.log('✅ 이동: /calendar');
        navigate('/calendar');
      }}>
        Home
      </button>
      <button onClick={() => {
        console.log('✅ 이동: /todo');
        navigate('/todo');
      }}>
        Todo
      </button>
      <button onClick={() => {
        console.log('✅ 이동: /routine');
        navigate('/routine');
      }}>
        Routine
      </button>
      <button onClick={() => {
        console.log('✅ 이동: /my');
        navigate('/my');
      }}>
        My Page
      </button>
    </nav>
  );
}

export default Navi;
