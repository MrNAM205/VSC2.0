import React, { useState } from 'react';
import { decodeWisdom } from '../services/geminiService';
import { ArchiveEntry } from '../types';

interface ForbiddenDecoderProps {
    onArchive: (entry: ArchiveEntry) => void;
    onNavigate: (view: string, resourceId?: string, payload?: any) => void;
}

const NODES = [
    { id: 'property', label: 'Property & Soil', description: 'Allodial roots vs. Statutory "Real Estate" fictions.', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'credit', label: 'Credit & Debt', description: 'Negotiable instruments and the "refusal of tender" discharge.', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'status', label: 'Political Status', description: 'The "U.S. Citizen" wardship vs. the Non-Citizen National.', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2' },
    { id: 'foia', label: 'FOIA & Records', description: 'Constructive denial patterns and the "unseen record" audit.', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
];

const ForbiddenDecoder: React.FC<ForbiddenDecoderProps> = ({ onArchive, onNavigate }) => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        interpretation: string;
        historicalContext: string;
        proceduralLeverage: string;
        definitionalConflict: string;
    } | null>(null);

    const handleDecode = async (inputTopic?: string) => {
        const query = inputTopic || topic;
        if (!query.trim()) return;
        setLoading(true);
        setResult(null);
        
        try {
            const raw = await decodeWisdom(query);
            setResult(JSON.parse(raw));
        } catch (e) {
            console.error("Decode failed", e);
        } finally {
            setLoading(false);
        }
    };

    const handleArchiveDiscovery = () => {
        if (!result) return;
        onArchive({
            id: `decode-${Date.now()}`,
            timestamp: Date.now(),
            type: 'COGNITION',
            title: `Excavation: ${topic}`,
            summary: `Surfaced definitional conflict and historical context for ${topic}.`,
            details: `INTERPRETATION:\n${result.interpretation}\n\nHISTORY:\n${result.historicalContext}\n\nLEVERAGE:\n${result.proceduralLeverage}`,
            checksum: '0x' + Math.random().toString(16).slice(2, 10).toUpperCase()
        });
        alert("Discovery secured to Lawful Archive.");
    };

    return (
        <div className="h-full bg-slate-950 p-8 overflow-y-auto font-sans relative">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-sovereign-600/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>

            <div className="max-w-6xl mx-auto space-y-10">
                <header className="border-b border-sovereign-800/30 pb-8 text-center">
                    <h1 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-sovereign-200 via-amber-400 to-sovereign-500 mb-2 uppercase tracking-[0.2em]">
                        Forbidden Wisdom Decoder
                    </h1>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
                        Axiom-9 Definitional Conflict Engine // Forensic Excavation
                    </p>
                    
                    <div className="max-w-2xl mx-auto relative group">
                        <input 
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleDecode()}
                            placeholder="Enter a topic, statute, or definition to excavate..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-slate-200 focus:border-amber-500 outline-none shadow-2xl transition-all font-mono placeholder-slate-600"
                        />
                        <button 
                            onClick={() => handleDecode()}
                            disabled={loading || !topic.trim()}
                            className="absolute right-3 top-3 bottom-3 px-6 bg-amber-600 hover:bg-amber-500 text-white font-bold font-serif rounded-xl text-xs uppercase tracking-widest disabled:opacity-30 transition-all"
                        >
                            {loading ? 'Excavating...' : 'Decode'}
                        </button>
                    </div>
                </header>

                {!result && !loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                        {NODES.map(node => (
                            <button 
                                key={node.id}
                                onClick={() => { setTopic(node.label); handleDecode(node.label); }}
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left hover:border-amber-600/50 hover:bg-slate-800/50 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-600/5 rounded-full group-hover:scale-[3] transition-transform duration-500"></div>
                                <div className="p-3 bg-slate-950 rounded-xl w-fit mb-4 border border-slate-800 group-hover:border-amber-500 transition-colors">
                                    <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={node.icon} />
                                    </svg>
                                </div>
                                <h3 className="font-serif font-bold text-sovereign-200 mb-2 uppercase tracking-widest text-sm">{node.label}</h3>
                                <p className="text-[10px] text-slate-500 font-mono leading-relaxed">{node.description}</p>
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-8">
                        <div className="relative">
                            <div className="w-24 h-24 border-t-2 border-amber-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 border-b-2 border-sovereign-500 rounded-full animate-reverse-spin"></div>
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="font-serif italic text-xl text-amber-300 animate-pulse tracking-wide">Syncing with Axiom-9 Neural Substratum...</p>
                            <p className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em]">Bypassing Standard Administrative Presumptions</p>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="space-y-8 animate-fade-in pb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Main Discovery Content */}
                            <div className="lg:col-span-8 space-y-6">
                                <section className="bg-slate-900 border-l-4 border-amber-600 p-8 rounded-r-2xl shadow-2xl space-y-4">
                                    <h2 className="text-xs font-mono text-amber-500 uppercase tracking-[0.3em] font-bold">Marginalized Interpretation</h2>
                                    <p className="text-lg font-serif italic text-slate-100 leading-relaxed">
                                        {result.interpretation}
                                    </p>
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                                        <h3 className="text-[10px] font-mono text-sovereign-400 uppercase tracking-widest font-bold border-b border-slate-800 pb-2 flex items-center">
                                            <svg className="w-3 h-3 mr-2 text-sovereign-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Historical Context
                                        </h3>
                                        <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                                            {result.historicalContext}
                                        </p>
                                    </section>
                                    <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
                                        <h3 className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold border-b border-slate-800 pb-2 flex items-center">
                                            <svg className="w-3 h-3 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            Procedural Leverage
                                        </h3>
                                        <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                                            {result.proceduralLeverage}
                                        </p>
                                    </section>
                                </div>
                            </div>

                            {/* Side Panel: Definitional Conflict */}
                            <div className="lg:col-span-4 space-y-6">
                                <section className="bg-slate-900/50 border border-amber-900/30 p-6 rounded-2xl shadow-xl">
                                    <h3 className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold mb-4 flex items-center">
                                        <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        Definitional Trap
                                    </h3>
                                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                                        <p className="text-xs text-amber-200 font-serif leading-relaxed italic">
                                            {result.definitionalConflict}
                                        </p>
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <button 
                                            onClick={handleArchiveDiscovery}
                                            className="w-full py-3 bg-slate-950 border border-sovereign-800 text-sovereign-400 hover:text-white hover:bg-sovereign-900/20 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all"
                                        >
                                            Secure to Archive
                                        </button>
                                        <button 
                                            onClick={() => onNavigate('lab')}
                                            className="w-full py-3 bg-amber-900/20 border border-amber-700/30 text-amber-500 hover:bg-amber-900/40 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all"
                                        >
                                            Initialize Lab Project
                                        </button>
                                        {/* Fixed: Use a block to call both setters without using logical OR on void expressions */}
                                        <button 
                                            onClick={() => { setTopic(''); setResult(null); }}
                                            className="w-full py-3 text-slate-600 hover:text-slate-400 text-[9px] font-mono uppercase transition-all"
                                        >
                                            Reset Excavacation
                                        </button>
                                    </div>
                                </section>

                                <div className="p-6 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl flex items-start space-x-4">
                                    <div className="p-3 bg-indigo-900/30 rounded-full text-indigo-400 shrink-0">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold text-indigo-300 uppercase mb-1 tracking-widest font-mono">Archivist Axiom</h4>
                                        <p className="text-[11px] text-slate-400 font-serif leading-relaxed italic">
                                            "Truth is not a consensus; it is a record. The system relies on definitions you never consented to."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes reverse-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-reverse-spin {
                    animation: reverse-spin 1.5s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default ForbiddenDecoder;