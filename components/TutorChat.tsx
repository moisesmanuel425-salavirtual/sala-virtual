
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';

export const TutorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Eu sou seu Tutor Orbital. Estou aqui para te ajudar a desvendar os mistérios das comunicações via satélite. O que você gostaria de explorar hoje? Órbitas, balanço de link ou modulação?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const assistantMsg: Message = { role: 'assistant', content: '', timestamp: new Date() };
    setMessages(prev => [...prev, assistantMsg]);

    let fullText = '';
    const stream = geminiService.streamMessage(input);
    
    for await (const chunk of stream) {
      fullText += chunk;
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = fullText;
        return newMsgs;
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-slate-900/50 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="font-semibold text-sm">Tutor Especialista Online</span>
        </div>
        <button 
          onClick={() => setMessages([messages[0]])}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          Limpar Conversa
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none shadow-lg shadow-indigo-600/20' 
                : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
            }`}>
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{m.content}</p>
              <span className="text-[10px] opacity-50 mt-2 block">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length-1].content === '' && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none animate-pulse text-slate-500 text-sm">
              Sincronizando com a estação terrestre...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre órbitas, ganhos, Doppler..."
            className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all flex items-center justify-center text-white"
          >
            <span className="text-xl">🚀</span>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-600 mt-3">
          Powered by Gemini 3 Flash • Ciência e Tecnologia Orbital
        </p>
      </div>
    </div>
  );
};
