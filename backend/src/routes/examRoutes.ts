import express from 'express';
import { createExam, getExamByURL, saveExamResult } from '../controllers/examController';
import { authenticateJWT } from '../utils/authMiddleware';

const router = express.Router();

router.post('/create', authenticateJWT, createExam);  // 🔥 RUTA PROTEGIDA
router.get('/:url', getExamByURL);                    // 🔥 RUTA PÚBLICA
router.post('/save-result', saveExamResult);          // 🔥 RUTA PÚBLICA

export default router;
