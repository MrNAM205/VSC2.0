
import { CorpusItem, CorpusType } from '../types';

export const MOCK_CORPUS: CorpusItem[] = [
  // --- EXISTING ITEMS (Preserved) ---
  {
    id: 'blacks-4th-jurisprudence',
    type: CorpusType.DICTIONARY,
    title: 'Jurisprudence',
    citation: "Black's Law Dictionary (4th Ed.)",
    jurisdiction: 'Universal',
    text: 'The philosophy or science of law; the knowledge of things divine and human, the science of the just and the unjust. The study of the fundamental principles of a legal system.',
    notes: 'Base definition for the module. Distinguishes between "law" (statute) and "jurisprudence" (the science/philosophy behind it).',
    tags: ['definitions', 'philosophy', 'root']
  },
  {
    id: 'blacks-4th-pro-se',
    type: CorpusType.DICTIONARY,
    title: 'Pro Se',
    citation: "Black's Law Dictionary (4th Ed.)",
    jurisdiction: 'Universal',
    text: 'For himself; in his own behalf; in person. Appearing for oneself, as in the case of one who does not retain a lawyer and appears for himself in court.',
    notes: 'The lawful term for self-representation. Distinct from "Sovereign Citizen" rhetoric; widely recognized in procedural rules.',
    tags: ['definitions', 'procedure', 'status', 'pro-se']
  },
  {
    id: 'blacks-4th-cestui-que-trust',
    type: CorpusType.DICTIONARY,
    title: 'Cestui Que Trust',
    citation: "Black's Law Dictionary (4th Ed.)",
    jurisdiction: 'Universal / Equity',
    text: 'He who has a right to a beneficial interest in and out of an estate the legal title to which is vested in another. The person who possesses the equitable right to property and receives the rents, issues, and profits thereof, the legal estate of which is vested in a trustee.',
    notes: 'The existence of this definition in the standard legal dictionary refutes claims that the concept is "frivolous". It proves the legal recognition of split title (legal vs. equitable) is foundational to Western law.',
    tags: ['trusts', 'equity', 'definitions', 'cestui-que-trust']
  },
  // ... (Previous items preserved for brevity, inserting new items below) ...

  // --- UNDRIP (INDIGENOUS RIGHTS) ---
  {
    id: 'undrip-art-3',
    type: CorpusType.STATUTE,
    title: 'UNDRIP Article 3: Self-Determination',
    citation: 'UN Declaration on the Rights of Indigenous Peoples',
    jurisdiction: 'International',
    text: 'Indigenous peoples have the right to self-determination. By virtue of that right they freely determine their political status and freely pursue their economic, social and cultural development.',
    notes: 'The bedrock of indigenous sovereignty. Used to assert that you determine your status, not the state.',
    tags: ['undrip', 'indigenous', 'rights', 'international']
  },
  {
    id: 'undrip-art-26',
    type: CorpusType.STATUTE,
    title: 'UNDRIP Article 26: Lands & Resources',
    citation: 'UN Declaration on the Rights of Indigenous Peoples',
    jurisdiction: 'International',
    text: '1. Indigenous peoples have the right to the lands, territories and resources which they have traditionally owned, occupied or otherwise used or acquired.',
    notes: 'Used to challenge property taxes or land use restrictions on ancestral/allodial land.',
    tags: ['undrip', 'indigenous', 'land', 'property']
  },
  {
    id: 'undrip-art-4',
    type: CorpusType.STATUTE,
    title: 'UNDRIP Article 4: Autonomy',
    citation: 'UN Declaration on the Rights of Indigenous Peoples',
    jurisdiction: 'International',
    text: 'Indigenous peoples, in exercising their right to self-determination, have the right to autonomy or self-government in matters relating to their internal and local affairs.',
    tags: ['undrip', 'indigenous', 'sovereignty']
  },

  // --- ADRIP (AMERICAN DECLARATION) ---
  {
    id: 'adrip-art-6',
    type: CorpusType.STATUTE,
    title: 'ADRIP Article 6: Equality & Non-Discrimination',
    citation: 'American Declaration on the Rights of Indigenous Peoples',
    jurisdiction: 'International / OAS',
    text: 'Indigenous peoples have the right to full enjoyment of all human rights and fundamental freedoms... States must prevent and eliminate discrimination against Indigenous peoples.',
    notes: 'Asserts equal protection under international standards.',
    tags: ['adrip', 'indigenous', 'rights', 'international']
  },
  {
    id: 'adrip-art-9',
    type: CorpusType.STATUTE,
    title: 'ADRIP Article 9: Juridical Personality',
    citation: 'American Declaration on the Rights of Indigenous Peoples',
    jurisdiction: 'International / OAS',
    text: 'Indigenous peoples and nations have juridical personality. They have the right to recognition of their legal systems, institutions, and customs.',
    notes: 'Critical for establishing standing as a distinct legal entity/nation, not just a subject.',
    tags: ['adrip', 'indigenous', 'status', 'international']
  },
  {
    id: 'adrip-art-12',
    type: CorpusType.STATUTE,
    title: 'ADRIP Article 12: Identity & Belonging',
    citation: 'American Declaration on the Rights of Indigenous Peoples',
    jurisdiction: 'International / OAS',
    text: 'Indigenous peoples have the right to maintain and strengthen their spiritual, cultural, and historical identity. States must respect and protect this identity.',
    tags: ['adrip', 'indigenous', 'identity']
  },
  {
    id: 'adrip-art-15',
    type: CorpusType.STATUTE,
    title: 'ADRIP Article 15: Self-Determination',
    citation: 'American Declaration on the Rights of Indigenous Peoples',
    jurisdiction: 'International / OAS',
    text: 'Indigenous peoples have the right to self-determination. They may freely determine their political status and pursue economic, social, and cultural development.',
    tags: ['adrip', 'indigenous', 'sovereignty']
  },

  // --- ILO CONVENTION 169 ---
  {
    id: 'ilo-169-art-2',
    type: CorpusType.STATUTE,
    title: 'ILO 169 Article 2: Protection of Rights',
    citation: 'Indigenous and Tribal Peoples Convention, 1989',
    jurisdiction: 'International / ILO',
    text: 'Governments must protect the rights of Indigenous peoples and ensure respect for their integrity. Measures must be taken to eliminate discrimination.',
    notes: 'Imposes a positive duty on governments to protect, not just abstain from harm.',
    tags: ['ilo-169', 'indigenous', 'protection']
  },
  {
    id: 'ilo-169-art-7',
    type: CorpusType.STATUTE,
    title: 'ILO 169 Article 7: Development Priorities',
    citation: 'Indigenous and Tribal Peoples Convention, 1989',
    jurisdiction: 'International / ILO',
    text: 'Indigenous peoples have the right to decide their own priorities for development. They must participate in decisions affecting their lives, beliefs, institutions, and lands.',
    tags: ['ilo-169', 'indigenous', 'land', 'development']
  },
  {
    id: 'ilo-169-art-8',
    type: CorpusType.STATUTE,
    title: 'ILO 169 Article 8: Customary Law',
    citation: 'Indigenous and Tribal Peoples Convention, 1989',
    jurisdiction: 'International / ILO',
    text: 'In applying national laws, due regard must be given to Indigenous customs and customary law. Indigenous peoples have the right to retain their own institutions.',
    notes: 'Allows you to bring "Customary Law" into a statutory court.',
    tags: ['ilo-169', 'indigenous', 'law', 'customary']
  },

  // --- EXCLUSIVE EQUITY ---
  {
    id: 'exclusive-equity',
    type: CorpusType.DICTIONARY,
    title: 'Exclusive Jurisdiction of Equity',
    citation: "Story's Equity Jurisprudence",
    jurisdiction: 'Equity',
    text: 'That portion of equity jurisdiction which embraces rights/remedies that the common law does not recognize or enforce. Includes Trusts, Fiduciary Duties, and Redemption.',
    notes: 'When dealing with a Trust, the court MUST sit in Equity. Common Law courts cannot adjudicate trusts.',
    tags: ['exclusive-equity', 'trusts', 'jurisdiction', 'definitions']
  },
  {
    id: 'fiduciary-duty',
    type: CorpusType.DICTIONARY,
    title: 'Fiduciary Duty',
    citation: "Black's Law Dictionary (4th Ed.)",
    jurisdiction: 'Equity',
    text: 'A duty to act for someone else\'s benefit, while subordinating one\'s personal interest to that of the other person. It is the highest standard of duty implied by law.',
    notes: 'Public officials are fiduciaries (Trustees) of the public trust. Violation is a breach of trust, handled in Exclusive Equity.',
    tags: ['exclusive-equity', 'fiduciary', 'definitions']
  },
  // --- EXISTING CORE ITEMS CONTINUED (Sample) ---
  {
    id: 'murdock-v-pa',
    type: CorpusType.CASE_LAW,
    title: 'Murdock v. Pennsylvania',
    citation: '319 U.S. 105 (1943)',
    jurisdiction: 'US Supreme Court',
    text: 'A state may not impose a charge for the enjoyment of a right granted by the federal constitution. No state may convert a secured liberty into a privilege, and issue a license and fee for it.',
    notes: 'The "Liberty vs. Privilege" anchor. Essential for challenging traffic laws and licensing schemes.',
    tags: ['case-law', 'rights', 'travel', 'license']
  }
];