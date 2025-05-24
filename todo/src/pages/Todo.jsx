import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navi from '../component/Navi';
import './todo.css';
import './my.css';

export default function Todo({ user }) {
  const [todos, setTodos] = useState([]);
  const [text, setText]   = useState('');

  useEffect(() => {
    axios.get('/api/todos').then(res => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (!text.trim()) return;
    axios.post('/api/todos', { text }).then(res => {
      setTodos([...todos, res.data]);
      setText('');
    });
  };

  const toggleDone = (id, done) => {
    axios.patch(`/api/todos/${id}`, { done: !done }).then(() => {
      setTodos(todos.map(t => (t.id === id ? { ...t, done: !done } : t)));
    });
  };

  const deleteTodo = id => {
    axios.delete(`/api/todos/${id}`).then(() => {
      setTodos(todos.filter(t => t.id !== id));
    });
  };

  return (
    <div className="todo-page">
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

      {/* 투두 리스트 */}
      <div className="input-box">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="새 할 일"
          onKeyPress={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul className="todo-list">
        {todos.map(t => (
          <li key={t.id} className={t.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleDone(t.id, t.done)}
              />
              <span>{t.text}</span>
            </label>
            <button onClick={() => deleteTodo(t.id)}>×</button>
          </li>
        ))}
      </ul>

      <Navi />
    </div>
  );
}
