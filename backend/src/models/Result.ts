import mongoose, { Schema, Document } from 'mongoose';

export interface IResult extends Document {
    userId: string;
    examId: string;
    name: string;
    email: string;
    score: number;
    totalQuestions: number;
    date: Date;
}

const ResultSchema: Schema = new Schema({
    userId: { type: String, required: true },
    examId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Result = mongoose.model<IResult>('Result', ResultSchema);
export default Result;
