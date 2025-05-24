import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navi from '../component/Navi';
import './calendar.css';
import './my.css';
export default function CalendarPage({ user }) {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-page">
      {/* 프로필 카드 */}
      <section className="profile-card">
        <div className="avatar-wrapper">
          <img src={user.avatar || '/default-avatar.png'} alt="avatar" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          {user.statusMessage && (
            <p className="profile-status">{user.statusMessage}</p>
          )}
        </div>
      </section>

      {/* 실제 달력 */}
      <Calendar onChange={setDate} value={date} />

      <Navi />
    </div>
  );
}
