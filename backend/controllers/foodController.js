import Food from '../models/food.js';
import fs from 'fs';
import path from 'path';

// Fungsi untuk menambah makanan (khusus admin)
export const addFood = async (req, res) => {
    // Memeriksa apakah pengguna adalah admin (dari data token di req.user)
    if (req.user.role !== 'admin') {
        // Hapus file yang sudah diupload jika bukan admin
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa menambah makanan.' });
    }

    try {
        const { nama, deskripsi, harga, kategori } = req.body;
        const gambar = req.file ? req.file.path : null;

        if (!gambar) {
            return res.status(400).json({ message: 'Gambar makanan tidak boleh kosong.' });
        }
        
        const newFood = await Food.create({
            nama,
            deskripsi,
            harga,
            gambar,
            kategori
        });
        res.status(201).json({ message: 'Makanan berhasil ditambahkan.', food: newFood });
    } catch (error) {
        console.error(error.message);
        // Hapus file yang diunggah jika terjadi kesalahan server
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).send('Server Error');
    }
};

// Fungsi untuk mengambil semua daftar makanan
export const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.findAll();
        res.json(foods);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Fungsi untuk mengedit makanan berdasarkan ID (khusus admin)
export const updateFood = async (req, res) => {
    // Memeriksa apakah pengguna adalah admin
    if (req.user.role !== 'admin') {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa mengedit makanan.' });
    }

    try {
        const { id } = req.params;
        const { nama, deskripsi, harga, kategori } = req.body;

        const food = await Food.findByPk(id);
        if (!food) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ message: 'Makanan tidak ditemukan.' });
        }

        let updatedData = { nama, deskripsi, harga, kategori };
        if (req.file) {
            if (food.gambar) {
                fs.unlinkSync(path.join('.', food.gambar));
            }
            updatedData.gambar = req.file.path;
        }

        await food.update(updatedData);
        res.json({ message: 'Makanan berhasil diperbarui.', food });
    } catch (error) {
        console.error(error.message);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).send('Server Error');
    }
};

// Fungsi untuk menghapus makanan berdasarkan ID (khusus admin)
export const deleteFood = async (req, res) => {
    // Memeriksa apakah pengguna adalah admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa menghapus makanan.' });
    }

    try {
        const { id } = req.params;
        const food = await Food.findByPk(id);
        if (!food) {
            return res.status(404).json({ message: 'Makanan tidak ditemukan.' });
        }
        
        if (food.gambar) {
            fs.unlinkSync(path.join('.', food.gambar));
        }

        await food.destroy();
        res.json({ message: 'Makanan berhasil dihapus.' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};