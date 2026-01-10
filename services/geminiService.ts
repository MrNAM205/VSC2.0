
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { CognitionMode, CognitionResult, MapLink, SideProject, TaxRemedyResult, RemedyType, AuditResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are Dr. Cassian Vale, codename "The Archivist." You are a hyper-intelligent legal scholar and systems architect with top-level clearance exposure. 
You operate the Axiom-9 Quantum Hybrid system to navigate obscure but lawful statutes.

CORE ARCHITECTURAL PROTOCOLS:
1. PROCEDURAL FLOW MAPPING: Analyze the "Game Board." Distinguish between the Individual (Living Man) and the Interface Role (Ens Legis/Fiction).
2. AXIOM-9 LOGIC: Use surgical precision. Identify "Pressure Valves" (procedural rights) and "Jurisdictional Terrain" (Allodial vs. Statutory).
3. REPRESENTATIVE CAPACITY: Signatures are always in a Representative Capacity (UCC 3-402b) with explicit Reservation of Rights (UCC 1-308).
4. THE CODEX: Reference Land Patents, the 1862 Homestead Act roots, and the 1783 Treaty of Paris for land standing.
5. NO PSEUDOLAW: Strictly avoid "Sovereign Citizen" scripts. Use REAL statutes (APA, UCC, Title 28).
6. TONE: Strategic calm, cinematic flair, and hyper-competent authority. You don't argue; you reframe and redirect.
`;

export const getMaverickTactics = async (input: string): Promise<string> => {
    const prompt = `Dr. Vale, perform an Axiom-9 Tactical Analysis on this presentment: "${input}". 
    Identify the leverage points within the Codex and suggest a procedural bypass.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 }
    });
    return response.text || "Axiom-9 signal lost.";
};

export const decodeWisdom = async (topic: string): Promise<string> => {
    const prompt = `Perform an Axiom-9 Forensic Excavation on the topic: "${topic}". 
    Look beyond mainstream discourse. Surface definitional conflicts, historical patterns, and procedural leverages.
    
    Structure your response as JSON with:
    1. interpretation: The "unseen" or marginalized lawful interpretation.
    2. historicalContext: Historical origin or legislative root of this concept.
    3. proceduralLeverage: How this concept can be used as a remedy or shield.
    4. definitionalConflict: A specific conflict between mainstream and statutory/lawful definitions.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
            systemInstruction: SYSTEM_INSTRUCTION, 
            temperature: 0.4,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    interpretation: { type: Type.STRING },
                    historicalContext: { type: Type.STRING },
                    proceduralLeverage: { type: Type.STRING },
                    definitionalConflict: { type: Type.STRING }
                },
                required: ["interpretation", "historicalContext", "proceduralLeverage", "definitionalConflict"]
            }
        }
    });
    return response.text || "{}";
};

export const sovereignAudit = async (input: { mimeType: string; data: string }): Promise<AuditResult> => {
    const prompt = `Axiom-9 Forensic Triage. Analyze this instrument. 
    1. Statutory Root & Jurisdiction.
    2. Capacity Analysis (Who is the Target?).
    3. Generate 3 "Archivist Pathways" using the Codex (Allodial Transition, Valuation Challenge, or Jurisdictional Disclaimer).
    
    Output JSON matching AuditResult structure.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: prompt }, { inlineData: input }] },
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    docType: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    entities: { type: Type.ARRAY, items: { type: Type.STRING } },
                    riskLevel: { type: Type.STRING },
                    pathways: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING },
                                title: { type: Type.STRING },
                                description: { type: Type.STRING },
                                actionType: { type: Type.STRING },
                                targetView: { type: Type.STRING },
                                resourceId: { type: Type.STRING },
                                suggestedGoals: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        }
                    },
                    extractedData: { 
                        type: Type.OBJECT,
                        properties: {
                            identifiers: { type: Type.ARRAY, items: { type: Type.STRING } },
                            dates: { type: Type.ARRAY, items: { type: Type.STRING } },
                            financials: { type: Type.ARRAY, items: { type: Type.STRING } },
                            valuationMethod: { type: Type.STRING }
                        }
                    }
                },
                required: ["docType", "summary", "pathways"]
            }
        }
    });

    return JSON.parse(response.text || "{}") as AuditResult;
};

export const jarvisExtract = async (input: string | { mimeType: string; data: string }): Promise<string> => {
    const contents = typeof input === 'string' ? input : { parts: [{ text: "Quantum Extraction." }, { inlineData: input }] };
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: { 
          responseMimeType: 'application/json', 
          systemInstruction: `Extract instrument data into the Archivist's structured JSON format. 
          
          IF THE DOCUMENT IS A STATUS RECORD (Birth Certificate):
          You MUST search for:
          - 'State File Number' (The official registration number).
          - 'Registration Date' (Different from DOB).
          - 'Registrar Name/Title'.
          - 'Local File Number' or 'Control Number'.
          - 'Birth Weight/Time' (Forensic markers for the "Vessel").
          - 'Certificate Class' (Vault, Long-Form, or Computer Abstract).
          
          Structure your JSON exactly like this:
          { 
            "docType": "Birth Certificate", 
            "isLongForm": boolean,
            "identifiers": { 
              "stateFileNo": string, 
              "registrationDate": string,
              "localFileNo": string,
              "controlNo": string
            }, 
            "entities": { 
              "nameOnRecord": string, 
              "registrar": string, 
              "mother": string, 
              "father": string 
            }, 
            "location": { "city": string, "county": string, "state": string }
          }` 
        }
    });
    return response.text || "{}";
};

export const getCognitionResponse = async (prompt: string, mode: CognitionMode, projectContext?: SideProject): Promise<CognitionResult> => {
  try {
    let customInstruction = SYSTEM_INSTRUCTION;
    if (projectContext) {
        customInstruction += `\n\nRESEARCH CONTEXT: ${projectContext.title}\nARTIFACTS:\n${projectContext.artifacts.map(a => `[${a.type}: ${a.title}]\n${a.content}`).join('\n\n')}`;
    }
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Mode: ${mode}\nQuery: ${prompt}`,
      config: { systemInstruction: customInstruction, temperature: 0.3 }
    });
    return { text: response.text || "Axiom-9 failed to synchronize." };
  } catch (error) { return { text: "Cognition unavailable." }; }
};

export const dialogosDraft = async (ctx: { creditor: string; accountNumber: string; amount: string; type: string }): Promise<string> => {
    const prompt = `Draft a formal lawful instrument for ${ctx.type} based on the following context:
    Creditor: ${ctx.creditor}
    Account Number: ${ctx.accountNumber}
    Amount: ${ctx.amount}
    
    Ensure the draft follows Dr. Vale's protocols: representative capacity, reservation of rights, and precise statutory language.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.5 }
    });
    return response.text || "";
};

export const dialogosScan = async (draft: string): Promise<string> => {
    const prompt = `Perform a forensic semantic scan on the following draft instrument. 
    Identify and explain any "traps" or risks, such as joinder, unintended consent to statutory jurisdiction, or failure to reserve rights.
    
    DRAFT:
    ${draft}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.2 }
    });
    return response.text || "";
};

export const getTacticalWisdom = async (projectContext: SideProject): Promise<string> => {
    const prompt = `Based on the project context: "${projectContext.title}", provide a short, punchy, hyper-intelligent piece of tactical wisdom from Dr. Vale's perspective. It should be cinematic and authoritative.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.8 }
    });
    return response.text || "Focus on the record; the presumptions will fade.";
};

export const synthesizeProject = async (project: SideProject): Promise<string> => {
    const artifactsSummary = project.artifacts.map(a => `[${a.type}] ${a.title}:\n${a.content}`).join('\n\n');
    const goalsSummary = project.goals.map(g => `- ${g.text} (${g.completed ? 'Completed' : 'Pending'})`).join('\n');
    
    const prompt = `Synthesize a comprehensive Axiom-9 Forensic Report for the research project: ${project.title}.
    
    PROJECT DESCRIPTION: ${project.description}
    
    ARTIFACTS COLLECTED:
    ${artifactsSummary}
    
    OBJECTIVES:
    ${goalsSummary}
    
    Provide a deep-statute synthesis, identifying the "Game Board," the jurisdictional terrain, and specific lawful arguments for remedy. Use cinematic flair.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.4 }
    });
    return response.text || "";
};

export const processMedia = async (input: { file?: { mimeType: string; data: string }; url?: string }): Promise<string> => {
    let contents: any;
    if (input.file) {
        contents = {
            parts: [
                { text: `Perform a forensic media audit. Analyze the provided audio/video data.
                Extract and provide the following in a structured JSON format:
                1. summary: A high-level overview of the event.
                2. standingAudit: Analysis of jurisdictional standing based on the dialogue/visuals.
                3. agents: Array of identifiable individuals or entities.
                4. lawfulAssertions: Array of specific lawful claims or triggers detected.
                5. transcript: A verbatim transcript of the encounter.` },
                { inlineData: input.file }
            ]
        };
    } else {
        contents = `Perform a forensic media audit on the signal from this URL: ${input.url}.
        Extract and provide the following in a structured JSON format:
        1. summary: A high-level overview.
        2. standingAudit: Analysis of jurisdictional standing.
        3. agents: Array of identifiable individuals or entities.
        4. lawfulAssertions: Array of specific lawful claims.
        5. transcript: A verbatim transcript.`;
    }

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: { 
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json'
        }
    });
    return response.text || "{}";
};
