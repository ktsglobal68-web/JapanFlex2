
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
        setErrorMsg("Mô hình AI phản hồi không đúng định dạng. Bạn vui lòng thử lại hoặc nhắn tin Zalo để được nhân viên thiết kế tay nhé.");
      }
    } catch (err: any) {
      console.error("Lỗi gửi form Planner:", err);
      if (err.message === "API_KEY_MISSING") {
        setErrorMsg("Hệ thống chưa nhận được chìa khóa kết nối AI. Vui lòng kiểm tra lại cấu hình.");
      } else if (err.status === 429) {
        setErrorMsg("Hiện có quá nhiều người đang yêu cầu cùng lúc. Bạn vui lòng đợi 30 giây rồi thử lại nhé!");
      } else {
        setErrorMsg("Kết nối tới máy chủ AI bị gián đoạn. Bạn thử lại sau ít giây nhé.");
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
            Powered by Gemini 3 Pro
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-luxury italic">Trợ lý AI Lên Lịch Trình</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Sử dụng trí tuệ nhân tạo thế hệ mới nhất để phác thảo hành trình Nhật Bản độc bản chỉ trong vài giây.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-800/50 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-slate-700/50 shadow-2xl">
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
                    <option value="Signature (Tiết kiệm)">Signature (Tiết kiệm)</option>
                    <option value="Comfort (Tiêu chuẩn)">Comfort (Tiêu chuẩn)</option>
                    <option value="Luxury (Cao cấp)">Luxury (Cao cấp)</option>
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
                      onClick={() => setFormData({...formData, style: s.label})}
                      className={`py-4 rounded-2xl font-bold transition-all text-xs md:text-sm border-2 ${formData.style === s.label ? 'bg-red-600 border-red-600 text-white shadow-[0_10px_30px_-5px_rgba(220,38,38,0.5)]' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}
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
                  placeholder="Ví dụ: Ăn bò Kobe, ngắm núi Phú Sĩ, mua sắm đồ secondhand, đi xe riêng..."
                  value={formData.interests}
                  onChange={(e) => setFormData({...formData, interests: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black text-xl shadow-2xl transition-all relative overflow-hidden group ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-red-500/30 active:scale-[0.98]'}`}
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

          <div className="h-full flex flex-col min-h-[600px]">
            {!result && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-700/50 rounded-[3rem] bg-slate-800/20 opacity-60">
                <div className="text-7xl mb-6 filter grayscale grayscale">🗾</div>
                <p className="text-2xl font-luxury italic mb-2">Chờ đợi điều tuyệt vời</p>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">Kết quả lập trình của AI sẽ xuất hiện tại đây sau vài giây xử lý.</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-16 bg-slate-800/40 rounded-[3rem] border border-slate-700/50">
                <div className="relative">
                   <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">⚡</div>
                </div>
                <div className="w-full space-y-4 max-w-sm">
                  <div className="h-4 bg-slate-700 rounded-full w-3/4 mx-auto animate-pulse"></div>
                  <div className="h-3 bg-slate-700/50 rounded-full w-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="h-3 bg-slate-700/50 rounded-full w-5/6 mx-auto animate-pulse [animation-delay:0.4s]"></div>
                </div>
                <div className="text-center">
                   <p className="text-red-400 text-sm font-black uppercase tracking-widest mb-1">Đang phân tích dữ liệu</p>
                   <p className="text-slate-500 text-xs italic font-medium">Gemini 3 Pro đang kiến tạo hành trình của bạn...</p>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="bg-white text-slate-900 rounded-[3rem] p-8 md:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] h-full overflow-y-auto max-h-[800px] custom-scrollbar text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b border-slate-100 pb-6 gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-red-600 font-luxury italic leading-none mb-2">Signature Itinerary</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Cá nhân hóa cho riêng bạn</p>
                  </div>
                  <div className="md:text-right bg-slate-50 px-4 py-2 rounded-2xl">
                    <p className="text-[9px] uppercase text-slate-400 font-black tracking-widest mb-1">Dự tính chi phí</p>
                    <p className="text-xl font-black text-slate-900">{result.totalEstimatedCost}</p>
                  </div>
                </div>

                <div className="space-y-12">
                  {result.itinerary.map((day, idx) => (
                    <div key={idx} className="relative pl-12 border-l-2 border-slate-100 pb-4 last:pb-0">
                      <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-red-600 border-4 border-white shadow-md"></div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase">Ngày {day.day}</span>
                        <h4 className="font-bold text-xl text-slate-800">{day.title}</h4>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {day.activities.map((act, i) => (
                          <li key={i} className="text-slate-600 text-[15px] flex items-start">
                            <span className="text-red-500 mr-3 mt-1.5 shrink-0 text-[10px]">●</span> 
                            <span className="leading-relaxed font-medium">{act}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-slate-50 p-5 rounded-3xl text-sm italic text-slate-600 border-l-4 border-yellow-400 flex items-start space-x-4">
                        <span className="text-xl shrink-0">💡</span>
                        <p className="leading-relaxed">{day.tips}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h4 className="font-black text-[11px] text-slate-400 uppercase tracking-[0.3em] mb-6 text-center">Lời khuyên từ chuyên gia SigFlex</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="text-sm text-slate-700 font-bold flex items-center bg-red-50/30 p-4 rounded-2xl border border-red-100/30">
                        <span className="mr-4 text-red-600 text-lg">✨</span> {rec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 sticky bottom-0 pt-4 bg-white/90 backdrop-blur-sm">
                  <button 
                    onClick={scrollToLead}
                    className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg hover:bg-red-600 transition-all shadow-2xl active:scale-[0.97] flex items-center justify-center space-x-3"
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
