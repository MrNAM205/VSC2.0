
import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';

interface FeeItem {
  id: string;
  violation: string;
  penalty: string;
}

const TrustBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'parties' | 'funding' | 'copyright'>('funding');
  const [trustName, setTrustName] = useState('');
  const [trustee, setTrustee] = useState('');
  
  // Funding / IUL State
  const [assetType, setAssetType] = useState('iul');
  const [iulInsurer, setIulInsurer] = useState('');
  const [iulPolicyNo, setIulPolicyNo] = useState('');
  const [assignorName, setAssignorName] = useState('');

  // Fee Schedule State
  const [feeItems, setFeeItems] = useState<FeeItem[]>([
    { id: '1', violation: 'Unlawful Detainment / Roadside Stop (per minute)', penalty: '5,000.00 USD' },
    { id: '2', violation: 'Unauthorized Use of Legal Fiction / Trade Name', penalty: '500,000.00 USD' },
    { id: '3', violation: 'Unsolicited Communication / Robocalls', penalty: '2,000.00 USD' },
    { id: '4', violation: 'Demand for Identification / License Production', penalty: '10,000.00 USD' },
    { id: '5', violation: 'Threat of Arrest / Coercion', penalty: '50,000.00 USD' }
  ]);
  const [includeLibertyClause, setIncludeLibertyClause] = useState(true);

  const [preview, setPreview] = useState('');

  const addFeeItem = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setFeeItems([...feeItems, { id, violation: '', penalty: '' }]);
  };

  const updateFeeItem = (id: string, field: 'violation' | 'penalty', value: string) => {
    setFeeItems(feeItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeFeeItem = (id: string) => {
    setFeeItems(feeItems.filter(item => item.id !== id));
  };

  const generateNotice = () => {
    const itemsText = feeItems.map((item, index) => 
      `${index + 1}. ${item.violation}: ${item.penalty}`
    ).join('\n');

    const libertyClause = includeLibertyClause ? `
NOTICE OF LIBERTY VS. PRIVILEGE (MURDOCK V. PENNSYLVANIA):
Pursuant to Murdock v. Pennsylvania, 319 U.S. 105 (1943), a state may not impose a charge for the enjoyment of a right granted by the Federal Constitution. Any statute attempting to convert a constitutionally secured liberty into a privilege, and issue a license and fee for it, is void ab initio. The demand for a "Driver's License" to exercise the Right of Locomotion is a nullity and a trespass upon rights.` : '';

    const content = `PUBLIC NOTICE OF COPYRIGHT & FEE SCHEDULE
    
NOTICE TO AGENT IS NOTICE TO PRINCIPAL
NOTICE TO PRINCIPAL IS NOTICE TO AGENT

Establishment of Common Law Copyright and Self-Executing Contract.

TRUST / COPYRIGHT HOLDER: ${trustName || '[TRUST NAME]'}
TRUSTEE / AUTHORIZED REP: ${trustee || '[TRUSTEE NAME]'}

1. COPYRIGHT CLAIM
All rights, title, and interest in the trade name, family name, and photos/images of the Authorized Representative are hereby copyrighted and held in the private trust. Any unauthorized use of said name or image (including but not limited to the issuance of summons, tickets, or bills) constitutes a copyright infringement.

2. CONSENSUAL CONTRACT
Any agent, officer, or entity who interacts with the Authorized Representative or the Trust Property after being notified of this schedule voluntarily agrees to the following fees. The act of detainment, questioning, or demands for property constitutes acceptance of this contract.

3. FEE SCHEDULE
The following penalties apply for unauthorized use or trespass upon rights:

${itemsText}

${libertyClause}

4. TERMS OF PAYMENT
Invoices for the above violations are due upon receipt. Failure to pay within 30 days will result in a Notice of Default and may be followed by a commercial lien filing (UCC-1) against the personal assets of the transgressing agent.

EXECUTED UNDER SEAL this ${new Date().toLocaleDateString()}.

By: __________________________
    Authorized Representative
    All Rights Reserved, UCC 1-308`;

    setPreview(content);
  };

  const generateAssignment = () => {
      const template = TEMPLATES.find(t => t.id === 'insurance-assignment-deed');
      if (!template) return;

      let text = template.content;
      text = text.replace('{{date}}', new Date().toLocaleDateString());
      text = text.replace('{{assignor}}', assignorName || '[ASSIGNOR NAME]');
      text = text.replace('{{trustee}}', trustee || '[TRUSTEE NAME]');
      text = text.replace('{{trust_name}}', trustName || '[TRUST NAME]');
      text = text.replace('{{trust_name}}', trustName || '[TRUST NAME]'); // Replace second occurrence
      text = text.replace('{{insurer}}', iulInsurer || '[INSURER]');
      text = text.replace('{{policy_no}}', iulPolicyNo || '[POLICY #]');

      const checklist = `
==================================================
TRUST BANKING EXECUTION CHECKLIST (IUL FUNDING)

1. [ ] EXECUTE DEED: Sign the above Deed of Assignment in front of a Notary Public.
2. [ ] NOTIFY CARRIER: Send the original Notarized Deed to ${iulInsurer || 'the Insurance Carrier'} (Policy Service Dept).
3. [ ] UPDATE BENEFICIARY: Ensure the Trust is listed as the primary beneficiary.
4. [ ] CONFIRMATION: Wait for written confirmation of ownership change (usually 2-3 weeks).
5. [ ] POLICY LOANS: Once confirmed, the Trustee may request loans against cash value to acquire other trust assets.
6. [ ] BANKING: Deposit policy loan proceeds into the Trust's bank account, not a personal account.
`;
      setPreview(text + checklist);
  };

  return (
    <div className="flex h-full bg-slate-950">
      {/* Configuration Pane */}
      <div className="w-1/3 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">
        <div className="p-6 border-b border-slate-800">
          <h2 className="font-serif font-bold text-sovereign-200 text-lg">Trust Builder</h2>
          <p className="text-xs text-slate-500 font-mono mt-1">Structure, Fund, and Protect.</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-950 border-b border-slate-800">
            {['details', 'parties', 'funding', 'copyright'].map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider transition-colors ${
                        activeTab === tab 
                            ? 'bg-slate-900 text-sovereign-400 border-b-2 border-sovereign-500' 
                            : 'text-slate-500 hover:text-slate-300'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div className="p-6 flex-1 space-y-6">
            {/* Common Fields */}
            <div className="space-y-4">
                <div>
                    <label className="block text-xs text-slate-400 mb-1 font-mono">Trust Name</label>
                    <input 
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-sovereign-500 focus:outline-none"
                        placeholder="The Veritas Private Trust"
                        value={trustName}
                        onChange={e => setTrustName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs text-slate-400 mb-1 font-mono">Trustee Name</label>
                    <input 
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-sovereign-500 focus:outline-none"
                        placeholder="John Henry Doe"
                        value={trustee}
                        onChange={e => setTrustee(e.target.value)}
                    />
                </div>
            </div>

            {activeTab === 'funding' && (
                <div className="animate-fade-in space-y-5">
                    <div className="bg-emerald-900/10 border border-emerald-900/30 p-4 rounded">
                        <h4 className="text-xs font-bold text-emerald-500 uppercase mb-2">Asset Injection</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Move assets from the "Public/Debtor" side to the "Private/Creditor" side. This process is known as funding the trust corpus.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs text-slate-400 mb-1 font-mono">Asset Class</label>
                        <select 
                            value={assetType}
                            onChange={(e) => setAssetType(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-sovereign-500 focus:outline-none"
                        >
                            <option value="iul">Indexed Universal Life (IUL)</option>
                            <option value="real_estate">Real Estate (Quitclaim)</option>
                            <option value="vehicle">Vehicle (Title Transfer)</option>
                            <option value="precious_metals">Precious Metals</option>
                        </select>
                    </div>

                    {assetType === 'iul' && (
                        <div className="space-y-4 border-l-2 border-slate-800 pl-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1 font-mono">Insurance Carrier</label>
                                <input 
                                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-sovereign-500 focus:outline-none"
                                    placeholder="Mutual of Omaha / Allianz"
                                    value={iulInsurer}
                                    onChange={e => setIulInsurer(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1 font-mono">Policy Number</label>
                                <input 
                                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-sovereign-500 focus:outline-none"
                                    placeholder="P-12345678"
                                    value={iulPolicyNo}
                                    onChange={e => setIulPolicyNo(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1 font-mono">Assignor (Current Owner)</label>
                                <input 
                                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded p-2 text-sm focus:border-sovereign-500 focus:outline-none"
                                    placeholder="Name on Policy"
                                    value={assignorName}
                                    onChange={e => setAssignorName(e.target.value)}
                                />
                            </div>
                            <div className="pt-2">
                                <button 
                                    onClick={generateAssignment}
                                    className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-serif font-bold py-3 rounded shadow-lg transition-all text-xs tracking-widest"
                                >
                                    GENERATE ASSIGNMENT DEED
                                </button>
                            </div>
                        </div>
                    )}
                    {assetType !== 'iul' && (
                        <div className="text-center py-4 text-slate-500 font-mono text-xs italic">
                            Module for {assetType.replace('_', ' ')} is currently offline.
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'copyright' && (
                <div className="animate-fade-in">
                    <div className="bg-amber-900/10 border border-amber-900/30 p-4 rounded mb-6">
                        <h4 className="text-xs font-bold text-amber-500 uppercase mb-2">Commercial Warfare</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Define your "Price List" for rights violations. If an agent (police, judge, clerk) violates your rights, they agree to pay these fees. This turns a defensive criminal case into an offensive commercial claim.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-mono text-sovereign-500 uppercase">Fee Schedule Items</label>
                            <button onClick={addFeeItem} className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2 py-1 rounded font-mono border border-slate-600">
                                + Add Item
                            </button>
                        </div>
                        
                        {feeItems.map((item, idx) => (
                            <div key={item.id} className="bg-slate-950 p-3 rounded border border-slate-800 relative group">
                                <button 
                                    onClick={() => removeFeeItem(item.id)}
                                    className="absolute top-2 right-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                                <div className="space-y-2">
                                    <input 
                                        className="w-full bg-transparent border-b border-slate-700 text-slate-200 text-sm focus:border-sovereign-500 focus:outline-none placeholder-slate-600"
                                        placeholder="Violation Description"
                                        value={item.violation}
                                        onChange={e => updateFeeItem(item.id, 'violation', e.target.value)}
                                    />
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-slate-500 font-mono">FEE:</span>
                                        <input 
                                            className="flex-1 bg-transparent border-none text-emerald-400 font-mono text-sm focus:ring-0 placeholder-slate-700"
                                            placeholder="Amount (e.g. 5,000.00)"
                                            value={item.penalty}
                                            onChange={e => updateFeeItem(item.id, 'penalty', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center space-x-2 bg-sovereign-900/20 p-3 rounded border border-sovereign-800/30">
                        <input 
                            type="checkbox" 
                            id="libertyClause" 
                            checked={includeLibertyClause} 
                            onChange={e => setIncludeLibertyClause(e.target.checked)}
                            className="rounded border-slate-600 bg-slate-900 text-sovereign-500 focus:ring-0"
                        />
                        <label htmlFor="libertyClause" className="text-xs text-slate-300 select-none">
                            Inject <strong>Murdock v. PA</strong> "Liberty vs. Privilege" Clause
                        </label>
                    </div>

                    <button 
                        onClick={generateNotice}
                        className="w-full mt-4 bg-sovereign-700 hover:bg-sovereign-600 text-white font-serif font-bold py-3 rounded shadow-lg transition-all"
                    >
                        Generate Copyright Notice
                    </button>
                </div>
            )}

            {(activeTab === 'details' || activeTab === 'parties') && (
                <div className="text-center py-10 text-slate-600 font-mono text-xs">
                    Module under construction. Proceed to <strong>Funding</strong> or <strong>Copyright</strong> tab.
                </div>
            )}
        </div>
      </div>

      {/* Preview Pane */}
      <div className="flex-1 bg-slate-950 p-8">
        <div className="h-full bg-white text-slate-900 font-mono text-sm p-10 shadow-2xl overflow-y-auto whitespace-pre-wrap rounded-sm border border-slate-300 relative">
            {preview ? preview : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 select-none flex-col">
                    <span className="font-serif italic text-lg text-slate-500 mb-2">Notice Preview</span>
                    <span className="text-xs font-mono text-slate-400">Configure the module to generate the instrument.</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TrustBuilder;