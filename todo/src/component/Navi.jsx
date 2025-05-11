import { Link } from 'react-router-dom';
import './navi.css';

function Navi() {
  return (
    <nav className="navi">
      <Link to="/calendar"><button>Calendar</button></Link>
      <Link to="/todo"><button>Todo</button></Link>
      <Link to="/routine"><button>Routine</button></Link>
      <Link to="/my"><button>My Page</button></Link>
    </nav>
  );
}

export default Navi;
