import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const googleCallback = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("✅ Google Callback Iniciado");

        if (!req.user) {
            console.error("❌ No se encontró un usuario autenticado en el request");
            res.status(401).json({ message: 'Error al autenticar con Google' });
            return;
        }

        const user = req.user as any;

        console.log("✅ Usuario autenticado:", user);

        if (!JWT_SECRET || JWT_SECRET === '') {
            console.error("❌ JWT_SECRET no está definido o está vacío");
            res.status(500).json({ message: 'Error interno: JWT_SECRET no encontrado' });
            return;
        }

        const token = jwt.sign(
            { userId: user._id }, 
            JWT_SECRET,  
            { expiresIn: '1d' }
        );

        console.log("✅ Token JWT generado:", token);

        const redirectUrl = `http://localhost:3000/dashboard/home?token=${token}&userId=${user._id}&username=${encodeURIComponent(user.name)}&picture=${encodeURIComponent(user.picture || '')}`;

        console.log("✅ Redirigiendo a:", redirectUrl);
        
        res.redirect(redirectUrl); // 🔥 Enviamos todos los datos necesarios al frontend
    } catch (error) {
        console.error("❌ Error en googleCallback:", error);
        res.status(500).json({ message: 'Error al manejar el callback de Google' });
    }
};
