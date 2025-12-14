import React from 'react';
import { ArchiveEntry } from '../types';

interface ArchiveProps {
  entries: ArchiveEntry[];
}

const Archive: React.FC<ArchiveProps> = ({ entries }) => {
  return (
    <div className="h-full bg-slate-950 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-sovereign-200 mb-2">Lawful Archive</h2>
        <p className="text-slate-500 font-mono text-sm mb-8">Immutable record of sovereign acts and cognition.</p>

        <div className="relative border-l border-slate-800 ml-4 space-y-8 pb-10">
          {entries.length === 0 ? (
            <div className="ml-6 text-slate-600 italic font-serif">The archive is empty. Begin your work in the Cockpit.</div>
          ) : (
            entries.slice().reverse().map((entry) => (
              <div key={entry.id} className="ml-6 relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-950 bg-slate-800 group-hover:bg-sovereign-500 transition-colors"></div>
                
                {/* Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 hover:border-sovereign-800/50 transition-colors shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${
                            entry.type === 'DRAFT' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-900' :
                            entry.type === 'COGNITION' ? 'bg-indigo-900/30 text-indigo-400 border-indigo-900' :
                            'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                            {entry.type}
                        </span>
                        <h3 className="font-serif font-bold text-slate-200 mt-2 text-lg">{entry.title}</h3>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-mono text-slate-500">{new Date(entry.timestamp).toLocaleString()}</div>
                        <div className="text-[10px] font-mono text-slate-600 mt-1">Checksum: {entry.checksum}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-4 font-sans">{entry.summary}</p>
                  
                  <details className="group/details">
                    <summary className="text-xs text-sovereign-600 cursor-pointer hover:text-sovereign-500 font-mono select-none">
                        View Artifact Source
                    </summary>
                    <div className="mt-3 bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-slate-500 overflow-x-auto">
                        <pre>{entry.details}</pre>
                    </div>
                  </details>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;
