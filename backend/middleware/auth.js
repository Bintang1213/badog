import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (req, res, next) => {
  // Dapatkan token dari header permintaan
  const authHeader = req.header('Authorization');

  // Periksa apakah header Authorization ada
  if (!authHeader) {
    return res.status(401).json({ message: 'Akses ditolak. Header Authorization tidak ditemukan.' });
  }

  // Ambil token dari format "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token tidak valid.' });
  }

  try {
    // Verifikasi token menggunakan JWT_SECRET dari .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Simpan data pengguna dari token (termasuk role) ke objek permintaan
    req.user = decoded.user;
    // Lanjutkan ke handler rute berikutnya
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid.' });
  }
};

export default authMiddleware;