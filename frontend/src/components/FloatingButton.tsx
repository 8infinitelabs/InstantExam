import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateExamModal from './CreateExamModal';
import axios from 'axios';

const FloatingButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examLink, setExamLink] = useState<string | null>(null);
  const [examPassword, setExamPassword] = useState<string | null>(null);

  const handleCreateExam = async (topic: string, questionCount: number) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert("You need to be logged in to create an exam.");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/exams/create',
        { userId, topic, questionCount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { url, password } = response.data;
      setExamLink(`http://localhost:3000/exam/${url}`);
      setExamPassword(password);
      console.log("✅ Exam created successfully:", url, password);
    } catch (error) {
      console.error("❌ Error creating exam:", error);
      alert("An error occurred while creating the exam.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-primary-dark transition"
      >
        <Plus size={28} />
      </button>

      {isModalOpen && (
        <CreateExamModal 
          onClose={() => setIsModalOpen(false)} 
          onCreate={handleCreateExam}
        />
      )}

      {examLink && examPassword && (
        <div className="fixed bottom-20 right-6 bg-white shadow-lg rounded-lg p-4">
          <div>🔗 Public Link: <a href={examLink} target="_blank" rel="noopener noreferrer">{examLink}</a></div>
          <div>🔑 Password: <strong>{examPassword}</strong></div>
        </div>
      )}
    </>
  );
};

export default FloatingButton;
