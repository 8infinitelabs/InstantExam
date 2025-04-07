import express, { Request, Response } from 'express';
import { authenticateJWT } from '../utils/authMiddleware';

const router = express.Router();

router.get('/dashboard', authenticateJWT, async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'No autenticado' });
            return;
        }

        res.json({ message: `Bienvenido al dashboard.` });
    } catch (error) {
        console.error('Error en la ruta protegida:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router;
