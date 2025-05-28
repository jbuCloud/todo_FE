import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiCalendar, FiCheckSquare, FiRepeat, FiUser } from 'react-icons/fi';
import './navi.css'; // 꼭 추가!

export default function Navi() {
  const location = useLocation();
  const navItems = [
    { path: '/calendar', icon: FiCalendar, label: 'Calendar' },
    { path: '/todo', icon: FiCheckSquare, label: 'Todo' },
    { path: '/routine', icon: FiRepeat, label: 'Routine' },
    { path: '/my', icon: FiUser, label: 'My' }
  ];

  return (
    <nav className="navi-footer">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`navi-link${isActive ? ' active' : ''}`}
          >
            <div className="navi-icon-wrap">
              <Icon size={22} />
            </div>
            <span className="navi-label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}