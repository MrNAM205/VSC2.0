

export enum CorpusType {
  STATUTE = 'STATUTE',
  DICTIONARY = 'DICTIONARY',
  RULE = 'RULE',
  MANUAL = 'MANUAL',
  CASE_LAW = 'CASE_LAW',
  COMMENTARY = 'COMMENTARY'
}

export interface CorpusItem {
  id: string;
  type: CorpusType;
  title: string;
  citation: string;
  jurisdiction: string; 
  text: string;
  notes?: string;
  tags: string[];
}

export interface TemplateField {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'date' | 'textarea' | 'currency' | 'select';
  options?: string[];
  helpText?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  jurisdiction: string;
  content: string; 
  fields: TemplateField[];
  instructions?: string[];
  // Fix: Added discernment property to Template interface
  discernment?: {
    lawful: string;
    contested: string;
    utility: string;
    outcome: string;
  };
}

export interface Script {
  id: string;
  title: string;
  category: 'COURT' | 'PHONE' | 'COMMERCIAL';
  description: string;
  tags: string[];
  content: string;
  tips: string[];
}

export interface ArchiveEntry {
  id: string;
  timestamp: number;
  type: 'DRAFT' | 'COGNITION' | 'SEARCH' | 'PLAYBOOK' | 'RESEARCH' | 'MEDIA' | 'REMEDY' | 'AUDIT';
  title: string;
  summary: string;
  details: string;
  checksum: string;
}

export enum CognitionMode {
  STRICT = 'Lawful Strict',
  EXPLAINER = 'Explainer',
  COMPARE = 'Compare & Refute',
  LOCATOR = 'Jurisdiction Locator'
}

export interface MapLink {
  title: string;
  uri: string;
}

export interface CognitionResult {
  text: string;
  mapLinks?: MapLink[];
}

export interface Persona {
  id: string;
  givenName: string;
  familyName: string;
  tradeNameAllCaps: string;
  mailingAddress: string;
  domicileDeclaration: string;
  keyPairId: string;
  createdAt: string;
}

export interface Playbook {
  id: string;
  title: string;
  description: string;
  facts: { key: string; label: string; type: string; options?: string[] }[];
  templateId: string;
  relevantTags: string[];
  nextSteps: string[];
  appealGrounds: string[];
}

export interface ProjectArtifact {
  id: string;
  title: string;
  content: string;
  type: 'STATUTE' | 'CASE' | 'PAMPHLET' | 'NOTE' | 'TRANSCRIPT' | 'TAX_DOC' | 'ARGUMENT' | 'CERTIFICATE' | 'INSTRUMENT';
  relevance: number; 
  createdAt: string;
}

export interface ResearchGoal {
  id: string;
  text: string;
  completed: boolean;
}

export interface SideProject {
  id: string;
  title: string;
  description: string;
  artifacts: ProjectArtifact[];
  goals: ResearchGoal[];
  synthesis?: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'VICTORY';
  createdAt: string;
  lastAccessedAt: string;
}

export interface TacticalPathway {
  id: string;
  title: string;
  description: string;
  actionType: 'DRAFT' | 'RESEARCH' | 'FILING' | 'WAIT';
  targetView: string;
  resourceId?: string;
  suggestedGoals: string[];
}

export interface AuditResult {
  docType: string;
  summary: string;
  entities: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  pathways: TacticalPathway[];
  extractedData: any;
}

export enum RemedyType {
  EXEMPTION = 'Exemption Claim',
  JURISDICTION = 'Jurisdiction Challenge',
  ERROR = 'Administrative Error Claim',
  COMMERCIAL = 'Commercial Remedy (A4V)',
  TRUST = 'Trust/Title-Based Claim'
}

export interface StructuredTaxObject {
  authority: string;
  parcel_number: string;
  assessment_year: string;
  amount_due: string;
  notice_type: string;
  statutory_refs: string[];
  deadlines: string[];
  raw_text: string;
}

export interface TaxRemedyResult {
  exemption_intent: boolean;
  remedy_type: RemedyType;
  confidence: number;
  sto: StructuredTaxObject;
  rationale: string;
  packets: string[];
}