import React, { useState } from 'react';
import Navi from '../component/Navi';
import Header from '../component/Header';
import { FiEdit, FiTrash2, FiCalendar, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import './routine.css';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 캘린더 컴포넌트
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

  const prevMonth = () => onChange(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => onChange(new Date(currentYear, currentMonth + 1, 1));

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

export default function RoutinePage({ user = {} }) {
  const [date, setDate] = useState(new Date());
  const [routines, setRoutines] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  // 루틴 등록/수정 필드
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weekdays, setWeekdays] = useState([]);

  // 카테고리 인라인 수정
  const [editingCategory, setEditingCategory] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');

  const dateKey = date.toISOString().slice(0, 10);
  const todayRoutines = routines[dateKey] || [];

  const getCompletionLevel = (date) => {
    const key = date.toISOString().slice(0, 10);
    const list = routines[key] || [];
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
    setSelectedRoutine(null);
    setText('');
    setCategory('');
    setStartDate('');
    setEndDate('');
    setWeekdays([]);
    setEditingCategory(false);
    setModalOpen(true);
  };

  const openEditModal = (routine) => {
    setSelectedRoutine(routine);
    setText(routine.text);
    setCategory(routine.category || '');
    setStartDate(routine.startDate || '');
    setEndDate(routine.endDate || '');
    setWeekdays(routine.weekdays || []);
    setEditingCategory(false);
    setModalOpen(true);
  };

  const handleWeekdayChange = (w) => {
    setWeekdays(prev => prev.includes(w) ? prev.filter(d => d !== w) : [...prev, w]);
  };

  const handleSave = () => {
    if (!text.trim()) return;
    const updatedRoutine = { 
      ...selectedRoutine, text, category, startDate, endDate, weekdays 
    };
    if (selectedRoutine) {
      const updated = todayRoutines.map((r) =>
        r.id === selectedRoutine.id ? updatedRoutine : r
      );
      setRoutines({ ...routines, [dateKey]: updated });
    } else {
      const newRoutine = { 
        id: Date.now(), text, done: false, category, startDate, endDate, weekdays 
      };
      setRoutines({ ...routines, [dateKey]: [...todayRoutines, newRoutine] });
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    const updated = todayRoutines.filter((r) => r.id !== id);
    setRoutines({ ...routines, [dateKey]: updated });
    setModalOpen(false);
  };

  // 카테고리 인라인 수정/삭제
  const handleCategoryEdit = () => {
    setEditingCategory(true);
    setCategoryInput(category);
  };
  const handleCategorySave = () => {
    setCategory(categoryInput);
    setEditingCategory(false);
  };
  const handleCategoryDelete = () => {
    setCategory('');
    setEditingCategory(false);
  };

  // 루틴 완료 토글
  const toggleDone = (routine) => {
    const updated = todayRoutines.map((r) =>
      r.id === routine.id ? { ...r, done: !r.done } : r
    );
    setRoutines({ ...routines, [dateKey]: updated });
  };

  const formatDate = (date) => {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${months[date.getMonth()]} ${date.getDate()}일 (${days[date.getDay()]})`;
  };

  const completedCount = todayRoutines.filter(r => r.done).length;
  const totalCount = todayRoutines.length;

  return (
    <div className="routine-root-bg">
      <Header user={user} />
      <div className="routine-main-content">
        <div className="routine-calendar-box">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date }) => getCompletionLevel(date)}
          />
        </div>
        <div className="routine-list-box">
          <div className="routine-header-row">
            <div>
              <h2 className="routine-date">{formatDate(date)}</h2>
              <p className="routine-progress">
                {totalCount > 0 ? `${completedCount}/${totalCount} 완료` : '루틴 없음'}
              </p>
            </div>
            <button className="routine-add-btn" onClick={openAddModal}>
              <FiPlus size={16} /> 루틴 추가
            </button>
          </div>
          {totalCount > 0 && (
            <div className="routine-progress-bar-wrap">
              <div className="routine-progress-bar-bg">
                <div 
                  className="routine-progress-bar-fill"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          )}
          <div className="routine-list-scroll">
            {todayRoutines.length === 0 ? (
              <div className="routine-empty">
                <FiCalendar size={48} />
                <p>오늘의 루틴을 추가해보세요!</p>
              </div>
            ) : (
              todayRoutines.map((routine) => (
                <div
                  key={routine.id}
                  className={`routine-item${routine.done ? ' done' : ''}`}
                >
                  {/* 완료(동그라미) 왼쪽 */}
                  <div 
                    className={`routine-check${routine.done ? ' checked' : ''}`}
                    onClick={() => toggleDone(routine)}
                    style={{ cursor: 'pointer', marginRight: 24, minWidth: 32, minHeight: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {routine.done
                      ? <FiCheck size={22} color="#a18cd1" />
                      : <div style={{ width: 28, height: 28, border: '2px solid #a18cd1', borderRadius: '50%' }} />}
                  </div>
                  {/* 루틴 텍스트 및 정보 */}
                  <div className="routine-main-info">
                    <span className="routine-text">{routine.text}</span>
                    {routine.category && (
                      <span className="routine-category-badge">#{routine.category}</span>
                    )}
                    {(routine.startDate || routine.endDate) && (
                      <span className="routine-date-badge">{routine.startDate} ~ {routine.endDate}</span>
                    )}
                    {routine.weekdays && routine.weekdays.length > 0 && (
                      <span className="routine-weekdays">
                        ({routine.weekdays.join(', ')})
                      </span>
                    )}
                  </div>
                  {/* 수정(서류) 버튼 - 오른쪽 */}
                  <button className="routine-edit-btn" style={{ marginLeft: 'auto' }} onClick={(e) => { e.stopPropagation(); openEditModal(routine); }}>
                    <FiEdit size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="routine-modal-overlay">
          <div className="routine-modal-content">
            <button className="routine-modal-close-btn" onClick={() => setModalOpen(false)}>
              <FiX size={20} />
            </button>
            <h3 className="routine-modal-title">{selectedRoutine ? '루틴 수정' : '루틴 추가'}</h3>
            <input
              type="text"
              className="routine-modal-input"
              placeholder="루틴 이름"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            {/* 카테고리 */}
            <div className="routine-modal-field">
              <label>카테고리: </label>
              {editingCategory ? (
                <span style={{ display: 'flex', gap: 4 }}>
                  <input
                    className="routine-modal-input"
                    value={categoryInput}
                    onChange={e => setCategoryInput(e.target.value)}
                  />
                  <button onClick={handleCategorySave}>저장</button>
                  <button onClick={handleCategoryDelete}>삭제</button>
                </span>
              ) : (
                <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <input
                    className="routine-modal-input"
                    value={category}
                    readOnly
                  />
                  <button onClick={handleCategoryEdit}><FiEdit size={16} /></button>
                </span>
              )}
            </div>
            {/* 기간 */}
            <div className="routine-modal-field">
              <label>기간: </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="routine-modal-input"
              />
              ~
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="routine-modal-input"
              />
            </div>
            {/* 요일 */}
            <div className="routine-modal-field">
              <label>요일: </label>
              {WEEKDAYS.map(w => (
                <label key={w} className="routine-modal-weekday">
                  <input
                    type="checkbox"
                    checked={weekdays.includes(w)}
                    onChange={() => handleWeekdayChange(w)}
                  /> {w}
                </label>
              ))}
            </div>
            <div className="routine-modal-btns">
              <button className="routine-modal-save-btn" onClick={handleSave}>저장</button>
              {selectedRoutine && (
                <button className="routine-modal-del-btn" onClick={() => handleDelete(selectedRoutine.id)}>
                  <FiTrash2 size={14} /> 삭제
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Navi />
    </div>
  );
}