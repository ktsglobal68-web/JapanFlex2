
import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tái tạo chính xác Logo mới từ hình ảnh khách hàng gửi
  const LogoSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Nền trắng và viền đỏ */}
      <circle cx="50" cy="50" r="48" fill="white" stroke="#991b1b" strokeWidth="2.5" />
      
      {/* Hoa anh đào ở trên đỉnh */}
      <g transform="translate(50, 20) scale(0.12)" fill="#991b1b">
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(0)" />
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(72)" />
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(144)" />
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(216)" />
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(288)" />
        <circle cx="0" cy="0" r="8" fill="white" />
      </g>

      {/* Núi Phú Sĩ ở giữa */}
      <path d="M22 62 L50 35 L78 62 L22 62" fill="#991b1b" />
      <path d="M42 42 L50 49 L58 42 L50 35 Z" fill="white" /> {/* Tuyết đỉnh núi */}

      {/* Chữ SFJ ở dưới cùng */}
      <text x="50" y="82" fontFamily="'Playfair Display', serif" fontSize="24" fontWeight="900" fill="#991b1b" textAnchor="middle" letterSpacing="-1">SFJ</text>
      
      {/* Đường gạch ngang trang trí tinh tế */}
      <line x1="25" y1="62" x2="75" y2="62" stroke="#991b1b" strokeWidth="1" />
    </svg>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-14 h-14 relative rounded-full shadow-lg overflow-hidden bg-white border border-slate-100 transition-transform group-hover:rotate-6 group-hover:scale-110">
            <LogoSVG />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl md:text-2xl font-black tracking-tighter leading-none transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              SigFlex Japan
            </span>
            <span className={`text-[8px] font-bold uppercase tracking-[0.2em] mt-1 transition-colors ${scrolled ? 'text-red-600' : 'text-yellow-400'}`}>
              Your Signature. Our Flexibility
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center space-x-8 text-sm font-bold transition-colors ${scrolled ? 'text-slate-600' : 'text-white/80'}`}>
          <button onClick={(e) => scrollToSection(e, 'why')} className="hover:text-yellow-400 transition-colors cursor-pointer">Vì sao</button>
          <button onClick={(e) => scrollToSection(e, 'tours')} className="hover:text-yellow-400 transition-colors cursor-pointer">Tour nổi bật</button>
          <button onClick={(e) => scrollToSection(e, 'ai-planner')} className="hover:text-yellow-400 transition-colors cursor-pointer">AI Planner</button>
          <button onClick={(e) => scrollToSection(e, 'reviews')} className="hover:text-yellow-400 transition-colors cursor-pointer">Đánh giá</button>
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <a 
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} 
            className={`font-bold flex items-center transition-all px-5 py-2.5 rounded-full border-2 ${scrolled ? 'text-red-600 border-red-600 hover:bg-red-50' : 'text-white border-white/40 hover:bg-white/10 hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'}`}
          >
            <span className="mr-2 text-lg">📞</span>
            <span className="text-lg tracking-wider">{CONTACT_INFO.phone}</span>
          </a>
          <button 
            onClick={(e) => scrollToSection(e, 'lead')}
            className="bg-red-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg border border-red-500/50"
          >
            Nhận tư vấn
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            className={`text-2xl transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-6 space-y-4 shadow-xl">
          <button onClick={(e) => scrollToSection(e, 'why')} className="block w-full text-left text-slate-700 font-bold py-2">Vì sao chọn</button>
          <button onClick={(e) => scrollToSection(e, 'tours')} className="block w-full text-left text-slate-700 font-bold py-2">Tour nổi bật</button>
          <button onClick={(e) => scrollToSection(e, 'ai-planner')} className="block w-full text-left text-slate-700 font-bold py-2">AI Planner</button>
          <div className="py-4 border-t border-slate-100 space-y-4">
            <a 
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} 
              className="block w-full text-center text-white bg-red-600 py-4 rounded-xl font-bold shadow-lg"
            >
              Hotline: {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
