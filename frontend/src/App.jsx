import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Komponen Modal
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

// Komponen Form Input
const InputField = ({ id, label, type = 'text', value, onChange, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
    />
  </div>
);

// Komponen utama aplikasi
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setMessage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessage('');
    setName('');
    setEmail('');
    setPassword('');
  };

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
        const loggedInName = result.user?.nama || 'Pengguna';
        setUserName(loggedInName);
        setUserRole(result.role);
        setIsLoggedIn(true);
        handleCloseModal();
      } else {
        setMessage(result.message || 'Login gagal.');
      }
    } catch (error) {
      console.error('Error saat login:', error);
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
      console.error('Error saat registrasi:', error);
      setMessage('Terjadi kesalahan. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName('');
  };

  const renderHomePage = () => {
    if (!isLoggedIn) {
      return (
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Selamat Datang di Kedai Wartiyem</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Silakan login atau daftar untuk melihat menu dan memesan.</p>
          <button
            onClick={handleOpenModal}
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition-colors"
          >
            Login / Daftar
          </button>
        </div>
      );
    }

    if (userRole === 'admin') {
      return (
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-red-600">Selamat Datang, Admin {userName}!</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Anda memiliki akses penuh untuk mengelola makanan dan pesanan.</p>
          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      );
    }

    if (userRole === 'pelanggan') {
      return (
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-red-500">Halo, {userName}!</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Selamat berbelanja. Anda bisa melihat menu dan membuat pesanan.</p>
          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-4">
      {renderHomePage()}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {isLoginView ? 'Login' : 'Daftar'}
          </h2>
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="text-sm text-red-600 dark:text-red-400 hover:underline"
          >
            {isLoginView ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Login'}
          </button>
        </div>

        {message && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={isLoginView ? handleLogin : handleRegister}>
          {!isLoginView && (
            <InputField
              id="name"
              label="Nama"
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : (isLoginView ? 'Login' : 'Daftar')}
          </button>
        </form>
      </Modal>
    </div>
  );
}
