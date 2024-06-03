import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const isActive = ({ isActive }) =>
    isActive ? 'active-link' : 'inactive-link';
  return (
    <nav>
      <NavLink to='/' className={isActive}>
        Home
      </NavLink>
      <NavLink to='/Tasks' className={isActive}>
        Tasks
      </NavLink>
    </nav>
  )
}
