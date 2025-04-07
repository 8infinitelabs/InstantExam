import React, { useState } from 'react';

interface CreateExamModalProps {
  onClose: () => void;
  onCreate: (topic: string, questionCount: number) => void;
}

const CreateExamModal: React.FC<CreateExamModalProps> = ({ onClose, onCreate }) => {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && questionCount > 0) {
      onCreate(topic, questionCount);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Exam</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Give a topic you want to exam</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Number of Questions</label>
            <input
              type="number"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg mt-1"
              min="1"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">Create Exam</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExamModal;
