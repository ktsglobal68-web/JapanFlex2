
import React, { useState } from 'react';

const LeadForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    note: ''
  });

  /**
   * ĐÃ KẾT NỐI FORMSPREE:
   * Dữ liệu sẽ được gửi về email đăng ký với ID: mrebnbag
   */
  const FORM_ENDPOINT = "https://formspree.io/f/mrebnbag"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Nếu chưa dán link, thông báo cho người dùng (chỉ dùng trong lúc phát triển)
    if (!FORM_ENDPOINT) {
      console.log("Dữ liệu khách hàng (Giả lập):", formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({
          ...formData,
          _subject: `[JapanFlex] Khách hàng mới: ${formData.fullName}`,
          _template: "table", // Formspree sẽ gửi email dạng bảng đẹp mắt
          timestamp: new Date().toLocaleString('vi-VN')
        })
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.error || "Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Không thể kết nối máy chủ. Vui lòng kiểm tra lại kết nối mạng.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="lead" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-red-600 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-red-500/20">
          {/* Cột thông tin bên trái */}
          <div className="p-12 lg:w-1/2 text-white flex flex-col justify-center bg-gradient-to-br from-red-600 to-red-700">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Nhận Lịch Trình & Báo Giá Riêng Trong 24h</h2>
            <p className="text-red-100 text-lg mb-8 leading-relaxed opacity-90">
              Hãy để lại thông tin, JapanFlex sẽ thiết kế bản kế hoạch sơ bộ kèm dự toán chi phí chi tiết nhất gửi đến bạn.
            </p>
            <div className="space-y-5">
              {[
                "Tư vấn 1:1 hoàn toàn miễn phí",
                "Checklist hồ sơ Visa chính xác 99%",
                "Hỗ trợ qua Zalo 24/7 suốt chuyến đi"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cột Form bên phải */}
          <div className="p-12 lg:w-1/2 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">Gửi thành công!</h3>
                <p className="text-slate-500 text-lg">
                  Chào <strong>{formData.fullName}</strong>, chuyên viên của JapanFlex sẽ liên hệ với bạn qua số <strong>{formData.phone}</strong> sớm nhất có thể.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="mt-8 text-red-600 font-bold hover:text-red-700 transition-colors flex items-center group"
                >
                  <span className="border-b-2 border-red-600">Gửi thêm yêu cầu khác</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Họ và tên *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required 
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Số điện thoại *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                      placeholder="09xx xxx xxx"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email nhận lịch trình *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="email@cua-ban.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Mong muốn cụ thể (Số người, ngày đi...)</label>
                  <textarea 
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none resize-none" 
                    placeholder="Ví dụ: Gia đình 4 người, đi tháng 11, thích Kyoto và muốn ăn bò Kobe..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full text-white py-5 rounded-2xl font-bold text-xl shadow-xl transition-all relative overflow-hidden group ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-red-500/30'}`}
                >
                  <span className={`flex items-center justify-center transition-all ${loading ? 'opacity-0' : 'opacity-100'}`}>
                    Gửi yêu cầu & Nhận báo giá
                  </span>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-7 w-7 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </div>
                  )}
                </button>
                
                <div className="flex items-center justify-center space-x-3 text-xs text-slate-400 pt-2 font-medium">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-slate-200 border border-white"></div>
                    <div className="w-5 h-5 rounded-full bg-slate-300 border border-white"></div>
                    <div className="w-5 h-5 rounded-full bg-slate-400 border border-white"></div>
                  </div>
                  <span>15 khách hàng vừa gửi yêu cầu trong hôm nay</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
