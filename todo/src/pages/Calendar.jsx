import React, { useState } from 'react';
import Navi from '../component/Navi';
import { Plus, Edit, Check, Trash2, Repeat, RotateCcw, X } from 'lucide-react';
import './calendar.css'; // (calendar 관련 css, 아래 예시도 참고)

// === MockCalendar 컴포넌트 (달력 부분) ===
function MockCalendar({ value, onChange, tileClassName }) {
  const today = new Date();
  const currentMonth = value.getMonth();
  const currentYear = value.getFullYear();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDate = firstDay.getDay();

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
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
}

// === Todo Section (우측 상단) ===
function Todo({ date, todos, setTodos }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const dateKey = date.toISOString().slice(0, 10);
  const todayTodos = todos[dateKey] || [];

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
  const toggleTodo = (todo) => {
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

  const completedCount = todayTodos.filter(todo => todo.done).length;
  const totalCount = todayTodos.length;
  const formatDate = (date) => {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${months[date.getMonth()]} ${date.getDate()}일 (${days[date.getDay()]})`;
  };

  return (
    <div className="todo-section">
      <div className="todo-header">
        <div>
          <h3>{formatDate(date)}</h3>
          <p className="todo-progress">{totalCount > 0 ? `${completedCount}/${totalCount} 완료` : '할 일이 없습니다'}</p>
        </div>
        <button onClick={openAddModal} className="todo-add-btn"><Plus size={16} /> 추가</button>
      </div>
      {totalCount > 0 && (
        <div className="todo-bar-wrap">
          <div className="todo-progress-bar" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
        </div>
      )}
      <div className="todo-list-wrap">
        {todayTodos.length === 0 ? (
          <div className="todo-empty">
            <Check size={32} />
            <p>오늘의 할 일을 추가해보세요!</p>
          </div>
        ) : (
          todayTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item${todo.done ? ' done' : ''}`}
              onClick={() => toggleTodo(todo)}
            >
              <div className="todo-checkbox">{todo.done && <Check size={14} color="white" />}</div>
              <div className="todo-content">
                <span className="todo-text">{todo.text}</span>
                {todo.category && <span className="todo-category">#{todo.category}</span>}
              </div>
              <button className="todo-edit-btn" onClick={e => { e.stopPropagation(); openEditModal(todo); }}>
                <Edit size={14} />
              </button>
            </div>
          ))
        )}
      </div>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}><X size={20} /></button>
            <h3>{selectedTodo ? '할 일 수정' : '새로운 할 일'}</h3>
            <input type="text" placeholder="할 일을 입력하세요" value={text} onChange={e => setText(e.target.value)} />
            <input type="text" placeholder="카테고리 (선택사항)" value={category} onChange={e => setCategory(e.target.value)} />
            <div className="modal-btns">
              <button className="modal-save-btn" onClick={handleSave}>저장</button>
              {selectedTodo && (
                <>
                  <button className="modal-delete-btn" onClick={() => handleDelete(selectedTodo.id)}><Trash2 size={14} /> 삭제</button>
                  <button className="modal-repeat-btn" onClick={handleRepeatTomorrow}><Repeat size={14} /> 내일도 하기</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// === Routine Section (우측 하단) ===
function Routine({ routines, setRoutines }) {
  const updateRoutine = (id, increment = true) => {
    setRoutines(routines.map(routine => {
      if (routine.id === id) {
        const newCompleted = increment 
          ? Math.min(routine.completed + 1, routine.total)
          : Math.max(routine.completed - 1, 0);
        return { ...routine, completed: newCompleted };
      }
      return routine;
    }));
  };

  return (
    <div className="routine-section">
      <h3><RotateCcw size={18} /> 루틴</h3>
      <div className="routine-list">
        {routines.map((routine) => (
          <div key={routine.id} className="routine-item">
            <div className="routine-title-wrap">
              <span className="routine-title">{routine.name}</span>
              <span className="routine-count">{routine.completed}/{routine.total}</span>
            </div>
            <div className="routine-bar-wrap">
              <div className="routine-bar" style={{ width: `${(routine.completed / routine.total) * 100}%` }} />
            </div>
            <div className="routine-btns">
              <button onClick={() => updateRoutine(routine.id, false)} disabled={routine.completed === 0}>-</button>
              <button onClick={() => updateRoutine(routine.id, true)} disabled={routine.completed === routine.total}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// === 부모 CalendarPage ===
export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState({
    [new Date().toISOString().slice(0, 10)]: [
      { id: 1, text: '프로젝트 미팅 준비', done: false, category: '업무' },
      { id: 2, text: '운동하기', done: true, category: '건강' },
      { id: 3, text: '독서 30분', done: false, category: '자기계발' }
    ]
  });
  const [routines, setRoutines] = useState([
    { id: 1, name: '물 8잔 마시기', completed: 6, total: 8 },
    { id: 2, name: '운동 30분', completed: 1, total: 1 },
    { id: 3, name: '명상 10분', completed: 0, total: 1 },
    { id: 4, name: '독서', completed: 0, total: 1 }
  ]);
  const user = { name: '김종민', statusMessage: '오늘도 화이팅!' };

  // 달력 달성률 색상
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

  return (
    <div className="calendar-main-layout">
      {/* 좌측 달력 */}
      <div className="calendar-left">
        <div className="profile-card">
          <div className="avatar-wrapper">
            <img src="/default-avatar.png" alt="avatar" className="avatar-image" />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-status">{user.statusMessage}</p>
          </div>
        </div>
        <MockCalendar value={date} onChange={setDate} tileClassName={({ date }) => getCompletionLevel(date)} />
      </div>
      {/* 우측 (ToDo + Routine) */}
      <div className="calendar-right">
        <Todo date={date} todos={todos} setTodos={setTodos} />
        <Routine routines={routines} setRoutines={setRoutines} />
      </div>
      {/* 하단 네비 */}
      <Navi />
    </div>
  );
}