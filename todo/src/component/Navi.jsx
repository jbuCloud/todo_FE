import './navi.css';

function Navi({ setPage }) {
  return (
    <nav className="navi">
      <button onClick={() => setPage('calendar')}>Calendar</button>
      <button onClick={() => setPage('todo')}>To-do</button>
      <button onClick={() => setPage('routine')}>Routine</button>
      <button onClick={() => setPage('my')}>My Page</button>
    </nav>
  );
}

export default Navi;
