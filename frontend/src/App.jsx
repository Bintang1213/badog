import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import Beranda from "./pages/Beranda";
import Menu from "./pages/Menu";
import Pesanan from "./pages/Pesanan";
import TentangKami from "./pages/TentangKami";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLoginSuccess = (role, name) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar
          onLoginClick={handleOpenModal}
          isLoggedIn={isLoggedIn}
          userName={userName}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/pesanan" element={isLoggedIn ? <Pesanan /> : <Pesanan />} />
            <Route path="/tentang" element={<TentangKami />} />
          </Routes>
        </main>

        <Footer />

        <LoginModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </Router>
  );
}

export default App;
