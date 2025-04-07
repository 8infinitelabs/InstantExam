import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const username = localStorage.getItem('username') || 'User';
  const userPicture = localStorage.getItem('picture');

  const menuItems = [
    { name: 'Home', path: '/dashboard/home' },
    { name: 'Exams', path: '/dashboard/exams' },
    { name: 'Billing', path: '/dashboard/billing' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('picture');
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between h-screen">
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        
        {/* Logo Centrando en Medio */}
        <div className="flex flex-col items-center justify-center mb-8">
          <img src={logo} alt="InstantExam Logo" className="w-24 mb-4" />
        </div>

        {/* Saludo con Imagen y Nombre en Una Línea */}
        <div className="flex items-center space-x-3 mb-8">
          {userPicture && (
            <img src={userPicture} alt="Profile" className="w-10 h-10 rounded-full" />
          )}
          <div className="text-xl font-bold">Hello, {username}</div>
        </div>

        {/* Menú */}
        <nav className="flex-1 space-y-4 w-full text-center">
          {menuItems.map(item => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2 rounded-lg text-lg ${
                location.pathname === item.path ? 'bg-primary text-white' : 'text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Botón de Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-500 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
