
import React, { useState, useRef } from 'react';
import { jarvisExtract } from '../services/geminiService';
import { put } from '../lib/store';

interface JarvisProps {
  onNavigate: (view: string, resourceId?: string, payload?: any) => void;
}

const Jarvis: React.FC<JarvisProps> = ({ onNavigate }) => {
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
        const base64Data = base64String.split(',')[1];
        
        setFile({
            name: f.name,
            type: f.type,
            data: base64Data
        });
        setText(''); 
      };
      reader.readAsDataURL(f);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setExtraction(null);
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

  const handleDeployToWorkflow = () => {
    if (!extraction) return;
    
    // Determine the best workflow based on docType
    if (extraction.docType?.toLowerCase().includes('birth') || extraction.entities?.nameOnRecord) {
        onNavigate('filing', 'ds4194-authentication', extraction);
    } else {
        onNavigate('filing', 'ucc1-filing-path', extraction);
    }
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

  const isBirthCert = extraction?.docType?.toLowerCase().includes('birth');

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
                <h2 className="text-2xl font-serif font-bold text-sovereign-200 uppercase tracking-widest">Axiom-9 JARVIS Engine</h2>
                <p className="text-sm text-slate-400 font-mono">Forensic Identifier Extraction</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto">
            <div className="flex flex-col space-y-4">
                <label className="text-[10px] font-mono text-sovereign-500 uppercase tracking-widest">Signal Source</label>
                
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${file ? 'border-indigo-600 bg-indigo-900/10' : 'border-slate-800 hover:border-sovereign-600 bg-slate-900'}`}>
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
                            <span className="text-xs text-slate-300 font-mono uppercase">Inject Instrument</span>
                        </label>
                    ) : (
                        <div className="flex flex-col items-center">
                            <svg className="w-8 h-8 text-indigo-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs text-indigo-300 font-mono break-all">{file.name}</span>
                            <button onClick={clearFile} className="mt-2 text-[10px] text-red-400 hover:text-red-300 underline font-mono">ABORT SIGNAL</button>
                        </div>
                    )}
                </div>

                <textarea 
                    className="h-32 bg-slate-900 border border-slate-700 rounded p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-sovereign-500 resize-none disabled:opacity-50"
                    placeholder={file ? "File synchronized. Neural text bridge inactive." : "Paste raw text content for archival audit..."}
                    value={text}
                    disabled={!!file}
                    onChange={(e) => setText(e.target.value)}
                />
                
                <button 
                    onClick={handleExtract}
                    disabled={loading || (!text && !file)}
                    className="w-full py-4 bg-indigo-800 hover:bg-indigo-700 text-white font-bold font-serif rounded shadow-2xl transition-all disabled:opacity-30 uppercase tracking-[0.2em] text-[11px]"
                >
                    {loading ? 'SYNCHRONIZING neural path...' : 'EXTRACT IDENTIFIERS'}
                </button>
            </div>

            <div className="flex flex-col space-y-4">
                <label className="text-[10px] font-mono text-sovereign-500 uppercase tracking-widest">Axiom-9 Data Profile</label>
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded p-6 relative overflow-hidden min-h-[300px] shadow-inner">
                    {extraction ? (
                        <div className="space-y-4 animate-fade-in">
                            {isBirthCert && (
                                <div className="bg-indigo-900/20 border border-indigo-500/50 p-3 rounded-lg flex items-center space-x-3 mb-4">
                                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <div>
                                        <p className="text-[10px] text-indigo-300 font-bold uppercase">Status Document Detected</p>
                                        <p className="text-[9px] text-indigo-400 font-mono">Long-Form Profile Identified</p>
                                    </div>
                                </div>
                            )}
                            <pre className="text-[11px] font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed">
                                {JSON.stringify(extraction, null, 2)}
                            </pre>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 font-mono text-[10px] uppercase tracking-widest">
                            <span className="animate-pulse">Awaiting neural input...</span>
                        </div>
                    )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={handleSave}
                        disabled={!extraction}
                        className="py-3 bg-slate-900 hover:bg-slate-800 text-sovereign-400 border border-slate-800 font-bold font-serif rounded shadow transition-all disabled:opacity-30 uppercase tracking-widest text-[10px]"
                    >
                        SECURE TO VAULT
                    </button>
                    <button 
                        onClick={handleDeployToWorkflow}
                        disabled={!extraction}
                        className="py-3 bg-emerald-900/40 hover:bg-emerald-800 text-emerald-400 border border-emerald-800 font-bold font-serif rounded shadow transition-all disabled:opacity-30 uppercase tracking-widest text-[10px]"
                    >
                        DEPLOY TO WORKFLOW &rarr;
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Jarvis;
