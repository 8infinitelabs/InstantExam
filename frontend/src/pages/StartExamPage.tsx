import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

const StartExamPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, email, examData } = location.state || {};
    const userId = localStorage.getItem('userId'); // 🔥 Recogemos el userId de localStorage

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(10);
    const [showResults, setShowResults] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if (!examData || !name || !email) {
            navigate('/');
        } else {
            fetchQuestions();
        }
    }, [examData, name, email, navigate]);

    useEffect(() => {
        if (timer === 0) handleNextQuestion();

        const countdown = setInterval(() => {
            setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, [timer, currentQuestionIndex]);

    const fetchQuestions = () => {
        const generatedQuestions: Question[] = Array.from({ length: examData.questionCount }, (_, index) => ({
            question: `Sample question ${index + 1}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 'Option A'
        }));

        setQuestions(generatedQuestions);
    };

    const handleAnswerSelection = (answer: string) => {
        if (questions[currentQuestionIndex].correctAnswer === answer) {
            setScore(prevScore => prevScore + 1);
        }
        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setTimer(10);
        } else {
            setShowResults(true);
            saveResults(); // 🔥 Guardar resultados en el backend
        }
    };

    const saveResults = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/exams/save-result', {
                userId,
                examId: examData._id,
                name,
                email,
                score,
                totalQuestions: questions.length
            });

            console.log("✅ Result saved successfully:", response.data);
        } catch (error) {
            console.error("❌ Error saving result:", error);
        }
    };

    if (showResults) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
                    <h2 className="text-2xl font-bold mb-4">Exam Completed</h2>
                    <p className="text-lg mb-4">You scored {score} out of {questions.length}</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <div className="flex justify-between mb-4">
                    <div>Question {currentQuestionIndex + 1} / {questions.length}</div>
                    <div>Time Left: {timer} seconds</div>
                </div>
                <h2 className="text-xl font-bold mb-4">{currentQuestion?.question}</h2>
                <div className="space-y-2">
                    {currentQuestion?.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelection(option)}
                            className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StartExamPage;
