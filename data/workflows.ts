
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  recommendedScriptId?: string;
  recommendedTemplateId?: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}

export const WORKFLOWS: Workflow[] = [
  {
    id: 'status-correction',
    title: 'Status Correction (State National)',
    description: 'The ceremonial and bureaucratic process of rebutting the presumption of corporate personhood and reclaiming the estate.',
    steps: [
      {
        id: 'step-1-identifiers',
        title: 'Gather Estate Identifiers',
        description: 'Locate the key numbers that identify the legal fiction/trust corpus.',
        instructions: [
          'Contact Vital Records to order the "Long Form" Birth Certificate.',
          'Ensure the copy has the "State File Number" (often red ink, upper right).',
          'Attempt to locate a CUSIP number (optional but helpful).',
          'Record these numbers in the "Hidden Identifiers Worksheet".'
        ],
        recommendedScriptId: 'phone-vital-records-file-no',
        recommendedTemplateId: 'identifier-retrieval-worksheet'
      },
      {
        id: 'step-2-affidavit',
        title: 'Execute Affidavit of Status',
        description: 'Create the sworn statement of your living capacity.',
        instructions: [
          'Draft the Affidavit of Political Status using the gathered identifiers.',
          'Sign the document in the presence of a Notary Public.',
          'Use a "Jurato" (Sworn to) acknowledgment, not just an acknowledgment of signature.',
          'Attach a certified copy of the Birth Certificate if permitted by local recording rules.'
        ],
        recommendedTemplateId: 'affidavit-status-correction'
      },
      {
        id: 'step-3-recording',
        title: 'Public Recording',
        description: 'Place your status on the public record to serve notice to the world.',
        instructions: [
          'Take the original notarized Affidavit to the County Recorder / Clerk of Court.',
          'Request to record it in "Miscellaneous Records" or "Land Records".',
          'Pay the recording fee.',
          'Obtain at least two (2) certified copies of the recorded instrument.',
          'Keep one certified copy in your "Sovereign Cockpit" binder at all times.'
        ]
      }
    ]
  },
  {
    id: 'administrative-remedy-3step',
    title: 'Administrative Remedy (3-Step Process)',
    description: 'The standard commercial process to establish a claim or discharge a debt via Notice, Cure, and Default.',
    steps: [
      {
        id: 'step-1-conditional-acceptance',
        title: 'Step 1: Conditional Acceptance (Offer)',
        description: 'Accept the claim upon proof. Do not argue; counter-offer.',
        instructions: [
          'Draft the "Notice of Conditional Acceptance".',
          'State: "I accept your claim UPON PROOF of [1, 2, 3]."',
          'Give them 10 days to respond.',
          'Send via Certified Mail with Return Receipt.'
        ],
        recommendedTemplateId: 'conditional-acceptance-offer'
      },
      {
        id: 'step-2-notice-fault',
        title: 'Step 2: Notice of Fault (Cure)',
        description: 'Notify them they missed the deadline and offer a final chance to cure.',
        instructions: [
          'Wait for the 10 days (plus mailing time) to expire.',
          'Send the "Notice of Fault and Opportunity to Cure".',
          'Reference the first letter\'s tracking number.',
          'Give them 3 additional days as a grace period.'
        ],
        recommendedTemplateId: 'notice-fault-cure'
      },
      {
        id: 'step-3-default-judgment',
        title: 'Step 3: Default (Estoppel)',
        description: 'Finalize the record of their non-response.',
        instructions: [
          'If no response after the cure period, they are in Default.',
          'Execute the "Certificate of Non-Response" before a Notary.',
          'This establishes the "Nihil Dicit" judgment in the private record.',
          'You may now assert Estoppel in any future proceedings.'
        ],
        recommendedTemplateId: 'certificate-non-response'
      }
    ]
  },
  {
    id: 'contract-rescission',
    title: 'Rescission of Contract (Unmaking)',
    description: 'The process of legally canceling a signature on a contract (e.g., Ticket, Plea, Loan) due to fraud, mistake, or coercion.',
    steps: [
      {
        id: 'step-1-identify',
        title: 'Identify the Defect',
        description: 'Determine WHY the contract is voidable.',
        instructions: [
          'Was full disclosure provided? (e.g., hidden terms)',
          'Was there a meeting of the minds?',
          'Was the signature obtained under threat (duress)?',
          'Was there a mutual mistake of fact?'
        ]
      },
      {
        id: 'step-2-notice',
        title: 'Execute Notice of Rescission',
        description: 'Create the formal instrument to void the signature.',
        instructions: [
          'Draft the Notice of Rescission.',
          'Clearly state the grounds (Fraud/Mistake).',
          'Demand restoration of the status quo ante.',
          'File this with the Court Clerk or serve the Agency immediately (72-hour window is best).'
        ],
        recommendedTemplateId: 'notice-rescission',
        recommendedScriptId: 'rescission-verbal'
      },
      {
        id: 'step-3-enforce',
        title: 'Enforce the Rescission',
        description: 'Treat the contract as a nullity.',
        instructions: [
          'Do not perform under the contract (unless ordered by a court to prevent arrest).',
          'Return any benefits received.',
          'If challenged, stand on the Rescission affidavit.'
        ]
      }
    ]
  },
  {
    id: 'court-offer-discharge',
    title: 'Winning via Offer (Tender of Payment)',
    description: 'Using the power of "Tender" to discharge a debt or obligation in court, shifting from criminal to commercial jurisdiction.',
    steps: [
      {
        id: 'step-1-calculate',
        title: 'Assess the Obligation',
        description: 'Determine if this is a money matter.',
        instructions: [
          'Is there a fine or fee attached?',
          'Is there a bond amount?',
          'If yes, it is a commercial matter, disguised as criminal.'
        ]
      },
      {
        id: 'step-2-tender',
        title: 'Make the Tender',
        description: 'Offer to pay/perform immediately.',
        instructions: [
          'Stand in court and verbally offer to settle the account.',
          'State: "I wish to discharge this debt.".',
          'Have a method of payment ready (even if you know they might refuse).',
          'The goal is the OFFER itself.'
        ],
        recommendedScriptId: 'court-offer-discharge'
      },
      {
        id: 'step-3-discharge',
        title: 'Closure by Refusal',
        description: 'If they refuse payment, the debt is discharged.',
        instructions: [
          'If the judge/prosecutor refuses your tender, the obligation is extinguished under UCC 3-603(b).',
          'State: "Let the record show tender was refused."',
          'Move for dismissal with prejudice.'
        ]
      }
    ]
  },
  {
    id: 'bc-authentication',
    title: 'Birth Certificate Authentication (DS-4194)',
    description: 'Federal authentication of the state registrar\'s signature for international recognition (Apostille/Authentication).',
    steps: [
      {
        id: 'step-1-cert-copy',
        title: 'Obtain Fresh Certified Copy',
        description: 'Old copies may not be accepted. Get a new one.',
        instructions: [
          'Order a new certified copy of your Birth Certificate.',
          'Ensure it is signed by the current State Registrar (not a county clerk).',
          'Verify the seal is raised and distinct.'
        ],
        recommendedTemplateId: 'vital-record-request'
      },
      {
        id: 'step-2-sec-state',
        title: 'State Authentication',
        description: 'Authenticate the Registrar\'s signature at the State level.',
        instructions: [
          'Send the BC to your Secretary of State (Notary/Authentication Division).',
          'Request "Authentication" (for non-Hague countries) or "Apostille".',
          'Include the required fee and return envelope.',
          'Wait for the document to return with the State seal attached.'
        ]
      },
      {
        id: 'step-3-federal',
        title: 'Federal Authentication (DS-4194)',
        description: 'Authenticate the State seal at the US Department of State.',
        instructions: [
          'Fill out Form DS-4194.',
          'Enclose the State-Authenticated BC.',
          'Enclose the fee (check/money order) and tracked return envelope.',
          'Mail to the US Department of State Office of Authentications.',
          'Processing time can be 8-12 weeks.'
        ]
      }
    ]
  },
  {
    id: 'ucc1-perfecting',
    title: 'UCC-1 Financing Statement',
    description: 'Establishing a secured interest in the assets of the legal fiction (Debtor) by the living man (Secured Party).',
    steps: [
      {
        id: 'step-1-parties',
        title: 'Define Parties',
        description: 'Establish the separation between Debtor and Secured Party.',
        instructions: [
          'Debtor: The ALL CAPS NAME on the Birth Certificate.',
          'Debtor Address: Use the mailing address on file (or a PO Box).',
          'Secured Party: Your name in Upper/Lower case (e.g., John Henry Doe).',
          'Secured Party Address: Your mailing location.'
        ],
        recommendedTemplateId: 'ucc1-financing'
      },
      {
        id: 'step-2-collateral',
        title: 'Describe Collateral',
        description: 'Define what assets are covered by this lien.',
        instructions: [
          'Draft the collateral description carefully.',
          'Common language: "All assets, land, and personal property, now owned and hereafter acquired..."',
          'Reference the Birth Certificate by State File Number as the "origin" of the Debtor entity.'
        ]
      },
      {
        id: 'step-3-filing',
        title: 'File with Secretary of State',
        description: 'Record the lien in the commercial registry.',
        instructions: [
          'Navigate to your State\'s UCC filing portal.',
          'Input the Debtor and Secured Party data exactly as drafted.',
          'Upload the collateral description or type it in.',
          'Pay the filing fee.',
          'Download the "Acknowledgment" image immediately upon success.'
        ]
      }
    ]
  },
  {
    id: 'cusip-audit',
    title: 'CUSIP & Estate Audit',
    description: 'Advanced trace of securities linked to the legal fiction.',
    steps: [
      {
        id: 'step-1-prep',
        title: 'Prepare Information',
        description: 'Gather the exact registration details.',
        instructions: [
          'Have your State File Number ready.',
          'Know the exact date of birth and county of registration.',
          'Identify the specific bond types used in that era (e.g., Muni-Bonds).'
        ],
        recommendedScriptId: 'phone-cusip-inquiry'
      },
      {
        id: 'step-2-lookup',
        title: 'Perform Lookup',
        description: 'Use financial terminals or broker inquiries.',
        instructions: [
          'Access a Fidelity/Bloomberg terminal if possible (or find a broker friend).',
          'Search for bonds issued by the State/County around the birth date.',
          'Look for instrument numbers correlating to the File Number.',
          'Note: This is difficult and often obstructed. Proceed with patience.'
        ]
      }
    ]
  },
  {
    id: 'trust-funding-iul',
    title: 'Trust Funding via IUL (Infinite Banking)',
    description: 'Establishing an Indexed Universal Life policy to function as the "Private Reserve Bank" for the Trust.',
    steps: [
      {
        id: 'step-1-design',
        title: 'Policy Design (Maximum Funding)',
        description: 'The goal is Cash Value accumulation, NOT Death Benefit.',
        instructions: [
          'Contact an insurance broker familiar with "Infinite Banking" or "VELO" concepts.',
          'Request an illustration for a "Max-Funded IUL" up to the MEC (Modified Endowment Contract) limit.',
          'Ensure the "Death Benefit" is the minimum required by IRS to maintain tax-free status.',
          'Select an index strategy (e.g., S&P 500) with a 0% floor.'
        ]
      },
      {
        id: 'step-2-application',
        title: 'Application Structure',
        description: 'Correctly designating the Insured and the Owner.',
        instructions: [
          'Insured: The natural person (you) or the Strawman (if required by carrier).',
          'Owner: IDEALLY, the Trust should be the applicant and owner from day one.',
          'Alternative Owner: If the carrier refuses Trust ownership initially, apply individually, then Assign (Step 3).',
          'Beneficiary: The Trust (Revocable or Irrevocable).'
        ]
      },
      {
        id: 'step-3-assignment',
        title: 'Transfer to Trust (If Individual Owned)',
        description: 'Moving the policy into the Trust Estate.',
        instructions: [
          'Wait for the policy to be issued and "In Force".',
          'Execute a "Deed of Absolute Assignment" transferring ownership to the Trustee.',
          'File the assignment with the Insurance Carrier.',
          'This removes the asset from your personal estate/liability.'
        ],
        recommendedTemplateId: 'insurance-assignment-deed'
      },
      {
        id: 'step-4-banking',
        title: 'Utilization (Trust Banking)',
        description: 'Using the policy for liquidity.',
        instructions: [
          'The Trustee can now request "Policy Loans" against the cash value.',
          'Loans are tax-free and do not interrupt the compound interest growth of the index.',
          'Use these funds to acquire assets (Real Estate, Crypto, Gold) in the name of the Trust.',
          'Repay the loans at the Trustee\'s discretion to refill the "bank".'
        ]
      }
    ]
  },
  {
    id: 'common-law-defense-strategy',
    title: 'True American Battle: Common Law Defense',
    description: 'A strategic workflow for lawfully contesting a court case by prioritizing procedure, jurisdiction, and strict proof.',
    steps: [
      {
        id: 'step-1-procedure-audit',
        title: 'Perfect Procedure First (The Audit)',
        description: 'Analyze the initial service and summons for defects before making any move.',
        instructions: [
          'Do NOT ignore the summons. A "Battle" is won by showing up correctly.',
          'Check the name on the summons. Is it the All-Caps fiction?',
          'Check the service method. Was it served personally, or just mailed? Does it comply with Process Service rules?',
          'Deadline Awareness: Calculate your response deadline (usually 20 or 30 days) immediately.'
        ]
      },
      {
        id: 'step-2-appearance',
        title: 'Enter Special Appearance',
        description: 'Avoid waiving jurisdiction by entering strictly to challenge it.',
        instructions: [
          'Do NOT file a general answer or a "Motion to Dismiss" yet if it waives jurisdiction.',
          'File a "Notice of Special Appearance" to the court clerk.',
          'State clearly you are appearing "in propria persona" (in your own person), not as a pro se litigant (representing a fiction).',
          'Reserve all rights under UCC 1-308 / Common Law.'
        ],
        recommendedTemplateId: 'notice-appearance-pro-se'
      },
      {
        id: 'step-3-jurisdiction-challenge',
        title: 'Strategic Contesting (Jurisdiction)',
        description: 'Challenge the court\'s authority to hear the matter.',
        instructions: [
          'File a "Motion to Dismiss for Lack of Subject Matter Jurisdiction".',
          'Challenge Standing: "Where is the injured party?"',
          'Challenge Contract: "Where is the contract binding me to this statute?"',
          'Force the opposing counsel to produce strict proof of their authority to represent the Plaintiff.'
        ],
        recommendedTemplateId: 'motion-dismiss-jurisdiction'
      },
      {
        id: 'step-4-preserve-record',
        title: 'Preserve the Record (Ceremonial Ethos)',
        description: 'Ensure every violation of due process is recorded for appeal.',
        instructions: [
          'If the judge ignores your motion, state: "I take exception to that ruling and let the record show I do not consent."',
          'Do not argue facts. Argue procedure.',
          'If denied, file a "Notice of Objection" immediately after the hearing.',
          'Treat every document as a sovereign artifact: signed, sealed, and archived.'
        ]
      }
    ]
  }
];