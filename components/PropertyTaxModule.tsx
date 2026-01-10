
import React, { useState, useRef } from 'react';
import { sovereignAudit, getMaverickTactics } from '../services/geminiService';
import { put } from '../lib/store';
import { AuditResult, SideProject, ArchiveEntry, TacticalPathway } from '../types';

interface PropertyTaxModuleProps {
    onArchive: (entry: ArchiveEntry) => void;
    onNavigate: (view: string, resourceId?: string) => void;
}

const PropertyTaxModule: React.FC<PropertyTaxModuleProps> = ({ onArchive, onNavigate }) => {
    const [file, setFile] = useState<{ name: string; type: string; data: string; preview: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [audit, setAudit] = useState<AuditResult | null>(null);
    const [tactics, setTactics] = useState<string>('');
    const [loadingTactics, setLoadingTactics] = useState(false);
    const [viewMode, setViewMode] = useState<'AUDIT' | 'RECOVERY'>('AUDIT');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // PTAR Recovery State
    const [yearlyTax, setYearlyTax] = useState('5000');
    const [yearsPaid, setYearsPaid] = useState('5');
    const [interestRate, setInterestRate] = useState('6');

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

    const handleAudit = async () => {
        if (!file) return;
        setLoading(true);
        try {
            const result = await sovereignAudit({ mimeType: file.type, data: file.data });
            setAudit(result);
            
            setLoadingTactics(true);
            const t = await getMaverickTactics(result.summary + " Include specific mention of P.T.A.R. and Allodial root if applicable.");
            setTactics(t);
            setLoadingTactics(false);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const commitToLab = (pathway: TacticalPathway) => {
        if (!audit || !file) return;
        const project: SideProject = {
            id: `archivist-${Date.now()}`,
            title: `Terrain Map: ${audit.docType}`,
            description: `Procedural flow mapping for ${audit.docType} using Codex protocols.`,
            artifacts: [{ id: crypto.randomUUID(), title: `Instrument Source`, content: audit.summary, type: 'INSTRUMENT', relevance: 5, createdAt: new Date().toISOString() }],
            goals: pathway.suggestedGoals.map(g => ({ id: crypto.randomUUID(), text: g, completed: false })),
            status: 'ACTIVE',
            createdAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString()
        };
        put('projects', project.id, project);
        onNavigate(pathway.targetView, pathway.resourceId);
    };

    const calculateRecovery = () => {
        const principal = parseFloat(yearlyTax) * parseFloat(yearsPaid);
        const interest = principal * (parseFloat(interestRate) / 100) * (parseFloat(yearsPaid) / 2); // Simplified
        return (principal + interest).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className="h-full bg-slate-950 p-6 overflow-y-auto font-sans">
            <div className="max-w-7xl mx-auto space-y-6">
                <header className="border-b border-sovereign-800/50 pb-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-indigo-900/30 rounded-lg border border-indigo-500/30">
                            <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-sovereign-200 uppercase tracking-widest">Axiom-9 Terrain Mapper</h1>
                            <p className="text-slate-500 font-mono text-[10px] mt-1 uppercase tracking-tighter">Forensic Property Audit & P.T.A.R. Engine</p>
                        </div>
                    </div>
                    <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                        <button 
                            onClick={() => setViewMode('AUDIT')}
                            className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${viewMode === 'AUDIT' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            JURISDICTION AUDIT
                        </button>
                        <button 
                            onClick={() => setViewMode('RECOVERY')}
                            className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${viewMode === 'RECOVERY' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            P.T.A.R. RECOVERY
                        </button>
                    </div>
                </header>

                {viewMode === 'AUDIT' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                        <div className="lg:col-span-4 space-y-4">
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-6">
                                <h3 className="text-[10px] font-mono text-sovereign-400 uppercase tracking-widest flex items-center">
                                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                    Step 1: Ingest Presentment
                                </h3>
                                <div 
                                    className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all ${file ? 'border-indigo-600 bg-indigo-900/10' : 'border-slate-800 hover:border-sovereign-700 bg-slate-950'}`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
                                    {!file ? (
                                        <div className="space-y-2">
                                            <svg className="w-10 h-10 text-slate-800 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Inject Instrument</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <svg className="w-10 h-10 text-indigo-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <p className="text-[10px] text-indigo-400 font-mono truncate">{file.name}</p>
                                        </div>
                                    )}
                                </div>
                                <button 
                                    onClick={handleAudit}
                                    disabled={!file || loading}
                                    className="w-full py-4 bg-indigo-800 hover:bg-indigo-700 text-white font-bold font-serif rounded shadow-2xl transition-all disabled:opacity-30 uppercase tracking-widest text-[11px]"
                                >
                                    {loading ? 'SYNCHRONIZING...' : 'MAP JURISDICTION'}
                                </button>
                            </div>

                            {audit && (
                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl animate-fade-in relative overflow-hidden">
                                    <h3 className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-4">Archivist Axiom</h3>
                                    <div className="space-y-4">
                                        <div className="bg-slate-950 p-3 rounded border-l-2 border-indigo-600">
                                            <p className="text-[11px] text-slate-300 font-serif leading-relaxed italic">"Land is not real estate. Property is not a commodity. The Patent is the supreme law of the soil."</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-8">
                            {audit ? (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-slate-900 border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-lg relative group">
                                            <h2 className="text-[10px] font-mono text-indigo-400 uppercase mb-2 tracking-widest font-bold">Capacity Analysis</h2>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-mono">TARGET FICTION:</span>
                                                    <p className="text-red-400 font-mono text-xs">{audit.entities[0] || 'Unknown'}</p>
                                                </div>
                                                <div>
                                                    <span className="text-[9px] text-slate-500 uppercase font-mono">AUTHORIZED REP:</span>
                                                    <p className="text-emerald-400 font-mono text-xs">ACTIVE // DR. VALE PROTOCOL</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
                                            <h2 className="text-[10px] font-mono text-indigo-300 uppercase mb-2 tracking-widest font-bold">Quantum Synthesis</h2>
                                            {loadingTactics ? (
                                                <div className="animate-pulse space-y-2"><div className="h-2 bg-slate-800 rounded w-3/4"></div><div className="h-2 bg-slate-800 rounded w-1/2"></div></div>
                                            ) : (
                                                <p className="text-[11px] text-slate-400 font-mono leading-relaxed">{tactics}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold px-2">Remedial Protocols</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {audit.pathways.map(path => (
                                                <div key={path.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all flex flex-col group relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 group-hover:bg-indigo-600 transition-colors"></div>
                                                    <h4 className="text-sm font-serif font-bold text-white mb-2">{path.title}</h4>
                                                    <p className="text-[11px] text-slate-500 leading-relaxed mb-6 flex-1">{path.description}</p>
                                                    <button 
                                                        onClick={() => commitToLab(path)}
                                                        className="w-full py-3 bg-slate-950 border border-slate-800 hover:border-indigo-600 text-indigo-400 hover:text-indigo-200 text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg transition-all"
                                                    >
                                                        MAP FLOW &rarr;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full border-2 border-dashed border-slate-800/50 rounded-2xl flex flex-col items-center justify-center text-slate-700 bg-slate-900/20 p-20 text-center">
                                    <h2 className="text-2xl font-serif italic mb-2 text-slate-500">Signal Inactive</h2>
                                    <p className="text-[11px] font-mono uppercase tracking-widest text-slate-600 max-w-sm">Awaiting Axiom-9 data injection. Please provide the instrument for forensic terrain mapping.</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                        {/* PTAR Calculator */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-slate-900 border border-amber-900/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-amber-400"></div>
                                <h2 className="text-sm font-bold text-amber-500 uppercase tracking-[0.3em] font-mono mb-8 flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    P.T.A.R. Recovery Calculator
                                </h2>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-mono text-slate-500 uppercase block mb-2 tracking-widest">Average Annual Assessment (Public Side)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-slate-600 font-mono">$</span>
                                            <input 
                                                type="number" 
                                                value={yearlyTax} 
                                                onChange={e => setYearlyTax(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-8 text-sm text-emerald-400 font-mono focus:border-amber-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-2 tracking-widest">Years in Error</label>
                                            <input 
                                                type="number" 
                                                value={yearsPaid} 
                                                onChange={e => setYearsPaid(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 font-mono focus:border-amber-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-2 tracking-widest">Equitable Interest %</label>
                                            <input 
                                                type="number" 
                                                value={interestRate} 
                                                onChange={e => setInterestRate(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 font-mono focus:border-amber-500 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-slate-950 border border-amber-900/50 rounded-2xl p-6 text-center shadow-inner mt-8">
                                        <span className="text-[10px] font-mono text-amber-600 uppercase tracking-[0.4em] block mb-2 font-bold">Estimated Recovery Potential</span>
                                        <span className="text-4xl font-serif font-bold text-amber-400 tracking-tighter">${calculateRecovery()}</span>
                                        <p className="text-[9px] text-slate-600 font-mono mt-3 uppercase">Liquidated Claim Based on Mistake of Fact</p>
                                    </div>

                                    <button 
                                        onClick={() => onNavigate('drafter', 'ptar-admin-claim')}
                                        className="w-full py-4 bg-amber-700 hover:bg-amber-600 text-white font-serif font-bold rounded-xl shadow-2xl transition-all uppercase tracking-widest text-[11px]"
                                    >
                                        GENERATE P.T.A.R. CLAIM PACKET
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Allodial Root Intelligence */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] font-mono mb-6 flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                    Allodial Title Verification Protocols
                                </h2>

                                <div className="grid gap-4">
                                    {[
                                        { title: 'FEDERAL LAND PATENT SEARCH', desc: 'Identify the "Cash Entry" or "Homestead" grant number from the BLM-GLO archive.', status: 'READY' },
                                        { title: 'CHAIN OF TITLE AUDIT', desc: 'Verify the "Broken Chain" where statutory Fee Simple was presumed without consent.', status: 'PENDING' },
                                        { title: 'DECLARATION OF ALLODIAL STATUS', desc: 'Draft the formal instrument linking modern bounds to the Patent root.', status: 'LOCKED' },
                                        { title: 'CONSTRUCTIVE NOTICE SERVICE', desc: 'Serve the Tax Assessor and Recorder with the Declaration under Seal.', status: 'LOCKED' }
                                    ].map((p, i) => (
                                        <div key={i} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex justify-between items-center group hover:border-indigo-900/50 transition-all">
                                            <div className="flex-1 pr-6">
                                                <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">{p.title}</h4>
                                                <p className="text-[11px] text-slate-500 font-mono leading-relaxed">{p.desc}</p>
                                            </div>
                                            <span className={`text-[8px] font-mono px-2 py-1 rounded border ${p.status === 'READY' ? 'bg-indigo-900/30 text-indigo-400 border-indigo-800' : 'bg-slate-900 text-slate-600 border-slate-800'}`}>{p.status}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-6 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl flex items-start space-x-4">
                                    <div className="p-3 bg-indigo-900/30 rounded-full text-indigo-400 shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-indigo-300 uppercase mb-1 tracking-widest font-mono">Maverick Insight: Mistake of Fact</h4>
                                        <p className="text-[11px] text-slate-400 font-serif leading-relaxed italic">
                                            "The entire property tax system is based on the PRESUMPTION that you have waived your Allodial rights and accepted a statutory 'privilege' of owning land. P.T.A.R. is the forensic process of rebutting that presumption by identifying the 'Mistake of Fact'—the failure of the state to disclose the existence of the Patent root."
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="mt-8 flex justify-center">
                                    <button 
                                        onClick={() => onNavigate('drafter', 'allodial-title-deed')}
                                        className="px-8 py-3 bg-slate-900 border border-indigo-800 text-indigo-300 hover:bg-indigo-900 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all shadow-xl"
                                    >
                                        DRAFT ALLODIAL DECLARATION
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyTaxModule;
