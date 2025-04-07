import { Request, Response } from 'express';
import Exam from '../models/Exam';
import Result from '../models/Result';
import crypto from 'crypto';
import openai from '../config/openai';

// Crear un examen con generación de preguntas por OpenAI
export const createExam = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, topic, questionCount } = req.body;

        if (!userId || !topic || !questionCount) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        // 🔥 Generar preguntas usando OpenAI
        const openAIResponse = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are an exam generator AI. Generate a series of quiz questions." },
                { role: "user", content: `Generate ${questionCount} quiz questions about: ${topic}. Provide 4 options per question and indicate the correct one.` }
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const questions = JSON.parse(openAIResponse.data.choices[0].message?.content || '[]');

        const password = Math.floor(100000 + Math.random() * 900000).toString();
        const url = crypto.randomBytes(6).toString('hex');

        const exam = new Exam({
            userId,
            topic,
            questionCount,
            password,
            url,
            questions
        });

        await exam.save();

        res.json({ url, password, examId: exam._id });
    } catch (error) {
        console.error("❌ Error creating exam:", error);
        res.status(500).json({ message: 'Error creating exam' });
    }
};

// Obtener un examen por URL pública
export const getExamByURL = async (req: Request, res: Response): Promise<void> => {
    try {
        const { url } = req.params;

        if (!url) {
            res.status(400).json({ message: 'Missing URL parameter' });
            return;
        }

        const exam = await Exam.findOne({ url });

        if (!exam) {
            res.status(404).json({ message: 'Exam not found' });
            return;
        }

        res.json(exam);
    } catch (error) {
        console.error("❌ Error fetching exam:", error);
        res.status(500).json({ message: 'Error fetching exam' });
    }
};

// Guardar resultados del examen
export const saveExamResult = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, examId, name, email, score, totalQuestions } = req.body;

        if (!userId || !examId || !name || !email || score === undefined || !totalQuestions) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const result = new Result({
            userId,
            examId,
            name,
            email,
            score,
            totalQuestions,
            date: new Date()
        });

        await result.save();
        res.status(200).json({ message: 'Result saved successfully' });
    } catch (error) {
        console.error("❌ Error saving exam result:", error);
        res.status(500).json({ message: 'Error saving exam result' });
    }
};
