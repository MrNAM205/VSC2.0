import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="h-full bg-slate-950 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center py-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-sovereign-200 via-sovereign-400 to-sovereign-200 mb-4">
                Sovereign Cockpit
            </h1>
            <p className="text-slate-400 font-mono tracking-widest text-sm uppercase">Verobrix / Omniverobrix Integration Active</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-sovereign-800/50 transition-colors shadow-lg group">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-slate-800 rounded group-hover:bg-sovereign-900/50 transition-colors">
                        <svg className="w-6 h-6 text-sovereign-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="font-serif font-bold text-slate-200">Knowledge Status</h3>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                        <span>Federal Corpus</span>
                        <span className="text-emerald-500 font-mono">ONLINE</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                        <span>Alabama Code</span>
                        <span className="text-emerald-500 font-mono">ONLINE</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-400 border-b border-slate-800 pb-2">
                        <span>UCC Registry</span>
                        <span className="text-emerald-500 font-mono">ONLINE</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-400 pb-2">
                        <span>Black's 4th Ed.</span>
                        <span className="text-emerald-500 font-mono">INDEXED</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-sovereign-800/50 transition-colors shadow-lg group">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-slate-800 rounded group-hover:bg-sovereign-900/50 transition-colors">
                        <svg className="w-6 h-6 text-sovereign-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="font-serif font-bold text-slate-200">Cognition Layer</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                    Gemini 2.5 Flash active. Synthesizing lawful doctrine and refuting pseudotheory with high precision.
                </p>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-sovereign-500">
                    > SYSTEM READY<br/>> WAITING FOR QUERY...
                </div>
            </div>

            <div className="md:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-sovereign-800/50 transition-colors shadow-lg">
                <h3 className="font-serif font-bold text-slate-200 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Status Correction', 'Hidden Identifiers', 'Draft Mandamus', 'Search Corpus'].map((action, i) => (
                        <button key={i} className="p-4 bg-slate-950 border border-slate-800 rounded hover:bg-slate-800 hover:border-sovereign-700 transition-all group text-left">
                            <span className="text-xs text-sovereign-600 font-mono mb-1 block">Module 0{i+1}</span>
                            <span className="text-sm font-bold text-slate-300 group-hover:text-sovereign-200">{action}</span>
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