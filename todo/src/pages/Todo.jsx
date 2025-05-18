/*
import './todo.css';

function Todo() {
  return (
    <div className="todo-page">
      <h2>To-do List</h2>
      {}
    </div>
  );
}

export default Todo;
-------------------------------

import './todo.css';
import { useState } from 'react';

const dummyTodos = {
  '2025-05-09': [
    { text: '[동아리] 피그마 디자인', completed: false },
    { text: '[동아리] 개발하기!', completed: true },
  ],
};

function getCompletionColor(completionRate) {
  if (completionRate === 0) return '#ffffff';
  if (completionRate <= 0.3) return '#FAD4E2';
  if (completionRate <= 0.5) return '#F78FB3';
  if (completionRate <= 0.7) return '#F04D9B';
  return '#D60C75';
}

function Todo() {
  const [todos, setTodos] = useState(dummyTodos);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleToggle = (date, index) => {
    const newTodos = { ...todos };
    newTodos[date][index].completed = !newTodos[date][index].completed;
    setTodos(newTodos);
  };

  const renderCalendar = () => (
    <div className="calendar">
      {[...Array(daysInMonth)].map((_, i) => {
        const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
        const dailyTodos = todos[date] || [];
        const completedCount = dailyTodos.filter(todo => todo.completed).length;
        const completionRate = dailyTodos.length ? completedCount / dailyTodos.length : 0;
        const color = getCompletionColor(completionRate);
        return (
          <div key={i} className="calendar-day" style={{ backgroundColor: color }}>
            {i + 1}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="todo-page">
      <h2>To-do List</h2>
      <div className="todo-wrapper">
        <div className="calendar-container">
          {renderCalendar()}
        </div>
        <div className="todo-content">
          {Object.entries(todos).map(([date, items]) => (
            <div key={date}>
              <h4>{date}</h4>
              {items.map((todo, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(date, index)}
                  />
                  {todo.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;

import './todo.css';
import { useState } from 'react';

const dummyTodos = {
  '2025-05-11': [
    { text: '[학교] PPT 만들기', completed: true, category: 'school' },
    { text: '[동아리] 라벨링 150개', completed: false, category: 'club' },
  ],
  '2025-05-10': [
    { text: '[동아리] 역삼 세미나 13시', completed: true, category: 'club' },
  ],
};

const categories = {
  school: { label: '학교', emoji: '🎓', color: '#ffb4b4' },
  club: { label: '동아리', emoji: '👥', color: '#ffd480' },
  study: { label: '공부', emoji: '📚', color: '#b4d4ff' },
};

function getCompletionColor(rate) {
  if (rate === 0) return '#eeeeee';
  if (rate <= 0.3) return '#FAD4E2';
  if (rate <= 0.5) return '#F78FB3';
  if (rate <= 0.7) return '#F04D9B';
  return '#D60C75';
}

function Todo() {
  const [todos, setTodos] = useState(dummyTodos);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const toggleTodo = (date, idx) => {
    const updated = { ...todos };
    updated[date][idx].completed = !updated[date][idx].completed;
    setTodos(updated);
  };

  const renderCalendar = () => {
    return (
      <div className="calendar">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayTodos = todos[dateKey] || [];
          const done = dayTodos.filter(t => t.completed).length;
          const rate = dayTodos.length ? done / dayTodos.length : 0;
          const bg = getCompletionColor(rate);

          return (
            <div key={day} className="calendar-day" style={{ backgroundColor: bg }}>
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="todo-page">
      <div className="user-profile">
        <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/bear-face_1f43b.png" alt="user" />
        <div>
          <strong>joo</strong>
          <p>시크릿주주 ✨</p>
        </div>
      </div>

      <div className="todo-wrapper">
        <div className="calendar-container">
          <h3>{year}년 {month + 1}월</h3>
          {renderCalendar()}
        </div>

        <div className="todo-content">
          {Object.entries(todos).map(([date, items]) => (
            <div key={date} className="todo-section">
              <h4>{date}</h4>
              {items.map((todo, idx) => {
                const cat = categories[todo.category] || {};
                return (
                  <div className={`todo-item ${todo.category}`} key={idx}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(date, idx)}
                    />
                    <span className="todo-badge" style={{ backgroundColor: cat.color }}>
                      {cat.emoji}
                    </span>
                    <span>{todo.text}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todo;
---------------------------


import './todo.css';
import profileImg from '../assets/profile.jpg';
import { useState } from 'react';

const categories = {
  school: { label: '학교', emoji: '🎓', color: '#ffb4b4' },
  club: { label: '동아리', emoji: '👥', color: '#ffd480' },
  study: { label: '공부', emoji: '📚', color: '#b4d4ff' },
};

function getCompletionColor(rate) {
  if (rate === 0) return '#eeeeee';
  if (rate <= 0.3) return '#FAD4E2';
  if (rate <= 0.5) return '#F78FB3';
  if (rate <= 0.7) return '#F04D9B';
  return '#D60C75';
}

function Todo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const [todos, setTodos] = useState({
    '2025-05-11': [
      { text: '[학교] PPT 만들기', completed: true, category: 'school' },
      { text: '[동아리] 라벨링 150개', completed: false, category: 'club' },
    ],
    '2025-05-10': [
      { text: '[동아리] 역삼 세미나 13시', completed: true, category: 'club' },
    ],
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('school');

  const toggleTodo = (date, idx) => {
    const updated = { ...todos };
    updated[date][idx].completed = !updated[date][idx].completed;
    setTodos(updated);
  };

  const addTodo = () => {
    if (!newTodo.trim() || !selectedDate) return;
    const updated = { ...todos };
    if (!updated[selectedDate]) updated[selectedDate] = [];
    updated[selectedDate].push({
      text: newTodo,
      completed: false,
      category: newCategory,
    });
    setTodos(updated);
    setNewTodo('');
  };

  const renderCalendar = () => (
    <div className="calendar">
      {[...Array(daysInMonth)].map((_, i) => {
        const day = i + 1;
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dailyTodos = todos[dateKey] || [];
        const done = dailyTodos.filter(t => t.completed).length;
        const rate = dailyTodos.length ? done / dailyTodos.length : 0;
        const bg = getCompletionColor(rate);

        return (
          <div
            key={day}
            className="calendar-day"
            style={{ backgroundColor: bg }}
            onClick={() => setSelectedDate(dateKey)}
          >
            {day}
          </div>
        );
      })}
    </div>
  );

  const renderTodoList = () => {
    if (!selectedDate) return <p className="select-guide">왼쪽 달력에서 날짜를 선택하세요!</p>;
    const items = todos[selectedDate] || [];
    return (
      <div className="todo-section">
        <h4>{selectedDate}</h4>
        {items.map((todo, idx) => {
          const cat = categories[todo.category] || {};
          return (
            <div className="todo-item" key={idx}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(selectedDate, idx)}
              />
              <span className="todo-badge" style={{ backgroundColor: cat.color }}>{cat.emoji}</span>
              <span>{todo.text}</span>
            </div>
          );
        })}
        <div className="todo-add">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="할 일 입력..."
          />
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
            {Object.entries(categories).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
          <button onClick={addTodo}>추가</button>
        </div>
      </div>
    );
  };

  return (
    <div className="todo-page">
      <div className="user-profile">
        <img src={profileImg} alt="user" />
        <div>
          <strong>jooeun</strong>
          <p>프로갓생러 ✨</p>
        </div>
      </div>

      <h2>To-do List</h2>

      <div className="todo-wrapper">
        <div className="calendar-container">
          <h3>{year}년 {month + 1}월</h3>
          {renderCalendar()}
        </div>

        <div className="todo-content">
          {renderTodoList()}
        </div>
      </div>
    </div>
  );
}

export default Todo;

*/

/*
import './todo.css';
import profileImg from '../assets/profile.jpg';
import { useState } from 'react';

const categories = {
  school: { label: '학교', emoji: '🎓', color: '#ffb4b4' },
  club: { label: '동아리', emoji: '👥', color: '#ffd480' },
  study: { label: '공부', emoji: '📚', color: '#b4d4ff' },
};

function getCompletionColor(rate) {
  if (rate === 0) return '#eeeeee';
  if (rate <= 0.3) return '#FAD4E2';
  if (rate <= 0.5) return '#F78FB3';
  if (rate <= 0.7) return '#F04D9B';
  return '#D60C75';
}

function Todo() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const [todos, setTodos] = useState({
    '2025-05-11': [
      { text: '[학교] PPT 만들기', completed: true, category: 'school' },
      { text: '[동아리] 라벨링 150개', completed: false, category: 'club' },
      { text: '[동아리] 라벨링 150개', completed: false, category: 'club' },
    ],
    '2025-05-10': [
      { text: '[동아리] 역삼 세미나 13시', completed: true, category: 'club' },
    ],
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('school');

  const toggleTodo = (date, idx) => {
    const updated = { ...todos };
    updated[date][idx].completed = !updated[date][idx].completed;
    setTodos(updated);
  };

  const addTodo = () => {
    if (!newTodo.trim() || !selectedDate) return;
    const updated = { ...todos };
    if (!updated[selectedDate]) updated[selectedDate] = [];
    updated[selectedDate].push({
      text: newTodo,
      completed: false,
      category: newCategory,
    });
    setTodos(updated);
    setNewTodo('');
  };

  const renderCalendar = () => (
    <div className="calendar">
      {[...Array(daysInMonth)].map((_, i) => {
        const day = i + 1;
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dailyTodos = todos[dateKey] || [];
        const done = dailyTodos.filter(t => t.completed).length;
        const rate = dailyTodos.length ? done / dailyTodos.length : 0;
        const bg = getCompletionColor(rate);

        return (
          <div
            key={day}
            className="calendar-day"
            style={{ backgroundColor: bg }}
            onClick={() => setSelectedDate(dateKey)}
          >
            {day}
          </div>
        );
      })}
    </div>
  );

  const renderTodoList = () => {
    if (!selectedDate) return <p className="select-guide">왼쪽 달력에서 날짜를 선택하세요!</p>;
    const items = todos[selectedDate] || [];
    return (
      <div className="todo-section">
        <h4>{selectedDate}</h4>
        {items.map((todo, idx) => {
          const cat = categories[todo.category] || {};
          return (
            <div className="todo-item" key={idx}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(selectedDate, idx)}
              />
              <span className="todo-badge" style={{ backgroundColor: cat.color }}>{cat.emoji}</span>
              <span>{todo.text}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="todo-page">
      <div className="user-profile">
        <img src={profileImg} alt="user" />
        <div>
          <strong>jooeun</strong>
          <p>프로갓생러 ✨</p>
        </div>
      </div>

      <h2>To-do List</h2>

      <div className="todo-wrapper">
        <div className="calendar-container">
          <h3>{year}년 {month + 1}월</h3>
          {renderCalendar()}
        </div>

        <div className="todo-content">
          { }
          <div className="todo-scroll-area">
            {renderTodoList()}
          </div>

          { }
          <div className="todo-add">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="할 일 입력..."
            />
            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
              {Object.entries(categories).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            <button onClick={addTodo}>추가</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
*/
/*
import 'react-calendar/dist/Calendar.css';
import './todo.css';
import Calendar from 'react-calendar';
import profileImg from '../assets/profile.jpg';
import { useState } from 'react';
import { format } from 'date-fns';

const categories = {
  school: { label: '학교', emoji: '🎓', color: '#ffb4b4' },
  club: { label: '동아리', emoji: '👥', color: '#ffd480' },
  study: { label: '공부', emoji: '📚', color: '#b4d4ff' },
};

function Todo() {
  const [todos, setTodos] = useState({
    '2025-05-11': [
      { text: '[학교] PPT 만들기', completed: true, category: 'school' },
      { text: '[동아리] 라벨링 150개', completed: false, category: 'club' },
      { text: '[동아리] 라벨링 150개', completed: false, category: 'club' },
    ],
    '2025-05-10': [
      { text: '[동아리] 역삼 세미나 13시', completed: true, category: 'club' },
    ],
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('school');

  const toggleTodo = (date, idx) => {
    const updated = { ...todos };
    updated[date][idx].completed = !updated[date][idx].completed;
    setTodos(updated);
  };

  const addTodo = () => {
    if (!newTodo.trim() || !selectedDate) return;
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const updated = { ...todos };
    if (!updated[dateKey]) updated[dateKey] = [];
    updated[dateKey].push({
      text: newTodo,
      completed: false,
      category: newCategory,
    });
    setTodos(updated);
    setNewTodo('');
  };

  const renderTodoList = () => {
    if (!selectedDate) return <p className="select-guide">왼쪽 달력에서 날짜를 선택하세요!</p>;
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const items = todos[dateKey] || [];
    return (
      <div className="todo-section">
        <h4>{dateKey}</h4>
        {items.map((todo, idx) => {
          const cat = categories[todo.category] || {};
          return (
            <div className="todo-item" key={idx}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(dateKey, idx)}
              />
              <span className="todo-badge" style={{ backgroundColor: cat.color }}>{cat.emoji}</span>
              <span>{todo.text}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="todo-page">
      <div className="user-profile">
        <img src={profileImg} alt="user" />
        <div>
          <strong>jooeun</strong>
          <p>프로갓생러 ✨</p>
        </div>
      </div>

      <h2>To-do List</h2>

      <div className="todo-wrapper">
        <div className="calendar-container">
          <Calendar
            onClickDay={(date) => setSelectedDate(date)}
            tileClassName={({ date }) => {
              const dateKey = format(date, 'yyyy-MM-dd');
              const dailyTodos = todos[dateKey] || [];
              const done = dailyTodos.filter(t => t.completed).length;
              const rate = dailyTodos.length ? done / dailyTodos.length : 0;

              if (rate === 0) return 'completion-0';
              else if (rate <= 0.3) return 'completion-30';
              else if (rate <= 0.5) return 'completion-50';
              else if (rate <= 0.7) return 'completion-70';
              else return 'completion-100';
            }}
          />
        </div>

        <div className="todo-content">
          <div className="todo-scroll-area">
            {renderTodoList()}
          </div>

          <div className="todo-add">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="할 일 입력..."
            />
            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
              {Object.entries(categories).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            <button onClick={addTodo}>추가</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
*/
// Todo.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './todo.css';

const categories = ['업무', '개인', '학습', '운동', '기타'];

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('업무');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);

  const updateAchievements = (updatedTodos) => {
    const completedCount = updatedTodos.filter(todo => todo.completed).length;
    console.log(`🎉 완료한 할 일 수: ${completedCount}`);
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getMonthData = useCallback((year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const data = [];

    const prevMonthDays = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);
    for (let i = 0; i < firstDayOfMonth; i++) {
      data.push({
        date: new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, prevMonthDays - firstDayOfMonth + i + 1),
        currentMonth: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      data.push({
        date: new Date(year, month, i),
        currentMonth: true
      });
    }

    const remainingDays = 42 - data.length;
    for (let i = 1; i <= remainingDays; i++) {
      data.push({
        date: new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, i),
        currentMonth: false
      });
    }

    return data;
  }, []);

  useEffect(() => {
    setCalendarData(getMonthData(currentYear, currentMonth));
  }, [currentMonth, currentYear, getMonthData]);

  const prevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
  };

  const formatDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const handleDateClick = (date) => setSelectedDate(date);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        category: selectedCategory,
        completed: false,
        date: formatDate(selectedDate)
      };
      const updatedTodos = [...todos, newTodoItem];
      setTodos(updatedTodos);
      setNewTodo('');
      updateAchievements(updatedTodos);
    }
  };

  const toggleTodoCompletion = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    updateAchievements(updatedTodos);
  };

  const todosForSelectedDay = todos.filter(todo => todo.date === formatDate(selectedDate));

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  return (
    <div className="todo-app">
      <div className="user-profile">
        <img src="/profile.jpg" alt="profile" className="profile-pic" />
        <div>
          <h2 className="nickname">홍길동</h2>
          <p className="status-message">오늘도 화이팅 💪</p>
        </div>
      </div>

      <div className="calendar-side">
        <div className="calendar-header">
          <button onClick={prevMonth}>&lt;</button>
          <h2>{currentYear}년 {monthNames[currentMonth]}</h2>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <div className="calendar-grid">
          <div className="calendar-day-names">
            {["일","월","화","수","목","금","토"].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="calendar-days">
            {calendarData.map((day, i) => (
              <div
                key={i}
                className={`calendar-day ${day.currentMonth ? 'current-month' : 'other-month'} ${formatDate(day.date) === formatDate(selectedDate) ? 'selected-day' : ''}`}
                onClick={() => handleDateClick(day.date)}
              >
                {day.date.getDate()}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="todo-side">
        <h2>{formatDate(selectedDate)} Todo</h2>
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="할 일을 입력하세요"
          />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <button type="submit">추가</button>
        </form>
        <ul className="todo-list">
          {todosForSelectedDay.length === 0 ? (
            <li>등록된 할 일이 없습니다.</li>
          ) : (
            todosForSelectedDay.map(todo => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <span>{todo.text} [{todo.category}]</span>
                <button onClick={() => toggleTodoCompletion(todo.id)}>
                  {todo.completed ? '✓' : '○'}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
