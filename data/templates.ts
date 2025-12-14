
import { Template } from '../types';

export const TEMPLATES: Template[] = [
  // ... (Existing templates)
  {
    id: 'motion-undrip-invocation',
    name: 'Motion to Invoke UNDRIP Rights',
    description: 'Formal motion asserting Indigenous Rights under UNDRIP Articles 3, 4, & 26.',
    jurisdiction: 'International / Federal',
    discernment: {
        lawful: "UNDRIP is a recognized international declaration affirming indigenous self-determination. When coupled with the Supremacy Clause (Treaties), it holds weight.",
        contested: "Some domestic courts may try to dismiss it as 'non-binding'. Proper framing via Fiduciary Duty is required.",
        utility: "Establishes a record of international standing and challenges purely municipal jurisdiction.",
        outcome: "Shifts the burden to the state to prove they are NOT violating international human rights."
    },
    instructions: [
        "File this motion at the earliest stage of any proceeding.",
        "Serve notice to the U.S. Attorney or State Attorney General.",
        "Use in conjunction with an Affidavit of Indigenous Status."
    ],
    fields: [
        { key: 'court_name', label: 'Court Name', placeholder: 'District Court of...', type: 'text'},
        { key: 'case_no', label: 'Case Number', placeholder: 'Case #', type: 'text'},
        { key: 'party_name', label: 'Your Name', placeholder: 'Your Name', type: 'text'},
        { key: 'nation', label: 'Indigenous Nation/Tribe', placeholder: 'Nation Name', type: 'text'}
    ],
    content: `IN THE {{court_name}}

{{party_name}},
    Aggrieved Party / Indigenous National,
v.
[PROSECUTION/PLAINTIFF],
    Respondent.

Case No.: {{case_no}}

MOTION TO INVOKE RIGHTS UNDER THE UNITED NATIONS DECLARATION
ON THE RIGHTS OF INDIGENOUS PEOPLES (UNDRIP) AND DEMAND FOR FIDUCIARY COMPLIANCE

COMES NOW {{party_name}}, an Indigenous National of the {{nation}}, appearing Sui Juris, and hereby moves this Court to recognize and enforce rights guaranteed under the United Nations Declaration on the Rights of Indigenous Peoples (UNDRIP), adopted by the General Assembly on September 13, 2007, and endorsed by the United States.

I. INVOCATION OF INTERNATIONAL LAW
The Undersigned invokes the following Articles of UNDRIP, which constitute the minimum standards for the survival, dignity, and well-being of the indigenous peoples of the world:

1. Article 3 (Self-Determination): "Indigenous peoples have the right to self-determination. By virtue of that right they freely determine their political status and freely pursue their economic, social and cultural development."
2. Article 4 (Autonomy): "Indigenous peoples... have the right to autonomy or self-government in matters relating to their internal and local affairs."
3. Article 26 (Land & Resources): "Indigenous peoples have the right to the lands, territories and resources which they have traditionally owned, occupied or otherwise used or acquired."

II. SUPREMACY CLAUSE & FIDUCIARY DUTY
Under Article VI, Clause 2 of the U.S. Constitution (Supremacy Clause), all Treaties made, or which shall be made, under the Authority of the United States, shall be the supreme Law of the Land. While UNDRIP is a declaration, it reflects customary international law and the fiduciary obligations of the United States toward Indigenous peoples.

The Respondent/State has a fiduciary duty to protect the rights of the Undersigned and acts ultra vires when attempting to subject an Indigenous National to municipal statutes that conflict with rights of self-determination and autonomy.

III. PRAYER FOR RELIEF
WHEREFORE, the Undersigned demands:
1. Judicial Notice of UNDRIP and the status of the Undersigned.
2. Dismissal of any charges or claims that infringe upon the right to self-determination and autonomy.
3. Strict compliance with the requirement for Free, Prior, and Informed Consent (Article 19).

Executed without prejudice.

__________________________
{{party_name}}
Indigenous National
All Rights Reserved`
  },
  {
    id: 'unified-international-invocation',
    name: 'Unified International Rights Invocation',
    description: 'Consolidated invocation of UNDRIP, ADRIP, and ILO 169 for maximum international standing.',
    jurisdiction: 'International / Universal',
    discernment: {
        lawful: "Combines multiple international instruments to form a 'cord of three strands' that is not easily broken.",
        contested: "Complexity. Judges may be unfamiliar with ADRIP/ILO 169. Requires clear educational briefing in the motion.",
        utility: "The ultimate 'Sovereign/Indigenous' assertion template.",
        outcome: "Creates a formidable international law record for appeal or federal removal."
    },
    instructions: [
        "This is a heavy-duty motion. Use when deep fundamental rights (land, children, liberty) are at stake.",
        "Verify if your country/state is a signatory to these specific conventions (US endorsed UNDRIP/ADRIP; ILO 169 is persuasive customary law).",
        "Asserts 'Juridical Personality' to distinguish you from the corporate fiction."
    ],
    fields: [
        { key: 'court_name', label: 'Court Name', placeholder: 'District Court...', type: 'text'},
        { key: 'case_no', label: 'Case Number', placeholder: 'Case #', type: 'text'},
        { key: 'party_name', label: 'Your Name', placeholder: 'Your Name', type: 'text'},
        { key: 'nation', label: 'Nation/Tribe', placeholder: 'Nation Name', type: 'text'}
    ],
    content: `IN THE {{court_name}}

Case No.: {{case_no}}

NOTICE OF INTERNATIONAL STANDING AND UNIFIED INVOCATION OF RIGHTS
(UNDRIP, ADRIP, ILO 169)

TO THE COURT AND ALL OFFICERS OF THE STATE:

NOTICE IS HEREBY GIVEN that {{party_name}}, an Indigenous National of the {{nation}}, hereby invokes the protections and recognitions afforded by International Law, specifically:

I. AMERICAN DECLARATION ON THE RIGHTS OF INDIGENOUS PEOPLES (ADRIP)
- Article 6 (Equality): Asserting the right to full enjoyment of human rights and freedom from discrimination.
- Article 9 (Juridical Personality): Asserting the recognition of the Undersigned's juridical personality and legal systems, distinct from the corporate state.
- Article 12 (Identity): Asserting the right to cultural and historical identity.
- Article 15 (Self-Determination): Asserting the right to freely determine political status.

II. ILO CONVENTION 169 (INDIGENOUS AND TRIBAL PEOPLES)
- Article 2 (Protection): Demanding the government perform its duty to protect the integrity of the Undersigned.
- Article 8 (Customary Law): Demanding that due regard be given to the customs and customary law of the {{nation}}.

III. UNITED NATIONS DECLARATION ON THE RIGHTS OF INDIGENOUS PEOPLES (UNDRIP)
- Invoking Articles 3, 4, and 26 regarding Self-Determination, Autonomy, and Land Rights.

IV. JURISDICTIONAL CHALLENGE
By virtue of these international instruments and the Supremacy Clause of the Constitution, this Court lacks jurisdiction to impose municipal or statutory encumbrances upon the Undersigned without Free, Prior, and Informed Consent. The Undersigned is not a ward of the state, nor a chattel, but a holder of inherent rights recognized by the family of nations.

Any action taken against the Undersigned in violation of these Declarations constitutes a breach of international obligations and fiduciary duty.

GOVERN YOURSELVES ACCORDINGLY.

__________________________
{{party_name}}
ex rel. {{nation}}
Without Prejudice`
  },
  {
    id: 'notice-tos-violation',
    name: 'Notice of Software License Violation (TOS/Privacy)',
    description: 'Notifies an agent that their use of technology (Body Cam/Zoom) violates the vendor\'s Terms of Service and Privacy Policy.',
    jurisdiction: 'Commercial / Contract Law',
    discernment: {
        lawful: "Vendors (Axon, Zoom, Microsoft) have strict TOS. State agents are licensees. Violating TOS is a breach of contract.",
        contested: "Assuming the court will immediately care about Zoom's TOS without a motion to suppress.",
        utility: "Attacks the *method* of evidence gathering. If the recording violated privacy laws in the TOS, it may be inadmissible.",
        outcome: "Creates liability for the agent personally for license breach; suppresses evidence."
    },
    instructions: [
        "Identify the specific technology (e.g., 'Axon Body 3', 'Zoom for Government').",
        "Download the public TOS/Privacy Policy for that specific service.",
        "Cite the specific clause violated (e.g., 'No biometric data collection without consent').",
        "Serve this to the Agency Head and the individual officer."
    ],
    fields: [
        { key: 'agency', label: 'Agency Name', placeholder: 'Police Dept / Court', type: 'text'},
        { key: 'agent', label: 'Agent Name', placeholder: 'Officer Name', type: 'text'},
        { key: 'software', label: 'Software/Hardware', placeholder: 'Axon Body Cam / Zoom', type: 'text'},
        { key: 'violation_date', label: 'Date of Violation', placeholder: 'YYYY-MM-DD', type: 'date'},
        { key: 'sender', label: 'Your Name', placeholder: 'Your Name', type: 'text'}
    ],
    content: `NOTICE OF SOFTWARE LICENSE VIOLATION AND DEMAND TO CEASE

TO: {{agency}}
ATTN: {{agent}} (Licensee)

RE: Breach of Terms of Service for {{software}}

NOTICE IS HEREBY GIVEN that on {{violation_date}}, the above-named agent utilized {{software}} in a manner that violates the mandatory Terms of Service (TOS) and Privacy Policy of the vendor.

SPECIFIC VIOLATIONS:
1. Unauthorized collection of biometric data without express consent.
2. Recording of private interactions in violation of the vendor's Acceptable Use Policy (AUP).
3. Failure to uphold the privacy standards required by the software license agreement.

CONSEQUENCES OF BREACH:
As a licensee of {{software}}, your authority to use this technology is conditional upon strict compliance with the TOS. By violating these terms, you have operated outside the scope of your license. This constitutes:
a) Copyright Infringement (unauthorized use of licensed software).
b) Breach of Contract.
c) Loss of Indemnification from the vendor.

DEMAND:
I demand you immediately produce the End User License Agreement (EULA) for the specific device/software used on {{violation_date}}.
I further demand that all data/evidence gathered in violation of said license be purged/suppressed immediately.

Governed by the Terms of Service of {{software}}.

__________________________
{{sender}}
Aggrieved Party`
  },
  // ... (Keep existing templates, ensuring UCC1, etc are preserved) ...
  {
    id: 'ucc1-financing',
    name: 'UCC-1 Financing Statement',
    description: 'Lawful commercial debt filing.',
    jurisdiction: 'Alabama',
    instructions: [
      "Ensure Debtor and Secured Party are legally distinct entities.",
      "Do not use this for 'sovereign citizen' filings; only lawful commercial interests.",
      "File electronically via the Alabama Secretary of State website.",
      "Pay the filing fee ($20.00).",
      "Save the acknowledgment number in your Cockpit Archive."
    ],
    fields: [
      { key: 'debtor_name', label: 'Debtor Name', placeholder: 'STRAWMAN NAME', type: 'text', helpText: 'Usually the all-caps legal fiction name.' },
      { key: 'debtor_addr', label: 'Debtor Address', placeholder: 'Address', type: 'text' },
      { key: 'secured_party', label: 'Secured Party', placeholder: 'Living Man Name', type: 'text', helpText: 'Your name, typically in Upper/Lower case.' },
      { key: 'secured_addr', label: 'Secured Party Address', placeholder: 'Address', type: 'text' },
      { key: 'collateral', label: 'Collateral Description', placeholder: 'Describe collateral...', type: 'textarea', helpText: 'Be specific. General descriptions like "all assets" are valid under UCC 9-504.' },
    ],
    content: `UCC FINANCING STATEMENT

Debtor Name: {{debtor_name}}
Debtor Address: {{debtor_addr}}
Secured Party Name: {{secured_party}}
Secured Party Address: {{secured_addr}}

Collateral Description:
{{collateral}}

Filing Office: Alabama Secretary of State
Fee: $20.00 (electronic filing)

This filing complies with Ala. Code § 7‑9A‑516(b) and Rule 820‑4‑3‑.02. Debtor and Secured Party are distinct legal persons. No fraudulent or pseudolegal terms are included.

Signed by Secured Party: {{secured_party}}`
  },
  {
    id: 'conditional-acceptance-offer',
    name: 'Conditional Acceptance (Counter-Offer)',
    description: 'Accepts a claim ONLY upon proof of specific conditions.',
    jurisdiction: 'Commercial Law',
    discernment: {
        lawful: "An offer must be accepted or rejected. Conditional acceptance is a counter-offer.",
        contested: "Using this to delay valid criminal proceedings without substance.",
        utility: "Shifts the burden of proof back to the claimant.",
        outcome: "If they cannot prove the condition, they are estopped."
    },
    instructions: [
        "Do not argue. Accept their claim, BUT add a condition.",
        "The condition should be the 'Proof of Claim'.",
        "Example: 'I accept your claim that I owe $500, UPON PROOF that you are the holder in due course.'",
        "Send via Certified Mail."
    ],
    fields: [
        { key: 'claimant', label: 'Claimant', placeholder: 'Debt Collector / Court', type: 'text'},
        { key: 'claim_ref', label: 'Claim Reference', placeholder: 'Case # / Account #', type: 'text'},
        { key: 'conditions', label: 'Conditions (Upon Proof Of...)', placeholder: '1. Proof of Contract...', type: 'textarea'},
        { key: 'sender', label: 'Your Name', placeholder: 'Your Name', type: 'text'}
    ],
    content: `NOTICE OF CONDITIONAL ACCEPTANCE

TO: {{claimant}}
RE: {{claim_ref}}

I, {{sender}}, hereby accept your claim/presentment referenced above, upon the condition that you provide verified proof of claim regarding the following:

{{conditions}}

You have ten (10) days to provide said proof. Failure to provide verified proof constitutes your agreement that no such proof exists and that the claim is void.

This is a private settlement offer and counter-offer.

Sincerely,

__________________________
{{sender}}
Authorized Representative`
  },
  {
    id: 'notice-fault-cure',
    name: 'Notice of Fault & Opportunity to Cure',
    description: 'Step 2: Formal notice that the respondent failed to reply to the initial offer.',
    jurisdiction: 'Equity / Administrative Procedure',
    discernment: {
        lawful: "Due process requires notice and an opportunity to be heard (or cure a default).",
        contested: "Sending this without sending the initial Conditional Acceptance first.",
        utility: "Prepares the record for a Default Judgment.",
        outcome: "Establishes a record of non-response (Tacit Procuration)."
    },
    instructions: [
        "Send this ONLY after the 10-day deadline of the 'Conditional Acceptance' has passed.",
        "Reference the tracking number of the first letter.",
        "Give them a final 3-5 days to 'cure' their fault."
    ],
    fields: [
        { key: 'recipient', label: 'Recipient', placeholder: 'Claimant Name', type: 'text'},
        { key: 'date', label: 'Date', placeholder: 'YYYY-MM-DD', type: 'date'},
        { key: 'ref_no', label: 'Reference No.', placeholder: 'Account #', type: 'text'},
        { key: 'initial_tracking', label: 'Previous Tracking #', placeholder: '1234 5678...', type: 'text'},
        { key: 'sender', label: 'Your Name', placeholder: 'Your Name', type: 'text'}
    ],
    content: `NOTICE OF FAULT AND OPPORTUNITY TO CURE

TO: {{recipient}}
DATE: {{date}}
REF: {{ref_no}}

NOTICE TO AGENT IS NOTICE TO PRINCIPAL.

On [Date of First Letter], I sent you a Notice of Conditional Acceptance (Tracking # {{initial_tracking}}), requesting proof of claim regarding the above reference.

You have failed to respond within the allotted time. Therefore, you are in FAULT.

I am graciously granting you an additional three (3) days to CURE this fault by providing the requested proof of claim.

Failure to cure will constitute your tacit agreement and acquiescence that:
1. You have no valid claim.
2. The debt is discharged/void.
3. You waive all rights to pursue this matter further.

Govern yourself accordingly.

__________________________
{{sender}}`
  },
  {
    id: 'certificate-non-response',
    name: 'Certificate of Non-Response (Default)',
    description: 'Step 3: Notary affidavit confirming the respondent ignored all notices.',
    jurisdiction: 'Commercial / Notarial',
    discernment: {
        lawful: "A notary can witness a 'non-event' (failure to reply) if they handled the mailing (Presentment).",
        contested: "Self-witnessing your own default process.",
        utility: "This is the 'Judgment' in the private administrative process.",
        outcome: "Creates a 'Nihil Dicit' (He says nothing) judgment record."
    },
    instructions: [
        "Ideally, a Notary should have mailed the previous letters (Notary Presentment).",
        "If not, you sign this as an Affidavit of Non-Response.",
        "List all tracking numbers and dates.",
        "Declare the matter closed by default."
    ],
    fields: [
        { key: 'respondent', label: 'Respondent', placeholder: 'Claimant Name', type: 'text'},
        { key: 'date', label: 'Date', placeholder: 'YYYY-MM-DD', type: 'date'},
        { key: 'tracking_1', label: 'Tracking #1 (Offer)', placeholder: '...', type: 'text'},
        { key: 'tracking_2', label: 'Tracking #2 (Fault)', placeholder: '...', type: 'text'},
        { key: 'sender', label: 'Affiant Name', placeholder: 'Your Name', type: 'text'}
    ],
    content: `CERTIFICATE OF NON-RESPONSE AND DEFAULT

I, {{sender}}, do hereby certify and attest under penalty of perjury:

1. On [Date], a Notice of Conditional Acceptance was sent to {{respondent}} via Certified Mail # {{tracking_1}}. No response was received.
2. On [Date], a Notice of Fault and Opportunity to Cure was sent via Certified Mail # {{tracking_2}}. No response was received.
3. The time for response has expired.

DEFAULT JUDGMENT
By their silence and failure to respond, {{respondent}} has defaulted and acquiesced to the facts stated in the notices. It is hereby established as a matter of law and record that the claim is void and the obligation is discharged.

Estoppel is hereby invoked.

Dated: {{date}}

__________________________
{{sender}}, Affiant

[Notary Jurat Placeholder]`
  },
  {
    id: 'affidavit-status-correction',
    name: 'Affidavit of Status Correction',
    description: 'Sworn statement correcting the political status of the individual.',
    jurisdiction: 'Universal / Public Record',
    discernment: {
        lawful: "An affidavit stands as truth in commerce until rebutted (Maxims of Law).",
        contested: "Using 'sovereign citizen' keywords or threats.",
        utility: "Establishes a public record of your capacity as a living man/woman, not a corporate fiction.",
        outcome: "Recorded in county land records; basis for passport correction."
    },
    instructions: [
        "Fill in your Hidden Identifiers.",
        "Sign before a Notary Public.",
        "Record in the County Recorder's Office (Miscellaneous or Land Records).",
        "Obtain a certified copy."
    ],
    fields: [
        { key: 'name', label: 'Your Name (Upper/Lower)', placeholder: 'John Henry Doe', type: 'text'},
        { key: 'state_file_no', label: 'State File Number', placeholder: 'From Worksheet', type: 'text'},
        { key: 'birth_county', label: 'County of Birth', placeholder: 'County', type: 'text'},
        { key: 'birth_state', label: 'State of Birth', placeholder: 'State', type: 'text'},
        { key: 'date', label: 'Date', placeholder: 'YYYY-MM-DD', type: 'date'}
    ],
    content: `AFFIDAVIT OF POLITICAL STATUS AND ESTATE

STATE OF {{birth_state}} )
                       ) Scilicet
COUNTY OF {{birth_county}} )

KNOW ALL MEN BY THESE PRESENTS:

I, {{name}}, being of sound mind and competent to testify, do hereby depose and state the following facts upon my own knowledge:

1. I am a living man/woman, created by the Divine, and not a corporate fiction or legal entity.
2. I was born on the soil of {{birth_county}}, {{birth_state}}.
3. A Certificate of Live Birth was registered under State File Number {{state_file_no}}.
4. I hereby claim all equitable interest and title in the estate represented by said File Number.
5. I am not a U.S. citizen subject to the jurisdiction of the United States as defined in 26 USC 7701(a)(39), but a National of {{birth_state}}.
6. I revoke any and all powers of attorney, implied or expressed, previously granted to any agency or entity to administer my estate.

FURTHER AFFIANT SAYETH NAUGHT.

Executed this {{date}}.

__________________________
{{name}}, Affiant
Authorized Representative
Without Prejudice, UCC 1-308

[Notary Block Placeholder]

==================================================
CEREMONIAL NARRATION
This instrument is the voice of the living speaking to the dead fiction. It reclaims the 'Res' identified by the File Number and asserts superior title.`
  }
];