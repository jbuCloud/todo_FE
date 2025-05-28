import React, { useState } from 'react';
import Navi from '../component/Navi';
import Header from '../component/Header';
import './calendar.css';

// --- 심플 달력 컴포넌트 ---
function SimpleCalendar({ value, onChange }) {
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
  for (let i = 0; i < startDate; i++) days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = date.toDateString() === value.toDateString();
    days.push(
      <div
        key={day}
        className={`calendar-day${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}`}
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
      <div className="calendar-grid">{days}</div>
    </div>
  );
}

// --- 오늘의 투두/루틴 목록만 표시 ---
function TodoList({ todos }) {
  if (!todos || todos.length === 0) return (
    <div className="list-empty">오늘의 투두가 없습니다.</div>
  );
  return (
    <ul className="list-ul">
      {todos.map(todo => (
        <li key={todo.id} className={`list-item ${todo.done ? 'done' : ''}`}>
          <span className="list-text">{todo.text}</span>
          {todo.category && (
            <span className="list-category">#{todo.category}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function RoutineList({ routines }) {
  if (!routines || routines.length === 0) return (
    <div className="list-empty">오늘의 루틴이 없습니다.</div>
  );
  return (
    <ul className="list-ul">
      {routines.map(routine => (
        <li key={routine.id} className="list-item">
          <span className="list-text">{routine.name}</span>
          <span className="list-progress">{routine.completed}/{routine.total}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  // 날짜별 mock 데이터 예시
  const todosByDate = {
    '2025-05-28': [
      { id: 1, text: '아침 운동', done: true, category: '건강' },
      { id: 2, text: '프로젝트 정리', done: false, category: '공부' }
    ]
  };
  const routinesByDate = {
    '2025-05-28': [
      { id: 1, name: '물 8잔 마시기', completed: 5, total: 8 },
      { id: 2, name: '스트레칭', completed: 1, total: 1 }
    ]
  };

  const dateKey = date.toISOString().slice(0, 10);
  const todayTodos = todosByDate[dateKey] || [];
  const todayRoutines = routinesByDate[dateKey] || [];

  return (
    <div className="calendar-main-bg">
      <Header user={{ name: '김종민', statusMessage: '오늘도 화이팅!' }} />
      <div className="calendar-main-wrap">
        {/* 왼쪽: 달력 */}
        <div className="calendar-left">
          <SimpleCalendar value={date} onChange={setDate} />
        </div>
        {/* 오른쪽: 투두, 루틴 목록만 */}
        <div className="calendar-right">
          <section className="list-section">
            <h2 className="list-title">오늘의 투두</h2>
            <TodoList todos={todayTodos} />
          </section>
          <section className="list-section">
            <h2 className="list-title">오늘의 루틴</h2>
            <RoutineList routines={todayRoutines} />
          </section>
        </div>
      </div>
      <Navi />
    </div>
  );
}