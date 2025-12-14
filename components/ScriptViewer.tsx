
import React, { useState, useMemo, useEffect } from 'react';
import { SCRIPTS } from '../data/scripts';
import { MOCK_CORPUS } from '../data/corpus';
import { Script } from '../types';

interface ScriptViewerProps {
    initialScriptId?: string | null;
}

const ScriptViewer: React.FC<ScriptViewerProps> = ({ initialScriptId }) => {
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isRolePlay, setIsRolePlay] = useState(false);
  const [rolePlayLine, setRolePlayLine] = useState(0);

  useEffect(() => {
    if (initialScriptId) {
        const script = SCRIPTS.find(s => s.id === initialScriptId);
        if (script) {
            setSelectedScript(script);
            setRolePlayLine(0);
        }
    }
  }, [initialScriptId]);

  const filteredScripts = useMemo(() => {
    return SCRIPTS.filter(script => {
      const matchesSearch = 
        script.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        script.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        script.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = activeCategory ? script.category === activeCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const scriptLines = useMemo(() => {
    if (!selectedScript) return [];
    return selectedScript.content.split('\n').filter(line => line.trim().length > 0);
  }, [selectedScript]);

  // Find related corpus items based on tags
  const relatedAuthority = useMemo(() => {
    if (!selectedScript) return [];
    return MOCK_CORPUS.filter(item => 
        item.tags.some(tag => selectedScript.tags.includes(tag)) ||
        selectedScript.content.toLowerCase().includes(item.title.toLowerCase())
    ).slice(0, 3);
  }, [selectedScript]);

  const handlePrint = () => {
    if (!selectedScript) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Sovereign Script - ${selectedScript.title}</title>
            <style>
              body { font-family: 'Courier New', monospace; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; color: #000; }
              h1 { border-bottom: 3px solid #000; padding-bottom: 10px; font-size: 24pt; text-transform: uppercase; margin-bottom: 10px; }
              .meta { font-style: italic; margin-bottom: 30px; color: #444; }
              .content { white-space: pre-wrap; font-size: 14pt; background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
              .tips { margin-top: 40px; border-left: 5px solid #000; padding-left: 20px; }
              .tips h3 { text-transform: uppercase; font-size: 12pt; letter-spacing: 2px; }
              .footer { margin-top: 50px; text-align: center; font-size: 8pt; color: #888; border-top: 1px solid #eee; padding-top: 10px; }
            </style>
          </head>
          <body>
            <h1>${selectedScript.title}</h1>
            <div class="meta"><strong>Category:</strong> ${selectedScript.category} <br/><strong>Purpose:</strong> ${selectedScript.description}</div>
            <div class="content">${selectedScript.content}</div>
            <div class="tips"><h3>Delivery Protocols</h3><ul>${selectedScript.tips.map(t => `<li>${t}</li>`).join('')}</ul></div>
            <div class="footer">Printed from Verobrix Sovereign Cockpit | Lawful Use Only</div>
            <script>window.onload = function() { window.print(); }</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="flex h-full bg-slate-950 relative">
      {/* Role Play Overlay */}
      {isRolePlay && selectedScript && (
          <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-8 animate-fade-in">
              <div className="max-w-4xl w-full flex flex-col h-full">
                  <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-4">
                      <div>
                        <h2 className="text-xl font-serif text-sovereign-400 font-bold uppercase tracking-widest">Role-Play Mode</h2>
                        <p className="text-slate-500 font-mono text-xs">{selectedScript.title}</p>
                      </div>
                      <button onClick={() => setIsRolePlay(false)} className="text-slate-400 hover:text-white border border-slate-700 px-3 py-1 rounded">Exit Simulation</button>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center relative">
                      <div className="text-center space-y-8 max-w-3xl">
                          <p className="text-2xl md:text-4xl font-serif font-bold text-white leading-relaxed transition-all duration-300 transform bg-slate-900/50 p-8 rounded-xl border border-slate-800 shadow-2xl">
                              "{scriptLines[rolePlayLine]}"
                          </p>
                          <p className="text-sm font-mono text-sovereign-500 uppercase tracking-widest mt-4">
                              Segment {rolePlayLine + 1} of {scriptLines.length}
                          </p>
                      </div>
                  </div>

                  {/* Contextual Tip */}
                  <div className="mt-6 bg-slate-900 border-l-4 border-sovereign-500 p-6 mb-10 rounded-r shadow-lg">
                      <h4 className="text-sovereign-400 font-bold text-xs uppercase mb-2 tracking-widest">Coach's Directive</h4>
                      <p className="text-slate-300 text-lg italic font-serif">
                        {selectedScript.tips[rolePlayLine % selectedScript.tips.length] || "Maintain composure. Speak with authority, not belligerence."}
                      </p>
                  </div>

                  <div className="flex justify-between items-center">
                      <button 
                        onClick={() => setRolePlayLine(prev => Math.max(0, prev - 1))}
                        disabled={rolePlayLine === 0}
                        className="px-6 py-4 border border-slate-700 rounded text-slate-400 hover:bg-slate-900 disabled:opacity-30 font-mono text-sm"
                      >
                          ← PREVIOUS
                      </button>
                      <div className="flex space-x-2">
                        {scriptLines.map((_, idx) => (
                            <div key={idx} className={`w-2 h-2 rounded-full ${idx === rolePlayLine ? 'bg-sovereign-500' : 'bg-slate-800'}`}></div>
                        ))}
                      </div>
                      <button 
                        onClick={() => setRolePlayLine(prev => Math.min(scriptLines.length - 1, prev + 1))}
                        disabled={rolePlayLine === scriptLines.length - 1}
                        className="px-8 py-4 bg-sovereign-700 text-white font-bold rounded shadow-lg hover:bg-sovereign-600 disabled:opacity-30 text-lg font-serif tracking-wide"
                      >
                          NEXT SEGMENT →
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* List Pane */}
      <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-900/50 shrink-0">
        <div className="p-4 border-b border-slate-800">
          <h2 className="font-serif font-bold text-sovereign-200">Courtroom Conveyance</h2>
          <p className="text-xs text-slate-500 font-mono mt-1 mb-3">Situational scripts & protocols.</p>
          
          <input 
            type="text" 
            placeholder="Search scripts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded px-3 py-2 text-sm focus:border-sovereign-500 focus:outline-none mb-3 font-mono"
          />

          <div className="flex flex-wrap gap-2">
            <button onClick={() => setActiveCategory(null)} className={`text-[10px] px-2 py-1 rounded border font-mono transition-colors ${!activeCategory ? 'bg-sovereign-700 border-sovereign-600 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>ALL</button>
            <button onClick={() => setActiveCategory('COURT')} className={`text-[10px] px-2 py-1 rounded border font-mono transition-colors ${activeCategory === 'COURT' ? 'bg-red-900 border-red-700 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>COURT</button>
            <button onClick={() => setActiveCategory('PHONE')} className={`text-[10px] px-2 py-1 rounded border font-mono transition-colors ${activeCategory === 'PHONE' ? 'bg-blue-900 border-blue-700 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>PHONE</button>
            <button onClick={() => setActiveCategory('COMMERCIAL')} className={`text-[10px] px-2 py-1 rounded border font-mono transition-colors ${activeCategory === 'COMMERCIAL' ? 'bg-emerald-900 border-emerald-700 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>TRADE</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredScripts.length === 0 ? (
            <div className="text-center p-8 text-slate-600 italic text-xs font-mono">No scripts match.</div>
          ) : (
            filteredScripts.map(script => (
                <div key={script.id} onClick={() => { setSelectedScript(script); setRolePlayLine(0); }} className={`p-3 rounded cursor-pointer border-l-2 transition-all ${selectedScript?.id === script.id ? 'bg-sovereign-900/20 border-sovereign-500 text-sovereign-100' : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
                <div className="flex justify-between items-start mb-1">
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded border ${script.category === 'COURT' ? 'bg-red-900/30 text-red-400 border-red-900' : script.category === 'PHONE' ? 'bg-blue-900/30 text-blue-400 border-blue-900' : 'bg-emerald-900/30 text-emerald-400 border-emerald-900'}`}>{script.category}</span>
                </div>
                <h3 className="font-serif font-bold text-sm leading-tight mb-1">{script.title}</h3>
                </div>
            ))
          )}
        </div>
      </div>

      {/* Detail Pane */}
      <div className="flex-1 p-8 overflow-y-auto bg-slate-950 relative">
        {selectedScript ? (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-serif text-sovereign-200 font-bold mb-2">{selectedScript.title}</h2>
                    <p className="text-sm text-slate-400 font-mono max-w-xl">{selectedScript.description}</p>
                </div>
                <div className="flex flex-col space-y-2">
                    <button onClick={() => setIsRolePlay(true)} className="flex items-center justify-center space-x-2 bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow-lg transition-colors border border-emerald-600 w-full">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="font-bold text-xs uppercase tracking-wide">Role-Play</span>
                    </button>
                    <button onClick={handlePrint} className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded border border-slate-600 w-full">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                        <span className="font-bold text-xs uppercase tracking-wide">Print Script</span>
                    </button>
                </div>
            </div>

            <div className="bg-slate-100 text-slate-900 font-mono p-8 rounded shadow-2xl border-l-8 border-sovereign-600 relative">
                 <div className="absolute top-2 right-2 text-[10px] text-slate-500 font-sans uppercase tracking-widest border border-slate-300 px-2 py-0.5 rounded bg-white">Verbal Act</div>
                <div className="whitespace-pre-wrap text-lg leading-relaxed font-medium">{selectedScript.content}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-sovereign-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center">
                        <span className="w-8 h-[1px] bg-sovereign-400 mr-2"></span>
                        Delivery Protocols
                    </h3>
                    <div className="space-y-3">
                        {selectedScript.tips.map((tip, idx) => (
                            <div key={idx} className="flex items-start space-x-3 bg-slate-900/50 p-3 rounded border border-slate-800">
                                <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-sovereign-500 font-bold text-xs border border-slate-700">{idx + 1}</div>
                                <p className="text-sm text-slate-300 leading-tight">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                     <h3 className="text-sovereign-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center">
                        <span className="w-8 h-[1px] bg-sovereign-400 mr-2"></span>
                        Legal Anchors
                    </h3>
                    {relatedAuthority.length > 0 ? (
                        <div className="space-y-2">
                            {relatedAuthority.map(item => (
                                <div key={item.id} className="bg-sovereign-900/10 border border-sovereign-900/30 p-3 rounded">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] font-bold text-sovereign-300 uppercase">{item.title}</span>
                                        <span className="text-[9px] text-slate-500">{item.citation}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 italic line-clamp-2">"{item.text}"</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-xs text-slate-600 italic border border-slate-800 p-4 rounded text-center">
                            No direct anchors linked. Reference Knowledge Corpus.
                        </div>
                    )}
                </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
            <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            <p className="font-serif text-lg">Select a situation to view the script.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptViewer;