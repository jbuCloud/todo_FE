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

import React, { useState, useEffect } from 'react';
import './todo.css';

const Todo = () => {
  // 기본 카테고리 (마지막 '추가' 옵션 포함)
  const [categories, setCategories] = useState(['업무', '개인', '학습', '운동', '기타', '추가']);
  
  // 사용자 정보 상태
  const [user, setUser] = useState({
    id: 'user123',
    statusMessage: '오늘도 화이팅!',
    profileImage: '/api/placeholder/120/120'
  });
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('업무');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [achievements, setAchievements] = useState({});

  // 새 카테고리 관련 상태*
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // 달력 데이터 계산
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const data = [];

    // 이전 달 날짜 채우기
    const prevMonthDays = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);
    for (let i = 0; i < firstDayOfMonth; i++) {
      data.push({
        date: new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, prevMonthDays - firstDayOfMonth + i + 1),
        currentMonth: false
      });
    }

    // 현재 달 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
      data.push({
        date: new Date(year, month, i),
        currentMonth: true
      });
    }

    // 다음 달 날짜 채우기 (42개 셀 채우기)
    const remainingDays = 42 - data.length;
    for (let i = 1; i <= remainingDays; i++) {
      data.push({
        date: new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, i),
        currentMonth: false
      });
    }

    return data;
  };

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    setCalendarData(getMonthData(currentYear, currentMonth));
  }, [currentMonth, currentYear]);

  // 이전 달, 다음 달 이동
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 날짜 형식 변환 함수
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // 카테고리 선택 핸들러
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === '추가') {
      setCategoryModalOpen(true);
    } else {
      setSelectedCategory(value);
    }
  };

  // 새 카테고리 추가 핸들러
  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      // 새 카테고리 배열 생성 ('추가' 옵션은 항상 마지막에 유지)
      const newCategories = [...categories.filter(cat => cat !== '추가'), newCategory, '추가'];
      setCategories(newCategories);
      setSelectedCategory(newCategory);
      setNewCategory('');
      setCategoryModalOpen(false);
    }
  };

  // 할 일 추가
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        category: selectedCategory,
        completed: false,
        date: formatDate(selectedDate)
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      updateAchievements([...todos, newTodoItem]);
    }
  };

  // 할 일 완료/미완료 토글
  const toggleTodoCompletion = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    updateAchievements(updatedTodos);
  };

  // 모달 관련 함수들
  const openModal = (todo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTodo(null);
  };

  // 내일도 하기
  const doTomorrow = () => {
    if (!selectedTodo) return;

    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const newTodoItem = {
      id: Date.now(),
      text: selectedTodo.text,
      category: selectedTodo.category,
      completed: false,
      date: formatDate(tomorrow)
    };

    setTodos([...todos, newTodoItem]);
    closeModal();
  };

  // 날짜 변경
  const changeDate = (newDate) => {
    if (!selectedTodo) return;

    const updatedTodos = todos.map(todo =>
      todo.id === selectedTodo.id ? { ...todo, date: formatDate(newDate) } : todo
    );

    setTodos(updatedTodos);
    updateAchievements(updatedTodos);
    closeModal();
  };

  // 할 일 수정
  const editTodo = (newText, newCategory) => {
    if (!selectedTodo) return;

    const updatedTodos = todos.map(todo =>
      todo.id === selectedTodo.id ? { ...todo, text: newText, category: newCategory } : todo
    );

    setTodos(updatedTodos);
    closeModal();
  };

  // 할 일 삭제
  const deleteTodo = () => {
    if (!selectedTodo) return;

    const updatedTodos = todos.filter(todo => todo.id !== selectedTodo.id);
    setTodos(updatedTodos);
    updateAchievements(updatedTodos);
    closeModal();
  };

  // 성취도 계산 및 업데이트
  const updateAchievements = (updatedTodos) => {
    const achievementData = {};

    updatedTodos.forEach(todo => {
      if (!achievementData[todo.date]) {
        achievementData[todo.date] = {
          total: 0,
          completed: 0
        };
      }

      achievementData[todo.date].total++;
      if (todo.completed) {
        achievementData[todo.date].completed++;
      }
    });

    setAchievements(achievementData);
  };

  // 성취도에 따른 색상 클래스 반환
  const getAchievementColorClass = (date) => {
    const dateStr = formatDate(date);
    const achievement = achievements[dateStr];

    if (!achievement || achievement.total === 0) {
      return '';
    }

    const completionRate = (achievement.completed / achievement.total) * 100;

    if (completionRate === 100) {
      return 'achievement-100';
    } else if (completionRate >= 70) {
      return 'achievement-70';
    } else if (completionRate >= 50) {
      return 'achievement-50';
    } else if (completionRate >= 30) {
      return 'achievement-30';
    }

    return '';
  };

  // 선택된 날짜의 할 일 목록
  const todosForSelectedDay = todos.filter(todo => todo.date === formatDate(selectedDate));

  // 월 이름
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  // 날짜 변경 모달 상태
  const [dateChangeModalOpen, setDateChangeModalOpen] = useState(false);
  const [newDate, setNewDate] = useState(new Date());

  // 할 일 편집 모달 상태
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editText, setEditText] = useState('');
  const [editCategory, setEditCategory] = useState('업무');

  // 날짜 변경 모달 열기
  const openDateChangeModal = () => {
    if (!selectedTodo) return;
    setNewDate(new Date(selectedTodo.date));
    setDateChangeModalOpen(true);
    setModalOpen(false);
  };

  // 날짜 변경 모달 닫기
  const closeDateChangeModal = () => {
    setDateChangeModalOpen(false);
  };

  // 할 일 편집 모달 열기
  const openEditModal = () => {
    if (!selectedTodo) return;
    setEditText(selectedTodo.text);
    setEditCategory(selectedTodo.category);
    setEditModalOpen(true);
    setModalOpen(false);
  };

  // 할 일 편집 모달 닫기
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  // 할 일 편집 저장
  const saveEdit = () => {
    editTodo(editText, editCategory);
    closeEditModal();
  };

  // 날짜 변경 저장
  const saveDateChange = () => {
    changeDate(newDate);
    closeDateChangeModal();
  };

  return (
    <div className="todo-app">
      <div className="user-profile-container">
        <div className="user-profile">
          <div className="profile-image">
            <img src={user.profileImage} alt="프로필 이미지" />
          </div>
          <div className="user-info">
            <h3>{user.id}</h3>
            <p>{user.statusMessage}</p>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="calendar-side">
          <div className="calendar-header">
            <button onClick={prevMonth}>&lt;</button>
            <h2>{currentYear}년 {monthNames[currentMonth]}</h2>
            <button onClick={nextMonth}>&gt;</button>
          </div>
          <div className="calendar-grid">
            <div className="calendar-day-names">
              <div>일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div>토</div>
            </div>
            <div className="calendar-days">
              {calendarData.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${day.currentMonth ? 'current-month' : 'other-month'} ${formatDate(day.date) === formatDate(selectedDate) ? 'selected-day' : ''
                    } ${getAchievementColorClass(day.date)}`}
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
            <div className="input-group">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="할 일을 입력하세요"
                className="todo-input"
              />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="category-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="add-button">추가</button>
          </form>

          <div className="todo-list">
            {todosForSelectedDay.length === 0 ? (
              <p className="no-todos">등록된 할 일이 없습니다.</p>
            ) : (
              todosForSelectedDay.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content" onClick={() => openModal(todo)}>
                    <span className="todo-text">{todo.text}</span>
                    <span className="todo-category">{todo.category}</span>
                  </div>
                  <button
                    className="complete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTodoCompletion(todo.id);
                    }}
                  >
                    {todo.completed ? '✓' : '○'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 새 카테고리 추가 모달 */}
        {categoryModalOpen && (
          <div className="modal-backdrop">
            <div className="modal category-modal">
              <h3>새 카테고리 추가</h3>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="카테고리 이름 입력"
                className="category-input"
                autoFocus
              />
              <div className="modal-buttons">
                <button onClick={handleAddCategory}>추가</button>
                <button 
                  onClick={() => {
                    setCategoryModalOpen(false);
                    setSelectedCategory(categories[0]);
                  }} 
                  className="close-button"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 할 일 상세 모달 */}
        {modalOpen && selectedTodo && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>할 일 상세</h3>
              <p className="modal-todo-text">{selectedTodo.text}</p>
              <p className="modal-todo-category">카테고리: {selectedTodo.category}</p>
              <div className="modal-buttons">
                <button onClick={doTomorrow}>내일도 하기</button>
                <button onClick={openDateChangeModal}>날짜 변경</button>
                <button onClick={openEditModal}>할 일 수정</button>
                <button onClick={deleteTodo} className="delete-button">할 일 삭제</button>
                <button onClick={closeModal} className="close-button">닫기</button>
              </div>
            </div>
          </div>
        )}

        {/* 날짜 변경 모달 */}
        {dateChangeModalOpen && (
          <div className="modal-backdrop">
            <div className="modal date-change-modal">
              <h3>날짜 변경</h3>
              <input
                type="date"
                value={formatDate(newDate)}
                onChange={(e) => setNewDate(new Date(e.target.value))}
                className="date-input"
              />
              <div className="modal-buttons">
                <button onClick={saveDateChange}>저장</button>
                <button onClick={closeDateChangeModal} className="close-button">취소</button>
              </div>
            </div>
          </div>
        )}
        
        {/* 할 일 편집 모달 */}
        {editModalOpen && (
          <div className="modal-backdrop">
            <div className="modal edit-modal">
              <h3>할 일 수정</h3>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="category-select"
              >
                {categories.filter(cat => cat !== '추가').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="modal-buttons">
                <button onClick={saveEdit}>저장</button>
                <button onClick={closeEditModal} className="close-button">취소</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;