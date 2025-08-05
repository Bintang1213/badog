const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
        {/* Logo/Nama */}
        <div className="text-xl font-bold">Kedai Wartiyem</div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a href="/" className="hover:underline">Beranda</a>
          <a href="/menu" className="hover:underline">Menu</a>
          <a href="/pesanan" className="hover:underline">Pesanan</a>
          <a href="/tentang" className="hover:underline">Tentang Kami</a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          © 2025 Kedai Wartiyem. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
