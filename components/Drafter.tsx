
import React, { useState, useEffect } from 'react';
import { TEMPLATES } from '../data/templates';
import { Template, ArchiveEntry } from '../types';

interface DrafterProps {
  onArchive: (entry: ArchiveEntry) => void;
  initialTemplateId?: string | null;
}

const Drafter: React.FC<DrafterProps> = ({ onArchive, initialTemplateId }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string>('');
  const [isSealed, setIsSealed] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (initialTemplateId) {
        const tmpl = TEMPLATES.find(t => t.id === initialTemplateId);
        if (tmpl) handleTemplateSelect(tmpl);
    }
  }, [initialTemplateId]);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setFormData({});
    setPreview('');
    setIsSealed(false);
    setCompletedSteps({});
  };

  const handleInputChange = (key: string, value: string) => {
    if (isSealed) return; // Prevent edits after sealing
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => ({
        ...prev,
        [index]: !prev[index]
    }));
  };

  const generatePreview = () => {
    if (!selectedTemplate) return;
    let text = selectedTemplate.content;
    selectedTemplate.fields.forEach(field => {
      const value = formData[field.key] || `[${field.label.toUpperCase()}]`;
      text = text.replace(new RegExp(`{{${field.key}}}`, 'g'), value);
    });
    setPreview(text);
    setIsSealed(false);
  };

  const handleSeal = () => {
    if (!preview || isSealed) return;
    const hash = Math.random().toString(16).substring(2).toUpperCase() + Math.random().toString(16).substring(2).toUpperCase();
    const timestamp = new Date().toISOString();
    
    const sealBlock = `\n\n==================================================\n` +
    `   [ SOVEREIGN SEAL OF AUTHORSHIP ]\n` +
    `   DATE: ${timestamp.split('T')[0]} | TIME: ${timestamp.split('T')[1].replace('Z','')} Z\n` +
    `   HASH: 0x${hash}\n` +
    `   NOTICE: THIS INSTRUMENT IS EXECUTED UNDER SEAL AND BOND.\n` +
    `==================================================`;

    setPreview(prev => prev + sealBlock);
    setIsSealed(true);
  };

  const handleSaveToArchive = () => {
    if (!selectedTemplate || !preview) return;
    
    onArchive({
      id: `draft-${Date.now()}`,
      timestamp: Date.now(),
      type: 'DRAFT',
      title: `Draft: ${selectedTemplate.name}`,
      summary: `Generated remedy draft for ${selectedTemplate.jurisdiction}`,
      details: preview,
      checksum: Math.random().toString(36).substring(7)
    });
    alert("Draft archived successfully.");
  };

  const handleExport = () => {
      const element = document.createElement("a");
      const file = new Blob([preview], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${selectedTemplate?.name.replace(/\s+/g, '_')}_${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
  };

  return (
    <div className="flex h-full bg-slate-950">
      {/* Configuration Pane */}
      <div className="w-96 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="font-serif font-bold text-sovereign-200 text-lg mb-4">Template Selector</h2>
          <select 
            className="w-full bg-slate-950 border border-slate-700 text-slate-300 rounded p-2 mb-4 focus:ring-1 focus:ring-sovereign-600 focus:border-sovereign-600 font-sans text-sm"
            onChange={(e) => {
                const tmpl = TEMPLATES.find(t => t.id === e.target.value);
                if (tmpl) handleTemplateSelect(tmpl);
            }}
            value={selectedTemplate?.id || ''}
          >
            <option value="" disabled>-- Select a Remedy --</option>
            {TEMPLATES.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.jurisdiction})</option>
            ))}
          </select>
          {selectedTemplate && (
            <p className="text-xs text-slate-500">{selectedTemplate.description}</p>
          )}
        </div>

        {selectedTemplate && (
          <div className="p-6 space-y-6 flex-1">
            {/* Input Section */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold text-sovereign-400 uppercase tracking-widest font-mono">Parameters</h3>
                    {isSealed && <span className="text-[10px] bg-red-900/50 text-red-400 px-2 py-0.5 rounded border border-red-900 font-mono">LOCKED</span>}
                </div>
                <div className={`space-y-4 ${isSealed ? 'opacity-50 pointer-events-none' : ''}`}>
                    {selectedTemplate.fields.map(field => (
                    <div key={field.key}>
                        <label className="block text-xs text-slate-400 mb-1 font-mono">{field.label}</label>
                        {field.type === 'textarea' ? (
                        <textarea
                            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-sovereign-500 focus:outline-none"
                            rows={3}
                            placeholder={field.placeholder}
                            value={formData[field.key] || ''}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                        />
                        ) : (
                        <input
                            type={field.type}
                            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-sovereign-500 focus:outline-none"
                            placeholder={field.placeholder}
                            value={formData[field.key] || ''}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                        />
                        )}
                        {field.helpText && (
                            <p className="text-[10px] text-slate-500 mt-1 italic pl-1 border-l-2 border-sovereign-800/50">
                                {field.helpText}
                            </p>
                        )}
                    </div>
                    ))}
                </div>
                {!isSealed && (
                    <button 
                        onClick={generatePreview}
                        className="w-full bg-sovereign-700 hover:bg-sovereign-600 text-white font-serif font-bold py-2 rounded shadow-lg transition-all mt-4"
                    >
                        Generate Preview
                    </button>
                )}
            </div>

            {/* Sovereign Discernment Matrix */}
            {selectedTemplate.discernment && (
                <div className="pt-6 border-t border-slate-800">
                    <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono mb-3 flex items-center">
                        <svg className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sovereign Discernment
                    </h3>
                    <div className="space-y-3 text-[11px] font-sans">
                        <div className="bg-slate-950/50 p-2 rounded border-l-2 border-emerald-600">
                            <span className="block font-bold text-emerald-500 mb-0.5">Lawful Doctrine</span>
                            <span className="text-slate-400 leading-tight">{selectedTemplate.discernment.lawful}</span>
                        </div>
                        <div className="bg-slate-950/50 p-2 rounded border-l-2 border-red-800">
                            <span className="block font-bold text-red-500 mb-0.5">Contested Theory</span>
                            <span className="text-slate-400 leading-tight">{selectedTemplate.discernment.contested}</span>
                        </div>
                         <div className="bg-slate-950/50 p-2 rounded border-l-2 border-sovereign-500">
                            <span className="block font-bold text-sovereign-400 mb-0.5">Kernel of Utility</span>
                            <span className="text-slate-400 leading-tight">{selectedTemplate.discernment.utility}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Execution Roadmap */}
            {selectedTemplate.instructions && selectedTemplate.instructions.length > 0 && (
                <div className="pt-6 border-t border-slate-800">
                    <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest font-mono mb-3 flex items-center">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                        Execution Roadmap
                    </h3>
                    <div className="space-y-2">
                        {selectedTemplate.instructions.map((step, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => toggleStep(idx)}
                                className={`flex items-start space-x-3 p-2 rounded cursor-pointer transition-colors ${
                                    completedSteps[idx] ? 'bg-emerald-900/10' : 'hover:bg-slate-800'
                                }`}
                            >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                                    completedSteps[idx] 
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-900' 
                                        : 'border-slate-600 text-transparent'
                                }`}>
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className={`text-xs ${completedSteps[idx] ? 'text-emerald-400 line-through decoration-emerald-600/50' : 'text-slate-400'}`}>
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        )}
      </div>

      {/* Preview Pane */}
      <div className="flex-1 bg-slate-950 p-8 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-serif font-bold text-sovereign-200 text-xl">Document Preview</h2>
            {preview && (
                <div className="space-x-2">
                    {!isSealed ? (
                        <button onClick={handleSeal} className="px-3 py-1 bg-red-900/80 text-red-200 border border-red-700 hover:bg-red-800 text-xs font-mono rounded flex items-center inline-flex">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
                            Affix Seal
                        </button>
                    ) : (
                        <button disabled className="px-3 py-1 bg-slate-800 text-slate-500 border border-slate-700 text-xs font-mono rounded cursor-not-allowed">
                            Sealed
                        </button>
                    )}
                    <button onClick={handleExport} className="px-3 py-1 bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700 text-xs font-mono rounded">
                        Export .TXT
                    </button>
                    <button onClick={handleSaveToArchive} className="px-3 py-1 bg-sovereign-800 text-sovereign-100 border border-sovereign-600 hover:bg-sovereign-700 text-xs font-mono rounded">
                        Confirm & Archive
                    </button>
                </div>
            )}
        </div>
        
        <div className="flex-1 bg-white text-slate-900 font-mono text-sm p-8 shadow-2xl overflow-y-auto whitespace-pre-wrap rounded-sm border border-slate-300 relative">
            {preview ? preview : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 select-none flex-col">
                    <span className="font-serif italic text-lg text-slate-500 mb-2">Awaiting Parameters...</span>
                    <span className="text-xs font-mono text-slate-400">Select a remedy and follow the roadmap.</span>
                </div>
            )}
            {isSealed && (
                <div className="absolute bottom-4 right-4 opacity-50 pointer-events-none">
                    <div className="w-24 h-24 border-4 border-red-800 rounded-full flex items-center justify-center rotate-[-15deg]">
                        <div className="text-center">
                            <div className="text-[8px] text-red-800 font-bold uppercase tracking-widest">Sovereign</div>
                            <div className="text-[8px] text-red-800 font-bold uppercase tracking-widest">Cockpit</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Drafter;