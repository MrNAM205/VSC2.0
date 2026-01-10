
import { CorpusItem, CorpusType } from '../types';

export const MOCK_CORPUS: CorpusItem[] = [
  {
    id: 'land-patent-authority',
    type: CorpusType.STATUTE,
    title: 'Land Patent (Supreme Title)',
    citation: 'Summa Corp. v. California ex rel. State Lands Comm’n, 466 U.S. 198 (1984)',
    jurisdiction: 'US Supreme Court',
    text: 'A land patent is the highest evidence of title and is immune to collateral attack. Once the patent is issued, the government has divested itself of all interest in the land. Most modern deeds are merely "color of title" (statutory), whereas the Patent represents the Allodial root used by the original estate-holders.',
    notes: 'The ultimate shield for land. Moving land back into the "Patent" status removes it from the municipal jurisdiction of taxation if done correctly.',
    tags: ['land-rights', 'property', 'allodial', 'patent']
  },
  {
    id: 'cestui-que-trust-def',
    type: CorpusType.DICTIONARY,
    title: 'Cestui Que Trust',
    citation: "Black's Law Dictionary 4th Ed.",
    jurisdiction: 'Equity / Trust Law',
    text: 'He who has a right to a beneficial interest in and out of an estate the legal title to which is vested in another. The person who possesses the equitable right to property and receives the rents, issues, and profits thereof.',
    notes: 'In the sovereign context, the "Strawman" (ALL CAPS NAME) is often viewed as the Trust, while the living man is the Cestui Que Trust or Beneficiary.',
    tags: ['trusts', 'equity', 'status', 'cestui-que-trust']
  },
  {
    id: 'jurisprudence-def',
    type: CorpusType.DICTIONARY,
    title: 'Jurisprudence',
    citation: "Black's Law Dictionary 4th Ed.",
    jurisdiction: 'General Law',
    text: 'The philosophy of law, or the science which treats of the principles of positive law and legal relations. In the proper sense of the word, "jurisprudence" is the science of law, namely, that science which has for its function to ascertain the principles on which legal rules are based.',
    notes: 'Understanding the *why* behind the rule allows the Maverick to find the exception.',
    tags: ['jurisprudence', 'philosophy', 'legal-theory']
  },
  {
    id: 'pro-se-def',
    type: CorpusType.DICTIONARY,
    title: 'Pro Se',
    citation: "Black's Law Dictionary 4th Ed.",
    jurisdiction: 'Procedural Law',
    text: 'For himself; in his own behalf; in person. Appearing for oneself, as in the case of one who does not retain a lawyer and appears for himself in court.',
    notes: 'Mavericks often prefer "In Propria Persona" or "Sui Juris" to avoid the "Pro Se" wardship presumption.',
    tags: ['status', 'court', 'pro-se', 'standing']
  },
  {
    id: 'equity-maxims',
    type: CorpusType.COMMENTARY,
    title: 'Maxims of Equity',
    citation: 'Bouvier’s Maxims of Law',
    jurisdiction: 'Equity',
    text: '1. Equity follows the law. 2. He who seeks equity must do equity. 3. He who comes into equity must come with clean hands. 4. Equity will not suffer a wrong to be without a remedy. 5. Equity regards that as done which ought to be done.',
    notes: 'Crucial for "Recourse" procedures. If there is no remedy at law (statute), one must seek it in Equity.',
    tags: ['equity', 'maxims', 'recourse', 'remedy']
  },
  {
    id: 'representative-capacity',
    type: CorpusType.RULE,
    title: 'Representative Capacity',
    citation: 'UCC 3-402(b)(1)',
    jurisdiction: 'Commercial Law',
    text: 'If a person signs their name in a representative capacity, the represented person (the fiction) is liable on the instrument, but the signer is NOT liable if the signature shows it was made on behalf of the represented person.',
    notes: 'The primary defense against personal liability for the strawman\'s debts.',
    tags: ['status', 'standing', 'ucc', 'commercial']
  },
  {
    id: 'without-prejudice-308',
    type: CorpusType.RULE,
    title: 'Without Prejudice (UCC 1-308)',
    citation: 'Uniform Commercial Code § 1-308',
    jurisdiction: 'Commercial Law',
    text: 'A party that with explicit reservation of rights performs or promises performance... does not thereby prejudice the rights reserved. Words such as "without prejudice," "under protest," or the like are sufficient.',
    notes: 'Standard notation to prevent unintended waivers of rights.',
    tags: ['commercial', 'rights', 'procedure']
  },
  {
    id: 'rescission-doctrine',
    type: CorpusType.COMMENTARY,
    title: 'Doctrine of Rescission',
    citation: 'Restatement (Second) of Contracts',
    jurisdiction: 'Contract Law',
    text: 'Rescission is the unmaking of a contract from the beginning (void ab initio). It is the undoing of a thing from the beginning, not merely its termination. Grounds for rescission include fraud, mutual mistake, lack of capacity, or duress.',
    notes: 'Essential for undoing "Joinder" created by signing tickets or applications without full disclosure.',
    tags: ['contract', 'rescission', 'remedy', 'recourse']
  }
];
