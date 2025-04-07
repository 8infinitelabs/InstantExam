import React, { useEffect } from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import FloatingButton from './FloatingButton';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const username = params.get('username');
      const picture = params.get('picture');
      const userId = params.get('userId'); // 🔥 Asegúrate que viene el userId

      console.log("🔍 URL Parameters:", { token, username, userId, picture });

      if (token) {
          localStorage.setItem('token', token);
          console.log("✅ Token guardado en localStorage:", token);
      }

      if (username) {
          localStorage.setItem('username', decodeURIComponent(username));
          console.log("✅ Username guardado en localStorage:", username);
      }

      if (picture) {
          localStorage.setItem('picture', decodeURIComponent(picture));
          console.log("✅ Picture guardado en localStorage:", picture);
      }

      if (userId) {
          localStorage.setItem('userId', userId);
          console.log("✅ UserID guardado en localStorage:", userId);
      }

      if (location.search.includes('token')) {
          navigate('/dashboard/home');
      }
    } catch (error) {
      console.error("❌ Error al procesar URLSearchParams en Dashboard:", error);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
        <FloatingButton />
      </div>
    </div>
  );
};

export default Dashboard;
