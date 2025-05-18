// ✅ Todo.jsx
import React, { useState, useEffect } from 'react';
import './todo.css';

const Todo = ({ user }) => {
  const [categories, setCategories] = useState(['업무', '개인', '학습', '운동', '기타', '추가']);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('업무');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [calendarData, setCalendarData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
        currentMonth: false
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

  const formatDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newItem = {
        id: Date.now(),
        text: newTodo,
        category: selectedCategory,
        date: formatDate(selectedDate),
        completed: false
      };
      setTodos([...todos, newItem]);
      setNewTodo('');
    }
  };

  const toggleTodoCompletion = (id) => {
    const updated = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    setTodos(updated);
  };

  const todosForSelectedDay = todos.filter(todo => todo.date === formatDate(selectedDate));

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  return (
    <div className="todo-app">
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
            <h2>{currentYear}년 {monthNames[currentMonth]}</h2>
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
              <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
            </div>
            <div className="calendar-days">
              {calendarData.map((day, index) => (
                <div
                  key={index}
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
              className="todo-input"
            />
            <select value={selectedCategory} onChange={handleCategoryChange} className="category-select">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button type="submit" className="add-button">추가</button>
          </form>

          <div className="todo-list">
            {todosForSelectedDay.length === 0 ? (
              <p className="no-todos">등록된 할 일이 없습니다.</p>
            ) : (
              todosForSelectedDay.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <span>{todo.text}</span>
                  <span className="todo-category">{todo.category}</span>
                  <button onClick={() => toggleTodoCompletion(todo.id)}>{todo.completed ? '✓' : '○'}</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;