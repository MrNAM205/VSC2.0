
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  recommendedScriptId?: string;
  recommendedTemplateId?: string;
  encouragement?: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
}

export interface WorkflowWithSteps extends Workflow {
  steps: WorkflowStep[];
}

export const WORKFLOWS: WorkflowWithSteps[] = [
  {
    id: 'status-correction-protocol',
    title: 'Status Correction (Comprehensive)',
    description: 'The definitive sequence for rebutting the presumption of corporate wardship and asserting sovereign standing.',
    steps: [
      {
        id: 'status-step-1-identifiers',
        title: 'Hidden Identifiers Audit',
        description: 'Locate the forensic markers of the legal fiction.',
        instructions: [
          'Obtain a Certified Long-Form Birth Certificate.',
          'Identify the "State File Number" (typically top right).',
          'Search for the "Local File Number" or "Registrar Number".',
          'Reference the "Hidden Identifiers Checklist" in the Archive.'
        ],
        encouragement: "Dr. Vale: 'You cannot correct what you have not identified. These numbers are the serial codes for the vessel.'"
      },
      {
        id: 'status-step-2-cusip',
        title: 'CUSIP/Bond Investigation',
        description: 'Verify the financial securitization of the birth record.',
        instructions: [
          'Use the State File Number to inquire with a securities desk.',
          'Request a search for any CUSIP numbers associated with the birth registration date.',
          'Document any "Refusal of Information" as constructive evidence of a hidden trust.'
        ],
        recommendedScriptId: 'phone-cusip-inquiry',
        encouragement: "Axiom: 'If it moves in commerce, it has a bond. Finding the bond finds the creditor.'"
      },
      {
        id: 'status-step-3-affidavit',
        title: 'Affidavit of Ownership',
        description: 'Draft the formal declaration of status and ownership of the fiction.',
        instructions: [
          'Declare yourself as the "Authorized Representative" and "Secured Party".',
          'Incorporate the File Numbers and CUSIP (if found) into the record.',
          'Record the Affidavit in the public record (County Miscellaneous or UCC).'
        ],
        recommendedTemplateId: 'notice-rep-capacity',
        encouragement: "Final Step: You are putting the world on notice that the 'Debtor' is under new management."
      }
    ]
  },
  {
    id: 'allodial-transition-protocol',
    title: 'Allodial Transition Protocol (Archivist Codex)',
    description: 'The definitive path for exiting municipal wardship and asserting the supreme Allodial root of title.',
    steps: [
      {
        id: 'archivist-step-1-forensic',
        title: 'Forensic Grant Search',
        description: 'Locate the Federal Land Patent that created the specific estate.',
        instructions: [
          'Access the BLM GLO Records (General Land Office).',
          'Locate the "Cash Entry" or "Homestead" grant number.',
          'Verify the grant remains "Un-canceled" in the federal archive.',
          'Secure a Certified Copy of the Patent from the federal repository.'
        ],
        encouragement: "Dr. Vale: 'You are finding the original grant from the Creator to the Grantee. Everything else is just noise.'"
      },
      {
        id: 'archivist-step-2-rebuttal',
        title: 'Rebutting the Municipal Lien',
        description: 'Notice of Allodial standing to the County Tax Assessor.',
        instructions: [
          'Identify the property as "Private Property" not "Real Estate".',
          'Use the Allodial Assertion template to link your chain of title to the Patent.',
          'Explicitly state the land is held in "Fee Simple Allodial" absolute.',
          'Serve via Registered Mail with a Certificate of Service.'
        ],
        recommendedTemplateId: 'land-patent-assertion',
        encouragement: "Axiom: 'The Municipality is a guest on the soil; the Patent holder is the host.'"
      }
    ]
  },
  {
    id: 'ds4194-authentication',
    title: 'Birth Certificate Authentication (DS-4194)',
    description: 'Step-by-step path to federalize your birth record for international standing.',
    steps: [
      {
        id: 'ds-step-1-longform',
        title: 'Acquire Long-Form Certificate',
        description: 'Obtain the vault copy of your birth record.',
        instructions: [
          'Contact the State Vital Statistics office.',
          'Demand the "Long Form" or "Vault Copy", not an abstract.',
          'Ensure the copy has the State File Number and Registrar signature.'
        ],
        recommendedTemplateId: 'vital-record-request',
        encouragement: "This is the first layer of your foundation. Don't settle for the computer abstract."
      }
    ]
  }
];
