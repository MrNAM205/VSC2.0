
import { Playbook } from '../types';

export const PLAYBOOKS: Playbook[] = [
  {
    id: 'cemetery-reclamation-playbook',
    title: 'Ancestral Cemetery Reclamation',
    description: 'A forensic path for investigating land fraud, tax-immunity violations, and desecration of family burial grounds.',
    templateId: 'foia-request-standard',
    facts: [
        { key: 'cemetery_name', label: 'Cemetery/Family Name', type: 'text' },
        { key: 'parcel_id', label: 'Parcel/Tax ID (Historic)', type: 'text' },
        { key: 'suspected_agent', label: 'Suspected Family/Agent Name', type: 'text' },
        { key: 'municipality', label: 'Local Municipality', type: 'text' },
        { key: 'burial_records', label: 'Approx. Last Burial Date', type: 'date' }
    ],
    relevantTags: ['cemetery', 'property', 'land-rights', 'sacred-ground', 'equity'],
    nextSteps: [
        "Audit the Chain of Title at the County Recorder's Office back to the Land Patent.",
        "File a FOIA/Records Request for all permits (Demolition, Building, Variance) on that parcel.",
        "Draft a 'Notice of Sacred Ground Immunity' to the Tax Assessor.",
        "Execute a 'Notice of Desecration' to any current developers/occupants.",
        "Initiate a 'Search for Hidden Identifiers' for any bonds associated with the parcel transfer."
    ],
    appealGrounds: [
        "Desecration of Dedicated Public Use ground.",
        "Fraudulent transfer of immune property.",
        "Unlawful assessment of non-taxable sacred land.",
        "Breach of Fiduciary Duty by municipal trustees."
    ]
  },
  {
    id: 'traffic-ticket-playbook',
    title: 'Traffic Ticket Playbook',
    description: 'Guided walkthrough for challenging a traffic citation using UCC and Jurisdictional defense.',
    templateId: 'traffic-remedy-packet',
    facts: [
        { key: 'citation_no', label: 'Citation Number', type: 'text' },
        { key: 'officer_name', label: 'Officer Name/Badge', type: 'text' },
        { key: 'location', label: 'Location of Interaction', type: 'text' },
        { key: 'court_name', label: 'Court of Record', type: 'text' },
        { key: 'defendant_name', label: 'Your Full Lawful Name', type: 'text' }
    ],
    relevantTags: ['traffic', 'jurisdiction', 'ucc', 'murdock-v-pa', 'travel'],
    nextSteps: [
        "Record the citation as a commercial presentment.",
        "Serve the Notice of Conditional Acceptance to the Court Clerk via Certified Mail.",
        "Monitor for a Notice of Dishonor (failure to provide proof).",
        "Prepare for a Special Appearance if a hearing is scheduled."
    ],
    appealGrounds: [
        "Lack of Subject Matter Jurisdiction.",
        "Violation of Due Process (Suppression of Discovery).",
        "Improper conversion of a Right into a Privilege."
    ]
  },
  {
    id: 'bc-authentication-playbook',
    title: 'Birth Certificate Authentication',
    description: 'Pathway for authenticating birth records for international recognition.',
    templateId: 'vital-record-request',
    facts: [
        { key: 'registrant', label: 'Registrant Name', type: 'text' },
        { key: 'state_file_no', label: 'State File Number', type: 'text' },
        { key: 'dob', label: 'Date of Birth', type: 'date' },
        { key: 'auth_goal', label: 'Authentication Goal', type: 'select', options: ['Apostille', 'US State Dept Authentication', 'State Secretary Authentication'] }
    ],
    relevantTags: ['vital-records', 'authentication', 'status'],
    nextSteps: [
        "Submit the generated request to the State Vital Records office.",
        "Upon receipt, forward to the Secretary of State for authentication.",
        "Final step: Forward to the US Department of State (Form DS-4194) if required."
    ],
    appealGrounds: [
        "Refusal of agency to perform a ministerial duty.",
        "Improper denial of access to one's own records."
    ]
  },
  {
    id: 'trust-establishment-playbook',
    title: 'Private Trust Establishment',
    description: 'Wizard for forming a private trust to secure your estate.',
    templateId: 'trust-formation-packet',
    facts: [
        { key: 'trust_name', label: 'Name of the Trust', type: 'text' },
        { key: 'grantor', label: 'The Grantor (Creator)', type: 'text' },
        { key: 'trustee', label: 'The Trustee (Manager)', type: 'text' },
        { key: 'beneficiary', label: 'The Beneficiary (Receiver)', type: 'text' }
    ],
    relevantTags: ['trust', 'equity', 'estate', 'fiduciary'],
    nextSteps: [
        "Notarize the Trust Indenture.",
        "Obtain a separate EIN for the Trust from the IRS (as a complex trust).",
        "Open a non-interest bearing demand deposit account in the Trust's name.",
        "Assign assets (IUL, Real Estate) via Quitclaim or Assignment."
    ],
    appealGrounds: [
        "Breach of Fiduciary Duty by public trustees.",
        "Interference with private trust relations."
    ]
  },
  {
    id: 'foia-playbook',
    title: 'FOIA Record Quest',
    description: 'Demanding the evidence that proves the agent\'s lack of authority.',
    templateId: 'foia-request-standard',
    facts: [
        { key: 'agency_name', label: 'Target Agency', type: 'text' },
        { key: 'agency_address', label: 'Agency Headquarters', type: 'text' },
        { key: 'records_desc', label: 'Description of Records', type: 'textarea' },
        { key: 'sender_name', label: 'Requester Name', type: 'text' }
    ],
    relevantTags: ['tos-law', 'privacy', 'evidence', 'deletelawz'],
    nextSteps: [
        "Mail the request via Certified Mail.",
        "If ignored for 20 days, file an Administrative Appeal.",
        "If still ignored, file a Complaint in Federal District Court for injunctive relief."
    ],
    appealGrounds: [
        "Constructive Denial (failure to respond).",
        "Improper use of exemptions to hide misconduct."
    ]
  }
];
