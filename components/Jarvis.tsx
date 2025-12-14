import React, { useState, useRef } from 'react';
import { jarvisExtract } from '../services/geminiService';
import { put } from '../lib/store';

const Jarvis: React.FC = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<{ name: string, type: string, data: string } | null>(null);
  const [extraction, setExtraction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = base64String.split(',')[1];
        
        setFile({
            name: f.name,
            type: f.type,
            data: base64Data
        });
        // Clear text input if file is selected to avoid confusion
        setText(''); 
      };
      reader.readAsDataURL(f);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleExtract = async () => {
    if (!text && !file) return;
    setLoading(true);
    
    let raw;
    if (file) {
        raw = await jarvisExtract({ mimeType: file.type, data: file.data });
    } else {
        raw = await jarvisExtract(text);
    }

    try {
        const json = JSON.parse(raw);
        setExtraction(json);
    } catch (e) {
        setExtraction({ error: 'Parse failed', rawResponse: raw });
    }
    setLoading(false);
  };

  const handleSave = () => {
    const id = crypto.randomUUID();
    put('instruments', id, { 
        id, 
        type: 'Instrument',
        source: file ? 'File Upload' : 'Text Input',
        filename: file?.name,
        contentText: text || '[Binary File Content]', 
        extracted: extraction, 
        createdAt: new Date().toISOString() 
    });
    alert('Instrument secured in Vault.');
  };

  return (
    <div className="h-full bg-slate-950 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 border-b border-sovereign-800 pb-4">
            <div className="w-10 h-10 rounded bg-sovereign-900/50 flex items-center justify-center border border-sovereign-700">
                <svg className="w-6 h-6 text-sovereign-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            </div>
            <div>
                <h2 className="text-2xl font-serif font-bold text-sovereign-200">JARVIS Engine</h2>
                <p className="text-sm text-slate-400 font-mono">Instrument Ingestion & Analysis</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto">
            <div className="flex flex-col space-y-4">
                <label className="text-xs font-mono text-sovereign-500 uppercase">Input Source</label>
                
                {/* File Upload Area */}
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${file ? 'border-emerald-600 bg-emerald-900/10' : 'border-slate-700 hover:border-sovereign-600 bg-slate-900'}`}>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="hidden" 
                        id="jarvis-upload"
                    />
                    
                    {!file ? (
                        <label htmlFor="jarvis-upload" className="cursor-pointer flex flex-col items-center justify-center h-full">
                             <svg className="w-8 h-8 text-slate-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="text-sm text-slate-300 font-mono">Upload Instrument</span>
                            <span className="text-[10px] text-slate-500 mt-1">PDF, JPG, PNG supported</span>
                        </label>
                    ) : (
                        <div className="flex flex-col items-center">
                            <svg className="w-8 h-8 text-emerald-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-emerald-300 font-mono break-all">{file.name}</span>
                            <button onClick={clearFile} className="mt-2 text-xs text-red-400 hover:text-red-300 underline">Remove</button>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-950 px-2 text-slate-500">OR</span>
                    </div>
                </div>

                <textarea 
                    className="h-32 bg-slate-900 border border-slate-700 rounded p-4 text-sm font-mono text-slate-300 focus:outline-none focus:border-sovereign-500 resize-none disabled:opacity-50"
                    placeholder={file ? "File selected. Text input disabled." : "Paste text content directly..."}
                    value={text}
                    disabled={!!file}
                    onChange={(e) => setText(e.target.value)}
                />
                
                <button 
                    onClick={handleExtract}
                    disabled={loading || (!text && !file)}
                    className="w-full py-3 bg-sovereign-700 hover:bg-sovereign-600 text-white font-bold font-serif rounded shadow-lg transition-all disabled:opacity-50"
                >
                    {loading ? 'ANALYZING...' : 'EXTRACT DATA'}
                </button>
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-xs font-mono text-sovereign-500 uppercase">Extraction Result</label>
                <div className="flex-1 bg-slate-900 border border-slate-700 rounded p-4 relative overflow-hidden min-h-[300px]">
                    {extraction ? (
                        <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap">
                            {JSON.stringify(extraction, null, 2)}
                        </pre>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-mono text-xs">
                            Awaiting Input...
                        </div>
                    )}
                </div>
                <button 
                    onClick={handleSave}
                    disabled={!extraction}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-sovereign-200 border border-sovereign-800 font-bold font-serif rounded shadow-lg transition-all disabled:opacity-50"
                >
                    SECURE TO VAULT
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Jarvis;