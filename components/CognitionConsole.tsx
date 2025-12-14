import React, { useState, useRef, useEffect } from 'react';
import { getCognitionResponse } from '../services/geminiService';
import { CognitionMode, ArchiveEntry, MapLink } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  mapLinks?: MapLink[];
  timestamp: number;
}

interface CognitionConsoleProps {
  onArchive: (entry: ArchiveEntry) => void;
}

const CognitionConsole: React.FC<CognitionConsoleProps> = ({ onArchive }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'I am the Verobrix Cognition Layer. I am ready to synthesize lawful knowledge or refute pseudotheory. How may I serve the sovereign intent?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<CognitionMode>(CognitionMode.STRICT);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const result = await getCognitionResponse(userMsg.content, mode);
    
    const aiMsg: Message = { 
        role: 'assistant', 
        content: result.text, 
        mapLinks: result.mapLinks,
        timestamp: Date.now() 
    };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);

    // Auto archive conversation turn
    onArchive({
      id: `cognition-${Date.now()}`,
      timestamp: Date.now(),
      type: 'COGNITION',
      title: `Cognition: ${userMsg.content.substring(0, 30)}...`,
      summary: `Mode: ${mode}. User query processed.`,
      details: `Q: ${userMsg.content}\n\nA: ${result.text}`,
      checksum: Math.random().toString(36).substring(7)
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200">
      {/* Header / Mode Selector */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center shadow-lg z-10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <h2 className="font-serif font-bold text-sovereign-200">Cognition Console</h2>
        </div>
        <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
          {Object.values(CognitionMode).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                mode === m 
                  ? 'bg-sovereign-700 text-white shadow-md' 
                  : 'text-slate-400 hover:text-sovereign-200 hover:bg-slate-700'
              }`}
            >
              {m === CognitionMode.LOCATOR ? '📍 Locator' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl rounded-xl p-5 shadow-lg relative ${
              msg.role === 'user' 
                ? 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tr-none' 
                : 'bg-sovereign-900/20 border border-sovereign-800/50 text-sovereign-50 rounded-tl-none'
            }`}>
               {msg.role === 'assistant' && (
                  <div className="absolute -top-3 -left-2 w-8 h-8 bg-slate-950 border border-sovereign-700 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-sovereign-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
               )}
              <div className="whitespace-pre-wrap font-sans leading-relaxed text-sm">
                {msg.content}
              </div>

              {/* Map Chips */}
              {msg.mapLinks && msg.mapLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {msg.mapLinks.map((link, i) => (
                        <a 
                            key={i} 
                            href={link.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-700 hover:border-sovereign-600 rounded px-3 py-2 text-xs transition-colors"
                        >
                            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                            <span className="text-sovereign-300 font-mono truncate max-w-[200px]">{link.title}</span>
                        </a>
                    ))}
                </div>
              )}

              <div className={`mt-2 text-[10px] font-mono opacity-50 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-sovereign-900/10 p-4 rounded-xl flex space-x-2 items-center">
                <div className="w-2 h-2 bg-sovereign-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-sovereign-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-sovereign-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <div className="relative max-w-4xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={mode === CognitionMode.LOCATOR ? "Enter query e.g. 'Probate Court in Shelby County AL'..." : "Interrogate the corpus or request synthesis..."}
            className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-sovereign-500 focus:ring-1 focus:ring-sovereign-500 resize-none h-14 scrollbar-hide font-sans"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-sovereign-600 hover:bg-sovereign-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className="text-center mt-2">
            <span className="text-[10px] text-slate-500 font-mono">
                {mode === CognitionMode.LOCATOR ? "Grounding with Google Maps" : "AI can make mistakes. Verify against the Knowledge Corpus."}
            </span>
        </div>
      </div>
    </div>
  );
};

export default CognitionConsole;
