
import { Template } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'land-patent-assertion',
    name: 'Notice of Land Patent Assertion',
    description: 'A formal declaration of the supreme title root for a specific parcel of land.',
    jurisdiction: 'Common Law / Federal Land Grant',
    discernment: {
        lawful: "A Land Patent is a public grant of title that remains the supreme evidence of ownership.",
        contested: "Local administrative offices often do not recognize the distinction between a statutory deed and a patent root.",
        utility: "Establishing the patent root is a prerequisite for any forensic audit of property taxation.",
        outcome: "Notice is served to the public record identifying the supreme title holder."
    },
    fields: [
        { key: 'patent_no', label: 'Patent Number', placeholder: 'e.g., US-12345-A', type: 'text'},
        { key: 'original_grantee', label: 'Original Grantee', placeholder: 'Name on original land grant', type: 'text'},
        { key: 'legal_description', label: 'Legal Description', placeholder: 'Metes and bounds / Section-Township-Range', type: 'textarea'},
        { key: 'current_holder', label: 'Current Holder (Proper Case)', placeholder: 'John-Henry: Doe', type: 'text'}
    ],
    content: `NOTICE OF LAND PATENT ASSERTION AND DECLARATION OF TITLE

NOTICE TO AGENT IS NOTICE TO PRINCIPAL.

I, {{current_holder}}, do hereby provide notice of the assertion of the Land Patent (No: {{patent_no}}) originally granted to {{original_grantee}}.

The land described as:
{{legal_description}}

...is held as private property under the supreme title of the United States of America Land Patent. This patent is the highest evidence of title and is immune to collateral attack by any municipal or statutory agency. I am the lawful successor in interest to this grant.

This assertion is made for the purpose of preserving the allodial character of the land and to rebut any presumption that the land is held under a mere statutory contract or color of title.

Without Prejudice, UCC 1-308.

__________________________
{{current_holder}}, Grantee/Successor`
  },
  {
    id: 'allodial-title-deed',
    name: 'Declaration of Allodial Title',
    description: 'Formal instrument for moving property from statutory Fee Simple to private Allodial status.',
    jurisdiction: 'Common Law / Natural Right',
    discernment: {
        lawful: "Allodial title is absolute ownership, not subject to a superior landlord or state tax.",
        contested: "Statutory systems rely on the fiction of 'eminent domain' and 'tax liens' which presume state ownership.",
        utility: "Severing the statutory nexus requires a clear declaration of allodial status and patent root connection.",
        outcome: "Property is removed from the municipal tax roll if the protocol is successfully executed."
    },
    fields: [
        { key: 'owner_name', label: 'Living Man/Woman Name', placeholder: 'John-Henry: Doe', type: 'text'},
        { key: 'parcel_id', label: 'Parcel Identifier (Historic)', placeholder: 'APN 123-456', type: 'text'},
        { key: 'patent_ref', label: 'Patent Grant Reference', placeholder: 'Homestead Act Grant #789', type: 'text'},
        { key: 'jurisdiction_soil', label: 'Sovereign Soil/County', placeholder: 'Cook County, Illinois Republic', type: 'text'}
    ],
    content: `DECLARATION OF ALLODIAL TITLE AND DEED OF OWNERSHIP

KNOW ALL MEN BY THESE PRESENTS:

That I, {{owner_name}}, being of sound mind and acting in my private capacity, do hereby declare that the land identified as {{parcel_id}} in the county of {{jurisdiction_soil}} is held by me in FEE SIMPLE ALLODIAL.

I assert that my title is rooted in the original Land Patent ({{patent_ref}}) and that all subsequent statutory encumbrances (deeds, liens, or assessments) are mere "color of title" and subordinate to my absolute right of ownership.

This declaration serves as formal notice that the land is private property and is NOT "Real Estate" subject to the jurisdiction of the corporate state. No further taxes, assessments, or regulations are consented to.

EXECUTED UNDER SEAL.

By: __________________________
    {{owner_name}}, Allodial Title Holder
    Without Prejudice, UCC 1-308`
  },
  {
    id: 'ptar-admin-claim',
    name: 'P.T.A.R. Administrative Claim for Recovery',
    description: 'A formal demand for the recovery of property taxes paid under mistake of fact regarding title status.',
    jurisdiction: 'Equity / Administrative Procedure',
    discernment: {
        lawful: "Money paid under mistake of fact (mistaken belief that land was real estate) is recoverable in equity.",
        contested: "Assessors will claim the 'voluntary payment doctrine' to avoid refunds.",
        utility: "Establishing the mistake of fact regarding the Allodial root is the key forensic lever.",
        outcome: "A liquidated claim for refund of prior years' assessments."
    },
    fields: [
        { key: 'claimant', label: 'Claimant (Authorized Rep)', placeholder: 'John-Henry: Doe', type: 'text'},
        { key: 'assessor', label: 'Tax Assessor Name/Title', placeholder: 'County Tax Collector', type: 'text'},
        { key: 'recovery_amount', label: 'Total Recovery Claimed', placeholder: '50,000.00 USD', type: 'text'},
        { key: 'audit_period', label: 'Audit Period (Years)', placeholder: '2018-2023', type: 'text'}
    ],
    content: `P.T.A.R. (PROPERTY TAX ASSET RECOVERY) ADMINISTRATIVE CLAIM

TO: {{assessor}}
FROM: {{claimant}}, Authorized Representative for the Estate

NOTICE OF FAULT AND DEMAND FOR RECOVERY

I am hereby providing notice of a forensic audit performed on the title status of the land associated with Parcel {{parcel_id}}. The audit confirms that the land is held under an Allodial root (Patent No: {{patent_ref}}).

Assessments collected during the period of {{audit_period}} were paid under a MISTAKE OF FACT. The payments were made under the mistaken belief that the property was a statutory "Real Estate" interest, rather than a private Allodial estate.

Pursuant to the principles of Equity and Asset Recovery, I hereby demand the recovery and refund of all unauthorized assessments totaling {{recovery_amount}}.

You have 30 days to provide evidence that the land was lawfully converted from Allodial to Statutory status via a consensual contract. Failure to provide such evidence constitutes acceptance of this claim.

By: __________________________
    {{claimant}}, Authorized Representative
    Without Prejudice, UCC 1-308`
  },
  {
    id: 'ds-4194-request',
    name: 'Federal Authentication Request (DS-4194)',
    description: 'Cover letter for submitting state-authenticated records to the US Department of State.',
    jurisdiction: 'Federal / U.S. Dept of State',
    fields: [
        { key: 'registrant_name', label: 'Registrant Name', placeholder: 'Proper Case Name', type: 'text'},
        { key: 'state_file_no', label: 'State File Number', placeholder: '123-XXXX-XXXX', type: 'text'},
        { key: 'country', label: 'Target Country (for use in)', placeholder: 'e.g., International Use / Universal', type: 'text'},
        { key: 'mailing_address', label: 'Return Address', placeholder: 'Your mailing location', type: 'textarea'}
    ],
    content: `TO: U.S. DEPARTMENT OF STATE
OFFICE OF AUTHENTICATIONS
CA/PPT/S/TO/AUT
44132 MERCURE CIR, P.O. BOX 1206
STERLING, VA 20166-1206

RE: REQUEST FOR AUTHENTICATION OF RECORD

Dear Registrar / Office of Authentications,

Enclosed please find the following state-certified record for federal authentication:

TYPE: BIRTH RECORD / STATUS INSTRUMENT
REGISTRANT: {{registrant_name}}
STATE FILE NO: {{state_file_no}}
INTENDED JURISDICTION: {{country}}

The record has been certified by the Secretary of State of the state of issuance. I am requesting the Federal Seal of the United States Department of State be affixed to this instrument for international recognition and status verification.

Enclosed is the required fee of $20.00 via [Method] and Form DS-4194.

Please return the authenticated record to:
{{mailing_address}}

Respectfully,

By: __________________________
    Authorized Representative
    Without Prejudice, UCC 1-308`
  },
  {
    id: 'notice-rep-capacity',
    name: 'Notice of Representative Capacity',
    description: 'Establishing for the record that you are NOT the legal fiction, but its authorized representative.',
    jurisdiction: 'Administrative / Commercial',
    discernment: {
        lawful: "Separates the living man from the statutory debtor.",
        contested: "Bureaucrats will attempt to ignore this to maintain personal jurisdiction.",
        utility: "Prevents personal liability on all contracts and notices.",
        outcome: "Shifts the agency to deal with the Representative, not the Target."
    },
    fields: [
        { key: 'man_name', label: 'Living Man Name', placeholder: 'John-Henry: Doe', type: 'text'},
        { key: 'fiction_name', label: 'Legal Fiction (ALL CAPS)', placeholder: 'JOHN HENRY DOE', type: 'text'},
        { key: 'agency', label: 'Target Agency', placeholder: 'County Tax Collector', type: 'text'}
    ],
    content: `NOTICE OF REPRESENTATIVE CAPACITY

TO: {{agency}}
FROM: {{man_name}}, Authorized Representative

NOTICE TO AGENT IS NOTICE TO PRINCIPAL.

I, {{man_name}}, a living man on the soil, hereby give formal notice that I am appearing and acting solely in a representative capacity for the legal entity/fiction identified as {{fiction_name}}.

Any and all interactions, signatures, or communications provided by me are executed with an explicit reservation of all rights, "Without Prejudice," pursuant to UCC 1-308. I am not a personal surety for the obligations of {{fiction_name}}, nor do I waive any constitutionally secured rights.

All further communications regarding {{fiction_name}} must be directed to me in my capacity as Authorized Representative.

By: __________________________
    {{man_name}}, Authorized Representative
    Without Prejudice, UCC 1-308`
  },
  {
    id: 'vital-record-request',
    name: 'Request for Certified Vital Record (Long Form)',
    description: 'Demand for the full, non-abstract birth record required for authentication.',
    jurisdiction: 'State Vital Records',
    fields: [
        { key: 'state_agency', label: 'State Agency', placeholder: 'e.g., Texas Vital Statistics', type: 'text'},
        { key: 'registrant_full_name', label: 'Full Name at Birth', placeholder: 'John Henry Doe', type: 'text'},
        { key: 'dob', label: 'Date of Birth', placeholder: 'MM/DD/YYYY', type: 'date'},
        { key: 'pob', label: 'Place of Birth', placeholder: 'City, County, State', type: 'text'}
    ],
    content: `REQUEST FOR CERTIFIED COPY OF VITAL RECORD (LONG FORM / VAULT COPY)

TO: {{state_agency}}
RE: OFFICIAL RECORD REQUEST

Dear Registrar,

I am requesting a certified copy of the LONG FORM / VAULT COPY of the birth record for:

REGISTRANT: {{registrant_full_name}}
DOB: {{dob}}
POB: {{pob}}

I specifically require the photostatic reproduction of the original record, not a computer abstract. The record must include the State File Number and the original signature of the registrar. This is required for international authentication purposes.

Please provide instructions for the required fee and delivery.

Respectfully,

By: __________________________
    Authorized Representative`
  }
];
