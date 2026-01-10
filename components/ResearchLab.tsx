
import React, { useState, useEffect } from 'react';
import { put, list } from '../lib/store';
import { synthesizeProject } from '../services/geminiService';
import { SideProject, ProjectArtifact, ResearchGoal } from '../types';

const ResearchLab: React.FC = () => {
    const [projects, setProjects] = useState<SideProject[]>([]);
    const [activeProject, setActiveProject] = useState<SideProject | null>(null);
    const [view, setView] = useState<'LOCKER' | 'SYNTHESIS' | 'GOALS'>('LOCKER');
    
    // UI State
    const [isCreating, setIsCreating] = useState(false);
    const [loadingSynthesis, setLoadingSynthesis] = useState(false);
    
    // New Project Form
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    
    // New Artifact Form
    const [artTitle, setArtTitle] = useState('');
    const [artContent, setArtContent] = useState('');
    const [artType, setArtType] = useState<ProjectArtifact['type']>('STATUTE');
    const [artRelevance, setArtRelevance] = useState(3);

    // New Goal Form
    const [newGoalText, setNewGoalText] = useState('');

    useEffect(() => {
        const pList = list<SideProject>('projects');
        setProjects(pList);
        if (pList.length > 0 && !activeProject) {
            setActiveProject(pList[0]);
        }
    }, []);

    const saveProject = (p: SideProject) => {
        put('projects', p.id, p);
        const updated = list<SideProject>('projects');
        setProjects(updated);
        setActiveProject(p);
    };

    const handleCreateProject = () => {
        if (!newTitle) return;
        const p: SideProject = {
            id: crypto.randomUUID(),
            title: newTitle,
            description: newDesc,
            artifacts: [],
            goals: [],
            status: 'ACTIVE',
            createdAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString()
        };
        saveProject(p);
        setNewTitle('');
        setNewDesc('');
        setIsCreating(false);
    };

    const addArtifact = () => {
        if (!activeProject || !artTitle || !artContent) return;
        const artifact: ProjectArtifact = {
            id: crypto.randomUUID(),
            title: artTitle,
            content: artContent,
            type: artType,
            relevance: artRelevance,
            createdAt: new Date().toISOString()
        };
        
        const updated = {
            ...activeProject,
            artifacts: [artifact, ...activeProject.artifacts],
            lastAccessedAt: new Date().toISOString()
        };
        saveProject(updated);
        setArtTitle('');
        setArtContent('');
    };

    const addGoal = () => {
        if (!activeProject || !newGoalText) return;
        const goal: ResearchGoal = { id: crypto.randomUUID(), text: newGoalText, completed: false };
        const updated = {
            ...activeProject,
            goals: [...activeProject.goals, goal],
            lastAccessedAt: new Date().toISOString()
        };
        saveProject(updated);
        setNewGoalText('');
    };

    const toggleGoal = (id: string) => {
        if (!activeProject) return;
        const updated = {
            ...activeProject,
            goals: activeProject.goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g),
            lastAccessedAt: new Date().toISOString()
        };
        saveProject(updated);
    };

    const runSynthesis = async () => {
        if (!activeProject) return;
        setLoadingSynthesis(true);
        const report = await synthesizeProject(activeProject);
        const updated = {
            ...activeProject,
            synthesis: report,
            lastAccessedAt: new Date().toISOString()
        };
        saveProject(updated);
        setLoadingSynthesis(false);
        setView('SYNTHESIS');
    };

    return (
        <div className="flex h-full bg-slate-950 text-slate-200 font-sans overflow-hidden">
            {/* Project Catalog Sidebar */}
            <div className="w-80 border-r border-sovereign-800/50 bg-slate-900/50 flex flex-col shrink-0">
                <div className="p-6 border-b border-sovereign-800/50 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-sovereign-200">Intelligence Lab</h2>
                        <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest">Project Repositories</p>
                    </div>
                    <button 
                        onClick={() => setIsCreating(true)}
                        className="w-8 h-8 rounded-full bg-sovereign-900/50 border border-sovereign-700 flex items-center justify-center text-sovereign-400 hover:bg-sovereign-700 hover:text-white transition-all"
                    >
                        +
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {isCreating && (
                        <div className="bg-slate-950 border border-sovereign-900 rounded-lg p-4 space-y-3 animate-fade-in">
                            <input 
                                value={newTitle} 
                                onChange={e => setNewTitle(e.target.value)} 
                                className="w-full bg-transparent text-sm text-sovereign-100 border-b border-slate-800 focus:border-sovereign-500 focus:outline-none py-1 font-serif"
                                placeholder="INVESTIGATION TITLE"
                            />
                            <textarea 
                                value={newDesc} 
                                onChange={e => setNewDesc(e.target.value)} 
                                className="w-full bg-transparent text-[10px] text-slate-400 focus:outline-none resize-none h-16 font-mono"
                                placeholder="Statement of Purpose / Remedial Intent..."
                            />
                            <div className="flex space-x-2">
                                <button onClick={handleCreateProject} className="flex-1 py-2 bg-sovereign-700 hover:bg-sovereign-600 text-white text-[10px] font-bold rounded uppercase tracking-widest">INITIATE</button>
                                <button onClick={() => setIsCreating(false)} className="px-3 py-2 bg-slate-800 text-slate-500 text-[10px] rounded uppercase">X</button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-[9px] font-mono text-slate-600 uppercase mb-3 block tracking-[0.2em]">Active Records</label>
                        {projects.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setActiveProject(p)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${
                                    activeProject?.id === p.id 
                                        ? 'bg-sovereign-900/20 border-sovereign-500 shadow-[inset_0_0_20px_rgba(212,162,86,0.05)]' 
                                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 opacity-60 hover:opacity-100'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-serif font-bold text-sm ${activeProject?.id === p.id ? 'text-sovereign-200' : 'text-slate-400'}`}>{p.title}</h3>
                                    {p.status === 'ACTIVE' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mt-1"></div>}
                                </div>
                                <p className="text-[10px] text-slate-500 truncate leading-relaxed">{p.description || 'No description provided.'}</p>
                                <div className="mt-3 flex items-center space-x-3 text-[8px] font-mono text-slate-600 uppercase tracking-tighter">
                                    <span className="flex items-center"><svg className="w-2.5 h-2.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>{p.artifacts.length} Arts</span>
                                    <span className="flex items-center"><svg className="w-2.5 h-2.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-2.066 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 2.066 3.42 3.42 0 010 4.606 3.42 3.42 0 00-2.066 1.946 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-2.066 3.42 3.42 0 010-4.606z" /></svg>{p.goals.filter(g => g.completed).length}/{p.goals.length} Goals</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Research Workspace */}
            <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
                {activeProject ? (
                    <>
                        {/* Header Area */}
                        <div className="p-8 border-b border-sovereign-800/30 bg-slate-900/30">
                            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">{activeProject.title}</h1>
                                        <span className="px-2 py-0.5 rounded bg-sovereign-900/40 border border-sovereign-700 text-[9px] font-mono text-sovereign-400 uppercase tracking-widest">{activeProject.status}</span>
                                    </div>
                                    <p className="text-slate-400 font-mono text-sm max-w-2xl leading-relaxed italic">"{activeProject.description}"</p>
                                </div>
                                <div className="flex space-x-3">
                                    <button 
                                        onClick={runSynthesis}
                                        disabled={loadingSynthesis || activeProject.artifacts.length === 0}
                                        className="px-6 py-2.5 bg-indigo-900/50 hover:bg-indigo-800 text-indigo-200 border border-indigo-700/50 rounded-lg text-xs font-bold font-mono tracking-widest flex items-center transition-all disabled:opacity-30"
                                    >
                                        {loadingSynthesis ? 'SYNTHESIZING INTEL...' : 'RUN AI SYNTHESIS'}
                                    </button>
                                    <div className="h-10 w-[1px] bg-slate-800"></div>
                                    <button className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-500 border border-slate-800 rounded-lg text-[10px] font-bold uppercase tracking-widest">Archive</button>
                                </div>
                            </div>

                            {/* Sub-Nav */}
                            <div className="max-w-6xl mx-auto mt-8 flex space-x-8">
                                {[
                                    { id: 'LOCKER', label: 'Evidence Locker', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                                    { id: 'GOALS', label: 'Research Objectives', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-2.066 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 2.066 3.42 3.42 0 010 4.606 3.42 3.42 0 00-2.066 1.946 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-2.066 3.42 3.42 0 010-4.606z' },
                                    { id: 'SYNTHESIS', label: 'Synthesis Report', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
                                ].map(tab => (
                                    <button 
                                        key={tab.id}
                                        onClick={() => setView(tab.id as any)}
                                        className={`flex items-center space-x-2 py-2 border-b-2 transition-all font-mono text-[11px] uppercase tracking-[0.2em] ${
                                            view === tab.id 
                                                ? 'border-sovereign-500 text-sovereign-300' 
                                                : 'border-transparent text-slate-500 hover:text-slate-300'
                                        }`}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} /></svg>
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Workspace Body */}
                        <div className="flex-1 overflow-y-auto p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                            <div className="max-w-6xl mx-auto h-full">
                                {view === 'LOCKER' && (
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                                        {/* Ingestion Panel */}
                                        <div className="lg:col-span-4 space-y-6">
                                            <div className="bg-slate-900 border border-sovereign-900/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-sovereign-500"></div>
                                                <h2 className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em] font-mono mb-6 flex items-center">
                                                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    Inject Forensic Data
                                                </h2>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5 tracking-widest">Artifact Title</label>
                                                        <input 
                                                            value={artTitle} 
                                                            onChange={e => setArtTitle(e.target.value)} 
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:border-amber-600 outline-none transition-all font-serif"
                                                            placeholder="e.g., UCC 9-311 Citation"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5 tracking-widest">Category</label>
                                                            <select 
                                                                value={artType} 
                                                                onChange={e => setArtType(e.target.value as any)}
                                                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-[10px] text-slate-300 font-mono"
                                                            >
                                                                <option value="STATUTE">Statute</option>
                                                                <option value="CASE">Case Law</option>
                                                                <option value="PAMPHLET">Pamphlet</option>
                                                                <option value="TRANSCRIPT">Transcript</option>
                                                                <option value="NOTE">Note</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5 tracking-widest">Importance</label>
                                                            <div className="flex space-x-1 h-10 items-center justify-center bg-slate-950 rounded-lg border border-slate-800">
                                                                {[1,2,3,4,5].map(lvl => (
                                                                    <button 
                                                                        key={lvl}
                                                                        onClick={() => setArtRelevance(lvl)}
                                                                        className={`w-5 h-5 rounded-full border transition-all ${artRelevance >= lvl ? 'bg-amber-500 border-amber-400' : 'bg-slate-800 border-slate-700'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1.5 tracking-widest">Knowledge Content</label>
                                                        <textarea 
                                                            value={artContent} 
                                                            onChange={e => setArtContent(e.target.value)}
                                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 h-48 focus:border-amber-600 outline-none font-mono leading-relaxed"
                                                            placeholder="Paste the evidence or record details for AI cognition..."
                                                        />
                                                    </div>
                                                    <button 
                                                        onClick={addArtifact}
                                                        className="w-full py-4 bg-amber-800 hover:bg-amber-700 text-white font-serif font-bold rounded-xl shadow-lg transition-all text-xs tracking-widest uppercase"
                                                    >
                                                        Secure to Locker
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Grid Panel */}
                                        <div className="lg:col-span-8 space-y-6">
                                            <div className="flex justify-between items-center px-2">
                                                <h3 className="text-xs font-mono text-emerald-500 uppercase tracking-[0.3em] font-bold">Evidence Inventory</h3>
                                                <span className="text-[10px] text-slate-600 font-mono uppercase">{activeProject.artifacts.length} Unique Records Secured</span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {activeProject.artifacts.length === 0 ? (
                                                    <div className="col-span-full border-2 border-dashed border-slate-800 rounded-2xl p-24 text-center group hover:border-sovereign-900 transition-all">
                                                        <svg className="w-16 h-16 mx-auto mb-6 text-slate-800 group-hover:text-sovereign-900 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                                        <p className="font-serif italic text-xl text-slate-700">Locker is currently void.</p>
                                                        <p className="text-[10px] text-slate-800 font-mono uppercase mt-2 tracking-widest">Ingest facts to proceed</p>
                                                    </div>
                                                ) : (
                                                    activeProject.artifacts.map(art => (
                                                        <div key={art.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-sovereign-700/50 transition-all relative group shadow-xl">
                                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all">
                                                                <span className="text-4xl font-serif">{art.type[0]}</span>
                                                            </div>
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div className="flex flex-col space-y-1">
                                                                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-[0.2em] w-fit ${
                                                                        art.type === 'STATUTE' ? 'bg-indigo-900/30 text-indigo-400 border-indigo-800' :
                                                                        art.type === 'CASE' ? 'bg-red-900/30 text-red-400 border-red-800' :
                                                                        'bg-slate-800 text-slate-400 border-slate-700'
                                                                    }`}>
                                                                        {art.type}
                                                                    </span>
                                                                    <span className="text-[8px] text-slate-600 font-mono uppercase">{new Date(art.createdAt).toLocaleDateString()}</span>
                                                                </div>
                                                                <div className="flex space-x-0.5">
                                                                    {[1,2,3,4,5].map(i => (
                                                                        <div key={i} className={`w-1 h-3 rounded-full ${i <= (art.relevance || 3) ? 'bg-amber-500' : 'bg-slate-800'}`}></div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <h4 className="text-sm font-serif font-bold text-slate-100 mb-3 tracking-wide">{art.title}</h4>
                                                            <div className="flex-1 bg-slate-950/50 p-4 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-400 leading-relaxed italic line-clamp-6">
                                                                "{art.content}"
                                                            </div>
                                                            <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between">
                                                                <button className="text-[10px] text-sovereign-400 font-mono uppercase hover:text-sovereign-200 tracking-widest">Full Record</button>
                                                                <button className="text-[10px] text-slate-600 font-mono uppercase hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">Expunge</button>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {view === 'GOALS' && (
                                    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                                            <h2 className="text-xl font-serif font-bold text-sovereign-200 mb-8 border-b border-slate-800 pb-4">Investigation Objectives</h2>
                                            
                                            <div className="space-y-6">
                                                <div className="flex items-center space-x-4">
                                                    <input 
                                                        value={newGoalText}
                                                        onChange={e => setNewGoalText(e.target.value)}
                                                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-emerald-600 outline-none font-mono"
                                                        placeholder="Define next research milestone..."
                                                        onKeyDown={e => e.key === 'Enter' && addGoal()}
                                                    />
                                                    <button 
                                                        onClick={addGoal}
                                                        className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
                                                    >
                                                        Add Milestone
                                                    </button>
                                                </div>

                                                <div className="space-y-3">
                                                    {activeProject.goals.map(goal => (
                                                        <div 
                                                            key={goal.id} 
                                                            onClick={() => toggleGoal(goal.id)}
                                                            className={`flex items-center space-x-4 p-4 rounded-xl border cursor-pointer transition-all ${
                                                                goal.completed 
                                                                    ? 'bg-emerald-900/10 border-emerald-900/50 opacity-60' 
                                                                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                                                            }`}
                                                        >
                                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                                goal.completed ? 'bg-emerald-500 border-emerald-500' : 'bg-transparent border-slate-700'
                                                            }`}>
                                                                {goal.completed && <svg className="w-4 h-4 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                            </div>
                                                            <span className={`flex-1 text-sm font-mono ${goal.completed ? 'text-emerald-500 line-through' : 'text-slate-300'}`}>
                                                                {goal.text}
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {activeProject.goals.length === 0 && (
                                                        <p className="text-center py-12 text-slate-600 font-serif italic uppercase text-xs tracking-widest">No objectives established.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {view === 'SYNTHESIS' && (
                                    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
                                        {activeProject.synthesis ? (
                                            <div className="space-y-8">
                                                <div className="bg-slate-900 border-l-4 border-indigo-500 rounded-r-2xl p-10 shadow-2xl relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-4 opacity-5">
                                                        <svg className="w-48 h-48 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
                                                            <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-[0.1em]">Forensic Synthesis Report</h2>
                                                            <button 
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(activeProject.synthesis!);
                                                                    alert("Synthesis Copied.");
                                                                }}
                                                                className="text-[10px] font-mono text-indigo-400 hover:text-indigo-200 uppercase tracking-widest border border-indigo-900 px-3 py-1 rounded"
                                                            >
                                                                Copy Argument
                                                            </button>
                                                        </div>
                                                        <div className="prose prose-invert max-w-none font-mono text-xs text-slate-300 leading-[1.8] whitespace-pre-wrap selection:bg-indigo-900">
                                                            {activeProject.synthesis}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center">
                                                    <button 
                                                        onClick={runSynthesis}
                                                        className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-indigo-900/50 rounded-xl text-xs font-bold font-mono tracking-widest uppercase transition-all"
                                                    >
                                                        Re-Run Synthesis with Updated Data
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-24 text-center space-y-6">
                                                <div className="w-20 h-20 bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                                                    <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                </div>
                                                <h3 className="text-2xl font-serif italic text-slate-400">Intelligence Matrix Ready</h3>
                                                <p className="text-sm text-slate-600 font-mono max-w-md mx-auto leading-relaxed">Invoke OmniVero Synthesis to process all secured artifacts and generate a comprehensive lawful argument.</p>
                                                <button 
                                                    onClick={runSynthesis}
                                                    disabled={activeProject.artifacts.length === 0}
                                                    className="px-10 py-5 bg-indigo-800 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs uppercase tracking-[0.3em] shadow-2xl transition-all disabled:opacity-20"
                                                >
                                                    Activate Synthesis
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-700 animate-pulse">
                        <svg className="w-32 h-32 mb-8 opacity-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <h2 className="text-3xl font-serif italic mb-3">Laboratory Disengaged</h2>
                        <p className="font-mono text-xs uppercase tracking-[0.5em] text-slate-800">Initialize a repository to begin Forensic Research</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResearchLab;
