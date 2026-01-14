
import React, { useState, useEffect, useRef } from 'react';
import { createConsultantChat } from '../services/geminiService';
import { CONTACT_INFO } from '../constants';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý AI của SigFlex Japan. Tôi có thể giúp gì cho hành trình du lịch Nhật Bản của bạn?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Sử dụng ref để giữ phiên chat qua các lần render
  const chatInstance = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Khởi tạo chat nếu chưa có hoặc bị lỗi trước đó
      if (!chatInstance.current) {
        chatInstance.current = createConsultantChat();
      }

      const stream = await chatInstance.current.sendMessageStream({ message: userMsg });
      
      // Thêm một tin nhắn rỗng từ model để chuẩn bị nhận stream
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      let accumulatedText = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        accumulatedText += chunkText;
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsgIndex = newMessages.length - 1;
          if (newMessages[lastMsgIndex].role === 'model') {
            newMessages[lastMsgIndex] = { ...newMessages[lastMsgIndex], text: accumulatedText };
          }
          return newMessages;
        });
      }
    } catch (err: any) {
      console.error("Lỗi Chatbot:", err);
      // Nếu lỗi do phiên chat cũ, xóa ref để lần sau khởi tạo lại
      chatInstance.current = null;
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Thành thật xin lỗi, kết nối của tôi đang bận xử lý. Bạn có thể đặt câu hỏi lại hoặc nhắn tin qua Zalo 0967.652.331 để được phản hồi ngay lập tức nhé!' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-8 z-[110] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="pointer-events-auto w-[350px] md:w-[420px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden mb-6 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-kimono-red p-6 text-white relative">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl border border-white/20 shadow-inner">🤖</div>
              <div>
                <h4 className="font-bold text-lg leading-none mb-1 font-luxury italic">SigFlex AI Expert</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-[10px] text-white/80 font-black uppercase tracking-widest">Đang trực tuyến</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-red-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length - 1].text === '' && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl border border-slate-200 p-1.5 focus-within:border-red-600/50 transition-all focus-within:ring-4 focus-within:ring-red-600/5">
              <input 
                type="text" 
                placeholder="Hỏi về lịch trình, visa, xe riêng..."
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm font-medium text-slate-700"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 disabled:bg-slate-300 transition-all shadow-md active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Hỗ trợ 24/7</span>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <a href={CONTACT_INFO.zalo} target="_blank" className="text-[9px] text-red-600 font-black uppercase tracking-widest hover:underline">Chat Zalo Ngay</a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-16 h-16 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all relative group overflow-hidden"
      >
        <div className={`absolute inset-0 bg-red-600 transition-transform duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}></div>
        <span className={`text-3xl relative z-10 transition-all duration-300 ${isOpen ? 'rotate-90' : 'group-hover:filter group-hover:invert'}`}>
          {isOpen ? '✕' : '🤖'}
        </span>
        {!isOpen && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full border-2 border-white animate-pulse"></div>
        )}
      </button>
    </div>
  );
};

export default AIConsultant;
