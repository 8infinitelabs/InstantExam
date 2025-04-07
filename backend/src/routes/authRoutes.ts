import express from 'express';
import passport from 'passport';
import { googleCallback } from '../controllers/authController';

const router = express.Router();

// 🔥 Iniciar autenticación con Google
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    session: false 
}));

// 🔥 Callback después de autenticación exitosa
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/', session: false }), 
    googleCallback
);

export default router;
