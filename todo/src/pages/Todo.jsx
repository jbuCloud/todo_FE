import React, { useState } from 'react';
import Navi from '../component/Navi';
import Header from '../component/Header';
import { FiEdit, FiTrash2, FiCalendar, FiRepeat, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import './todo.css';

const Calendar = ({ onChange, value, tileClassName }) => {
  const today = new Date();
  const currentMonth = value.getMonth();
  const currentYear = value.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDate = firstDay.getDay();

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const days = [];
  for (let i = 0; i < startDate; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = date.toDateString() === value.toDateString();
    const tileClass = tileClassName ? tileClassName({ date }) : '';

    days.push(
      <div
        key={day}
        className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${tileClass}`}
        onClick={() => onChange(date)}
      >
        {day}
      </div>
    );
  }

  const prevMonth = () => {
    const prev = new Date(currentYear, currentMonth - 1, 1);
    onChange(prev);
  };

  const nextMonth = () => {
    const next = new Date(currentYear, currentMonth + 1, 1);
    onChange(next);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth} className="calendar-nav">‹</button>
        <h3>{currentYear}년 {monthNames[currentMonth]}</h3>
        <button onClick={nextMonth} className="calendar-nav">›</button>
      </div>
      <div className="calendar-days-header">
        {dayNames.map(day => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {days}
      </div>
    </div>
  );
};

export default function CalendarPage({ user = {} }) {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');

  const dateKey = date.toISOString().slice(0, 10);
  const todayTodos = todos[dateKey] || [];

  const getCompletionLevel = (date) => {
    const key = date.toISOString().slice(0, 10);
    const list = todos[key] || [];
    const doneCount = list.filter(t => t.done).length;
    const rate = list.length ? doneCount / list.length : 0;
    if (rate >= 1) return 'level-100';
    if (rate >= 0.7) return 'level-70';
    if (rate >= 0.5) return 'level-50';
    if (rate >= 0.3) return 'level-30';
    if (list.length > 0) return 'level-0';
    return '';
  };

  const openAddModal = () => {
    setSelectedTodo(null);
    setText('');
    setCategory('');
    setModalOpen(true);
  };

  const openEditModal = (todo) => {
    setSelectedTodo(todo);
    setText(todo.text);
    setCategory(todo.category || '');
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!text.trim()) return;
    const updatedTodo = { ...selectedTodo, text, category };

    if (selectedTodo) {
      const updated = todayTodos.map((t) =>
        t.id === selectedTodo.id ? updatedTodo : t
      );
      setTodos({ ...todos, [dateKey]: updated });
    } else {
      const newTodo = { id: Date.now(), text, done: false, category };
      setTodos({ ...todos, [dateKey]: [...todayTodos, newTodo] });
    }

    setModalOpen(false);
  };

  const toggleDone = (todo) => {
    const updated = todayTodos.map((t) =>
      t.id === todo.id ? { ...t, done: !t.done } : t
    );
    setTodos({ ...todos, [dateKey]: updated });
  };

  const handleDelete = (id) => {
    const updated = todayTodos.filter((t) => t.id !== id);
    setTodos({ ...todos, [dateKey]: updated });
    setModalOpen(false);
  };

  const handleRepeatTomorrow = () => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowKey = tomorrow.toISOString().slice(0, 10);
    const newTodo = { ...selectedTodo, id: Date.now() };
    setTodos((prev) => ({
      ...prev,
      [tomorrowKey]: [...(prev[tomorrowKey] || []), newTodo],
    }));
    setModalOpen(false);
  };

  const formatDate = (date) => {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return `${months[date.getMonth()]} ${date.getDate()}일 ${days[date.getDay()]}`;
  };

  const completedCount = todayTodos.filter(todo => todo.done).length;
  const totalCount = todayTodos.length;

  return (
    <div className="todo-root-bg">
      {/* Header를 import 해서 사용 */}
      <Header user={user} />
      <div className="main-content">
        <div className="calendar-box">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date }) => getCompletionLevel(date)}
          />
        </div>
        <div className="todo-box">
          <div className="todo-header-row">
            <div>
              <h2 className="todo-date">{formatDate(date)}</h2>
              <p className="todo-progress">
                {totalCount > 0 ? `${completedCount}/${totalCount} 완료` : '할 일이 없습니다'}
              </p>
            </div>
            <button className="todo-add-btn" onClick={openAddModal}>
              <FiPlus size={16} /> 할 일 추가
            </button>
          </div>
          {totalCount > 0 && (
            <div className="progress-bar-wrap">
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          )}
          <div className="todo-list-scroll">
            {todayTodos.length === 0 ? (
              <div className="todo-empty">
                <FiCalendar size={48} />
                <p>오늘의 할 일을 추가해보세요!</p>
              </div>
            ) : (
              todayTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`todo-item${todo.done ? ' done' : ''}`}
                  onClick={() => toggleDone(todo)}
                >
                  <div className={`todo-check${todo.done ? ' checked' : ''}`}>
                    {todo.done && <FiCheck size={14} color="white" />}
                  </div>
                  <div className="todo-main">
                    <span className="todo-text">{todo.text}</span>
                    {todo.category && (
                      <span className="todo-category-badge">#{todo.category}</span>
                    )}
                  </div>
                  <button className="todo-edit-btn" onClick={(e) => { e.stopPropagation(); openEditModal(todo); }}>
                    <FiEdit size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-modal">
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
              <FiX size={20} />
            </button>
            <h3 className="modal-title">{selectedTodo ? '할 일 수정' : '새로운 할 일'}</h3>
            <input
              type="text"
              className="modal-input"
              placeholder="할 일을 입력하세요"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="text"
              className="modal-input"
              placeholder="카테고리 (선택사항)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="modal-btns">
              <button className="modal-save-btn" onClick={handleSave}>저장</button>
              {selectedTodo && (
                <>
                  <button className="modal-del-btn" onClick={() => handleDelete(selectedTodo.id)}><FiTrash2 size={14} /> 삭제</button>
                  <button className="modal-repeat-btn" onClick={handleRepeatTomorrow}><FiRepeat size={14} /> 내일도 하기</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <Navi />
    </div>
  );
}