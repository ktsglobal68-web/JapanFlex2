
import React from 'react';
import { CONTACT_INFO } from '../constants';

const FloatingContact: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col space-y-4 pointer-events-none">
      {/* Nút Hotline */}
      <a 
        href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
        className="pointer-events-auto w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all pulse-btn relative group"
        title="Gọi điện tư vấn"
      >
        <span className="text-2xl">📞</span>
        <span className="absolute right-16 bg-white text-red-600 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-red-100">
          Hotline: {CONTACT_INFO.phone}
        </span>
      </a>

      {/* Nút Zalo */}
      <a 
        href={CONTACT_INFO.zalo}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-14 h-14 bg-[#0068FF] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all relative group"
        title="Chat Zalo"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
          alt="Zalo" 
          className="w-10 h-10 bg-white rounded-full p-1" 
        />
        <span className="absolute right-16 bg-white text-[#0068FF] px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-blue-100">
          Chat Zalo ngay
        </span>
      </a>
    </div>
  );
};

export default FloatingContact;
