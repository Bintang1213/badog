import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // File akan disimpan di folder 'uploads/'
  },
  filename: (req, file, cb) => {
    // Gunakan nama file yang unik untuk menghindari tabrakan
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Buat middleware upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Batasan ukuran file 5MB
  fileFilter: (req, file, cb) => {
    // Hanya izinkan format gambar
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: Upload file hanya mendukung format gambar.");
  }
});

export default upload;