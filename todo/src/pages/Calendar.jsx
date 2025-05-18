import React, { useState, useEffect } from 'react';
import './calendar.css';

const Calendar = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [routines, setRoutines] = useState([]);

  const dummyTodos = [
    { id: 1, text: '프로젝트 미팅 준비', completed: false, date: '2025-05-18' },
    { id: 2, text: '운동하기', completed: true, date: '2025-05-18' },
    { id: 3, text: '장보기', completed: false, date: '2025-05-19' },
    { id: 4, text: '책 읽기', completed: false, date: '2025-05-20' },
  ];

  const dummyRoutines = [
    { id: 1, name: '아침 운동', time: '07:00', completed: false, date: '2025-05-18' },
    { id: 2, name: '독서', time: '21:00', completed: true, date: '2025-05-18' },
    { id: 3, name: '명상', time: '06:30', completed: false, date: '2025-05-19' },
    { id: 4, name: '일기 쓰기', time: '22:00', completed: false, date: '2025-05-20' },
  ];

  useEffect(() => {
    setTodos(dummyTodos);
    setRoutines(dummyRoutines);
  }, []);

  const formatDateString = (date) => date.toISOString().split('T')[0];

  const getSelectedDateTodos = () => {
    const selectedDateString = formatDateString(selectedDate);
    return todos.filter(todo => todo.date === selectedDateString);
  };

  const getSelectedDateRoutines = () => {
    const selectedDateString = formatDateString(selectedDate);
    return routines.filter(routine => routine.date === selectedDateString);
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const changeMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const selectDate = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const isSelectedDate = (day) => {
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentDate.getMonth() &&
           selectedDate.getFullYear() === currentDate.getFullYear();
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentDate.getMonth() &&
           today.getFullYear() === currentDate.getFullYear();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelectedDate(day) ? 'selected' : ''} ${isToday(day) ? 'today' : ''}`}
          onClick={() => selectDate(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const formatSelectedDate = () => {
    return selectedDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="calendar-container">
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

      <div className="calendar-main-content">
        <div className="calendar-section">
          <div className="calendar-header">
            <button className="nav-button" onClick={() => changeMonth(-1)}>‹</button>
            <h2 className="calendar-title">
              {currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
            </h2>
            <button className="nav-button" onClick={() => changeMonth(1)}>›</button>
          </div>

          <div className="calendar-weekdays">
            <div className="weekday">일</div>
            <div className="weekday">월</div>
            <div className="weekday">화</div>
            <div className="weekday">수</div>
            <div className="weekday">목</div>
            <div className="weekday">금</div>
            <div className="weekday">토</div>
          </div>

          <div className="calendar-grid">
            {renderCalendar()}
          </div>
        </div>

        <div className="details-section">
          <div className="selected-date-header">
            <h3>{formatSelectedDate()}</h3>
          </div>

          <div className="todos-section">
            <h4 className="section-title">TODO</h4>
            <div className="cards-container">
              {getSelectedDateTodos().length > 0 ? (
                getSelectedDateTodos().map(todo => (
                  <div key={todo.id} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
                    <div className="card-content">
                      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => console.log('Toggle todo:', todo.id)}
                        className="todo-checkbox"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-items">오늘 할 일이 없습니다.</div>
              )}
            </div>
          </div>

          <div className="routines-section">
            <h4 className="section-title">ROUTINE</h4>
            <div className="cards-container">
              {getSelectedDateRoutines().length > 0 ? (
                getSelectedDateRoutines().map(routine => (
                  <div key={routine.id} className={`routine-card ${routine.completed ? 'completed' : ''}`}>
                    <div className="card-content">
                      <div className="routine-info">
                        <span className={`routine-name ${routine.completed ? 'completed' : ''}`}>{routine.name}</span>
                        <span className="routine-time">{routine.time}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={routine.completed}
                        onChange={() => console.log('Toggle routine:', routine.id)}
                        className="routine-checkbox"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-items">오늘 루틴이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
