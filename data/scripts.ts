
import { Script } from '../types';

export const SCRIPTS: Script[] = [
    {
        id: 'court-offer-discharge',
        title: 'Offer of Performance (Tender of Payment)',
        category: 'COURT',
        description: 'Verbal act to discharge a public debt/charge by tendering payment, shifting the court to commercial jurisdiction.',
        tags: ['offer', 'tender', 'discharge', 'commercial', 'court', 'equity', 'recourse'],
        content: `Your Honor,

For the record, I do not wish to be in dishonor. I am here to settle and close this account.

I hereby make a tender of performance in good faith. I offer to discharge the alleged debt or obligation immediately via [Method, e.g., Signed Bill of Exchange / Treasury Check / Certified Funds].

I have the present ability to perform.

If the Court or the Prosecutor refuses this tender, I request that the record show the obligation is discharged pursuant to UCC 3-603 and Public Policy.

Will the court accept my tender of payment to settle this matter?`,
        tips: [
            "This forces the court to admit it is a money matter.",
            "If they say 'We don't accept that', the debt is legally discharged under UCC 3-603(b).",
            "Remain calm; you are simply making a commercial offer."
        ]
    },
    {
        id: 'rescission-verbal',
        title: 'Rescission of Signature (Verbal)',
        category: 'COURT',
        description: 'Verbal statement to rescind a signature on a plea deal or ticket due to fraud, mistake, or coercion.',
        tags: ['rescission', 'contract', 'signature', 'court', 'recourse'],
        content: `Your Honor,

I am providing formal notice for the record that I am rescinding my signature on [Document Name] effectively immediately.

That signature was obtained under [Duress / Fraud / Mutual Mistake / Lack of Disclosure].

I was not provided with full disclosure of the nature of the contract, nor did I knowingly waive any constitutionally secured rights.

Therefore, the contract is void ab initio. I demand to be restored to my status quo ante.`,
        tips: [
            "Must be done promptly (often within 3 days/72 hours is best).",
            "State the cause clearly: Fraud, Mistake, or Coercion.",
            "Follow up with a written Notice of Rescission filed with the clerk."
        ]
    },
    {
        id: 'commercial-money-creation',
        title: 'Federal Reserve / Money Creation Inquiry',
        category: 'COMMERCIAL',
        description: 'Challenging the validity of a debt based on money creation principles and securities law definitions.',
        tags: ['finance', 'securities', 'federal-reserve', 'promissory-note', 'money-creation'],
        content: `(In dialogue with Bank Officer or in Court Record)

"I am reading from Corpus Juris Secundum, Volume 79A, Securities and Regulations.
'In applying securities regulations, the courts have frequently said that the word security and securities have no exact defined legal definition.'

I am referencing the Federal Reserve Bank of Ohio Branch pamphlet:
'Of course, they do not really pay out loans from the money they received as deposits. If they did this, no additional money would be created. What they do when they make loans is to accept promissory notes in exchange for the credits to the borrower's transaction accounts.'

Ladies and gentlemen, my labor is what is holding up the entire system. You are calling me a debtor, but in fact, my signature created the value.

I demand a full accounting of the ledger. Show me where the bank risked its own assets to fund this loan."`,
        tips: [
            "Maxim: 'Quid Pro Quo' (Something for Something). Did the bank give value?",
            "Use this to shift the burden of proof regarding the validity of the debt.",
            "Remain calm; you are educating them on their own system."
        ]
    },
    {
        id: 'phone-cusip-inquiry',
        title: 'Broker/Securities (CUSIP Inquiry)',
        category: 'PHONE',
        description: 'Advanced inquiry to locate financial identifiers associated with the birth record bond.',
        tags: ['finance', 'cusip', 'identifiers', 'advanced', 'status'],
        content: `(Calling a Brokerage or Securities Desk)

"Hello. I am conducting an audit of a private estate portfolio."

"I am trying to locate the CUSIP identifier associated with a specific bond issued by the State of [Birth State] on [Birth Date]."

"The instrument would be registered under the name [NAME IN ALL CAPS] and should correspond to the State File Number [File Number]."

"Can you assist me in looking up this identifier on the terminal, or direct me to the appropriate department for bond verification?"`,
        tips: [
            "This is high-friction. Many brokers will not understand or will refuse.",
            "Do not use words like 'Strawman' or 'Sovereign'. Use 'Estate Audit'.",
            "Document the name of the agent who refuses to help."
        ]
    }
];
