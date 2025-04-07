import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface DecodedToken {
  userId: string;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; 

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token no válido o expirado' });
            }

            const user = decoded as DecodedToken;

            // Asignar el userId al req.user para que TypeScript lo reconozca
            req.user = { userId: user.userId };

            next();
        });
    } else {
        res.status(401).json({ message: 'Autenticación requerida' });
    }
};
