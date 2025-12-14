
import React, { useState, useMemo } from 'react';
import { MOCK_CORPUS } from '../data/corpus';
import { CorpusItem, CorpusType } from '../types';

const KnowledgeView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedItem, setSelectedItem] = useState<CorpusItem | null>(null);
  const [copied, setCopied] = useState(false);

  // Filters for the category bar
  const FILTERS = [
      { id: 'ALL', label: 'All Sources' },
      { id: CorpusType.DICTIONARY, label: 'Dictionaries' },
      { id: CorpusType.STATUTE, label: 'Statutes' },
      { id: CorpusType.CASE_LAW, label: 'Case Law' },
      { id: CorpusType.COMMENTARY, label: 'Commentary' }
  ];

  const filteredCorpus = useMemo(() => {
    return MOCK_CORPUS.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter = activeFilter === 'ALL' || item.type === activeFilter;

      return matchesSearch && matchesFilter;
    }).sort((a, b) => a.title.localeCompare(b.title));
  }, [searchTerm, activeFilter]);

  const handleCopyCitation = () => {
    if (!selectedItem) return;
    // Format: "Text" [Title, Citation]
    const citationString = `"${selectedItem.text.substring(0, 100)}${selectedItem.text.length > 100 ? '...' : ''}" [${selectedItem.title}, ${selectedItem.citation}]`;
    navigator.clipboard.writeText(citationString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full bg-slate-950">
      {/* List Pane */}
      <div className="w-96 border-r border-slate-800 flex flex-col bg-slate-900/50 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="font-serif font-bold text-sovereign-200 text-lg mb-1">Legal Library</h2>
          <p className="text-xs text-slate-500 font-mono mb-4">The indexed corpus of Sovereign Law.</p>
          
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search definitions, maxims, cases..." 
              className="w-full bg-slate-950 border border-slate-700 text-sovereign-100 pl-9 pr-4 py-2 rounded font-mono text-sm focus:outline-none focus:border-sovereign-600 focus:ring-1 focus:ring-sovereign-600 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
                <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`text-[10px] px-2 py-1 rounded border font-mono transition-colors uppercase tracking-wide ${
                        activeFilter === f.id
                            ? 'bg-sovereign-700 border-sovereign-600 text-white shadow' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                >
                    {f.label}
                </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredCorpus.map(item => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`p-3 rounded cursor-pointer border-l-2 transition-all group ${
                selectedItem?.id === item.id 
                  ? 'bg-sovereign-900/20 border-sovereign-500 text-sovereign-100' 
                  : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded border uppercase tracking-wide ${
                    selectedItem?.id === item.id 
                    ? 'bg-sovereign-900 text-sovereign-300 border-sovereign-700' 
                    : 'bg-slate-800 text-slate-500 border-slate-700 group-hover:border-slate-600'
                }`}>
                    {item.type}
                </span>
                <span className="text-[9px] text-slate-600 font-mono uppercase">{item.jurisdiction}</span>
              </div>
              <h3 className="font-serif font-bold text-sm leading-tight mb-1">{item.title}</h3>
              <p className="text-[10px] font-mono opacity-60 truncate">{item.citation}</p>
            </div>
          ))}
          {filteredCorpus.length === 0 && (
              <div className="p-8 text-center text-slate-600 italic text-xs">
                  No terms found matching "{searchTerm}" in {activeFilter}.
              </div>
          )}
        </div>
        <div className="p-2 border-t border-slate-800 text-center text-[10px] text-slate-600 font-mono">
            Total Records: {MOCK_CORPUS.length}
        </div>
      </div>

      {/* Detail Pane */}
      <div className="flex-1 p-8 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]">
        {selectedItem ? (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="border-b-2 border-sovereign-700 pb-4 mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-serif text-sovereign-200 font-bold mb-2">{selectedItem.title}</h2>
                <div className="flex items-center space-x-4 text-sovereign-500 font-mono text-xs uppercase tracking-widest">
                    <span>{selectedItem.citation}</span>
                    <span>•</span>
                    <span>{selectedItem.jurisdiction}</span>
                </div>
              </div>
              <button 
                onClick={handleCopyCitation}
                className="flex items-center space-x-2 bg-sovereign-800 hover:bg-sovereign-700 text-white px-4 py-2 rounded shadow-lg transition-colors border border-sovereign-600 group"
              >
                 {copied ? (
                     <>
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-xs font-bold font-mono text-emerald-300">COPIED</span>
                     </>
                 ) : (
                     <>
                        <svg className="w-4 h-4 text-sovereign-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                        <span className="text-xs font-bold font-mono">BUILD CITATION</span>
                     </>
                 )}
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <div className="bg-slate-900/80 p-8 rounded-lg border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-sovereign-600"></div>
                <p className="font-serif text-xl leading-relaxed text-slate-200 whitespace-pre-wrap">
                  {selectedItem.text}
                </p>
              </div>

              {selectedItem.notes && (
                 <div className="mt-6 bg-amber-900/10 p-5 rounded border border-amber-900/30 flex items-start space-x-4">
                   <div className="p-2 bg-amber-900/20 rounded-full shrink-0">
                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <div>
                        <h4 className="text-sovereign-400 font-bold text-xs uppercase tracking-wider mb-1 font-mono">Cognition Note</h4>
                        <p className="text-sm text-sovereign-200/80 italic leading-relaxed">{selectedItem.notes}</p>
                   </div>
                 </div>
              )}

              <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                {selectedItem.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono border border-slate-700">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
            <svg className="w-20 h-20 mb-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="font-serif text-xl text-slate-500">Select authority from the registry</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeView;