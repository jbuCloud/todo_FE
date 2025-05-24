import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navi from '../component/Navi';
import './routine.css';
import './my.css';

export default function Routine({ user }) {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    axios.get('/api/routines').then(res => setRoutines(res.data));
  }, []);

  const toggleDone = (id, done) => {
    axios.patch(`/api/routines/${id}`, { done: !done }).then(() => {
      setRoutines(routines.map(r => (r.id === id ? { ...r, done: !done } : r)));
    });
  };

  return (
    <div className="routine-page">
      {/* 프로필 카드 */}
      <section className="profile-card">
        <div className="avatar-wrapper">
          <img src={user.avatar || '/default-avatar.png'} alt="avatar" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          {user.statusMessage && (
            <p className="profile-status">{user.statusMessage}</p>
          )}
        </div>
      </section>

      {/* 루틴 리스트 */}
      <h2>My Routine</h2>
      <ul className="routine-list">
        {routines.map(r => (
          <li key={r.id} className={r.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={r.done}
                onChange={() => toggleDone(r.id, r.done)}
              />
              {r.title}
            </label>
          </li>
        ))}
      </ul>

      <Navi />
    </div>
  );
}
