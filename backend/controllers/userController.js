import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Fungsi untuk mendaftarkan pengguna baru
export const registerUser = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    let user = await User.findOne({ where: { email } });

    // Periksa apakah email sudah terdaftar
    if (user) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }
    
    // Hash password sebelum disimpan ke database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat pengguna baru
    user = await User.create({ nama, email, password: hashedPassword });
    
    // Buat payload untuk token JWT
    const payload = { user: { id: user.id, role: user.role } };
    // Buat token JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Fungsi untuk login pengguna
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Cari pengguna berdasarkan email
        const user = await User.findOne({ where: { email } });

        // Periksa apakah pengguna ditemukan dan password cocok
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Kredensial tidak valid.' });
        }

        // Buat payload untuk token JWT (termasuk role)
        const payload = { user: { id: user.id, role: user.role } };
        // Buat token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, role: user.role });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Fungsi untuk mendapatkan profil pengguna (membutuhkan token yang valid)
export const getUserProfile = async (req, res) => {
    try {
      // Data pengguna sudah tersedia di req.user dari middleware otentikasi
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'nama', 'email', 'role'] // Hanya kirim data yang aman
      });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
};