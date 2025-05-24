import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiCalendar, FiCheckSquare, FiRepeat, FiUser } from 'react-icons/fi';
import './navi.css';

export default function Navi() {
  return (
    <nav className="navi-bar">
      <NavLink to="/calendar">
        <FiCalendar size={24} />
        <span>Calendar</span>
      </NavLink>
      <NavLink to="/todo">
        <FiCheckSquare size={24} />
        <span>Todo</span>
      </NavLink>
      <NavLink to="/routine">
        <FiRepeat size={24} />
        <span>Routine</span>
      </NavLink>
      <NavLink to="/my">
        <FiUser size={24} />
        <span>My</span>
      </NavLink>
    </nav>
  );
}
