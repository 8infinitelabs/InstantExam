import dotenv from 'dotenv-safe';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Cargar variables de entorno
dotenv.config({
  path: path.resolve(__dirname, '../.env.dev'),
  example: path.resolve(__dirname, '../.env.example')
});

console.log("✅ Verificación de JWT_SECRET en index.ts:", process.env.JWT_SECRET);

import passport from 'passport';
import authRoutes from './routes/authRoutes';
import './config/passport';
import examRoutes from './routes/examRoutes';


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // 🔥 No usar passport.session()

// Rutas
app.use('/api/auth', authRoutes);

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('✅ Connected to the database'))
  .catch((error) => console.error('❌ Error connecting to the database:', error.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Añadir esto después de importar tus otros middlewares
app.use('/api/exams', examRoutes);