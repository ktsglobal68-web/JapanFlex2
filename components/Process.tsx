
import React from 'react';

const steps = [
  {
    no: '01',
    title: 'Gửi yêu cầu',
    desc: 'Bạn chia sẻ mong muốn, số lượng người và thời điểm dự kiến. Chúng tôi lắng nghe 24/7.',
    icon: '📩'
  },
  {
    no: '02',
    title: 'Thiết kế độc bản',
    desc: 'Chuyên gia và AI cùng kiến tạo lịch trình riêng biệt, tối ưu chi phí và trải nghiệm cho bạn.',
    icon: '🎨'
  },
  {
    no: '03',
    title: 'Thủ tục Visa',
    desc: 'JapanFlex xử lý hồ sơ Visa trọn gói với tỷ lệ đậu 99%. Bạn chỉ việc chuẩn bị hành lý.',
    icon: '🛂'
  },
  {
    no: '04',
    title: 'Khởi hành',
    desc: 'Xe riêng và HDV đón bạn tại sân bay. Bắt đầu hành trình Nhật Bản linh hoạt 100%.',
    icon: '✈️'
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-red-600 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Hành trình đơn giản</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-luxury italic">Sẵn sàng sau 4 bước</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Quy trình làm việc chuyên nghiệp, minh bạch giúp bạn hoàn toàn an tâm tận hưởng chuyến đi.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-[2px] bg-slate-100 z-0"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:border-red-600 group-hover:bg-red-50 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
                {step.icon}
              </div>
              <div className="absolute top-16 right-1/2 translate-x-12 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg">
                {step.no}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
