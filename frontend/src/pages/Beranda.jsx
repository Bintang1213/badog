import { Link } from "react-router-dom"; 
import bannerImage from "../assets/banner.png";
import nasiliwet from "../assets/nasiliwet.png";
import nasitutug from "../assets/nasitutug.png";
import mie from "../assets/mie.png";
import lauk from "../assets/lauk.png";
import minuman from "../assets/minuman.png";
import '../styles/beranda.css';


const Beranda = () => {
  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-12 px-4 md:px-8">
      <div className="relative w-full max-w-6xl mb-12 shadow-xl rounded-[2rem] overflow-hidden">
          <img
            src={bannerImage}
            alt="Banner Kedai"
            className="w-full h-[500px] object-cover rounded-[4rem] shadow-2xl"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start px-12 md:px-24 text-white animate-fadeIn">
            <p className="text-xl md:text-2xl italic drop-shadow-md">
              Selamat Datang di Kedai Wartiyem
            </p>
            <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg mt-4 leading-snug animate-bounceSlow">
              Pesan Tanpa Ribet,<br />Nikmat Tanpa Batas!
            </h1>
            <Link to="/menu">
              <button className="mt-8 ml-12 px-6 py-3 bg-red-600 text-white text-base md:text-lg rounded-full font-semibold hover:bg-red-700 transition-colors shadow-md">
                Lihat Menu
              </button>
            </Link>
          </div>
      </div>

      {/* Teks Judul Section */}
      <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-4 animate-fadeInUp">
        Telusuri menu terbaik kami
      </h2>

      {/* Deskripsi Paragraf */}
      <p className="text-center text-gray-700 max-w-3xl text-lg md:text-xl mb-10 animate-fadeInUp">
        Makan enak itu bukan sekadar mengisi perut, tapi juga cara terbaik untuk menikmati hidup. Karena setiap suapan membawa kebahagiaan tersendiri!
      </p>

      {/* Kategori Menu */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="flex flex-col items-center">
          <img src={nasiliwet} alt="PAKET NASI LIWET" className="w-24 h-24 rounded-full object-cover shadow-md" />
          <p className="mt-2 text-center font-medium">PAKET NASI LIWET</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={nasitutug} alt="PAKET NASI TUTUG" className="w-24 h-24 rounded-full object-cover shadow-md" />
          <p className="mt-2 text-center font-medium">PAKET NASI TUTUG</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={mie} alt="ANEKA MIE" className="w-24 h-24 rounded-full object-cover shadow-md" />
          <p className="mt-2 text-center font-medium">ANEKA MIE</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={lauk} alt="ANEKA LAUK" className="w-24 h-24 rounded-full object-cover shadow-md" />
          <p className="mt-2 text-center font-medium">ANEKA LAUK</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={minuman} alt="MINUMAN" className="w-24 h-24 rounded-full object-cover shadow-md" />
          <p className="mt-2 text-center font-medium">MINUMAN</p>
        </div>
      </div>

      {/* Garis Abu-abu */}
      <div className="flex justify-center w-full mb-8">
        <div className="h-0.5 bg-gray-300" style={{ width: '65%' }}></div>
      </div>

      {/* Hidangan Terbaik Title */}
      <div className="w-full max-w-6xl px-4 md:px-16">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-left">Hidangan Terbaik</h3>
      </div>
    </div>
  );
};

export default Beranda;
