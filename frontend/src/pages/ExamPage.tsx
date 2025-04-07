import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ExamPage: React.FC = () => {
    const { url } = useParams<{ url: string }>();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [examData, setExamData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/api/exams/${url}`);
            const exam = response.data;

            if (exam.password === password) {
                setExamData(exam);
                setAccessGranted(true); // Permitir acceso al formulario de Nombre y Email
                setError(null);
            } else {
                setError('Invalid password. Please try again.');
            }
        } catch (error) {
            console.error("❌ Error fetching exam data:", error);
            setError('Failed to retrieve exam. Please check the URL.');
        }
    };

    const handleStartExam = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email) {
            setError('Please enter both your name and email.');
            return;
        }

        navigate(`/exam/${url}/start`, { state: { name, email, examData } }); // 🔥 Navegar al examen con datos completos
    };

    if (!accessGranted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Enter Exam Password</h2>
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
                            placeholder="Enter 6-digit password"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                        >
                            Enter Exam
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Exam: {examData?.topic}</h2>
                <form onSubmit={handleStartExam} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg mt-1"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg mt-1"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg"
                        >
                            Start Exam
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ExamPage;
