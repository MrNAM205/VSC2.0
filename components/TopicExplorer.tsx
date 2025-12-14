
import React, { useState, useMemo } from 'react';
import { SCRIPTS } from '../data/scripts';
import { TEMPLATES } from '../data/templates';
import { WORKFLOWS } from '../data/workflows';
import { MOCK_CORPUS } from '../data/corpus';

interface TopicExplorerProps {
    onNavigate: (view: string, resourceId?: string) => void;
}

const TOPICS = [
    { id: 'identity', label: 'Identity & Status', tags: ['status', 'identity', 'vital-records', 'authentication', 'pro-se', 'sui-juris', 'domicile', 'indigenous', 'undrip'] },
    { id: 'traffic', label: 'Traffic & Travel', tags: ['travel', 'traffic', 'police', '4th-amendment', '5th-amendment'] },
    { id: 'court', label: 'Courtroom Procedure', tags: ['court', 'jurisdiction', 'procedure', 'dismissal', 'evidence', 'defense', 'rescission', 'offer', 'conflict-of-laws', 'lex-fori', 'tos-law', 'privacy', 'exclusive-equity'] },
    { id: 'commercial', label: 'Commercial Remedy', tags: ['commercial', 'commercial-law', 'debt', 'ucc', 'finance', 'negotiable-instruments', 'tender', 'discharge'] },
    { id: 'equity', label: 'Equity & Recourse', tags: ['equity', 'rebuttal', 'notice', 'cure', 'demand', 'claim', 'estoppel', 'remedy', 'default'] },
    { id: 'trusts', label: 'Trusts & Estate', tags: ['trust', 'trusts', 'estate', 'banking', 'equity', 'property'] },
];

const TopicExplorer: React.FC<TopicExplorerProps> = ({ onNavigate }) => {
    const [selectedTopicId, setSelectedTopicId] = useState<string>(TOPICS[0].id);

    const activeTopic = TOPICS.find(t => t.id === selectedTopicId);

    const filteredData = useMemo(() => {
        if (!activeTopic) return { workflows: [], scripts: [], templates: [], corpus: [] };
        
        const hasTag = (itemTags: string[]) => itemTags.some(tag => activeTopic.tags.includes(tag));

        return {
            workflows: WORKFLOWS.filter(w => w.steps.some(step => step.recommendedScriptId && SCRIPTS.find(s => s.id === step.recommendedScriptId && hasTag(s.tags))) || (w.id.includes(activeTopic.id) || w.title.toLowerCase().includes(activeTopic.tags[0]))), // Loose matching for workflows since they don't have tags property, matching via content logic or ID
            scripts: SCRIPTS.filter(s => hasTag(s.tags)),
            templates: TEMPLATES.filter(t => t.id.includes(activeTopic.tags[0]) || (t.jurisdiction && activeTopic.tags.some(tag => t.jurisdiction.toLowerCase().includes(tag))) || (t.name.toLowerCase().includes(activeTopic.tags[0]))), // Loose matching for templates
            corpus: MOCK_CORPUS.filter(c => hasTag(c.tags))
        };
    }, [activeTopic]);

    // Enhanced workflow matching logic since workflows don't have a 'tags' array in types
    // We infer relevance if the workflow title or description matches the topic keywords
    const relevantWorkflows = useMemo(() => {
        if (!activeTopic) return [];
        return WORKFLOWS.filter(w => 
            activeTopic.tags.some(tag => 
                w.title.toLowerCase().includes(tag) || 
                w.description.toLowerCase().includes(tag) ||
                w.id.toLowerCase().includes(tag)
            )
        );
    }, [activeTopic]);
    
    // Enhanced template matching
    const relevantTemplates = useMemo(() => {
        if (!activeTopic) return [];
        return TEMPLATES.filter(t => 
             // Templates don't have tags, use ID/Name/Desc
             activeTopic.tags.some(tag => 
                t.name.toLowerCase().includes(tag) || 
                t.description.toLowerCase().includes(tag) ||
                t.id.toLowerCase().includes(tag)
             )
        );
    }, [activeTopic]);


    return (
        <div className="flex h-full bg-slate-950">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="font-serif font-bold text-sovereign-200 text-lg">Topic Explorer</h2>
                    <p className="text-xs text-slate-500 font-mono mt-1">Thematic Knowledge Hub</p>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {TOPICS.map(topic => (
                        <button
                            key={topic.id}
                            onClick={() => setSelectedTopicId(topic.id)}
                            className={`w-full text-left px-4 py-3 rounded transition-all text-sm font-bold font-serif ${
                                selectedTopicId === topic.id
                                    ? 'bg-sovereign-900/30 text-sovereign-200 border border-sovereign-700'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                            }`}
                        >
                            {topic.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-4xl font-serif font-bold text-sovereign-200 mb-2">{activeTopic?.label}</h1>
                        <p className="text-slate-400 font-mono text-sm">
                            Aggregated resources: {relevantWorkflows.length} Workflows, {filteredData.scripts.length} Scripts, {relevantTemplates.length} Templates, {filteredData.corpus.length} Definitions.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Workflows Column */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-emerald-500 border-b border-slate-800 pb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                Guided Workflows
                            </h2>
                            {relevantWorkflows.length > 0 ? (
                                relevantWorkflows.map(wf => (
                                    <div key={wf.id} className="bg-slate-900 border border-slate-800 rounded p-4 hover:border-emerald-700/50 transition-colors">
                                        <h3 className="font-bold text-slate-200">{wf.title}</h3>
                                        <p className="text-xs text-slate-500 mt-1 mb-3">{wf.description}</p>
                                        <button 
                                            onClick={() => onNavigate('filing', wf.id)}
                                            className="text-xs bg-emerald-900/30 text-emerald-400 px-3 py-1.5 rounded border border-emerald-900 hover:bg-emerald-900/50"
                                        >
                                            OPEN GUIDE &rarr;
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-slate-600 text-xs italic">No specific workflows found for this topic.</div>
                            )}

                            <h2 className="text-xl font-bold text-blue-500 border-b border-slate-800 pb-2 pt-6 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                Scripts & Verbal Acts
                            </h2>
                            {filteredData.scripts.length > 0 ? (
                                <div className="space-y-3">
                                    {filteredData.scripts.map(s => (
                                        <div key={s.id} className="bg-slate-900 border border-slate-800 rounded p-3 flex justify-between items-center group cursor-pointer hover:border-blue-900/50" onClick={() => onNavigate('scripts', s.id)}>
                                            <div>
                                                <h3 className="font-bold text-slate-300 text-sm group-hover:text-blue-400">{s.title}</h3>
                                                <span className="text-[10px] text-slate-500">{s.category}</span>
                                            </div>
                                            <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-slate-600 text-xs italic">No scripts found.</div>
                            )}
                        </div>

                        {/* Templates & Law Column */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-purple-500 border-b border-slate-800 pb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Templates & Remedies
                            </h2>
                            {relevantTemplates.length > 0 ? (
                                relevantTemplates.map(t => (
                                    <div key={t.id} className="bg-slate-900 border border-slate-800 rounded p-4 hover:border-purple-900/50 transition-colors">
                                        <h3 className="font-bold text-slate-200">{t.name}</h3>
                                        <div className="flex items-center space-x-2 mt-1 mb-3">
                                            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">{t.jurisdiction}</span>
                                        </div>
                                        <button 
                                            onClick={() => onNavigate('drafter', t.id)}
                                            className="text-xs bg-purple-900/30 text-purple-400 px-3 py-1.5 rounded border border-purple-900 hover:bg-purple-900/50"
                                        >
                                            DRAFT DOCUMENT &rarr;
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-slate-600 text-xs italic">No templates found.</div>
                            )}

                            <h2 className="text-xl font-bold text-sovereign-500 border-b border-slate-800 pb-2 pt-6 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                Knowledge Corpus
                            </h2>
                            <div className="space-y-2">
                                {filteredData.corpus.slice(0, 5).map(c => (
                                    <div key={c.id} className="bg-slate-900/50 border border-slate-800 p-3 rounded">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-sm text-sovereign-300">{c.title}</span>
                                            <span className="text-[10px] text-slate-500">{c.type}</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">"{c.text}"</p>
                                    </div>
                                ))}
                                {filteredData.corpus.length === 0 && <div className="text-slate-600 text-xs italic">No definitions found.</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicExplorer;