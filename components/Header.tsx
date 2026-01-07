
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform shadow-lg border border-white/20">JP</div>
          <span className={`text-2xl font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            JapanFlex
          </span>
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
