import express from 'express';
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Rute untuk membuat pesanan baru (hanya untuk pengguna yang terautentikasi)
router.post('/create', authMiddleware, createOrder);

// Rute untuk melihat riwayat pesanan saya (hanya untuk pengguna yang terautentikasi)
router.get('/my-orders', authMiddleware, getMyOrders);

// Rute untuk admin melihat semua pesanan
router.get('/all-orders', authMiddleware, getAllOrders);

// Rute untuk admin memperbarui status pesanan
router.put('/:id/status', authMiddleware, updateOrderStatus);

export default router;