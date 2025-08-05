import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartcontroller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Rute untuk menambah item ke keranjang
router.post('/add', authMiddleware, addToCart);

// Rute untuk melihat isi keranjang
router.get('/', authMiddleware, getCart);

// Rute untuk menghapus item dari keranjang
router.delete('/remove', authMiddleware, removeFromCart);

export default router;