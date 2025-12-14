
import React, { useState } from 'react';
import { Persona } from '../types';
import { put } from '../lib/store';

const PersonaManager: React.FC = () => {
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [tradeNameAllCaps, setTradeNameAllCaps] = useState('');
  const [mailingAddress, setMailingAddress] = useState('');
  const [domicileDeclaration, setDomicileDeclaration] = useState('Domiciled on the land, without the United States, not in commerce.');

  const handleSave = () => {
    if (!givenName || !familyName || !tradeNameAllCaps) {
        alert("Please complete the core identity fields.");
        return;
    }

    const persona: Persona = {
      id: crypto.randomUUID(),
      givenName,
      familyName,
      tradeNameAllCaps,
      mailingAddress,
      domicileDeclaration,
      keyPairId: 'default', // Placeholder for future crypto integration
      createdAt: new Date().toISOString()
    };
    put('personas', persona.id, persona);
    
    // Reset form
    setGivenName('');
    setFamilyName('');
    setTradeNameAllCaps('');
    setMailingAddress('');
    alert('Persona identity secured in Vault.');
  };

  return (
    <div className="h-full bg-slate-950 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-4 border-b border-sovereign-800 pb-4">
            <div className="w-10 h-10 rounded bg-sovereign-900/50 flex items-center justify-center border border-sovereign-700">
                <svg className="w-6 h-6 text-sovereign-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <h2 className="text-2xl font-serif font-bold text-sovereign-200">Identity Manager</h2>
                <p className="text-sm text-slate-400 font-mono">Separate the Living Man from the Legal Fiction</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded p-6 shadow-lg">
                    <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                        Living Status (Sui Juris)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1 font-mono">Given Name</label>
                            <input
                                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-emerald-500 focus:outline-none"
                                placeholder="John-Henry"
                                value={givenName}
                                onChange={e => setGivenName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1 font-mono">Family Name</label>
                            <input
                                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-emerald-500 focus:outline-none"
                                placeholder="Doe"
                                value={familyName}
                                onChange={e => setFamilyName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1 font-mono">Domicile Declaration (Sovereign)</label>
                            <textarea
                                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-emerald-500 focus:outline-none h-24"
                                placeholder="e.g., domiciled on the land..."
                                value={domicileDeclaration}
                                onChange={e => setDomicileDeclaration(e.target.value)}
                            />
                            <p className="text-[10px] text-slate-500 mt-1 italic">This declaration appears in your affidavits but is not used for postal delivery.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                 <div className="bg-slate-900 border border-slate-800 rounded p-6 shadow-lg">
                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Legal Fiction (Ens Legis)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1 font-mono">Trade Name (ALL CAPS)</label>
                            <input
                                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-red-500 focus:outline-none uppercase"
                                placeholder="JOHN HENRY DOE"
                                value={tradeNameAllCaps}
                                onChange={e => setTradeNameAllCaps(e.target.value.toUpperCase())}
                            />
                        </div>
                         <div>
                            <label className="block text-xs text-slate-400 mb-1 font-mono">Mailing Address (Deliverable)</label>
                            <input
                                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-red-500 focus:outline-none"
                                placeholder="123 Main St, City, State ZIP"
                                value={mailingAddress}
                                onChange={e => setMailingAddress(e.target.value)}
                            />
                            <p className="text-[10px] text-slate-500 mt-1 italic">
                                Required for receiving notices. Use c/o or box number if privacy is needed.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-sovereign-900/10 border border-sovereign-800/30 rounded p-4">
                    <h4 className="text-xs font-bold text-sovereign-400 uppercase mb-2">Lawful Note</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        By separating these identities, you create a "firewall" between the living man and the commercial liability of the fiction. The Mailing Address attaches to the Fiction; the Domicile attaches to the Man.
                    </p>
                </div>

                <button 
                    onClick={handleSave}
                    className="w-full py-3 bg-sovereign-700 hover:bg-sovereign-600 text-white font-bold font-serif rounded shadow-lg transition-all"
                >
                    ESTABLISH PERSONA
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaManager;
