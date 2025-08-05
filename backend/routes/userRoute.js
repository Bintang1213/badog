import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Rute untuk registrasi
router.post('/register', registerUser);

// Rute untuk login
router.post('/login', loginUser);

// Rute untuk mendapatkan profil pengguna (dilindungi oleh middleware otentikasi)
router.get('/profile', authMiddleware, getUserProfile);

export default router;