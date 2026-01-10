
import React, { useState, useEffect, useMemo } from 'react';
import { WORKFLOWS, Workflow, WorkflowStep } from '../data/workflows';
import { getTacticalWisdom } from '../services/geminiService';

interface FilingNavigatorProps {
    onNavigate: (view: string, resourceId?: string, payload?: any) => void;
    initialWorkflowId?: string | null;
    payload?: any;
}

const FilingNavigator: React.FC<FilingNavigatorProps> = ({ onNavigate, initialWorkflowId, payload }) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [wisdom, setWisdom] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (initialWorkflowId) {
        const wf = (WORKFLOWS as any).find((w: any) => w.id === initialWorkflowId);
        if (wf) {
            setSelectedWorkflow(wf);
            if (payload && (wf.id === 'ds4194-authentication' || wf.id === 'allodial-transition-protocol')) {
                // If we have a payload, we skip the initial "Locate Document" step
                setActiveStepIndex(1);
                setCompletedSteps({ [wf.steps[0].id]: true });
            }
        }
    }
  }, [initialWorkflowId, payload]);

  useEffect(() => {
    if (selectedWorkflow) {
        const mockProject = { title: selectedWorkflow.title, artifacts: [], goals: [] } as any;
        getTacticalWisdom(mockProject).then(setWisdom);
    }
  }, [selectedWorkflow]);

  const filteredWorkflows = useMemo(() => {
    return WORKFLOWS.filter(wf => 
      wf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wf.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleWorkflowSelect = (wf: Workflow) => {
    setSelectedWorkflow(wf);
    setActiveStepIndex(0);
    setCompletedSteps({});
    setWisdom('');
  };

  const handleStepComplete = () => {
    if (!selectedWorkflow) return;
    const currentStep = (selectedWorkflow as any).steps[activeStepIndex];
    setCompletedSteps(prev => ({ ...prev, [currentStep.id]: true }));
    
    if (activeStepIndex < (selectedWorkflow as any).steps.length - 1) {
        setActiveStepIndex(prev => prev + 1);
    }
  };

  const handleStepClick = (index: number) => {
      if (!selectedWorkflow) return;
      const steps = (selectedWorkflow as any).steps;
      if (index <= activeStepIndex || (index > 0 && completedSteps[steps[index-1]?.id])) {
          setActiveStepIndex(index);
      }
  };

  // Check if a step's requirement is fulfilled by the current payload
  const isStepPayloadValidated = (stepId: string) => {
    if (!payload) return false;
    if (stepId.includes('longform') && payload.docType === 'Birth Certificate') return true;
    if (stepId.includes('forensic') && payload.identifiers?.stateFileNo) return true;
    return false;
  };

  return (
    <div className="flex h-full bg-slate-950">
      {/* Sidebar Nodes */}
      <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="font-serif font-bold text-sovereign-200 text-lg uppercase tracking-widest">Procedural Nodes</h2>
          <p className="text-xs text-slate-500 font-mono mt-1 mb-4 uppercase tracking-tighter">Structured Codex Paths</p>
          
          <div className="relative">
            <input 
              type="text"
              placeholder="Search guides..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-[10px] font-mono text-slate-300 focus:outline-none focus:border-sovereign-600 uppercase"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredWorkflows.map(wf => (
                <button
                    key={wf.id}
                    onClick={() => handleWorkflowSelect(wf)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedWorkflow?.id === wf.id 
                            ? 'bg-sovereign-900/30 border-sovereign-500 text-sovereign-100 shadow-[0_0_20px_rgba(197,131,52,0.1)]' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                >
                    <h3 className="font-bold text-xs mb-1 uppercase tracking-wider">{wf.title}</h3>
                    <p className="text-[9px] opacity-70 line-clamp-2 uppercase tracking-tighter">{wf.description}</p>
                </button>
            ))}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 p-8 overflow-y-auto flex flex-col relative">
        {selectedWorkflow ? (
            <div className="max-w-4xl mx-auto w-full space-y-6 animate-fade-in pb-20">
                
                {/* AXIOM-9 DATA BRIDGE */}
                {payload && (
                    <div className="bg-slate-900 border border-indigo-500/50 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-transparent"></div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold flex items-center">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
                                Axiom-9 Data Bridge: {payload.docType || 'Extraction Profile'}
                            </h3>
                            <button 
                                onClick={() => onNavigate('jarvis')}
                                className="text-[8px] font-mono text-slate-600 hover:text-indigo-400 uppercase border border-slate-800 px-2 py-1 rounded"
                            >
                                Re-Scan Signal
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-3 bg-slate-950 rounded border border-slate-800">
                                <span className="text-[8px] text-slate-600 uppercase font-mono block">State File No.</span>
                                <span className="text-xs font-mono text-indigo-300 font-bold">{payload.identifiers?.stateFileNo || 'NOT FOUND'}</span>
                            </div>
                            <div className="p-3 bg-slate-950 rounded border border-slate-800">
                                <span className="text-[8px] text-slate-600 uppercase font-mono block">Registrant Name</span>
                                <span className="text-xs font-mono text-emerald-400">{payload.entities?.nameOnRecord || 'PENDING'}</span>
                            </div>
                            <div className="p-3 bg-slate-950 rounded border border-slate-800">
                                <span className="text-[8px] text-slate-600 uppercase font-mono block">Reg. Date</span>
                                <span className="text-xs font-mono text-slate-400">{payload.identifiers?.registrationDate || 'N/A'}</span>
                            </div>
                            <div className="p-3 bg-slate-950 rounded border border-slate-800">
                                <span className="text-[8px] text-slate-600 uppercase font-mono block">Class</span>
                                <span className="text-xs font-mono text-amber-500 uppercase">{payload.isLongForm ? 'Vault/Long' : 'Abstract'}</span>
                            </div>
                        </div>
                    </div>
                )}

                {wisdom && (
                    <div className="bg-slate-900 border border-sovereign-800/50 p-6 rounded-2xl shadow-lg animate-fade-in flex items-start space-x-4">
                        <div className="p-3 bg-sovereign-900/50 rounded-full text-sovereign-400 shrink-0 border border-sovereign-800/50">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-mono text-sovereign-500 uppercase tracking-widest font-bold mb-1">Dr. Vale:</h4>
                            <p className="text-slate-200 text-sm italic font-serif leading-relaxed">"{wisdom}"</p>
                        </div>
                    </div>
                )}

                <header className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-white mb-2 uppercase tracking-widest">{selectedWorkflow.title}</h1>
                        <p className="text-slate-400 font-mono text-xs max-w-2xl uppercase tracking-tighter leading-relaxed">{selectedWorkflow.description}</p>
                    </div>
                </header>

                {/* Progress Visualizer */}
                <div className="flex items-center space-x-2 mb-4 overflow-x-auto pb-4 scrollbar-hide">
                    {(selectedWorkflow as any).steps.map((step: any, idx: number) => (
                        <div key={step.id} className="flex items-center shrink-0">
                             <div 
                                onClick={() => handleStepClick(idx)}
                                className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-bold text-[10px] cursor-pointer border-2 transition-all relative ${
                                    idx === activeStepIndex 
                                        ? 'bg-sovereign-600 border-sovereign-600 text-white shadow-[0_0_15px_rgba(212,162,86,0.4)] scale-110'
                                        : completedSteps[step.id] 
                                            ? 'bg-emerald-900 border-emerald-600 text-emerald-400' 
                                            : isStepPayloadValidated(step.id)
                                                ? 'bg-indigo-900/30 border-indigo-500/50 text-indigo-300'
                                                : 'bg-slate-900 border-slate-700 text-slate-600'
                                }`}
                             >
                                <span className="opacity-50">{idx + 1}</span>
                                {completedSteps[step.id] && <span>✓</span>}
                                {isStepPayloadValidated(step.id) && !completedSteps[step.id] && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border border-slate-900 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                                    </div>
                                )}
                             </div>
                             {idx < (selectedWorkflow as any).steps.length - 1 && (
                                 <div className={`w-12 h-0.5 mx-2 ${
                                     completedSteps[step.id] ? 'bg-emerald-800' : 'bg-slate-800'
                                 }`}></div>
                             )}
                        </div>
                    ))}
                </div>

                {/* Node Detail */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-mono text-sovereign-500 uppercase tracking-[0.3em] font-bold">PROCEDURAL NODE {activeStepIndex + 1}</span>
                            {isStepPayloadValidated((selectedWorkflow as any).steps[activeStepIndex].id) && (
                                <span className="text-[9px] bg-indigo-900/50 text-indigo-300 border border-indigo-800 px-2 py-1 rounded font-mono uppercase flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    Requirement Satisfied via Neural Scan
                                </span>
                            )}
                        </div>
                        
                        <h2 className="text-2xl font-serif font-bold text-white mb-4 uppercase tracking-widest">{(selectedWorkflow as any).steps[activeStepIndex].title}</h2>
                        <p className="text-slate-400 mb-8 text-xs font-mono leading-relaxed uppercase tracking-tighter">{(selectedWorkflow as any).steps[activeStepIndex].description}</p>

                        <div className="bg-slate-950/80 rounded-xl p-8 border border-slate-800 mb-8 shadow-inner">
                            <h3 className="text-[10px] font-bold text-emerald-500 uppercase mb-6 flex items-center tracking-widest">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                Tactical Directives
                            </h3>
                            <ul className="space-y-6">
                                {(selectedWorkflow as any).steps[activeStepIndex].instructions.map((inst: string, i: number) => (
                                    <li key={i} className="flex items-start text-[11px] text-slate-300 font-mono uppercase tracking-tighter leading-relaxed">
                                        <span className="mr-4 text-emerald-600/50 font-bold bg-slate-900 w-5 h-5 flex items-center justify-center rounded border border-slate-800 shrink-0">{i+1}</span>
                                        {inst}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mb-10">
                             {(selectedWorkflow as any).steps[activeStepIndex].recommendedTemplateId && (
                                 <button 
                                    onClick={() => onNavigate('drafter', (selectedWorkflow as any).steps[activeStepIndex].recommendedTemplateId, payload)}
                                    className="flex items-center space-x-3 bg-indigo-900/20 hover:bg-indigo-800/30 px-6 py-4 rounded-xl border border-indigo-800/40 transition-all group shadow-xl"
                                 >
                                     <div className="p-2 bg-indigo-900/30 rounded-lg group-hover:bg-indigo-800/50">
                                        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                     </div>
                                     <div className="text-left">
                                        <span className="text-[10px] text-indigo-300 font-bold uppercase block mb-0.5 tracking-wider">Axiom Instrument Drafter</span>
                                        <span className="text-[9px] text-white font-mono block uppercase">Generate Record {payload ? '(Auto-filled)' : ''} &rarr;</span>
                                     </div>
                                 </button>
                             )}
                        </div>

                        <div className="flex justify-between items-center pt-8 border-t border-slate-800/50">
                            <button 
                                onClick={() => handleStepClick(activeStepIndex - 1)}
                                disabled={activeStepIndex === 0}
                                className="px-4 py-2 text-slate-600 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-[10px] font-mono tracking-widest uppercase"
                            >
                                ← REWIND NODE
                            </button>
                            <button 
                                onClick={handleStepComplete}
                                className="px-10 py-4 bg-sovereign-700 hover:bg-sovereign-600 text-white font-bold font-serif rounded-xl shadow-2xl transition-all flex items-center text-[11px] uppercase tracking-widest"
                            >
                                {activeStepIndex === (selectedWorkflow as any).steps.length - 1 ? 'QUEST FINALIZED' : 'VALIDATE & ADVANCE NODE →'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-700 animate-pulse bg-slate-900/20 rounded-3xl border-2 border-dashed border-slate-800/50 m-4">
                <svg className="w-24 h-24 mb-6 opacity-20 text-sovereign-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h2 className="text-2xl font-serif italic text-slate-500 uppercase tracking-widest">Procedural Standby</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.5em] mt-2 text-slate-600 italic">Inject signal to initiate workflow.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default FilingNavigator;
