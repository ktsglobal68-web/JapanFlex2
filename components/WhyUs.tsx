
import React from 'react';
import { CONTACT_INFO } from '../constants';

const WhyUs: React.FC = () => {
  const scrollToLead = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('lead');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    { 
      title: 'Tùy chỉnh linh hoạt', 
      desc: 'Phá bỏ rào cản tour đoàn truyền thống. Bạn là kiến trúc sư cho hành trình riêng mình, tự do khám phá theo nhịp sống cá nhân.', 
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 12h9" />
        </svg>
      )
    },
    { 
      title: 'Visa chuyên gia', 
      desc: 'Quy trình xử lý hồ sơ tinh gọn, minh bạch với tỷ lệ đậu tuyệt đối. Chúng tôi biến thủ tục phức tạp thành sự an tâm trọn vẹn.', 
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .415.139.797.373 1.103a3.007 3.007 0 0 0 4.028 0c.234-.306.373-.688.373-1.103 0-.231-.035-.454-.1-.664m-5.801 0a48.285 48.285 0 0 1 1.123-.08m5.801 0c.065.21.1.433.1.664m-5.801 0c-.065.21-.1.433-.1.664m5.801 0c.065.21.1.433.1.664" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-3-3 3 3 3-3" />
        </svg>
      )
    },
    { 
      title: 'Tối ưu ngân sách', 
      desc: 'Tiết kiệm đến 30% chi phí thông qua mạng lưới đối tác bản địa và các bí quyết di chuyển thông minh chỉ người trong nghề mới biết.', 
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15m15-10.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15M3.75 18h16.5M4.5 19.5h15" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v.75m0 1.5v.75m0 1.5v.75m0 1.5V15" />
        </svg>
      )
    },
    { 
      title: 'Đồng hành 24/7', 
      desc: 'Luôn bên cạnh bạn như một người bạn bản địa tận tâm. Mọi khó khăn phát sinh đều được giải quyết ngay lập tức qua Zalo.', 
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      )
    },
  ];

  return (
    <section id="why" className="py-24 bg-white scroll-mt-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-red-600 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Difference in Detail</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-luxury italic">Tại sao khách hàng chọn JapanFlex?</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Chúng tôi định nghĩa lại trải nghiệm du lịch bằng sự tỉ mỉ trong phục vụ và sự thấu hiểu sâu sắc văn hóa Phù Tang.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((f, i) => (
            <div key={i} className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col items-center text-center hover:-translate-y-2">
              {/* Icon Container: Nền đỏ nhạt (red-600 với độ mờ), Icon trắng và thông minh hơn */}
              <div className="w-28 h-28 bg-red-600/10 text-red-600 rounded-[2.5rem] flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-red-500/30 group-hover:scale-110">
                {f.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors uppercase tracking-wide">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-[1.7] font-medium group-hover:text-slate-700 transition-colors px-2">
                {f.desc}
              </p>
              
              {/* Bottom decorative line */}
              <div className="mt-8 w-0 group-hover:w-16 h-1 bg-red-600 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          <button 
            onClick={scrollToLead}
            className="group relative inline-flex items-center space-x-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-2xl overflow-hidden whitespace-nowrap"
          >
            <span className="relative z-10">Thiết kế hành trình riêng</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <div className="absolute inset-0 bg-red-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <a 
            href={CONTACT_INFO.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-[#0068FF] text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl whitespace-nowrap"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
              alt="Zalo" 
              className="w-6 h-6 bg-white rounded-full p-0.5 shrink-0" 
            />
            <span>Liên hệ Zalo tư vấn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
