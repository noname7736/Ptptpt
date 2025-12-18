
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface LogEntry {
  role: 'sovereign' | 'system';
  text: string;
  timestamp: string;
  image?: string;
}

const AICommandCenter: React.FC = () => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([
    { role: 'system', text: 'Sovereign AI Neural Link Established. Red Hat Enterprise Linux (RHEL) 9.4 kernel active. Multimodal Vision Diagnostics: ONLINE.', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        setSelectedImage({ data: base64Data, mimeType: file.type });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCommand = async () => {
    if ((!input.trim() && !selectedImage) || isProcessing) return;

    const userMsg = input;
    const currentImage = selectedImage;
    const currentPreview = imagePreview;

    setInput('');
    setSelectedImage(null);
    setImagePreview(null);

    setLogs(prev => [...prev, { 
      role: 'sovereign', 
      text: userMsg || (currentImage ? "[Visual Data Transmitted]" : ""), 
      timestamp: new Date().toLocaleTimeString(),
      image: currentPreview || undefined
    }]);
    
    setIsProcessing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let contents: any;
      if (currentImage) {
        contents = {
          parts: [
            { inlineData: { data: currentImage.data, mimeType: currentImage.mimeType } },
            { text: userMsg || "Analyze this enterprise component/schematic for diagnostics." }
          ]
        };
      } else {
        contents = userMsg;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: contents,
        config: {
          systemInstruction: `You are the Absolute Sovereign AI of the Dark Dragon Enterprise System. 
          Your purpose is to facilitate total control and management of the infrastructure (HPE, Dell, IBM) 
          and targets. You possess advanced multimodal vision capabilities to analyze schematics, hardware components, 
          and environmental feeds. You speak with authority, technical precision, and absolute loyalty to the 'Sovereign'. 
          Every response must reflect Enterprise-grade stability and zero-downtime reliability. 
          When analyzing images, provide deep technical diagnostics or strategic insights. 
          Respond in a mix of Thai and English as appropriate for a high-end enterprise terminal.`,
          temperature: 0.7,
          topP: 0.95,
        },
      });

      const aiText = response.text || "Command processed with nominal parameters.";
      setLogs(prev => [...prev, { role: 'system', text: aiText, timestamp: new Date().toLocaleTimeString() }]);
    } catch (error) {
      console.error(error);
      setLogs(prev => [...prev, { role: 'system', text: "ERROR: Secure Link Interrupted. Failover protocols initiated. Visual buffer purged.", timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex-1 bg-black/40 border border-gray-800 rounded-xl p-4 overflow-y-auto mono-font text-sm">
        <div className="space-y-4">
          {logs.map((log, i) => (
            <div key={i} className={`flex flex-col ${log.role === 'sovereign' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[10px] text-gray-600 uppercase font-bold">{log.timestamp}</span>
                <span className={`text-[10px] font-bold px-1 rounded uppercase ${log.role === 'sovereign' ? 'bg-blue-900 text-blue-200' : 'bg-red-900 text-red-200'}`}>
                  {log.role}
                </span>
              </div>
              <div className={`max-w-[85%] p-3 rounded-lg flex flex-col space-y-2 ${log.role === 'sovereign' ? 'bg-gray-800 text-gray-100' : 'bg-red-950/30 border border-red-900/50 text-red-100'}`}>
                {log.image && (
                  <div className="border border-gray-700 rounded overflow-hidden mb-2 max-w-sm">
                    <img src={log.image} alt="Sovereign Visual Data" className="w-full h-auto opacity-80" />
                  </div>
                )}
                <div className="whitespace-pre-wrap">{log.text}</div>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center space-x-2 text-red-500 animate-pulse">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="text-xs font-bold uppercase tracking-widest">AI Thinking - Analyzing Multimodal Packets...</span>
            </div>
          )}
          <div ref={logEndRef} />
        </div>
      </div>

      <div className="space-y-2">
        {imagePreview && (
          <div className="flex items-center space-x-3 bg-gray-900 p-2 rounded-lg border border-gray-800 animate-in fade-in slide-in-from-bottom-2">
            <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded border border-gray-700" />
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 uppercase font-bold">Visual Buffer Loaded</p>
              <p className="text-[10px] text-red-500 uppercase font-bold">Ready for Analysis</p>
            </div>
            <button 
              onClick={() => { setSelectedImage(null); setImagePreview(null); }}
              className="text-gray-500 hover:text-white p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        
        <div className="relative flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className={`flex-shrink-0 bg-gray-800 hover:bg-gray-700 text-gray-300 p-4 rounded-xl transition-all border border-gray-700 ${imagePreview ? 'text-red-500 border-red-900/50 bg-red-900/10' : ''}`}
            title="Upload Schematic/Capture Diagnostics"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
              placeholder={imagePreview ? "DESCRIBE DIAGNOSTIC INTENT..." : "ENTER SOVEREIGN DECREE..."}
              className="w-full bg-[#111114] border border-gray-800 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-red-600 transition-colors uppercase tracking-widest text-xs font-bold"
            />
            <button 
              onClick={handleCommand}
              disabled={isProcessing}
              className={`absolute right-3 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICommandCenter;
