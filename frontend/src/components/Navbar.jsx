import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

const Navbar = ({ onLoginClick, isLoggedIn, userName }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Kiri: Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </Link>

      {/* Tengah: Link Menu */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">Beranda</Link>
        <Link to="/menu" className="hover:underline">Menu</Link>
        <Link to="/pesanan" className="hover:underline">Pesanan</Link>
        <Link to="/tentang" className="hover:underline">Tentang Kami</Link>
      </div>

      {/* Kanan: Icon & Login */}
      <div className="flex items-center gap-4">
        <button>
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 hover:text-black" />
        </button>
        <button>
          <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-black" />
        </button>
        {isLoggedIn ? (
          <div className="font-semibold">{userName}</div>
        ) : (
          <button onClick={onLoginClick} className="bg-red-600 text-white px-4 py-2 rounded">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
