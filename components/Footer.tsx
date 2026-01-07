
import React from 'react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold text-white">JP</div>
              <span className="text-xl font-bold">JapanFlex</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Nền tảng tiên phong trong việc cung cấp các tour Nhật Bản tự túc thông minh, kết hợp giữa công nghệ AI và kinh nghiệm thực tế của các chuyên gia bản địa.
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
              <li><a href="#" className="hover:text-white transition-colors">Thiết kế lịch trình riêng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Đặt vé JR Pass & Sim 4G</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tour theo yêu cầu</a></li>
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
          <p>© 2026 JapanFlex. All rights reserved.</p>
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
