
import React, { useState, useEffect } from 'react';
import { put, list } from '../lib/store';

interface RemedyProcess {
    id: string;
    targetName: string;
    referenceNo: string;
    status: 'ACTIVE' | 'DEFAULT' | 'CLOSED';
    step: 1 | 2 | 3;
    dates: {
        step1?: string;
        step2?: string;
        step3?: string;
    };
    tracking: {
        step1?: string;
        step2?: string;
    };
}

const RemedyTracker: React.FC<{ onNavigate: (view: string, id: string) => void }> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'admin' | 'fees'>('admin');
    const [processes, setProcesses] = useState<RemedyProcess[]>([]);
    const [newProcess, setNewProcess] = useState({ target: '', ref: '' });
    
    // Fee Enforcer State
    const [invoice, setInvoice] = useState({
        to: '',
        violation: 'Rights Violation',
        amount: '10000',
        date: new Date().toISOString().split('T')[0]
    });
    const [generatedInvoice, setGeneratedInvoice] = useState('');

    useEffect(() => {
        setProcesses(list<RemedyProcess>('remedies'));
    }, []);

    const createProcess = () => {
        if (!newProcess.target) return;
        const p: RemedyProcess = {
            id: crypto.randomUUID(),
            targetName: newProcess.target,
            referenceNo: newProcess.ref,
            status: 'ACTIVE',
            step: 1,
            dates: {},
            tracking: {}
        };
        put('remedies', p.id, p);
        setProcesses(list<RemedyProcess>('remedies'));
        setNewProcess({ target: '', ref: '' });
    };

    const updateProcess = (p: RemedyProcess) => {
        put('remedies', p.id, p);
        setProcesses(list<RemedyProcess>('remedies'));
    };

    const advanceStep = (p: RemedyProcess) => {
        if (p.step < 3) {
            p.step += 1;
            p.dates[`step${p.step}` as keyof typeof p.dates] = new Date().toISOString();
            updateProcess(p);
        } else {
            p.status = 'DEFAULT';
            updateProcess(p);
        }
    };

    const generateInvoiceText = () => {
        const txt = `COMMERCIAL INVOICE & DEMAND FOR PAYMENT
        
DATE: ${invoice.date}
TO: ${invoice.to.toUpperCase()}
FROM: Secured Party Creditor

RE: VIOLATION OF RIGHTS / TRESPASS

DESCRIPTION OF SERVICE / VIOLATION:
${invoice.violation}

AMOUNT DUE: $${Number(invoice.amount).toLocaleString()}.00 USD

TERMS:
Payment is due immediately upon receipt. This is a liquidated debt obligation arising from the consensual contract established via your actions after Notice of Fee Schedule was provided.

Failure to pay within 30 days will result in a Notice of Default and Commercial Lien.

REMIT TO:
[Trust Name / Mailing Location]`;
        setGeneratedInvoice(txt);
    };

    return (
        <div className="h-full bg-slate-950 p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
                <header className="border-b border-slate-800 pb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-sovereign-200">Remedy Tracker</h1>
                        <p className="text-slate-400 font-mono text-sm">Administrative Procedure & Fee Enforcement</p>
                    </div>
                    <div className="flex space-x-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button onClick={() => setActiveTab('admin')} className={`px-4 py-2 rounded text-xs font-mono uppercase ${activeTab === 'admin' ? 'bg-sovereign-700 text-white' : 'text-slate-400 hover:text-white'}`}>Admin Procedure</button>
                        <button onClick={() => setActiveTab('fees')} className={`px-4 py-2 rounded text-xs font-mono uppercase ${activeTab === 'fees' ? 'bg-emerald-800 text-white' : 'text-slate-400 hover:text-white'}`}>Fee Enforcer</button>
                    </div>
                </header>

                {activeTab === 'admin' ? (
                    <div className="space-y-8">
                        {/* New Process Creator */}
                        <div className="bg-slate-900 p-4 rounded border border-slate-800 flex items-end gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 uppercase font-mono block mb-1">Target / Agency</label>
                                <input value={newProcess.target} onChange={e => setNewProcess({...newProcess, target: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" placeholder="e.g. IRS / Bank of America" />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 uppercase font-mono block mb-1">Reference No.</label>
                                <input value={newProcess.ref} onChange={e => setNewProcess({...newProcess, ref: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" placeholder="Account # or Case #" />
                            </div>
                            <button onClick={createProcess} className="bg-sovereign-700 hover:bg-sovereign-600 text-white px-4 py-2 rounded text-sm font-bold font-serif h-[38px]">INITIATE REMEDY</button>
                        </div>

                        {/* Active Processes */}
                        <div className="grid gap-4">
                            {processes.map(p => (
                                <div key={p.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-sovereign-500"></div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{p.targetName}</h3>
                                            <p className="text-xs text-slate-400 font-mono">REF: {p.referenceNo}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${p.status === 'DEFAULT' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800' : 'bg-blue-900/30 text-blue-400 border-blue-800'}`}>
                                            {p.status}
                                        </span>
                                    </div>

                                    {/* Progress Stepper */}
                                    <div className="flex items-center justify-between mb-6 relative">
                                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10"></div>
                                        {[1, 2, 3].map(step => (
                                            <div key={step} className={`flex flex-col items-center gap-2 bg-slate-900 px-2 ${step > p.step ? 'opacity-50' : ''}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${step <= p.step ? 'bg-sovereign-600 border-sovereign-600 text-white' : 'bg-slate-950 border-slate-700 text-slate-600'}`}>
                                                    {step}
                                                </div>
                                                <span className="text-[10px] font-mono text-slate-400">
                                                    {step === 1 ? 'CONDITIONAL ACCEPTANCE' : step === 2 ? 'NOTICE OF FAULT' : 'DEFAULT JUDGMENT'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 border-t border-slate-800 pt-4">
                                        {p.step === 1 && (
                                            <button 
                                                onClick={() => onNavigate('drafter', 'conditional-acceptance-offer')}
                                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-xs font-mono border border-slate-700"
                                            >
                                                DRAFT NOTICE #1
                                            </button>
                                        )}
                                        {p.step === 2 && (
                                            <button 
                                                onClick={() => onNavigate('drafter', 'notice-fault-cure')}
                                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-xs font-mono border border-slate-700"
                                            >
                                                DRAFT NOTICE #2
                                            </button>
                                        )}
                                        {p.step === 3 && p.status !== 'DEFAULT' && (
                                            <button 
                                                onClick={() => onNavigate('drafter', 'certificate-non-response')}
                                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-xs font-mono border border-slate-700"
                                            >
                                                DRAFT DEFAULT CERT
                                            </button>
                                        )}
                                        
                                        {p.status !== 'DEFAULT' && (
                                            <button 
                                                onClick={() => advanceStep(p)}
                                                className="px-4 py-2 bg-emerald-900/30 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/50 rounded text-xs font-bold"
                                            >
                                                {p.step === 3 ? 'FINALIZE DEFAULT' : 'ADVANCE STEP ->'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {processes.length === 0 && <div className="text-center text-slate-600 font-mono text-xs py-10">No active administrative remedies. Initiate one above.</div>}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="bg-slate-900 p-6 rounded border border-slate-800">
                                <h3 className="text-sm font-bold text-emerald-500 uppercase mb-4">Invoice Generator</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">Bill To (Agent/Agency)</label>
                                        <input value={invoice.to} onChange={e => setInvoice({...invoice, to: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">Violation Description</label>
                                        <input value={invoice.violation} onChange={e => setInvoice({...invoice, violation: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs text-slate-500 block mb-1">Amount ($)</label>
                                            <input value={invoice.amount} onChange={e => setInvoice({...invoice, amount: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" type="number" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs text-slate-500 block mb-1">Date</label>
                                            <input value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" type="date" />
                                        </div>
                                    </div>
                                    <button onClick={generateInvoiceText} className="w-full mt-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 rounded shadow text-xs tracking-wider">
                                        GENERATE COMMERCIAL INVOICE
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white text-slate-900 p-8 font-mono text-xs whitespace-pre-wrap shadow-2xl rounded relative">
                            {generatedInvoice || <div className="absolute inset-0 flex items-center justify-center text-slate-400">Preview Invoice Here</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RemedyTracker;
