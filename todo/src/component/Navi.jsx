import { useNavigate } from 'react-router-dom';
import './navi.css';

function Navi() {
  const navigate = useNavigate();

  return (
    <nav className="navi">
      <button onClick={() => navigate('/calendar')}>Calendar</button>
      <button onClick={() => navigate('/todo')}>Todo</button>
      <button onClick={() => navigate('/routine')}>Routine</button>
      <button onClick={() => navigate('/my')}>My Page</button>
    </nav>
  );
}
export default Navi;