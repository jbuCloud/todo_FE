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
*/

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
