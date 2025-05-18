import React, { useState, useEffect } from 'react';
import './routine.css';

const Routine = () => {
  // 사용자 정보 상태
  const [user, setUser] = useState({
    id: 'user123',
    statusMessage: '오늘도 화이팅!',
    profileImage: '/api/placeholder/120/120'
  });

  // 카테고리 상태 (추가 기능 포함)
  const [categories, setCategories] = useState(['업무', '개인', '학습', '운동', '기타', '추가']);
  
  // 루틴 관련 상태
  const [routines, setRoutines] = useState([]);
  const [newRoutine, setNewRoutine] = useState({
    title: '',
    category: '업무',
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 기본 30일 후
    days: {
      월: true,
      화: true,
      수: true,
      목: true,
      금: true,
      토: false,
      일: false
    },
    completed: {}
  });

  // 달력 관련 상태
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);

  // 모달 관련 상태
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // 요일 변환 함수
  const getDayName = (dateObj) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[dateObj.getDay()];
  };

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

  // 날짜 형식 변환 함수
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // 달력 데이터 업데이트
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
      setNewRoutine({ ...newRoutine, category: value });
    }
  };

  // 새 카테고리 추가 핸들러
  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      // 새 카테고리 배열 생성 ('추가' 옵션은 항상 마지막에 유지)
      const newCategories = [...categories.filter(cat => cat !== '추가'), newCategory, '추가'];
      setCategories(newCategories);
      setNewRoutine({ ...newRoutine, category: newCategory });
      setNewCategory('');
      setCategoryModalOpen(false);
    }
  };

  // 요일 선택 핸들러
  const handleDayToggle = (day) => {
    setNewRoutine({
      ...newRoutine, 
      days: {
        ...newRoutine.days,
        [day]: !newRoutine.days[day]
      }
    });
  };

  // 루틴 추가 핸들러
  const handleAddRoutine = (e) => {
    e.preventDefault();
    
    if (newRoutine.title.trim() === '') {
      alert('루틴 제목을 입력해주세요.');
      return;
    }

    // 하나 이상의 요일이 선택되었는지 확인
    const anyDaySelected = Object.values(newRoutine.days).some(val => val);
    if (!anyDaySelected) {
      alert('적어도 하나의 요일을 선택해주세요.');
      return;
    }

    const startDateObj = new Date(newRoutine.startDate);
    const endDateObj = new Date(newRoutine.endDate);

    if (startDateObj > endDateObj) {
      alert('종료 날짜는 시작 날짜보다 뒤여야 합니다.');
      return;
    }

    const newRoutineItem = {
      id: Date.now(),
      title: newRoutine.title,
      category: newRoutine.category,
      startDate: newRoutine.startDate,
      endDate: newRoutine.endDate,
      days: { ...newRoutine.days },
      completed: {}
    };

    setRoutines([...routines, newRoutineItem]);
    
    // 입력 폼 초기화 (카테고리와 요일 선택은 유지)
    setNewRoutine({
      ...newRoutine,
      title: '',
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
    });
  };

  // 루틴 완료 체크 핸들러
  const toggleRoutineCompletion = (routineId, date) => {
    const dateStr = formatDate(date);
    
    setRoutines(routines.map(routine => {
      if (routine.id === routineId) {
        const updatedCompleted = { ...routine.completed };
        
        if (updatedCompleted[dateStr]) {
          delete updatedCompleted[dateStr]; // 완료 취소
        } else {
          updatedCompleted[dateStr] = true; // 완료 체크
        }

        return { ...routine, completed: updatedCompleted };
      }
      return routine;
    }));
  };

  // 루틴 상세 모달 열기
  const openRoutineModal = (routine) => {
    setSelectedRoutine(routine);
    setModalOpen(true);
  };

  // 루틴 상세 모달 닫기
  const closeRoutineModal = () => {
    setModalOpen(false);
    setSelectedRoutine(null);
  };

  // 루틴 수정 모달 열기
  const openEditModal = () => {
    if (!selectedRoutine) return;
    
    const editRoutine = {
      title: selectedRoutine.title,
      category: selectedRoutine.category,
      startDate: selectedRoutine.startDate,
      endDate: selectedRoutine.endDate,
      days: { ...selectedRoutine.days }
    };
    
    setNewRoutine(editRoutine);
    setEditModalOpen(true);
    setModalOpen(false);
  };

  // 루틴 수정 모달 닫기
  const closeEditModal = () => {
    setEditModalOpen(false);
    
    // 입력 폼 초기화
    setNewRoutine({
      title: '',
      category: '업무',
      startDate: formatDate(new Date()),
      endDate: formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
      days: {
        월: true, 화: true, 수: true, 목: true, 금: true, 토: false, 일: false
      },
      completed: {}
    });
  };

  // 루틴 수정 저장
  const saveEditedRoutine = () => {
    if (newRoutine.title.trim() === '') {
      alert('루틴 제목을 입력해주세요.');
      return;
    }

    // 하나 이상의 요일이 선택되었는지 확인
    const anyDaySelected = Object.values(newRoutine.days).some(val => val);
    if (!anyDaySelected) {
      alert('적어도 하나의 요일을 선택해주세요.');
      return;
    }

    const startDateObj = new Date(newRoutine.startDate);
    const endDateObj = new Date(newRoutine.endDate);

    if (startDateObj > endDateObj) {
      alert('종료 날짜는 시작 날짜보다 뒤여야 합니다.');
      return;
    }

    const updatedRoutines = routines.map(routine => 
      routine.id === selectedRoutine.id
        ? {
            ...routine,
            title: newRoutine.title,
            category: newRoutine.category,
            startDate: newRoutine.startDate,
            endDate: newRoutine.endDate,
            days: { ...newRoutine.days }
          }
        : routine
    );

    setRoutines(updatedRoutines);
    closeEditModal();
  };

  // 루틴 삭제
  const deleteRoutine = () => {
    if (!selectedRoutine) return;
    
    const updatedRoutines = routines.filter(routine => routine.id !== selectedRoutine.id);
    setRoutines(updatedRoutines);
    closeRoutineModal();
  };

  // 특정 날짜에 해당하는 루틴 목록 가져오기
  const getRoutinesForDate = (date) => {
    const dateObj = new Date(date);
    const dateStr = formatDate(dateObj);
    const dayName = getDayName(dateObj);
    
    return routines.filter(routine => {
      // 날짜 범위 내에 있는지 확인
      const startDateObj = new Date(routine.startDate);
      const endDateObj = new Date(routine.endDate);
      const withinDateRange = dateObj >= startDateObj && dateObj <= endDateObj;
      
      // 해당 요일에 실행되는지 확인
      const isScheduledDay = routine.days[dayName];
      
      return withinDateRange && isScheduledDay;
    });
  };

  // 선택된 날짜의 루틴 목록
  const routinesForSelectedDay = getRoutinesForDate(selectedDate);

  // 달력에 표시할 루틴 성취도 계산
  const getCompletionRate = (date) => {
    const routinesForDate = getRoutinesForDate(date);
    if (routinesForDate.length === 0) return 0;
    
    const dateStr = formatDate(date);
    let completedCount = 0;
    
    routinesForDate.forEach(routine => {
      if (routine.completed[dateStr]) {
        completedCount++;
      }
    });
    
    return (completedCount / routinesForDate.length) * 100;
  };

  // 성취도에 따른 색상 클래스 반환
  const getAchievementColorClass = (date) => {
    const completionRate = getCompletionRate(date);
    
    if (completionRate === 100) {
      return 'achievement-100';
    } else if (completionRate >= 70) {
      return 'achievement-70';
    } else if (completionRate >= 50) {
      return 'achievement-50';
    } else if (completionRate >= 30) {
      return 'achievement-30';
    } else if (completionRate > 0) {
      return 'achievement-started';
    }
    
    return '';
  };

  // 월 이름
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  // 요일 배열
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <div className="routine-app">
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
        {/* 달력 섹션 */}
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
                  className={`calendar-day ${day.currentMonth ? 'current-month' : 'other-month'} ${
                    formatDate(day.date) === formatDate(selectedDate) ? 'selected-day' : ''
                  } ${getAchievementColorClass(day.date)}`}
                  onClick={() => handleDateClick(day.date)}
                >
                  {day.date.getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 루틴 섹션 */}
        <div className="routine-side">
          <h2>{formatDate(selectedDate)} 루틴</h2>

          <form onSubmit={handleAddRoutine} className="routine-form">
            <div className="input-group">
              <input
                type="text"
                value={newRoutine.title}
                onChange={(e) => setNewRoutine({ ...newRoutine, title: e.target.value })}
                placeholder="루틴 제목을 입력하세요"
                className="routine-input"
              />
              
              <select
                value={newRoutine.category}
                onChange={handleCategoryChange}
                className="category-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="date-group">
              <div className="date-input-group">
                <label>시작일</label>
                <input
                  type="date"
                  value={newRoutine.startDate}
                  onChange={(e) => setNewRoutine({ ...newRoutine, startDate: e.target.value })}
                  className="date-input"
                />
              </div>
              
              <div className="date-input-group">
                <label>종료일</label>
                <input
                  type="date"
                  value={newRoutine.endDate}
                  onChange={(e) => setNewRoutine({ ...newRoutine, endDate: e.target.value })}
                  className="date-input"
                />
              </div>
            </div>
            
            <div className="days-selection">
              <label>반복 요일</label>
              <div className="day-checkboxes">
                {days.map(day => (
                  <div key={day} className="day-checkbox">
                    <input
                      type="checkbox"
                      id={`day-${day}`}
                      checked={newRoutine.days[day]}
                      onChange={() => handleDayToggle(day)}
                    />
                    <label htmlFor={`day-${day}`}>{day}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <button type="submit" className="add-button">루틴 추가</button>
          </form>

          <div className="routine-list">
            {routinesForSelectedDay.length === 0 ? (
              <p className="no-routines">오늘의 루틴이 없습니다.</p>
            ) : (
              routinesForSelectedDay.map(routine => {
                const dateStr = formatDate(selectedDate);
                return (
                  <div 
                    key={routine.id} 
                    className={`routine-item ${routine.completed[dateStr] ? 'completed' : ''}`}
                  >
                    <div className="routine-content" onClick={() => openRoutineModal(routine)}>
                      <span className="routine-text">{routine.title}</span>
                      <span className="routine-category">{routine.category}</span>
                    </div>
                    <button
                      className="complete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRoutineCompletion(routine.id, selectedDate);
                      }}
                    >
                      {routine.completed[dateStr] ? '✓' : '○'}
                    </button>
                  </div>
                );
              })
            )}
          </div>
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
                  setNewRoutine({ ...newRoutine, category: categories[0] });
                }} 
                className="close-button"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 루틴 상세 모달 */}
      {modalOpen && selectedRoutine && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>루틴 상세</h3>
            <p className="modal-routine-text">{selectedRoutine.title}</p>
            <p className="modal-routine-info">카테고리: {selectedRoutine.category}</p>
            <p className="modal-routine-info">기간: {selectedRoutine.startDate} ~ {selectedRoutine.endDate}</p>
            <p className="modal-routine-info">
              반복 요일: {days.filter(day => selectedRoutine.days[day]).join(', ')}
            </p>
            <div className="modal-buttons">
              <button onClick={openEditModal}>루틴 수정</button>
              <button onClick={deleteRoutine} className="delete-button">루틴 삭제</button>
              <button onClick={closeRoutineModal} className="close-button">닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* 루틴 수정 모달 */}
      {editModalOpen && (
        <div className="modal-backdrop">
          <div className="modal edit-modal">
            <h3>루틴 수정</h3>
            
            <input
              type="text"
              value={newRoutine.title}
              onChange={(e) => setNewRoutine({ ...newRoutine, title: e.target.value })}
              placeholder="루틴 제목"
              className="edit-input"
            />
            
            <select
              value={newRoutine.category}
              onChange={(e) => setNewRoutine({ ...newRoutine, category: e.target.value })}
              className="category-select"
            >
              {categories.filter(cat => cat !== '추가').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <div className="date-group">
              <div className="date-input-group">
                <label>시작일</label>
                <input
                  type="date"
                  value={newRoutine.startDate}
                  onChange={(e) => setNewRoutine({ ...newRoutine, startDate: e.target.value })}
                  className="date-input"
                />
              </div>
              
              <div className="date-input-group">
                <label>종료일</label>
                <input
                  type="date"
                  value={newRoutine.endDate}
                  onChange={(e) => setNewRoutine({ ...newRoutine, endDate: e.target.value })}
                  className="date-input"
                />
              </div>
            </div>
            
            <div className="days-selection edit-days">
              <label>반복 요일</label>
              <div className="day-checkboxes">
                {days.map(day => (
                  <div key={day} className="day-checkbox">
                    <input
                      type="checkbox"
                      id={`edit-day-${day}`}
                      checked={newRoutine.days[day]}
                      onChange={() => handleDayToggle(day)}
                    />
                    <label htmlFor={`edit-day-${day}`}>{day}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="modal-buttons">
              <button onClick={saveEditedRoutine}>저장</button>
              <button onClick={closeEditModal} className="close-button">취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routine;
