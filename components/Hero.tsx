
import React from 'react';
import { CONTACT_INFO } from '../constants';

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-36 pb-20 relative overflow-hidden bg-kimono-red">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-red-950/50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-10 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="flex items-center space-x-2 mb-6 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <div className="flex -space-x-1">
              {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-slate-300 border border-red-900"></div>)}
            </div>
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">5,000+ Khách hàng hài lòng</span>
          </div>
          
          <h1 className="text-4xl md:text-[5.4rem] font-bold text-white leading-[1.1] mb-8 font-luxury tracking-tight">
            <span className="inline-block">Khám phá <span className="text-yellow-400 whitespace-nowrap">Nhật Bản</span></span>
            <span className="block text-3xl md:text-[3.8rem] mt-2 opacity-95 font-medium">theo cách của bạn</span>
          </h1>
          
          <p className="text-base md:text-lg text-red-50/80 mb-10 leading-relaxed max-w-lg font-light">
            Trải nghiệm hành trình di sản được may đo riêng biệt. JapanFlex kiến tạo kỷ niệm vô giá qua dịch vụ xe riêng đẳng cấp và lịch trình linh hoạt 100%.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
            <button 
              onClick={(e) => scrollToSection(e, 'lead')}
              className="w-full sm:w-auto bg-white text-red-900 px-8 py-4 rounded-2xl font-bold hover:bg-yellow-400 transition-all text-center shadow-xl cursor-pointer flex items-center justify-center space-x-2 text-base pulse-btn"
            >
              <span>📩 Nhận báo giá ngay</span>
            </button>
            <a 
              href={CONTACT_INFO.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#0068FF] text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all text-center shadow-xl flex items-center justify-center space-x-3 text-base"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="w-6 h-6 bg-white rounded-full p-0.5" />
              <span>Tư vấn qua Zalo</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-red-100/70 text-xs font-bold tracking-widest uppercase">
             <div className="flex items-center space-x-2">
                <span className="text-yellow-500 text-base">✦</span> <span>Xe riêng (Private)</span>
             </div>
             <div className="flex items-center space-x-2">
                <span className="text-yellow-500 text-base">✦</span> <span>Visa đậu 99%</span>
             </div>
             <div className="flex items-center space-x-2">
                <span className="text-yellow-500 text-base">✦</span> <span>Support 24/7</span>
             </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
          <div className="absolute inset-0 bg-yellow-500/10 rounded-[4rem] blur-[60px] opacity-40"></div>
          
          <div className="rounded-[3rem] overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border-[8px] border-white/5 relative z-10 group aspect-[4/5]">
            <img 
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=95&w=1000" 
              alt="Hành trình Nhật Bản" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          
          <div className="absolute -bottom-6 -right-8 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl max-w-[240px] z-20 border-l-[4px] border-l-yellow-500 border border-white/20">
            <div className="flex items-center space-x-0.5 text-yellow-500 mb-2">
              {[1,2,3,4,5].map(i => <span key={i} className="text-[10px]">★</span>)}
            </div>
            <p className="text-slate-800 font-bold text-xs leading-relaxed italic">
              "Xe riêng của JapanFlex thực sự chuyên nghiệp, gia đình mình rất hài lòng."
            </p>
            <p className="text-slate-400 text-[9px] mt-2 uppercase tracking-widest font-extrabold">— Mr. David</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
