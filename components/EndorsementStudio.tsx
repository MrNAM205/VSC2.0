
import React, { useState, useEffect, useRef } from 'react';
import { generateP256, sha256Bytes, signP256, exportPublicKey } from '../lib/crypto';
import { put } from '../lib/store';

const EndorsementStudio: React.FC = () => {
  const [keys, setKeys] = useState<CryptoKeyPair | null>(null);
  const [publicKeyJwk, setPublicKeyJwk] = useState<JsonWebKey | null>(null);
  const [text, setText] = useState('');
  const [file, setFile] = useState<{ name: string, data: ArrayBuffer } | null>(null);
  const [hash, setHash] = useState('');
  const [sig, setSig] = useState('');
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
        const k = await generateP256();
        setKeys(k);
        setPublicKeyJwk(await exportPublicKey(k.publicKey));
    })();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
            setFile({
                name: f.name,
                data: event.target.result as ArrayBuffer
            });
            resetState();
        }
      };
      reader.readAsArrayBuffer(f);
    }
  };

  const resetState = () => {
    setHash('');
    setSig('');
    setStep(1);
  };

  const applyTemplate = (type: string) => {
      let content = "";
      switch(type) {
          case 'credit_claim':
              content = `NOTICE OF CREDIT CLAIM & TENDER OF SET-OFF\n\n` +
              `NOTICE TO AGENT IS NOTICE TO PRINCIPAL\n` +
              `RE: Account/Instrument No. [INSERT NUMBER]\n\n` +
              `I, [Your Name], Authorized Representative, hereby present this lawful claim for credit on the public ledger. ` +
              `The attached instrument is accepted for value and returned for discharge of the obligation pursuant to public policy ` +
              `and UCC Article 3.\n\n` +
              `You are hereby directed to apply the principal balance to the account and zero out the ledger. ` +
              `Failure to adjust the account within 14 days will constitute acceptance of the discharge by acquiescence.\n\n` +
              `This endorsement serves as the Allonge to the attached instrument.\n\n` +
              `By: __________________________\n` +
              `    Authorized Representative\n` +
              `    Without Prejudice, UCC 1-308`;
              break;
          case 'a4v':
              content = `ACCEPTED FOR VALUE\n` +
              `Exempt from Levy\n` +
              `Return to Drawer for Adjustment and Discharge\n` +
              `Date: [YYYY-MM-DD]\n` +
              `By: [Your Name], Authorized Representative`;
              break;
          case 'conditional':
              content = `CONDITIONAL ACCEPTANCE\n\n` +
              `Accepted upon proof of claim that:\n` +
              `1. The debt has not already been discharged.\n` +
              `2. You are the holder in due course with standing to enforce.\n\n` +
              `Pending such proof, the matter is estopped.`;
              break;
      }
      setText(content);
      resetState();
  };

  const getBundledData = () => {
    // Bundle Strategy: Concatenate File Bytes + Separator + Text Bytes
    // This ensures the signature covers BOTH the document and the endorsement text.
    const textEncoder = new TextEncoder();
    const textBytes = textEncoder.encode(text);
    
    if (file) {
        const fileBytes = new Uint8Array(file.data);
        const separator = textEncoder.encode("||VEROBRIX_BUNDLE_SEPARATOR||");
        
        const combined = new Uint8Array(fileBytes.length + separator.length + textBytes.length);
        combined.set(fileBytes);
        combined.set(separator, fileBytes.length);
        combined.set(textBytes, fileBytes.length + separator.length);
        return combined;
    } else {
        return textBytes;
    }
  };

  const handleFingerprint = async () => {
    const input = getBundledData();
    const h = await sha256Bytes(input);
    setHash(h);
    setStep(2);
  };

  const handleSign = async () => {
    if (!keys?.privateKey) return;
    const input = getBundledData();
    const s = await signP256(keys.privateKey, input);
    setSig(s);
    setStep(3);
  };

  const handleSave = () => {
    if (!keys || !sig) return;
    const id = crypto.randomUUID();
    put('instruments', id, {
        id,
        type: 'SignedDocument',
        source: file ? 'File + Text Bundle' : 'Text Endorsement',
        filename: file?.name,
        contentText: text,
        bundleHash: hash,
        signature: sig,
        createdAt: new Date().toISOString()
    });
    alert('Endorsed instrument bundled and archived in Vault.');
  };

  return (
    <div className="h-full bg-slate-950 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 border-b border-sovereign-800 pb-4">
            <div className="w-10 h-10 rounded bg-sovereign-900/50 flex items-center justify-center border border-sovereign-700">
                <svg className="w-6 h-6 text-sovereign-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <h2 className="text-2xl font-serif font-bold text-sovereign-200">Endorsement Studio</h2>
                <p className="text-sm text-slate-400 font-mono">Bundled Signing & Cryptographic Endorsement</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <div className="bg-slate-900 border border-slate-700 rounded p-4">
                    <label className="text-xs font-mono text-sovereign-500 uppercase block mb-2">1. Instrument File (The "Res")</label>
                    
                    {/* File Upload Toggle */}
                    <div className="mb-4">
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden" 
                            id="endorse-upload"
                        />
                         <div className="flex gap-2">
                             <label 
                                htmlFor="endorse-upload" 
                                className={`flex-1 py-4 text-center rounded text-sm font-mono cursor-pointer border-2 border-dashed transition-colors ${file ? 'bg-emerald-900/20 border-emerald-600 text-emerald-400' : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-sovereign-600'}`}
                             >
                                 {file ? (
                                     <div className="flex items-center justify-center">
                                         <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                         {file.name}
                                     </div>
                                 ) : 'Click to Upload Instrument (PDF/IMG)'}
                             </label>
                             {file && (
                                 <button onClick={() => { setFile(null); if(fileInputRef.current) fileInputRef.current.value=''; resetState(); }} className="px-3 bg-red-900/20 text-red-400 border border-red-800 rounded hover:bg-red-900/40">X</button>
                             )}
                         </div>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-mono text-sovereign-500 uppercase block">2. Endorsement Text / Allonge</label>
                        <select 
                            onChange={(e) => applyTemplate(e.target.value)} 
                            className="bg-slate-950 border border-slate-700 text-slate-300 text-[10px] rounded px-2 py-1 font-mono focus:border-sovereign-500"
                            defaultValue=""
                        >
                            <option value="" disabled>Load Quick Template...</option>
                            <option value="credit_claim">Credit Claim & Set-off</option>
                            <option value="a4v">Accepted For Value (A4V)</option>
                            <option value="conditional">Conditional Acceptance</option>
                        </select>
                    </div>
                    <textarea 
                        className="w-full h-48 bg-slate-950 border border-slate-800 rounded p-3 text-sm font-mono text-slate-300 focus:outline-none focus:border-sovereign-500 resize-none"
                        placeholder="e.g., 'Accepted for Value, Exempt from Levy...' or 'Without Prejudice, UCC 1-308'"
                        value={text}
                        onChange={(e) => { setText(e.target.value); resetState(); }}
                    />
                </div>

                {step >= 2 && (
                    <div className="bg-slate-900 border border-slate-700 rounded p-4 animate-fade-in">
                        <label className="text-xs font-mono text-sovereign-500 uppercase block mb-2">Bundled SHA-256 Fingerprint</label>
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-emerald-400 break-all">
                            {hash}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1 italic">Represents the combined hash of the uploaded file AND the endorsement text.</p>
                    </div>
                )}

                {step >= 3 && (
                    <div className="bg-slate-900 border border-slate-700 rounded p-4 animate-fade-in">
                        <label className="text-xs font-mono text-sovereign-500 uppercase block mb-2">ECDSA P-256 Signature</label>
                        <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-xs text-indigo-400 break-all">
                            {sig}
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="bg-slate-900 p-4 rounded border border-slate-800">
                    <h3 className="text-sm font-bold text-slate-200 mb-2">Session Keypair</h3>
                    <div className="text-[10px] font-mono text-slate-500 mb-2">Generated locally. Non-custodial.</div>
                    {publicKeyJwk && (
                        <div className="bg-slate-950 p-2 rounded text-[10px] text-slate-400 font-mono overflow-hidden truncate">
                            kty: {publicKeyJwk.kty}, crv: {publicKeyJwk.crv}
                        </div>
                    )}
                </div>

                <button 
                    onClick={handleFingerprint}
                    disabled={(!text && !file) || step > 1}
                    className={`w-full py-3 rounded font-bold font-serif text-sm border transition-all ${
                        step === 1 ? 'bg-sovereign-700 text-white border-sovereign-600 hover:bg-sovereign-600' : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                >
                    1. BUNDLE & HASH
                </button>

                <button 
                    onClick={handleSign}
                    disabled={!hash || step > 2}
                    className={`w-full py-3 rounded font-bold font-serif text-sm border transition-all ${
                        step === 2 ? 'bg-indigo-700 text-white border-indigo-600 hover:bg-indigo-600' : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                >
                    2. SIGN BUNDLE
                </button>

                 <button 
                    onClick={handleSave}
                    disabled={!sig}
                    className={`w-full py-3 rounded font-bold font-serif text-sm border transition-all ${
                        step === 3 ? 'bg-emerald-800 text-white border-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                >
                    3. ARCHIVE
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EndorsementStudio;
