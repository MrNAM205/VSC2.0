
import React, { useState, useRef } from 'react';
import { processMedia } from '../services/geminiService';
import { put, list } from '../lib/store';
import { ArchiveEntry, SideProject } from '../types';

interface MediaInterceptorProps {
    onArchive: (entry: ArchiveEntry) => void;
    onNavigate: (view: string, resourceId?: string, payload?: any) => void;
}

const MediaInterceptor: React.FC<MediaInterceptorProps> = ({ onArchive, onNavigate }) => {
    const [file, setFile] = useState<{ name: string; type: string; data: string; preview: string } | null>(null);
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Research Lab Linking
    const projects = list<SideProject>('projects');
    const [selectedProjectId, setSelectedProjectId] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target?.result as string;
                setFile({
                    name: f.name,
                    type: f.type,
                    data: base64String.split(',')[1],
                    preview: URL.createObjectURL(f)
                });
            };
            reader.readAsDataURL(f);
        }
    };

    const handleIntercept = async () => {
        if (!file && !url) return;
        setLoading(true);
        const payload = file ? { file: { mimeType: file.type, data: file.data } } : { url };
        const raw = await processMedia(payload);
        try {
            setResult(JSON.parse(raw));
        } catch (e) {
            setResult({ error: 'Signal Decode Failed', raw });
        }
        setLoading(false);
    };

    const handleDeployToDrafter = () => {
        if (!result) return;
        // Inject forensic media audit into global payload
        onNavigate('drafter', 'notice-rep-capacity', {
            docType: 'Media Audit',
            summary: result.summary,
            standingAudit: result.standingAudit,
            entities: result.agents,
            transcript: result.transcript,
            lawfulAssertions: result.lawfulAssertions
        });
    };

    const saveToProject = () => {
        if (!result || !selectedProjectId) return;
        const project = projects.find(p => p.id === selectedProjectId);
        if (!project) return;

        const artifact = {
            id: crypto.randomUUID(),
            title: `Media Audit: ${file?.name || url.substring(0, 20)}`,
            content: `STANDING AUDIT: ${result.standingAudit}\n\nLAWFUL ASSERTIONS: ${result.lawfulAssertions?.join(', ')}\n\nTRANSCRIPT:\n${result.transcript}`,
            type: 'TRANSCRIPT' as const,
            relevance: 4,
            createdAt: new Date().toISOString()
        };

        const updatedProject = {
            ...project,
            artifacts: [...project.artifacts, artifact]
        };

        put('projects', updatedProject.id, updatedProject);
        
        onArchive({
            id: `media-${Date.now()}`,
            timestamp: Date.now(),
            type: 'MEDIA',
            title: `Media Audit: ${file?.name || 'External Link'}`,
            summary: result.summary || 'Audiovisual data processed and audited.',
            details: artifact.content,
            checksum: Math.random().toString(16).slice(2, 10).toUpperCase()
        });
        
        alert(`Forensic artifact secured to ${project.title}`);
    };

    return (
        <div className="h-full bg-slate-950 p-6 overflow-y-auto font-sans">
            <div className="max-w-7xl mx-auto space-y-6">
                <header className="border-b border-sovereign-800/50 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-sovereign-200 uppercase tracking-widest">Media Intelligence Lab</h1>
                        <p className="text-slate-500 font-mono text-[10px] mt-1 uppercase tracking-tighter">Forensic Audiovisual Transcription & Lawful Audit</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-mono text-emerald-500 uppercase">System Status</span>
                            <span className="text-[10px] font-mono text-slate-400">Monitoring Signal...</span>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Input Control Column */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-2xl space-y-5">
                            <div>
                                <h3 className="text-[10px] font-mono text-sovereign-400 uppercase tracking-widest mb-3">1. Select Signal Source</h3>
                                <div 
                                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${file ? 'border-emerald-600 bg-emerald-900/10' : 'border-slate-800 hover:border-sovereign-700 bg-slate-950'}`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        accept="video/*,audio/*"
                                        onChange={handleFileChange}
                                    />
                                    {!file ? (
                                        <div className="space-y-1">
                                            <svg className="w-8 h-8 text-slate-700 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                            <p className="text-[10px] text-slate-500 font-mono uppercase">Upload Local Data</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            <svg className="w-8 h-8 text-emerald-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <p className="text-[9px] text-emerald-400 font-mono truncate px-4">{file.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                                <div className="relative flex justify-center text-[9px] uppercase"><span className="bg-slate-900 px-2 text-slate-600 font-mono">OR</span></div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-mono text-sovereign-400 uppercase tracking-widest mb-2">2. Network Link (Social/Archive)</h3>
                                <div className="relative">
                                    <input 
                                        value={url} 
                                        onChange={e => { setUrl(e.target.value); if(e.target.value) setFile(null); }}
                                        placeholder="Enter URL (YouTube, TikTok, etc.)"
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-300 focus:border-sovereign-600 outline-none font-mono"
                                    />
                                    <div className="absolute right-3 top-3">
                                        <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" /></svg>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleIntercept}
                                disabled={(!file && !url) || loading}
                                className="w-full py-4 bg-sovereign-700 hover:bg-sovereign-600 text-white font-bold font-serif rounded shadow-[0_5px_15px_rgba(170,102,42,0.3)] transition-all disabled:opacity-30 disabled:grayscale uppercase tracking-widest text-[11px]"
                            >
                                {loading ? 'DECRYPTING SIGNAL...' : 'INITIATE AUDIT'}
                            </button>
                        </div>

                        {result && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
                                    <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                                        <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        <h3 className="text-[10px] font-mono text-indigo-500 uppercase tracking-widest">Bridge to Workspace</h3>
                                    </div>
                                    <button 
                                        onClick={handleDeployToDrafter}
                                        className="w-full py-3 bg-indigo-900/40 hover:bg-indigo-800/50 text-indigo-200 border border-indigo-700/50 text-[10px] font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        Deploy to Drafter
                                    </button>
                                    <button 
                                        onClick={() => onNavigate('cognition', undefined, { prompt: `Analyze this media audit: ${result.transcript}` })}
                                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[10px] font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                        Interrogate Signal
                                    </button>
                                </div>

                                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
                                    <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                                        <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16 9V4l1 1V3H7v2l1-1v5c0 2.21-1.79 4-4 4v2h7v7l1 1 1-1v-7h7v-2c-2.21 0-4-1.79-4-4z"/></svg>
                                        <h3 className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">Pin to Research Lab</h3>
                                    </div>
                                    <select 
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-[10px] text-slate-300 font-mono"
                                        value={selectedProjectId}
                                        onChange={e => setSelectedProjectId(e.target.value)}
                                    >
                                        <option value="">Select Project Bundle...</option>
                                        {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                                    </select>
                                    <button 
                                        onClick={saveToProject}
                                        disabled={!selectedProjectId}
                                        className="w-full py-2 border border-amber-900/50 text-amber-500 hover:bg-amber-900/20 text-[10px] font-bold uppercase tracking-widest rounded transition-all disabled:opacity-30"
                                    >
                                        COMMIT TO PROJECT
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Output/Workspace Column */}
                    <div className="lg:col-span-8 space-y-4">
                        {result ? (
                            <div className="space-y-4 animate-fade-in">
                                {/* Top Analysis Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-900 border-l-4 border-sovereign-500 p-5 rounded-r-xl shadow-lg">
                                        <h2 className="text-[10px] font-mono text-sovereign-400 uppercase mb-2 tracking-widest font-bold">Standing Audit</h2>
                                        <p className="text-slate-200 font-sans text-xs leading-relaxed italic">
                                            {result.standingAudit || "No standing anomalies detected."}
                                        </p>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg">
                                        <h2 className="text-[10px] font-mono text-emerald-500 uppercase mb-2 tracking-widest font-bold">Identified Agents</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {result.agents?.length > 0 ? result.agents.map((a: string, i: number) => (
                                                <span key={i} className="text-[10px] font-mono bg-slate-950 border border-slate-800 px-2 py-1 rounded text-slate-400">{a}</span>
                                            )) : <span className="text-[10px] text-slate-600 font-mono italic">No specific agents identified.</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Lawful Assertions */}
                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
                                    <h3 className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold mb-3 flex items-center">
                                        <svg className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        Forensic Triggers & Assertions
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {result.lawfulAssertions?.map((a: string, i: number) => (
                                            <div key={i} className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex items-start space-x-3">
                                                <span className="text-amber-600 font-mono text-[10px] mt-0.5">[{i+1}]</span>
                                                <span className="text-[11px] text-slate-400 leading-tight">{a}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Verbatim/Visual Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[500px]">
                                    {/* Video/Audio Preview */}
                                    <div className="lg:col-span-5 bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
                                        <div className="bg-slate-900 p-2 border-b border-slate-800 flex justify-between items-center">
                                            <span className="text-[9px] font-mono text-slate-500">Source Feed</span>
                                            <div className="flex space-x-1">
                                                <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                                <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                                            {file ? (
                                                file.type.startsWith('video') ? (
                                                    <video controls src={file.preview} className="w-full h-full object-contain" />
                                                ) : (
                                                    <audio controls src={file.preview} className="w-4/5" />
                                                )
                                            ) : (
                                                <div className="text-center p-8">
                                                    <svg className="w-12 h-12 text-slate-800 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" /></svg>
                                                    <p className="text-[9px] text-slate-600 font-mono uppercase">External Network Signal</p>
                                                    <p className="text-[8px] text-slate-700 font-mono mt-1 break-all max-w-[200px]">{url}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Scrollable Transcript */}
                                    <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl flex flex-col shadow-2xl overflow-hidden">
                                        <div className="bg-slate-950 p-3 border-b border-slate-800 flex justify-between items-center">
                                            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Forensic Transcript</h3>
                                            <button 
                                                onClick={() => { navigator.clipboard.writeText(result.transcript); alert("Audit Log Copied."); }}
                                                className="text-[9px] font-mono text-sovereign-500 hover:text-sovereign-300 border border-sovereign-900 px-2 py-0.5 rounded"
                                            >
                                                COPY AUDIT
                                            </button>
                                        </div>
                                        <div className="flex-1 p-5 font-mono text-[11px] text-slate-400 leading-relaxed overflow-y-auto scrollbar-hide whitespace-pre-wrap">
                                            {result.transcript}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full border-2 border-dashed border-slate-800/50 rounded-2xl flex flex-col items-center justify-center text-slate-700 bg-slate-900/20">
                                {loading ? (
                                    <div className="flex flex-col items-center space-y-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 border-t-2 border-sovereign-500 rounded-full animate-spin"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 border-b-2 border-amber-500 rounded-full animate-reverse-spin"></div>
                                            </div>
                                        </div>
                                        <div className="text-center space-y-2">
                                            <p className="font-serif italic text-lg text-sovereign-300 tracking-wide animate-pulse">Synchronizing Neural Intercept...</p>
                                            <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-slate-500">Multimodal Audit in Progress</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center max-w-sm px-10">
                                        <svg className="w-16 h-16 mb-4 text-slate-800 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                        <p className="font-serif text-lg text-slate-500 italic mb-2">Awaiting Intercept Data</p>
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 leading-relaxed">
                                            Upload local recordings or provide social media links to generate a standing audit and verbatim transcript.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes reverse-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-reverse-spin {
                    animation: reverse-spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default MediaInterceptor;
