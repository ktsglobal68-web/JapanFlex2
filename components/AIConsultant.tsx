
import React, { useState, useEffect, useRef } from 'react';
import { createConsultantChat } from '../services/geminiService';
import { CONTACT_INFO } from '../constants';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Xin chào! Tôi là trợ lý AI của SigFlex Japan. Bạn đang cần tư vấn hành trình du lịch Nhật Bản như thế nào ạ?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      if (!chatRef.current) {
        chatRef.current = createConsultantChat();
      }

      const stream = await chatRef.current.sendMessageStream({ message: userMsg });
      let fullText = '';
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        fullText += chunk.text;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, text: fullText }];
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { role: 'model', text: 'Rất tiếc, kết nối của tôi đang gặp gián đoạn. Bạn vui lòng chat qua Zalo để được hỗ trợ tức thì nhé!' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-8 z-[110] flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="pointer-events-auto w-[350px] md:w-[400px] h-[550px] bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-100 flex flex-col overflow-hidden mb-6 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-kimono-red p-6 text-white relative">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl border border-white/20">🤖</div>
              <div>
                <h4 className="font-bold text-lg leading-none mb-1">SigFlex AI Expert</h4>
                <p className="text-[10px] text-yellow-400 font-black uppercase tracking-widest">Tư vấn hành trình độc bản</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white/60 hover:text-white">✕</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'bg-white text-slate-700 shadow-sm border border-slate-100'
                }`}>
                  {m.text || (isTyping && i === messages.length - 1 ? '...' : '')}
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length-1].text === '' && (
               <div className="flex justify-start">
                 <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                 </div>
               </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl border border-slate-100 p-2 pr-3">
              <input 
                type="text" 
                placeholder="Nhập yêu cầu của bạn..."
                className="flex-1 bg-transparent border-none outline-none p-2 text-sm font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-all shadow-md"
              >
                ✈️
              </button>
            </div>
            <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-3 italic">
              Zalo hỗ trợ 24/7: {CONTACT_INFO.phone}
            </p>
          </div>
        </div>
      )}

      {/* Bubble Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-16 h-16 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <span className="text-3xl relative z-10 group-hover:filter group-hover:invert transition-all">🤖</span>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-white animate-pulse"></div>
        )}
      </button>
    </div>
  );
};

export default AIConsultant;
