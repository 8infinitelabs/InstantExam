import mongoose, { Schema, Document } from 'mongoose';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface IExam extends Document {
    userId: string;
    topic: string;
    questionCount: number;
    password: string;
    url: string;
    questions: Question[];
}

const QuestionSchema: Schema = new Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true }
});

const ExamSchema: Schema = new Schema({
    userId: { type: String, required: true },
    topic: { type: String, required: true },
    questionCount: { type: Number, required: true },
    password: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    questions: { type: [QuestionSchema], required: true }
});

const Exam = mongoose.model<IExam>('Exam', ExamSchema);
export default Exam;
