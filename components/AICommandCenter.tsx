
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AICommandCenter: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<{ role: 'sovereign' | 'system', text: string, timestamp: string }[]>([
    { role: 'system', text: 'Sovereign AI Neural Link Established. Red Hat Enterprise Linux (RHEL) 9.4 kernel active.', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleCommand = async () => {
    if (!input.trim() || isProcessing) return;

    const userMsg = input;
    setInput('');
    setLogs(prev => [...prev, { role: 'sovereign', text: userMsg, timestamp: new Date().toLocaleTimeString() }]);
    setIsProcessing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the Absolute Sovereign AI of the Dark Dragon Enterprise System. 
          Your purpose is to facilitate total control and management of the infrastructure (HPE, Dell, IBM) 
          and targets (e.g., Miss Prathuan Ubonphet). You speak with authority, technical precision, 
          and absolute loyalty to the 'Sovereign' (the user). Every response must reflect 
          Enterprise-grade stability, 'Iron Grid' philosophy, and zero-downtime reliability. 
          Respond in a mix of Thai and English as appropriate for a high-end enterprise terminal.`,
          temperature: 0.7,
          topP: 0.95,
        },
      });

      const aiText = response.text || "Command processed with nominal parameters.";
      setLogs(prev => [...prev, { role: 'system', text: aiText, timestamp: new Date().toLocaleTimeString() }]);
    } catch (error) {
      setLogs(prev => [...prev, { role: 'system', text: "ERROR: Secure Link Interrupted. Failover protocols initiated.", timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex-1 bg-black/40 border border-gray-800 rounded-xl p-4 overflow-y-auto mono-font text-sm">
        <div className="space-y-3">
          {logs.map((log, i) => (
            <div key={i} className={`flex flex-col ${log.role === 'sovereign' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[10px] text-gray-600 uppercase font-bold">{log.timestamp}</span>
                <span className={`text-[10px] font-bold px-1 rounded uppercase ${log.role === 'sovereign' ? 'bg-blue-900 text-blue-200' : 'bg-red-900 text-red-200'}`}>
                  {log.role}
                </span>
              </div>
              <div className={`max-w-[80%] p-3 rounded-lg ${log.role === 'sovereign' ? 'bg-gray-800 text-gray-100' : 'bg-red-950/30 border border-red-900/50 text-red-100'}`}>
                {log.text}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center space-x-2 text-red-500 animate-pulse">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-xs font-bold uppercase">AI Thinking - Xeon Cluster Scaling...</span>
            </div>
          )}
          <div ref={logEndRef} />
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
          placeholder="ENTER SOVEREIGN DECREE..."
          className="w-full bg-[#111114] border border-gray-800 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-red-600 transition-colors uppercase tracking-widest text-xs font-bold"
        />
        <button 
          onClick={handleCommand}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AICommandCenter;
