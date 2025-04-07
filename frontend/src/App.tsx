import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import ExamsPage from './pages/ExamsPage';
import BillingPage from './pages/BillingPage';
import ExamPage from './pages/ExamPage';
import StartExamPage from './pages/StartExamPage'; // 🔥 NUEVA PÁGINA

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="home" element={<HomePage />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="billing" element={<BillingPage />} />
        </Route>
        <Route path="/exam/:url" element={<ExamPage />} />
        <Route path="/exam/:url/start" element={<StartExamPage />} /> {/* 🔥 Nueva Ruta */}
      </Routes>
    </Router>
  );
};

export default App;
