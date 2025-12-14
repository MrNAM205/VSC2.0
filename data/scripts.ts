
import { Script } from '../types';

export const SCRIPTS: Script[] = [
    {
        id: 'court-opening-pro-se',
        title: 'Courtroom Opening (Pro Se)',
        category: 'COURT',
        description: 'Standard opening statement to establish standing and reserve rights without being belligerent.',
        tags: ['pro-se', 'opening', 'rights', 'status', 'carl-miller'],
        content: `Your Honor,

I am [Your Name], appearing in propria persona (in my own person), sui juris.

I am here to address this matter lawfully and respectfully.

I reserve all my rights, including those protected by the Constitution of this State and the United States Constitution, specifically my right to due process and my right not to be compelled to testify against myself.

I respectfully request that the court clarify for the record the nature of this proceeding: is this an Article III judicial proceeding operating under the Common Law, or an administrative hearing operating under statutes?`,
        tips: [
            "Stand up straight. Do not slouch.",
            "Make eye contact with the Judge, not the clerk.",
            "Speak slowly and clearly. Do not rush.",
            "If interrupted, stop speaking immediately and wait.",
            "Do not argue; ask questions."
        ]
    },
    {
        id: 'undrip-court-assertion',
        title: 'UNDRIP Indigenous Assertion',
        category: 'COURT',
        description: 'Asserting standing under the UN Declaration on the Rights of Indigenous Peoples (Article 3 & 26).',
        tags: ['undrip', 'indigenous', 'court', 'international', 'sovereignty'],
        content: `Your Honor,

I identify as an Indigenous National pursuant to the United Nations Declaration on the Rights of Indigenous Peoples (UNDRIP).

Under Article 3, I possess the right to self-determination and to freely determine my political status. 

Under Article 26, I have the right to the lands, territories, and resources which I have traditionally owned, occupied, or otherwise used.

This court's statutory jurisdiction presumes I am a corporate citizen of the United States. I rebut this presumption. I am an Indigenous National operating under International Law and Treaty. I challenge the jurisdiction of this municipal court over my person and my ancestral estate.`,
        tips: [
            "Use only if you have established your status via affidavit previously.",
            "Be prepared for the judge to claim 'Domestic Law applies'.",
            "Reply: 'Treaties and International Conventions are the Supreme Law of the Land under Article VI of the Constitution.'"
        ]
    },
    {
        id: 'exclusive-equity-move',
        title: 'Motion for Exclusive Equity',
        category: 'COURT',
        description: 'Moving the court to the exclusive jurisdiction of Equity to handle a Trust/Fiduciary matter.',
        tags: ['exclusive-equity', 'trusts', 'fiduciary', 'court', 'remedy'],
        content: `Your Honor,

I move this court to sit in its Exclusive Equity Jurisdiction.

The matter before the court involves a Constructive Trust where the State is the Trustee and I am the Beneficiary (Cestui Que Trust). 

Statutory law and Common law provide no adequate remedy for a breach of fiduciary duty. Therefore, Equity must intervene.

I demand an accounting of the trust corpus and specific performance of the fiduciary duties owed to me. I do not consent to criminal or civil statutory proceedings which ignore the trust relationship.`,
        tips: [
            "Trust matters MUST be heard in Equity.",
            "This shifts the focus from 'Did you break a law?' to 'Did the State breach its duty?'",
            "Advanced strategy; use with care."
        ]
    },
    {
        id: 'tos-privacy-demand',
        title: 'TOS & Privacy Policy Demand',
        category: 'COURT',
        description: 'Demanding the Terms of Service for recording equipment (Body Cam / Court Audio) to find privacy violations.',
        tags: ['tos-law', 'privacy', 'contract', 'deletelawz', 'evidence'],
        content: `Your Honor / Officer,

I demand the Terms of Service (TOS) and Privacy Policy for the [Body Camera Brand / Court Recording Software] currently in use.

It is my understanding that the license agreement for this private software expressly prohibits [unlawful surveillance / recording without consent / biometric data collection].

If this equipment is being used in violation of its own manufacturer's End User License Agreement (EULA), then the evidence gathered is the fruit of a poisonous tree and an act of copyright infringement/breach of contract.

I demand proof that your use of this technology complies strictly with the vendor's Terms of Service.`,
        tips: [
            "Based on the 'Delete Lawz' strategy.",
            "Agents often violate the privacy policies of the tools they use (Axon, Zoom, Teams).",
            "If they violate the license, they lose indemnification."
        ]
    },
    {
        id: 'court-offer-discharge',
        title: 'Offer of Performance (Tender of Payment)',
        category: 'COURT',
        description: 'Verbal act to discharge a public debt/charge by tendering payment, shifting the court to commercial jurisdiction.',
        tags: ['offer', 'tender', 'discharge', 'commercial', 'court'],
        content: `Your Honor,

For the record, I do not wish to be in dishonor. I am here to settle and close this account.

I hereby make a tender of performance in good faith. I offer to discharge the alleged debt or obligation immediately via [Method, e.g., Signed Bill of Exchange / Treasury Check / Certified Funds].

I have the present ability to perform.

If the Court or the Prosecutor refuses this tender, I request that the record show the obligation is discharged pursuant to UCC 3-603 and Public Policy.

Will the court accept my tender of payment to settle this matter?`,
        tips: [
            "This forces the court to admit it is a money matter.",
            "If they say 'We don't accept that', the debt is legally discharged under UCC 3-603(b).",
            "Be prepared to actually hand over the instrument.",
            "If they refuse: 'I object and move for dismissal as the debt is discharged by refusal of tender.'"
        ]
    },
    {
        id: 'rescission-verbal',
        title: 'Rescission of Signature (Verbal)',
        category: 'COURT',
        description: 'Verbal statement to rescind a signature on a plea deal or ticket due to fraud, mistake, or coercion.',
        tags: ['rescission', 'contract', 'signature', 'court'],
        content: `Your Honor,

I am providing formal notice that I am rescinding my signature on [Document Name] effectively immediately.

That signature was obtained under [Duress / Fraud / Mutual Mistake / Lack of Disclosure].

I was not provided with full disclosure of the nature of the contract, nor did I knowingly waive my rights.

Therefore, the contract is void ab initio. I demand to be restored to my status quo ante.`,
        tips: [
            "Must be done promptly (often within 3 days/72 hours is best).",
            "You must state the cause (Fraud, Mistake, Coercion).",
            "Follow up with a written Notice of Rescission filed with the clerk."
        ]
    },
    {
        id: 'equity-invoke-maxim',
        title: 'Invoking Equity (Clean Hands)',
        category: 'COURT',
        description: 'Verbal act to move the court to Equity when the prosecution has acted unfairly or hidden evidence.',
        tags: ['equity', 'maxim', 'court', 'defense', 'clean-hands'],
        content: `Your Honor,

I move this court to sit in Equity.

There is a Maxim of Law that states: 'He who comes into Equity must come with clean hands.'

The Prosecution has [withheld evidence / acted in bad faith / failed to disclose the nature of the charges]. Therefore, they approach this court with unclean hands.

I request that this matter be dismissed as the moving party has failed to maintain the standard of fairness required to seek relief against me.`,
        tips: [
            "Use this when the state makes a procedural error or hides discovery.",
            "Equity overrides strict statutes when fairness is at stake.",
            "Do not overuse; reserve for genuine unfairness."
        ]
    },
    {
        id: 'conflict-of-law-objection',
        title: 'Objection to Choice of Law',
        category: 'COURT',
        description: 'Verbal objection challenging the court\'s presumption of statutory jurisdiction over a sovereign domiciled elsewhere.',
        tags: ['conflict-of-laws', 'jurisdiction', 'defense', 'lex-fori', 'court'],
        content: `Your Honor,

I object to the presumption that the Lex Fori (Law of this Forum) automatically governs this matter.

I assert that a Conflict of Laws exists.

As a private national domiciled without the United States, my civil status and capacity are governed by the Lex Domicilii (Law of my Domicile) and the Common Law, not the municipal statutes of this corporation.

I respectfully request a Conflict of Laws hearing to determine the proper Choice of Law before this matter proceeds further.`,
        tips: [
            "This stops the steamroller by forcing a technical legal determination.",
            "Judges hate this because it requires complex analysis.",
            "Stick to the point: 'Which law applies? The statute or my rights?'"
        ]
    },
    {
        id: 'court-jurisdiction-inquiry',
        title: 'Jurisdiction Inquiry (Special Appearance)',
        category: 'COURT',
        description: 'Method to challenge jurisdiction by asking for the record rather than making a motion to dismiss immediately.',
        tags: ['jurisdiction', 'special-appearance', 'authority', 'dismissal'],
        content: `Your Honor,

Before we proceed, I am appearing by Special Appearance solely to inquire into the jurisdiction of this court over the subject matter and my person.

I respectfully request the court to state for the record the specific statute or regulation that confers jurisdiction in this matter.

I am not refusing to participate; I am exercising due diligence to ensure this proceeding is conducted according to the Law of the Land.

Does the court have a signed affidavit of complaint from an injured party? If so, I request to see it immediately.`,
        tips: [
            "This is risky if not done politely.",
            "The Judge may get annoyed. Remain calm.",
            "If they say 'Sit down', ask: 'Am I being detained?'",
            "Focus on 'Subject Matter Jurisdiction' first."
        ]
    },
    {
        id: 'court-motion-dismiss',
        title: 'Verbal Motion to Dismiss',
        category: 'COURT',
        description: 'A formal verbal motion when the prosecution fails to provide a witness or affidavit.',
        tags: ['dismissal', 'motion', 'evidence', '6th-amendment'],
        content: `Your Honor,

I move to dismiss this case with prejudice for lack of subject matter jurisdiction and failure to state a claim upon which relief can be granted.

The prosecution has failed to produce an injured party or a verified complaint signed under penalty of perjury. 

Without a witness to confront, as guaranteed by the 6th Amendment, this proceeding is hearsay.

I demand the case be dismissed and the record expunged.`,
        tips: [
            "Make this motion AFTER the prosecution fails to produce a witness.",
            "Use 'With Prejudice' so they cannot refile.",
            "Be firm but respectful."
        ]
    },
    {
        id: 'phone-debt-collector',
        title: 'Debt Collector Validation (Phone)',
        category: 'PHONE',
        description: 'Script for handling aggressive debt collectors while asserting FDCPA rights.',
        tags: ['debt', 'fdcpa', 'validation', 'privacy'],
        content: `(Answer the phone)
"Hello. Who is calling?"

(Collector speaks...)

"I am advising you that this call is being recorded for quality assurance and legal purposes."

"I dispute this debt in its entirety."

"I am requesting validation of this debt pursuant to the Fair Debt Collection Practices Act (15 USC 1692g). Please mail me the original contract with my wet-ink signature, and a full accounting of the ledger."

"Until such validation is received, cease and desist all telephone communication. Contact me by mail only at [Your Address]."

"Have a good day." (Hang up)`,
        tips: [
            "Do not admit to owing the debt.",
            "Do not give your DOB or SSN for 'verification'.",
            "Be firm, say the script, and hang up.",
            "Log the time and date of the call immediately."
        ]
    },
    {
        id: 'phone-collections-estoppel',
        title: 'Collections Estoppel (Verbal)',
        category: 'PHONE',
        description: 'Asserting estoppel when a collector calls after failing to validate debt.',
        tags: ['estoppel', 'debt', 'commercial', 'recourse'],
        content: `(Answer the phone)
"Hello. Who is this?"

(Collector identifies themselves)

"I sent you a Notice of Conditional Acceptance/Validation Request on [Date]. The tracking number confirms you received it on [Date]."

"You failed to respond within the allotted time."

"Therefore, you are legally estopped from continuing collection activity. You have acquiesced that the debt is invalid."

"Further attempts to collect will be considered harassment and a violation of the FDCPA. Good day."`,
        tips: [
            "Only use this if you actually sent the letter.",
            "Keep the certified mail receipt handy.",
            "Do not engage in debate. State the facts and hang up."
        ]
    },
    {
        id: 'phone-utility-definition',
        title: 'Utility Company (Service Definition)',
        category: 'PHONE',
        description: 'Inquiry regarding "customer" vs "beneficiary" status.',
        tags: ['utility', 'definitions', 'contract'],
        content: `(Speaking to Representative)

"Good morning. I am reviewing my records and noticed the terminology used on my statement."

"Can you please point me to the section of your Terms of Service that defines 'Customer'?"

"I am inquiring if my account is held in the name of a natural person, or if it is an account for the legal fiction/strawman?"

"I would like to ensure that I am not waiving any rights by paying this 'bill' versus 'discharging' an obligation. Can you transfer me to your legal or compliance department?"`,
        tips: [
            "Front-line support will likely not understand.",
            "The goal is to get transferred to Legal or a Supervisor.",
            "Be polite but persistent.",
            "Ask for the 'Tariff' or 'Charter' governing the utility."
        ]
    },
    {
        id: 'police-traffic-stop',
        title: 'Traffic Stop Interaction',
        category: 'PHONE',
        description: 'Script for roadside interaction to preserve rights.',
        tags: ['travel', 'rights', 'police', '5th-amendment', '4th-amendment'],
        content: `(Keep window rolled up partially. Hands on wheel.)

Officer: "License and registration."

You: "Hello Officer. Am I being detained, or am I free to go?"

Officer: "I stopped you for..."

You: "I understand. I am invoking my 5th Amendment right to remain silent. I do not consent to any searches."

You: "Here is the documentation required by law." (Hand over documents through cracked window).

You: "I do not answer questions."

(If asked to step out): "I will comply under duress and threat of arrest, but I do not consent to any search of my person or property."`,
        tips: [
            "Do not argue roadside.",
            "Record the interaction if legal in your state.",
            "Never physically resist.",
            "The fight happens in court, not on the side of the road."
        ]
    },
    {
        id: 'police-home-knock',
        title: 'Police at Door (Knock & Talk)',
        category: 'PHONE',
        description: 'Handling police presence at your private residence without a warrant.',
        tags: ['privacy', 'home', '4th-amendment', 'warrant'],
        content: `(Do not open the door. Speak through the closed door or window.)

You: "Can I help you?"

Officer: "We need to talk to you / We need to come inside."

You: "Do you have a warrant signed by a judge?"

(If No):
You: "Then I do not consent to any search or entry. Please leave my property immediately."

(If Yes):
You: "Please slide it under the door or hold it up to the window so I can read it."

(Verify the address and name on the warrant. If valid, you must comply, but state):
You: "I am complying under duress. I do not consent to any search beyond the specific scope of this warrant."`,
        tips: [
            "Never open the door unless they have a warrant.",
            "Simply opening the door can be interpreted as 'implied consent'.",
            "Be polite but firm: 'I cannot help you without a warrant.'"
        ]
    },
    {
        id: 'commercial-bank-manager',
        title: 'Bank Manager (Trust Account)',
        category: 'COMMERCIAL',
        description: 'Opening a private trust account without yielding sovereignty.',
        tags: ['banking', 'trust', 'privacy', 'commercial'],
        content: `(Meeting with Manager)

"I am here to open a non-interest bearing demand deposit account for a Private Trust."

"Here is the Certificate of Trust and my authority as Trustee."

(If they ask for SSN):
"The Trust has its own EIN. It is a separate legal entity. I am the Trustee, not the account holder."

"Please ensure the account is titled exactly as written on the Certificate. I require a signature card that reflects my capacity as Trustee, not as an individual."

"I am ready to fund the account with this initial deposit."`,
        tips: [
            "Dress professionally (Suit/Tie).",
            "Bring your 'Binder' with Trust docs and EIN letter.",
            "If the manager is unsure, ask them to call their 'Back Office' or 'Legal' for verification.",
            "Do not get angry; banks are private businesses."
        ]
    },
    {
        id: 'phone-vital-records-file-no',
        title: 'Vital Records (File Number Inquiry)',
        category: 'PHONE',
        description: 'Script to request the specific State File Number from the Long Form certificate.',
        tags: ['vital-records', 'identifiers', 'status', 'admin'],
        content: `(Calling State Vital Statistics Office)

"Good morning. I am calling regarding a vital record for which I am the authorized registrant."

"I need to order a certified copy of the 'Long Form' or 'Book Copy' of my birth record. I specifically require the copy that shows the State File Number and the Registrar's signature."

"The 'Short Form' or 'Abstract' is not sufficient for my administrative process."

"Can you verify if the copy you issue includes the File Number, typically found in the upper right corner?"`,
        tips: [
            "Be polite; clerks are gatekeepers.",
            "If they say they only issue the 'Computer Abstract', ask for the 'Vault Copy' or 'Photostatic Copy'.",
            "This File Number is critical for your Status Affidavit."
        ]
    },
    {
        id: 'phone-cusip-inquiry',
        title: 'Broker/Securities (CUSIP Inquiry)',
        category: 'PHONE',
        description: 'Advanced inquiry to locate financial identifiers associated with the estate.',
        tags: ['finance', 'cusip', 'identifiers', 'advanced'],
        content: `(Calling a Brokerage or Securities Desk)

"Hello. I am conducting an audit of a private estate portfolio."

"I am trying to locate the CUSIP number associated with a specific instrument issued in [Year of Birth] by the State of [Birth State]."

"The instrument would be registered under the name [NAME IN ALL CAPS]."

"Can you assist me in looking up this identifier on the terminal, or direct me to the appropriate department for bond identification?"`,
        tips: [
            "This is high-friction. Many brokers will not understand or will refuse.",
            "Do not use words like 'Strawman' or 'Sovereign'. Use 'Estate Audit' or 'Portfolio'.",
            "If they cannot help, thank them and hang up. Do not argue."
        ]
    }
];