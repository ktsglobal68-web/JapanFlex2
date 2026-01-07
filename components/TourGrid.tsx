
import React from 'react';
import { TOURS, CONTACT_INFO } from '../constants';

const TourGrid: React.FC = () => {
  const scrollToLead = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('lead');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to get specialized icons for each tour type
  const getTourIcons = (id: string) => {
    switch(id) {
      case 'gold-route':
        return [
          { label: 'Xe riêng 24/7', icon: '🚗', color: 'bg-red-50 text-red-600' },
          { label: 'Cố đô Kyoto', icon: '⛩️', color: 'bg-red-50 text-red-600' },
          { label: 'Onsen Núi Phú Sĩ', icon: '♨️', color: 'bg-red-50 text-red-600' }
        ];
      case 'golf-luxury':
        return [
          { label: 'Sân Golf Top 1', icon: '⛳', color: 'bg-red-50 text-red-600' },
          { label: 'Tiệc Kaiseki', icon: '🍱', color: 'bg-red-50 text-red-600' },
          { label: 'Resort 5 Sao', icon: '🏨', color: 'bg-red-50 text-red-600' }
        ];
      case 'gourmet-kobe':
        return [
          { label: 'Bò Kobe A5', icon: '🥩', color: 'bg-red-50 text-red-600' },
          { label: 'Michelin Star', icon: '⭐', color: 'bg-red-50 text-red-600' },
          { label: 'Hầm rượu Sake', icon: '🍶', color: 'bg-red-50 text-red-600' }
        ];
      case 'health-checkup':
        return [
          { label: 'Ningen Dock', icon: '🏥', color: 'bg-red-50 text-red-600' },
          { label: 'Medical Pro', icon: '🩺', color: 'bg-red-50 text-red-600' },
          { label: 'Hồi phục Xanh', icon: '🌳', color: 'bg-red-50 text-red-600' }
        ];
      default:
        return [];
    }
  };

  return (
    <section id="tours" className="py-24 bg-white scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
          <div className="max-w-3xl">
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Tailor-made Journeys</span>
            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 font-luxury leading-tight">
              Các Loại Hình <br/>
              <span className="text-red-600">Tour Cao Cấp</span>
            </h2>
            <p className="text-slate-500 text-xl leading-relaxed font-light">
              Chúng tôi không chỉ bán tour, chúng tôi thiết kế những trải nghiệm độc bản, 
              đậm chất cá nhân hóa cho từng nhóm khách hàng thượng lưu.
            </p>
          </div>
        </div>

        {/* Alternating Tours List */}
        <div className="space-y-32 md:space-y-48">
          {TOURS.map((tour, index) => {
            const isEven = index % 2 === 0;
            const tourIcons = getTourIcons(tour.id);
            
            return (
              <article key={tour.id} className={`flex flex-col lg:items-center gap-12 lg:gap-20 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Image Side */}
                <div className="lg:w-1/2 relative group">
                  {/* Decorative big number background */}
                  <div className={`absolute -top-16 ${isEven ? '-left-8' : '-right-8'} text-[12rem] font-black text-slate-100/50 select-none z-0 font-luxury italic`}>
                    0{index + 1}
                  </div>
                  
                  <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] aspect-[4/5] border-[12px] border-slate-50">
                    <img 
                      src={tour.image} 
                      alt={tour.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    />
                    <div className="absolute top-8 left-8 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-black tracking-widest uppercase shadow-xl">
                      {tour.days} Ngày {tour.days-1} Đêm
                    </div>
                  </div>
                  
                  {/* Floating Rating Badge */}
                  <div className={`absolute -bottom-8 ${isEven ? '-right-8' : '-left-8'} bg-white p-6 rounded-3xl shadow-2xl z-20 border border-slate-100 flex items-center space-x-3`}>
                    <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">⭐</div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 leading-none">{tour.rating}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Hài lòng tuyệt đối</div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 flex flex-col items-start space-y-8 relative">
                  <div className="space-y-4">
                    <span className="inline-flex items-center space-x-2 text-red-600 font-black text-xs tracking-[0.3em] uppercase">
                      <span className="w-8 h-[2px] bg-red-600"></span>
                      <span>Boutique Experience</span>
                    </span>
                    <h3 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.15] font-luxury">
                      {tour.title}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-light italic border-l-4 border-slate-100 pl-6">
                    {tour.description}
                  </p>

                  {/* High-impact Creative Icons Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    {tourIcons.map((icon, i) => (
                      <div key={i} className={`p-5 rounded-3xl bg-red-50 text-red-600 flex flex-col items-center justify-center text-center space-y-2 group/icon hover:scale-105 transition-transform shadow-sm border border-red-100/50`}>
                        <span className="text-3xl filter drop-shadow-md">{icon.icon}</span>
                        <span className="text-[11px] font-black uppercase tracking-wider">{icon.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlight List */}
                  <div className="space-y-4 w-full">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Giá trị cốt lõi</div>
                    <div className="grid grid-cols-1 gap-4">
                      {tour.highlights.map((point, i) => (
                        <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group/item hover:bg-white hover:shadow-md transition-all">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 shadow-sm border border-red-100 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                          <span className="text-slate-700 font-bold text-sm tracking-tight">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Action Button */}
                  <button 
                    onClick={scrollToLead}
                    className="w-full sm:w-auto bg-red-600 text-white px-12 py-6 rounded-[2rem] font-black text-lg hover:bg-red-700 transition-all duration-500 shadow-2xl hover:shadow-red-500/30 group flex items-center justify-center space-x-4 mt-4"
                  >
                    <span className="whitespace-nowrap">Nhận báo giá độc bản</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Special Inquiry Card */}
        <div className="mt-40 p-12 md:p-20 bg-kimono-red rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(153,27,27,0.4)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 text-center lg:text-left max-w-xl">
            <h4 className="text-4xl md:text-5xl font-bold mb-6 font-luxury italic leading-tight">Yêu cầu lịch trình <br/><span className="text-yellow-400">độc bản khác?</span></h4>
            <p className="text-red-100 text-xl font-light leading-relaxed">Đội ngũ chuyên gia của chúng tôi sẵn sàng kiến tạo hành trình 100% theo phong cách riêng của bạn.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 relative z-10 w-full lg:w-auto">
            <a 
              href={CONTACT_INFO.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0068FF] text-white px-10 py-6 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-2xl text-center flex items-center justify-center text-lg space-x-3"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
                alt="Zalo" 
                className="w-7 h-7 bg-white rounded-full p-0.5 shrink-0" 
              />
              <span className="whitespace-nowrap">Tư vấn Zalo ngay</span>
            </a>
            <button 
              onClick={scrollToLead}
              className="bg-white text-red-600 px-10 py-6 rounded-2xl font-black hover:bg-red-50 transition-all shadow-2xl text-lg border-2 border-transparent hover:border-white whitespace-nowrap"
            >
              Gửi yêu cầu thiết kế
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourGrid;
