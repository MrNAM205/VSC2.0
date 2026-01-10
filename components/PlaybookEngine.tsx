
import React, { useState, useMemo } from 'react';
import { PLAYBOOKS } from '../data/playbooks';
import { TEMPLATES } from '../data/templates';
import { MOCK_CORPUS } from '../data/corpus';
import { Playbook, CorpusItem, ArchiveEntry } from '../types';

interface PlaybookEngineProps {
    onArchive: (entry: ArchiveEntry) => void;
}

const PlaybookEngine: React.FC<PlaybookEngineProps> = ({ onArchive }) => {
    const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
    const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
    const [facts, setFacts] = useState<Record<string, string>>({});
    const [selectedCitations, setSelectedCitations] = useState<string[]>([]);
    const [packet, setPacket] = useState('');

    const relatedCitations = useMemo(() => {
        if (!selectedPlaybook) return [];
        return MOCK_CORPUS.filter(c => selectedPlaybook.relevantTags.some(tag => c.tags.includes(tag)));
    }, [selectedPlaybook]);

    const handleSelectPlaybook = (p: Playbook) => {
        setSelectedPlaybook(p);
        setFacts({});
        setSelectedCitations([]);
        setPacket('');
        setActiveStep(2);
    };

    const toggleCitation = (id: string) => {
        setSelectedCitations(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const generatePacket = () => {
        if (!selectedPlaybook) return;
        const template = TEMPLATES.find(t => t.id === selectedPlaybook.templateId);
        if (!template) return;

        let content = template.content;
        // Fix for TypeScript error: casting Object.entries to ensure value is recognized as string
        (Object.entries(facts) as Array<[string, string]>).forEach(([key, value]) => {
            // Using split/join instead of replace with RegExp to avoid TypeScript overload resolution issues (Fix for line 43 error)
            const replacementValue = value || `[MISSING ${key.toUpperCase()}]`;
            content = content.split(`{{${key}}}`).join(replacementValue);
        });

        const citationsBlock = selectedCitations.length > 0 ? 
            `\n\nLEGAL AUTHORITIES CITED:\n` + 
            selectedCitations.map(id => {
                const c = MOCK_CORPUS.find(x => x.id === id);
                return `- ${c?.title}: ${c?.citation}\n  "${c?.text}"`;
            }).join('\n\n') : '';

        const nextStepsBlock = `\n\nFOLLOW-UP PROTOCOL & NEXT STEPS:\n` + selectedPlaybook.nextSteps.map((s, i) => `${i+1}. ${s}`).join('\n');
        const appealBlock = `\n\nGROUNDS FOR APPEAL (IF REMEDY DENIED):\n` + selectedPlaybook.appealGrounds.map((s, i) => `• ${s}`).join('\n');

        const finalPacket = content + citationsBlock + nextStepsBlock + appealBlock;
        setPacket(finalPacket);
        setActiveStep(4);
    };

    return (
        <div className="h-full bg-slate-950 flex flex-col overflow-hidden">
            {/* Playbook Header */}
            <div className="p-6 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-sovereign-200">Remedy Playbooks</h2>
                    <p className="text-xs text-slate-500 font-mono mt-1">Interactive remedy generation wizard.</p>
                </div>
                <div className="flex space-x-2">
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs ${activeStep === s ? 'bg-sovereign-700 border-sovereign-500 text-white' : 'border-slate-700 text-slate-600'}`}>{s}</div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto">
                    {activeStep === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {PLAYBOOKS.map(p => (
                                <button 
                                    key={p.id} 
                                    onClick={() => handleSelectPlaybook(p)}
                                    className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-sovereign-700 transition-all text-left group"
                                >
                                    <h3 className="font-serif font-bold text-lg text-slate-200 group-hover:text-sovereign-300 mb-2">{p.title}</h3>
                                    <p className="text-sm text-slate-500">{p.description}</p>
                                </button>
                            ))}
                        </div>
                    )}

                    {activeStep === 2 && selectedPlaybook && (
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
                            <h3 className="text-lg font-serif font-bold text-sovereign-300">Phase I: Fact Ingestion</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedPlaybook.facts.map(f => (
                                    <div key={f.key}>
                                        <label className="block text-xs font-mono text-slate-500 uppercase mb-1">{f.label}</label>
                                        {f.type === 'select' ? (
                                            <select 
                                                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200"
                                                value={facts[f.key] || ''}
                                                onChange={e => setFacts({...facts, [f.key]: e.target.value})}
                                            >
                                                <option value="">Select Option...</option>
                                                {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        ) : f.type === 'textarea' ? (
                                            <textarea 
                                                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200 h-24"
                                                value={facts[f.key] || ''}
                                                onChange={e => setFacts({...facts, [f.key]: e.target.value})}
                                            />
                                        ) : (
                                            <input 
                                                type={f.type} 
                                                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200"
                                                value={facts[f.key] || ''}
                                                onChange={e => setFacts({...facts, [f.key]: e.target.value})}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setActiveStep(3)} className="w-full bg-sovereign-700 py-3 rounded font-bold text-white shadow-lg">PROCEED TO CITATIONS</button>
                        </div>
                    )}

                    {activeStep === 3 && selectedPlaybook && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-serif font-bold text-sovereign-300">Phase II: Citation Selection</h3>
                                <span className="text-xs text-slate-500 font-mono">{selectedCitations.length} selected</span>
                            </div>
                            <div className="grid gap-4">
                                {relatedCitations.map(c => (
                                    <div 
                                        key={c.id} 
                                        onClick={() => toggleCitation(c.id)}
                                        className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedCitations.includes(c.id) ? 'bg-emerald-900/20 border-emerald-600' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                                    >
                                        <div className="flex justify-between mb-1">
                                            <span className="font-bold text-sm text-slate-200">{c.title}</span>
                                            <span className="text-[10px] text-slate-500">{c.citation}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 italic line-clamp-2">"{c.text}"</p>
                                    </div>
                                ))}
                                {relatedCitations.length === 0 && <p className="text-slate-600 italic text-sm">No specific citations matched tags. Reference Knowledge Corpus for general maxims.</p>}
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setActiveStep(2)} className="flex-1 bg-slate-800 py-3 rounded text-slate-300 font-bold">BACK</button>
                                <button onClick={generatePacket} className="flex-1 bg-emerald-700 py-3 rounded font-bold text-white shadow-lg">GENERATE REMEDY PACKET</button>
                            </div>
                        </div>
                    )}

                    {activeStep === 4 && (
                        <div className="space-y-6 animate-fade-in pb-10">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-serif font-bold text-emerald-500 uppercase tracking-widest">Remedy Packet Generated</h3>
                                <div className="flex space-x-2">
                                    <button onClick={() => { 
                                        onArchive({
                                            id: `playbook-${Date.now()}`,
                                            timestamp: Date.now(),
                                            type: 'PLAYBOOK',
                                            title: selectedPlaybook?.title || 'Remedy Packet',
                                            summary: 'Generated interactive remedy packet.',
                                            details: packet,
                                            checksum: '0x' + Math.random().toString(16).slice(2, 10).toUpperCase()
                                        });
                                        alert('Packet Secured to Archive.');
                                    }} className="px-4 py-2 bg-indigo-900/40 text-indigo-400 border border-indigo-800 rounded text-xs font-mono">SECURE TO ARCHIVE</button>
                                    <button onClick={() => setActiveStep(1)} className="px-4 py-2 bg-slate-800 text-slate-400 rounded text-xs font-mono">NEW REMEDY</button>
                                </div>
                            </div>
                            <div className="bg-white text-slate-900 p-10 font-mono text-sm shadow-2xl rounded-sm whitespace-pre-wrap min-h-[500px] border border-slate-300">
                                {packet}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlaybookEngine;
