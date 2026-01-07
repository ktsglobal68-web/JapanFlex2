
import React from 'react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  const LogoSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="48" fill="#991b1b" stroke="white" strokeWidth="1" />
      <path d="M20 70 L50 25 L80 70 Z" fill="none" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="M42 37 L50 45 L58 37 L50 25 Z" fill="white" />
      <text x="50" y="62" fontFamily="serif" fontSize="32" fontWeight="900" fill="white" textAnchor="middle" style={{fontStyle: 'italic'}}>SFJ</text>
      <circle cx="75" cy="45" r="2" fill="white" opacity="0.8" />
      <circle cx="82" cy="55" r="1.5" fill="white" opacity="0.6" />
      <circle cx="70" cy="75" r="2.5" fill="white" opacity="0.7" />
    </svg>
  );

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                <LogoSVG />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter">SigFlex Japan</span>
                <span className="text-[7px] text-yellow-500 font-bold uppercase tracking-widest">Your Signature. Our Flexibility</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Nền tảng tiên phong kiến tạo hành trình Nhật Bản độc bản (Signature) với sự hỗ trợ của công nghệ AI và dịch vụ xe riêng linh hoạt (Flexibility).
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
            <ul className="space-y-4 text-slate-400">
              <li>Hotline: <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{CONTACT_INFO.phone}</a></li>
              <li>Email: <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a></li>
              <li>Địa chỉ: {CONTACT_INFO.address}</li>
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
