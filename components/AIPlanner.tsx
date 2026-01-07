
import React, { useState } from 'react';
import { generateCustomItinerary } from '../services/geminiService';
import { CustomItineraryResponse } from '../types';

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
        setErrorMsg("Kết nối AI đang quá tải hoặc bị gián đoạn. Vui lòng thử lại sau vài giây.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMsg("Đã xảy ra lỗi không xác định. Vui lòng kiểm tra kết nối mạng.");
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
    <section id="ai-planner" className="py-20 bg-slate-900 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">✨ Trợ lý AI Lên Lịch Trình Tức Thì</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Mô tả chuyến đi trong mơ của bạn, công nghệ Gemini 3 Flash của SigFlex Japan sẽ thiết kế một lịch trình riêng biệt chỉ trong vài giây.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Số ngày</label>
                <select 
                  className="w-full bg-slate-700 border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-red-500"
                  value={formData.days}
                  onChange={(e) => setFormData({...formData, days: parseInt(e.target.value)})}
                >
                  {[3,4,5,6,7,10,14].map(d => <option key={d} value={d}>{d} ngày</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Ngân sách</label>
                <select 
                  className="w-full bg-slate-700 border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-red-500"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                >
                  <option value="low">Tiết kiệm</option>
                  <option value="mid">Tiêu chuẩn</option>
                  <option value="high">Cao cấp</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-400 mb-2">Phong cách</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'family', label: 'Gia đình' },
                  { id: 'couple', label: 'Cặp đôi' },
                  { id: 'solo', label: 'Solo' }
                ].map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setFormData({...formData, style: s.id})}
                    className={`py-2 px-4 rounded-xl font-bold transition-all ${formData.style === s.id ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-400 mb-2">Sở thích & Yêu cầu riêng</label>
              <textarea 
                className="w-full bg-slate-700 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-red-500 min-h-[120px]"
                placeholder="Ví dụ: Thích ăn uống đường phố, muốn đi Kyoto ngắm lá đỏ, ưu tiên khách sạn gần ga..."
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all ${loading ? 'bg-slate-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-95'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Đang kết nối AI...
                </span>
              ) : '✨ Tạo lịch trình ngay'}
            </button>
            
            {errorMsg && (
              <div className="mt-4 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-red-100 text-sm flex items-center space-x-3 animate-pulse">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}
          </form>

          <div className="min-h-[500px]">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-700 rounded-3xl opacity-50 bg-slate-800/50">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-xl font-medium">Lịch trình của bạn sẽ xuất hiện tại đây</p>
                <p className="text-slate-500 mt-2">Dữ liệu được xử lý bởi Gemini 3 Flash</p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse p-12 bg-slate-800/30 rounded-3xl border border-slate-700">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full animate-ping"></div>
                </div>
                <div className="w-full space-y-3">
                  <div className="w-3/4 h-4 bg-slate-700 rounded mx-auto"></div>
                  <div className="w-full h-4 bg-slate-700 rounded mx-auto"></div>
                  <div className="w-5/6 h-4 bg-slate-700 rounded mx-auto"></div>
                </div>
                <p className="text-slate-500 text-sm font-medium italic text-center">AI đang kiến tạo hành trình riêng cho bạn. Vui lòng đợi trong giây lát...</p>
              </div>
            )}

            {result && !loading && (
              <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl h-full overflow-y-auto max-h-[600px] custom-scrollbar text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-start mb-6 border-b pb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-red-600">Hành trình Độc bản</h3>
                    <p className="text-slate-500 font-medium italic">Thiết kế bởi SigFlex Japan AI</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase text-slate-400 font-bold">Dự tính chi phí</p>
                    <p className="text-lg font-bold text-slate-800">{result.totalEstimatedCost}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {result.itinerary.map((day, idx) => (
                    <div key={idx} className="relative pl-8 border-l-2 border-slate-100 pb-2 last:pb-0">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-red-600 border-4 border-white"></div>
                      <h4 className="font-bold text-lg mb-2">Ngày {day.day}: {day.title}</h4>
                      <ul className="space-y-1 mb-3">
                        {day.activities.map((act, i) => (
                          <li key={i} className="text-slate-600 text-sm flex items-start">
                            <span className="text-red-500 mr-2 shrink-0">•</span> <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-slate-50 p-3 rounded-xl text-xs italic text-slate-500 border-l-2 border-red-200">
                        💡 Tip: {day.tips}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t text-left">
                  <h4 className="font-bold mb-3 text-slate-800">Gợi ý từ chuyên gia:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-center bg-slate-50 p-2 rounded-lg">
                        <span className="mr-2">✅</span> {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={scrollToLead}
                    className="block w-full text-center bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg active:scale-95"
                  >
                    Nhận tư vấn chi tiết cho chuyến đi này
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
