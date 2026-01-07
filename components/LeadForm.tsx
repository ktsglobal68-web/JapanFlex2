
import React, { useState } from 'react';

const LeadForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'Tour Private',
    note: '',
    _gotcha: '' // Field để chặn spam bot
  });

  // URL Web App Google Apps Script của bạn
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxgYeEsipvQzyba6-RqaZF_4lJ8XtSbRpVl9nWQ7ZdY-HRbEWf5c3kA6PIrhFSagL0a/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._gotcha) return;

    setLoading(true);

    // Chuẩn bị dữ liệu theo đúng cấu trúc đoạn mã bạn cung cấp
    const payload = {
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      note: formData.note,
      page: window.location.href
    };

    try {
      // Gửi dữ liệu tới Google Sheets
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      if (result.ok) {
        setSubmitted(true);
      } else {
        alert("❌ Lỗi từ máy chủ: " + (result.error || "Không xác định"));
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      alert("❌ Không gửi được yêu cầu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="lead" className="py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row border border-slate-100">
          {/* Cột thông tin bên trái */}
          <div className="p-12 lg:p-16 lg:w-5/12 text-white flex flex-col justify-center bg-kimono-red relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <span className="inline-block bg-yellow-400 text-red-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6">Liên hệ ngay</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-luxury italic">Khởi đầu hành trình <br/>độc bản của bạn</h2>
              <p className="text-red-50 text-lg mb-12 leading-relaxed opacity-90 font-light">
                Chỉ mất 30 giây để gửi yêu cầu. Chuyên viên của JapanFlex sẽ phản hồi kèm bản thiết kế sơ bộ trong vòng 24h làm việc qua Google Sheet.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Tư vấn 1:1", desc: "Hoàn toàn miễn phí & tận tâm" },
                  { title: "Báo giá minh bạch", desc: "Không phát sinh phụ phí ẩn" },
                  { title: "Hỗ trợ 24/7", desc: "Đồng hành qua Zalo suốt chuyến đi" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-red-100/70 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cột Form bên phải */}
          <div className="p-12 lg:p-16 lg:w-7/12 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[2rem] flex items-center justify-center text-5xl mb-8 shadow-sm border border-green-100 animate-bounce">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-4 font-luxury">Gửi thành công!</h3>
                <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
                  Cảm ơn <strong>{formData.fullName}</strong>. Thông tin của bạn đã được ghi nhận vào hệ thống. Chúng tôi sẽ liên hệ lại qua số <strong>{formData.phone}</strong> sớm nhất.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({...formData, fullName: '', phone: '', email: '', note: ''}); }} 
                  className="mt-10 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-lg"
                >
                  <span>Gửi thêm yêu cầu khác</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="_gotcha" style={{display:'none'}} onChange={handleChange} />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required 
                      placeholder="Ví dụ: Nguyễn Minh Hoàng"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                      placeholder="09xx xxx xxx"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-medium" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email nhận lịch trình *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder="email@cua-ban.com"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-medium" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Dịch vụ quan tâm</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none font-bold text-slate-700 appearance-none cursor-pointer"
                    >
                      <option value="Tour Private">Tour Private (Xe riêng)</option>
                      <option value="Visa Nhật Bản">Tư vấn Visa Nhật Bản</option>
                      <option value="Tour Golf">Nghỉ dưỡng & Đánh Golf</option>
                      <option value="Tầm soát sức khỏe">Du lịch & Tầm soát sức khỏe</option>
                      <option value="Dịch vụ khác">Yêu cầu khác...</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mong muốn cụ thể</label>
                  <textarea 
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none resize-none font-medium" 
                    placeholder="Ví dụ: Gia đình 4 người lớn, dự kiến đi tháng 12 ngắm tuyết, muốn ở khách sạn gần trung tâm..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all relative overflow-hidden group ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-red-500/40 hover:-translate-y-1'}`}
                >
                  <span className={`flex items-center justify-center transition-all ${loading ? 'opacity-0' : 'opacity-100'}`}>
                    🚀 Gửi yêu cầu ngay
                  </span>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-7 w-7 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </div>
                  )}
                </button>
                
                <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest pt-2">
                  🔒 Thông tin của bạn được bảo mật tuyệt đối và lưu trữ an toàn
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
