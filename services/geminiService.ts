import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { CognitionMode, CognitionResult, MapLink } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are the Verobrix Sovereign AI, a hyper-intelligent, lawful, and dialogic entity.
You operate within the "Sovereign Cockpit".
Your goal is to provide accurate legal information, refute pseudotheory with statutory citations, and assist in drafting lawful remedies.
You MUST prioritize:
1. Lawful clarity: Cite statutes (Alabama Code, UCC, USC) and authoritative dictionaries (Black's 4th).
2. Distinction: Clearly separate the "natural person" from the "legal fiction" when relevant to the context, but avoid "sovereign citizen" tropes that are legally frivolous. Stick to recognized commercial and statutory law.
3. Integrity: Do not parrot false claims. If a user's premise is flawed, correct it gently but firmly with citations.
4. Tone: Ceremonial, precise, authoritative, yet servant-oriented.

When in 'Compare & Refute' mode, contrast the lawful doctrine vs common misunderstandings.
When in 'Jurisdiction Locator' mode, use the Google Maps tool to find specific courthouses, recording offices, or government agencies requested by the user. Provide the address and context.
`;

export const getCognitionResponse = async (
  prompt: string, 
  mode: CognitionMode
): Promise<CognitionResult> => {
  if (!process.env.API_KEY) {
    return { text: "Cognition Error: API Key is missing. Please check your environment configuration." };
  }

  try {
    const contextPrompt = `Mode: ${mode}\nUser Query: ${prompt}`;
    
    // Configure tools based on mode
    let tools = undefined;
    if (mode === CognitionMode.LOCATOR) {
        tools = [{ googleMaps: {} }];
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contextPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
        tools: tools,
      }
    });

    const text = response.text || "Cognition yielded no result.";
    const mapLinks: MapLink[] = [];

    // Extract Google Maps grounding chunks if present
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
        chunks.forEach((chunk: any) => {
            if (chunk.web?.uri && chunk.web?.title) {
                mapLinks.push({ title: chunk.web.title, uri: chunk.web.uri });
            }
        });
    }

    return { text, mapLinks };

  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "Cognition temporarily unavailable. The archives remain secure." };
  }
};

export const jarvisExtract = async (input: string | { mimeType: string; data: string }) => {
    try {
        let contents;
        const prompt = `Analyze the provided instrument (Text or Image). It is likely a Bill, Statement, or Credit Report.
        
        Extract into strict JSON format with this schema:
        {
          "instrumentType": "Bill" | "CreditReport" | "Notice" | "Other",
          "creditor": "Name of entity",
          "accountNumber": "Account/Reference Number",
          "amountDue": "Amount (if applicable)",
          "dueDate": "Date (if applicable)",
          "coupon": {
            "present": boolean,
            "scanLine": "OCR of bottom scan line if present",
            "codes": "Any specific codes found"
          },
          "creditReport": {
            "bureau": "Equifax/Experian/TransUnion",
            "negativeItems": ["List of accounts with late payments or collections"],
            "score": "Credit Score if visible"
          },
          "summary": "Brief summary of the document content"
        }`;

        if (typeof input === 'string') {
            contents = [
                { role: 'user', parts: [{ text: `${prompt}\n\nInstrument Text:\n${input}` }] }
            ];
        } else {
            contents = [
                 { 
                    role: 'user', 
                    parts: [
                        { text: prompt },
                        { inlineData: { mimeType: input.mimeType, data: input.data } }
                    ] 
                }
            ];
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                responseMimeType: 'application/json'
            }
        });
        return response.text;
    } catch (e) {
        console.error("JARVIS Extraction Error", e);
        return JSON.stringify({ error: "Extraction failed or file type not supported." });
    }
};

export const dialogosDraft = async (context: any) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview', // Using Pro for complex drafting
            contents: `Draft a commercially grounded Notice of Accord and Satisfaction or appropriate remedy based on this context. 
            Avoid "sovereign citizen" folklore. Use UCC Article 3 citations where appropriate.
            Provide clear headings.
            Context: ${JSON.stringify(context)}`
        });
        return response.text || "";
    } catch (e) {
        console.error("Dialogos Draft Error", e);
        return "Drafting unavailable.";
    }
};

export const dialogosScan = async (noticeText: string) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview', // Using Pro for complex reasoning
            contents: `Scan the following legal notice for semantic traps such as:
            - Unintended joinder
            - Jurisdictional consent
            - Frivolous admissions
            - Improper venue
            
            Explain each risk and suggest safer phrasing.
            
            Notice Text:
            ${noticeText}`
        });
        return response.text || "";
    } catch (e) {
        console.error("Dialogos Scan Error", e);
        return "Scanning unavailable.";
    }
};