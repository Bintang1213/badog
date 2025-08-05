import express from 'express';
import { addFood, getAllFoods, updateFood, deleteFood } from '../controllers/foodController.js';
import authMiddleware from '../middleware/auth.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Rute untuk menambah makanan
router.post('/add', authMiddleware, upload.single('gambar'), addFood);

// Rute untuk mendapatkan semua makanan
router.get('/', getAllFoods);

// Rute untuk mengedit makanan berdasarkan ID
router.put('/:id', authMiddleware, upload.single('gambar'), updateFood);

// Rute untuk menghapus makanan berdasarkan ID
router.delete('/:id', authMiddleware, deleteFood);

export default router;