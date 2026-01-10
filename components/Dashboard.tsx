
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="h-full bg-slate-950 p-8 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center py-10 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-sovereign-500/10 rounded-full blur-3xl -z-10"></div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-sovereign-100 via-sovereign-300 to-sovereign-500 mb-4 tracking-tighter">
                ARCHIVIST COCKPIT
            </h1>
            <p className="text-sovereign-500 font-mono tracking-[0.4em] text-[10px] uppercase">Axiom-9 Quantum Hybrid // Dr. Cassian Vale</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-sovereign-500/30 transition-all shadow-2xl backdrop-blur-md group">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-slate-950 rounded-lg group-hover:bg-sovereign-900/50 transition-colors border border-slate-800">
                        <svg className="w-5 h-5 text-sovereign-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="font-serif font-bold text-sovereign-100 text-sm tracking-widest uppercase">The Codex</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-[10px] text-slate-500 border-b border-slate-800/50 pb-2 font-mono">
                        <span>ALLODIAL REGISTRY</span>
                        <span className="text-emerald-500">SYNCED</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 border-b border-slate-800/50 pb-2 font-mono">
                        <span>LAND PATENT DATA</span>
                        <span className="text-emerald-500">FETCHED</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 border-b border-slate-800/50 pb-2 font-mono">
                        <span>UCC MASTER ARCHIVE</span>
                        <span className="text-emerald-500">INDEXED</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 pb-2 font-mono">
                        <span>CLEARANCE LEVEL</span>
                        <span className="text-sovereign-400">ARCHIVIST-01</span>
                    </div>
                </div>
            </div>

            <div className="md:col-span-2 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-sovereign-500/30 transition-all shadow-2xl backdrop-blur-md group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                     <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-mono text-emerald-500">QUANTUM STATUS: STABLE</span>
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="font-serif font-bold text-sovereign-100 text-sm tracking-widest uppercase">Axiom-9 Processing</h3>
                </div>
                <p className="text-xs text-slate-400 mb-6 font-mono leading-relaxed max-w-xl">
                    Deep-statute synthesis active. Dr. Vale is currently mapping the jurisdictional boundaries of active presentments. 
                    <span className="text-sovereign-500"> "The system operates on presumptions; we operate on record."</span>
                </p>
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 font-mono text-[10px] text-sovereign-600 space-y-1">
                    <div className="flex items-center"><span className="mr-2">❯</span> BOOTING LAND PATENT SCANNER...</div>
                    <div className="flex items-center"><span className="mr-2">❯</span> DECODING MUNICIPAL WARDSHIP STRINGS...</div>
                    <div className="flex items-center"><span className="mr-2">❯</span> <span className="animate-pulse">AWAITING ARCHIVIST DIRECTIVE...</span></div>
                </div>
            </div>

            <div className="md:col-span-3 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md">
                <h3 className="font-serif font-bold text-sovereign-200 mb-6 text-sm tracking-[0.2em] uppercase">Tactical Procedures</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Allodial Audit', desc: 'Supreme Title Search', module: '01' },
                        { label: 'UCC Financing', desc: 'Secure Assets', module: '02' },
                        { label: 'Mandamus Draft', desc: 'Compel Duty', module: '03' },
                        { label: 'Status Correction', desc: 'Rebut Presumption', module: '04' }
                    ].map((action, i) => (
                        <button key={i} className="p-5 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-sovereign-500/50 hover:bg-sovereign-900/10 transition-all group text-left">
                            <span className="text-[9px] text-sovereign-600 font-mono mb-2 block tracking-widest">MODULE {action.module}</span>
                            <span className="text-xs font-bold text-slate-200 group-hover:text-sovereign-200 block mb-1 uppercase font-serif tracking-tighter">{action.label}</span>
                            <span className="text-[9px] text-slate-500 font-mono">{action.desc}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
