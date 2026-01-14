
import React, { useState } from 'react';
import { generateCustomItinerary } from '../services/geminiService';
import { CustomItineraryResponse } from '../types';
import { CONTACT_INFO } from '../constants';

const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CustomItineraryResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    days: 5,
    budget: 'mid',
    style: 'couple',
    interests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setErrorMsg(null);
    setLoading(true);
    
    try {
      const itinerary = await generateCustomItinerary(formData);
      if (itinerary) {
        setResult(itinerary);
      } else {
        setErrorMsg("API đang gặp quá tải hoặc giới hạn vùng địa lý. Vui lòng thử lại sau 30 giây hoặc chat Zalo để chuyên gia tư vấn trực tiếp.");
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      if (err.message === "API_KEY_MISSING") {
        setErrorMsg("Hệ thống chưa được cấu hình API Key. Vui lòng liên hệ quản trị viên.");
      } else {
        setErrorMsg("Kết nối bị gián đoạn. Vui lòng kiểm tra lại mạng.");
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollToLead = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('lead');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ai-planner" className="py-24 bg-slate-900 text-white scroll-mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-red-600/20 text-red-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 border border-red-600/30">
            Powered by Gemini 3 Flash
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-luxury italic">Trợ lý AI Lên Lịch Trình</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Kết hợp trí tuệ nhân tạo thế hệ mới và kiến thức bản địa để tạo nên hành trình độc bản dành riêng cho bạn.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-800/50 backdrop-blur-xl p-10 rounded-[3rem] border border-slate-700/50 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Thời gian chuyến đi</label>
                  <select 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-white focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all outline-none font-bold appearance-none cursor-pointer"
                    value={formData.days}
                    onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                  >
                    {[3,4,5,6,7,10,14].map(d => <option key={d} value={d}>{d} ngày</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Mức ngân sách</label>
                  <select 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-4 text-white focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all outline-none font-bold appearance-none cursor-pointer"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  >
                    <option value="low">Tiết kiệm (Signature)</option>
                    <option value="mid">Tiêu chuẩn (Comfort)</option>
                    <option value="high">Cao cấp (Luxury)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Phong cách du lịch</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'family', label: '👨‍👩‍👧‍👦 Gia đình' },
                    { id: 'couple', label: '💍 Cặp đôi' },
                    { id: 'solo', label: '🎒 Solo' }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setFormData({...formData, style: s.id})}
                      className={`py-4 rounded-2xl font-bold transition-all text-sm border-2 ${formData.style === s.id ? 'bg-red-600 border-red-600 text-white shadow-[0_10px_30px_-5px_rgba(220,38,38,0.5)]' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Sở thích cá nhân</label>
                <textarea 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-5 text-white focus:ring-4 focus:ring-red-600/20 focus:border-red-600 transition-all outline-none min-h-[140px] resize-none font-medium leading-relaxed"
                  placeholder="Ví dụ: Thích ngắm hoa anh đào, thưởng thức bò Kobe, mua sắm đồ secondhand cao cấp, ưu tiên các điểm tâm linh tại Kyoto..."
                  value={formData.interests}
                  onChange={(e) => setFormData({...formData, interests: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black text-xl shadow-2xl transition-all relative overflow-hidden group ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-red-500/30'}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    AI Đang Thiết Kế...
                  </span>
                ) : '✨ Khởi Tạo Lịch Trình Tức Thì'}
              </button>
              
              {errorMsg && (
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-2xl text-red-200 text-sm flex items-center space-x-3 animate-pulse">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{errorMsg}</span>
                </div>
              )}
            </form>
          </div>

          <div className="h-full flex flex-col">
            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-700/50 rounded-[3rem] bg-slate-800/20 opacity-60">
                <div className="text-7xl mb-6 filter grayscale">🗾</div>
                <p className="text-2xl font-luxury italic mb-2">Hành trình đang đợi bạn</p>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">Điền thông tin bên trái để AI của chúng tôi bắt đầu kiến tạo lịch trình độc bản cho bạn.</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-16 bg-slate-800/40 rounded-[3rem] border border-slate-700/50 animate-pulse">
                <div className="relative">
                   <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-10 h-10 bg-red-600 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">⚡</div>
                </div>
                <div className="w-full space-y-4">
                  <div className="w-3/4 h-5 bg-slate-700 rounded-full mx-auto"></div>
                  <div className="w-full h-4 bg-slate-700/50 rounded-full mx-auto"></div>
                  <div className="w-5/6 h-4 bg-slate-700/50 rounded-full mx-auto"></div>
                </div>
                <div className="space-y-2 text-center">
                   <p className="text-red-400 text-sm font-black uppercase tracking-widest">Đang kết nối Gemini AI</p>
                   <p className="text-slate-500 text-xs font-medium italic">Quá trình này mất khoảng 5-10 giây...</p>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="bg-white text-slate-900 rounded-[3rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] h-full overflow-y-auto max-h-[720px] custom-scrollbar text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-red-600 font-luxury italic leading-none mb-2">Signature Itinerary</h3>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Thiết kế dành riêng cho bạn</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest mb-1">Dự tính chi phí</p>
                    <p className="text-xl font-black text-slate-900">{result.totalEstimatedCost}</p>
                  </div>
                </div>

                <div className="space-y-10">
                  {result.itinerary.map((day, idx) => (
                    <div key={idx} className="relative pl-10 border-l-2 border-slate-100 pb-4 last:pb-0">
                      <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-red-600 border-4 border-white shadow-md"></div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Ngày {day.day}</span>
                        <h4 className="font-bold text-xl text-slate-800">{day.title}</h4>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {day.activities.map((act, i) => (
                          <li key={i} className="text-slate-600 text-[15px] flex items-start">
                            <span className="text-red-500 mr-3 mt-1 shrink-0">✦</span> 
                            <span className="leading-relaxed">{act}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-slate-50 p-4 rounded-2xl text-sm italic text-slate-500 border-l-4 border-yellow-400 flex items-start space-x-3">
                        <span className="text-lg shrink-0">💡</span>
                        <p>{day.tips}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h4 className="font-black text-xs text-slate-400 uppercase tracking-[0.2em] mb-4">Gợi ý từ chuyên gia SigFlex</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="text-sm text-slate-700 font-medium flex items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="mr-3 text-red-500">✅</span> {rec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 sticky bottom-0 pt-4 bg-white/90 backdrop-blur-sm">
                  <button 
                    onClick={scrollToLead}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-600 transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3"
                  >
                    <span>🎯 Hiện thực hóa lịch trình này</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlanner;
