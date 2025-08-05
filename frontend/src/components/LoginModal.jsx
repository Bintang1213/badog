import { useState } from "react";
import { createPortal } from "react-dom";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('Email dan password harus diisi.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        onLoginSuccess(result.role, result.user?.nama || 'Pengguna');
      } else {
        setMessage(result.message || 'Login gagal.');
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!name || !email || !password) {
      setMessage('Semua field harus diisi.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: name, email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Registrasi berhasil! Silakan login.');
        setIsLoginView(true);
      } else {
        setMessage(result.message || 'Registrasi gagal.');
      }
    } catch (error) {
      setMessage('Terjadi kesalahan. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-900">X</button>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{isLoginView ? 'Login' : 'Daftar'}</h2>
          <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-red-600 hover:underline">
            {isLoginView ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
          </button>
        </div>

        {message && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{message}</div>}

        <form onSubmit={isLoginView ? handleLogin : handleRegister}>
          {!isLoginView && (
            <div className="mb-4">
              <label className="block text-sm font-medium">Nama</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-red-600 text-white py-2 rounded">
            {isLoading ? 'Memproses...' : (isLoginView ? 'Login' : 'Daftar')}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
