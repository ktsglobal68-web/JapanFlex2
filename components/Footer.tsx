
import React from 'react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  const LogoSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="48" fill="white" stroke="#991b1b" strokeWidth="2.5" />
      <g transform="translate(50, 20) scale(0.12)" fill="#991b1b">
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(0)" />
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(72)" />
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(144)" />
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(216)" />
        <path d="M0,-50 C10,-40 30,-30 30,-10 C30,10 10,20 0,10 C-10,20 -30,10 -30,-10 C-30,-30 -10,-40 0,-50 Z" transform="rotate(288)" />
        <circle cx="0" cy="0" r="8" fill="white" />
      </g>
      <path d="M22 62 L50 35 L78 62 L22 62" fill="#991b1b" />
      <path d="M42 42 L50 49 L58 42 L50 35 Z" fill="white" />
      <text x="50" y="82" fontFamily="'Playfair Display', serif" fontSize="24" fontWeight="900" fill="#991b1b" textAnchor="middle" letterSpacing="-1">SFJ</text>
      <line x1="25" y1="62" x2="75" y2="62" stroke="#991b1b" strokeWidth="1" />
    </svg>
  );

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                <LogoSVG />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter">SigFlex Japan</span>
                <span className="text-[7px] text-yellow-500 font-bold uppercase tracking-widest">Your Signature. Our Flexibility</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Nền tảng tiên phong kiến tạo hành trình Nhật Bản độc bản (Signature) với dịch vụ xe riêng linh hoạt (Flexibility) và tận tâm nhất.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all">FB</a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all">IG</a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-all">YT</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Dịch vụ</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Tư vấn Visa Nhật Bản</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Thiết kế lịch trình Signature</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Đặt vé JR Pass & Sim 4G</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tour Private theo yêu cầu</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-500">Liên hệ</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>
                <span className="block text-slate-500 uppercase text-[10px] font-black tracking-widest mb-1">Hotline tư vấn</span>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors font-bold text-lg">{CONTACT_INFO.phone}</a>
              </li>
              <li>
                <span className="block text-slate-500 uppercase text-[10px] font-black tracking-widest mb-1">Văn phòng Nhật Bản</span>
                <span className="text-slate-300">{CONTACT_INFO.addressJapan}</span>
              </li>
              <li>
                <span className="block text-slate-500 uppercase text-[10px] font-black tracking-widest mb-1">Văn phòng Việt Nam</span>
                <span className="text-slate-300">{CONTACT_INFO.addressVietnam}</span>
              </li>
              <li>
                <span className="block text-slate-500 uppercase text-[10px] font-black tracking-widest mb-1">Email</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 space-y-4 md:space-y-0">
          <p>© 2026 SigFlex Japan. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
