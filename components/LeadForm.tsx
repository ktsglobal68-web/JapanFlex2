
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
    _gotcha: '' 
  });

  // URL Formspree của bạn
  const FORMSPREE_URL = "https://formspree.io/f/mrebnbag";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._gotcha) return; // Chặn bot spam

    setLoading(true);

    // Chuyển đổi dữ liệu sang tiếng Việt để email gửi về Gmail dễ đọc hơn
    const dataToSend = {
      "Họ tên khách hàng": formData.fullName,
      "Số điện thoại": formData.phone,
      "Địa chỉ Email": formData.email,
      "Dịch vụ quan tâm": formData.service,
      "Nội dung yêu cầu chi tiết": formData.note,
      "_subject": `[SigFlex Website] Yêu cầu từ: ${formData.fullName} - ${formData.service}`,
      "Nguồn": "Form Liên hệ chính (LeadForm)"
    };

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });
      
      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          service: 'Tour Private',
          note: '',
          _gotcha: ''
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Lỗi gửi form");
      }
    } catch (error: any) {
      console.error("Formspree Error:", error);
      alert("⚠️ Không thể gửi yêu cầu lúc này. Quý khách vui lòng liên hệ Hotline/Zalo: 0967.652.331 để được hỗ trợ ngay lập tức!");
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
          <div className="p-12 lg:p-16 lg:w-5/12 text-white flex flex-col justify-center bg-kimono-red relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <span className="inline-block bg-yellow-400 text-red-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-6 shadow-sm">Liên hệ chuyên gia</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-luxury italic">
                Kiến tạo hành trình <br/><span className="text-yellow-400">Độc bản & Đẳng cấp</span>
              </h2>
              <p className="text-red-50 text-lg mb-12 leading-relaxed opacity-90 font-light">
                Hãy chia sẻ mong muốn của bạn. Đội ngũ chuyên gia SigFlex Japan sẽ liên hệ tư vấn và gửi báo giá chi tiết trong vòng 24h.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Tư vấn cá nhân hóa", desc: "Thiết kế hành trình riêng theo sở thích và ngân sách" },
                  { title: "Hỗ trợ Visa tận tâm", desc: "Tỷ lệ đậu 99% kể cả các trường hợp hồ sơ khó" },
                  { title: "Dịch vụ Xe riêng", desc: "Sự riêng tư và thoải mái tuyệt đối trên mọi nẻo đường Nhật" }
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

          <div className="p-12 lg:p-16 lg:w-7/12 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[2rem] flex items-center justify-center text-5xl mb-8 shadow-sm border border-green-100">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-4xl font-bold text-slate-900 mb-4 font-luxury">Gửi yêu cầu thành công!</h3>
                <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed mb-10">
                  Cảm ơn Quý khách đã tin tưởng. Chuyên viên của SigFlex Japan đã nhận được thông tin và sẽ sớm phản hồi qua số điện thoại/email của bạn.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - Không hiển thị cho người dùng */}
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
                      placeholder="Nguyễn Văn A"
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
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Địa chỉ Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder="khachhang@email.com"
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
                      <option value="Tour Golf Luxury">Nghỉ dưỡng & Đánh Golf</option>
                      <option value="Tầm soát sức khỏe">Tour Tầm soát sức khỏe</option>
                      <option value="Yêu cầu đặc biệt">Yêu cầu thiết kế riêng khác...</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Ghi chú hoặc mong muốn cụ thể</label>
                  <textarea 
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows={4} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:ring-4 focus:ring-red-500/5 focus:border-red-500 transition-all outline-none resize-none font-medium" 
                    placeholder="Ví dụ: Gia đình 4 người, muốn đi hái trái cây và ở Ryokan truyền thống tại Kyoto..."
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
                
                <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] pt-2">
                  🔒 Thông tin của bạn được bảo mật tuyệt đối bởi SigFlex Japan
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
