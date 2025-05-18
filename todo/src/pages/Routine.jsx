// ✅ Routine.jsx
import React, { useState, useEffect } from 'react';
import './routine.css';

const Routine = ({ user }) => {
  const formatDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [newRoutine, setNewRoutine] = useState('');

  useEffect(() => {
    setCalendarData(getMonthData(currentYear, currentMonth));
  }, [currentMonth, currentYear]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getMonthData = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const data = [];
    const prevMonthDays = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);
    for (let i = 0; i < firstDayOfMonth; i++) {
      data.push({
        date: new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, prevMonthDays - firstDayOfMonth + i + 1),
        currentMonth: false,
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      data.push({ date: new Date(year, month, i), currentMonth: true });
    }
    const remainingDays = 42 - data.length;
    for (let i = 1; i <= remainingDays; i++) {
      data.push({ date: new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, i), currentMonth: false });
    }
    return data;
  };

  const routinesForSelectedDay = routines.filter(r => r.date === formatDate(selectedDate));

  const handleAddRoutine = (e) => {
    e.preventDefault();
    if (!newRoutine.trim()) return;
    const newItem = {
      id: Date.now(),
      title: newRoutine,
      date: formatDate(selectedDate),
      completed: false,
    };
    setRoutines([...routines, newItem]);
    setNewRoutine('');
  };

  const toggleRoutineCompletion = (id) => {
    const updated = routines.map(r => r.id === id ? { ...r, completed: !r.completed } : r);
    setRoutines(updated);
  };

  return (
    <div className="routine-app">
      <div className="user-profile-container">
        <div className="user-profile">
          <div className="profile-image">
            <img src={user?.profileImage || '/default.jpg'} alt="프로필 이미지" />
          </div>
          <div className="user-info">
            <h3>{user?.name || '익명'}</h3>
            <p>{user?.statusMessage || '상태 메시지가 없습니다.'}</p>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="calendar-side">
          <div className="calendar-header">
            <button onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}>&lt;</button>
            <h2>{currentYear}년 {currentMonth + 1}월</h2>
            <button onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}>&gt;</button>
          </div>

          <div className="calendar-grid">
            <div className="calendar-day-names">
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {calendarData.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${day.currentMonth ? 'current-month' : 'other-month'} ${formatDate(day.date) === formatDate(selectedDate) ? 'selected-day' : ''}`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  {day.date.getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="routine-side">
          <h2>{formatDate(selectedDate)} 루틴</h2>
          <form onSubmit={handleAddRoutine} className="routine-form">
            <input
              type="text"
              value={newRoutine}
              onChange={(e) => setNewRoutine(e.target.value)}
              placeholder="루틴을 입력하세요"
              className="routine-input"
            />
            <button type="submit" className="add-button">추가</button>
          </form>

          <div className="routine-list">
            {routinesForSelectedDay.length === 0 ? (
              <p className="no-routines">등록된 루틴이 없습니다.</p>
            ) : (
              routinesForSelectedDay.map(routine => (
                <div key={routine.id} className={`routine-item ${routine.completed ? 'completed' : ''}`}>
                  <span>{routine.title}</span>
                  <button onClick={() => toggleRoutineCompletion(routine.id)}>{routine.completed ? '✓' : '○'}</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routine;
