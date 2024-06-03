import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <h1>Basic Auth App</h1>
      <NavLink to='/login'>Iniciar Sesión</NavLink>
      <NavLink to='/register'>Registrarse</NavLink>
    </>
  );
}
