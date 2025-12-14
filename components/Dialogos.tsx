import React, { useState } from 'react';
import { dialogosDraft, dialogosScan } from '../services/geminiService';

const Dialogos: React.FC = () => {
  const [ctx, setCtx] = useState({ creditor: '', accountNumber: '', amount: '', type: 'AccordAndSatisfaction' });
  const [draft, setDraft] = useState('');
  const [scan, setScan] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'draft' | 'scan'>('draft');

  const handleDraft = async () => {
    setLoading(true);
    const text = await dialogosDraft(ctx);
    setDraft(text);
    setLoading(false);
  };

  const handleScan = async () => {
    if (!draft && !scan) return;
    setScanLoading(true);
    // If scanning the draft, use draft. If scanning pasted text (manual), we'd need another input, but for MVP we scan the draft.
    const text = await dialogosScan(draft);
    setScan(text);
    setScanLoading(false);
  };

  return (
    <div className="h-full bg-slate-950 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 border-b border-sovereign-800 pb-4">
            <div className="w-10 h-10 rounded bg-sovereign-900/50 flex items-center justify-center border border-sovereign-700">
                <svg className="w-6 h-6 text-sovereign-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </div>
            <div>
                <h2 className="text-2xl font-serif font-bold text-sovereign-200">Dialogos Engine</h2>
                <p className="text-sm text-slate-400 font-mono">Remedy Drafting & Semantic Risk Analysis</p>
            </div>
        </div>

        <div className="flex space-x-4">
            <div className="w-1/3 space-y-4">
                <div className="bg-slate-900 p-4 rounded border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-sovereign-500 uppercase font-mono">Context Parameters</h3>
                    <input 
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200" 
                        placeholder="Creditor Name"
                        value={ctx.creditor} onChange={e => setCtx({...ctx, creditor: e.target.value})}
                    />
                    <input 
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200" 
                        placeholder="Account Number"
                        value={ctx.accountNumber} onChange={e => setCtx({...ctx, accountNumber: e.target.value})}
                    />
                    <input 
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200" 
                        placeholder="Amount"
                        value={ctx.amount} onChange={e => setCtx({...ctx, amount: e.target.value})}
                    />
                    <select 
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200"
                        value={ctx.type} onChange={e => setCtx({...ctx, type: e.target.value})}
                    >
                        <option value="AccordAndSatisfaction">Accord & Satisfaction</option>
                        <option value="DebtValidation">Debt Validation (FDCPA)</option>
                        <option value="ConditionalAcceptance">Conditional Acceptance</option>
                    </select>
                    <button 
                        onClick={handleDraft}
                        disabled={loading}
                        className="w-full py-2 bg-sovereign-700 hover:bg-sovereign-600 text-white font-bold font-serif rounded shadow transition-all text-sm"
                    >
                        {loading ? 'DRAFTING...' : 'GENERATE DRAFT'}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col space-y-4">
                <div className="flex space-x-2 border-b border-slate-800">
                    <button 
                        onClick={() => setActiveTab('draft')}
                        className={`px-4 py-2 text-sm font-mono border-b-2 transition-colors ${activeTab === 'draft' ? 'border-sovereign-500 text-sovereign-200' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                        Draft Output
                    </button>
                    <button 
                        onClick={() => setActiveTab('scan')}
                        className={`px-4 py-2 text-sm font-mono border-b-2 transition-colors ${activeTab === 'scan' ? 'border-red-500 text-red-200' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                    >
                        Semantic Scan
                    </button>
                </div>

                <div className="flex-1 bg-slate-900 border border-slate-700 rounded p-6 min-h-[400px] whitespace-pre-wrap font-mono text-sm text-slate-300 overflow-y-auto">
                    {activeTab === 'draft' ? (
                        draft || <span className="text-slate-600 italic">No draft generated yet.</span>
                    ) : (
                        scan || (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <span className="text-slate-500">Analyze the draft for traps like joinder, venue, or unintended consent.</span>
                                <button 
                                    onClick={handleScan}
                                    disabled={!draft || scanLoading}
                                    className="px-4 py-2 bg-red-900/50 border border-red-800 text-red-200 hover:bg-red-900 rounded font-mono text-xs"
                                >
                                    {scanLoading ? 'SCANNING...' : 'RUN SEMANTIC SCAN'}
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogos;