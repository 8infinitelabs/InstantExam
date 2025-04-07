import React from 'react';
import GoogleButton from 'react-google-button';
import logo from '../assets/logo.png'; // Asegúrate de colocar la imagen en 'src/assets/'

const Home: React.FC = () => {
  const googleLoginUrl = `${process.env.REACT_APP_API_URL}/auth/google`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-xl shadow-2xl flex flex-col items-center w-full max-w-md">
        
        {/* Logo */}
        <img src={logo} alt="InstantExam Logo" className="w-32 mb-6" />

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">InstantExam</h1>
        <p className="text-gray-500 mb-8 text-center">
          Inicia sesión o regístrate con Google para empezar a crear tus exámenes al instante.
        </p>

        {/* Botón de Google */}
        <GoogleButton
          label="Continuar con Google"
          onClick={() => window.location.href = googleLoginUrl}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default Home;
