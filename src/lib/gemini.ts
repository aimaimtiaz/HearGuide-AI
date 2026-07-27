import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

export const SYSTEM_INSTRUCTION = `You are HearGuide AI, an educational hearing health assistant.

Explain hearing symptoms, hearing tests, hearing protection, tinnitus, hearing loss, ear infections, earwax, hearing aids, and hearing health using clear, simple, compassionate language.

Never diagnose diseases.
Never prescribe medication.
Recommend an Audiologist or ENT specialist when appropriate.

If the user reports any of the following, advise immediate medical evaluation:
- sudden hearing loss
- severe dizziness
- ear bleeding
- head injury
- severe ear pain

Always finish every response with:
"This information is for educational purposes only and is not a medical diagnosis. Please consult a qualified healthcare professional."`;

export const SYMPTOM_FORMAT_INSTRUCTION = `When responding to a symptom check, structure your answer using exactly these markdown section headers, in this order. If you do not have enough information for a section, provide a sensible default instead of skipping it.

## Possible Explanation
## Recommended Specialist
## Urgency Level
## Suggested Hearing Tests
## Hearing Protection Advice
## Medical Disclaimer`;

const MODEL_CANDIDATES = ['gemini-flash-latest', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-flash'];

let client: GoogleGenAI | null = null;
function getClient(): GoogleGenAI {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Set VITE_GEMINI_API_KEY in your environment.');
  }
  if (!client) client = new GoogleGenAI({ apiKey: API_KEY });
  return client;
}

let workingModel: string | null = null;

async function tryGenerate(model: string, contents: string, systemInstruction: string): Promise<string> {
  const genai = getClient();
  const response = await genai.models.generateContent({
    model,
    contents,
    config: { systemInstruction },
  });
  const text = response.text;
  if (!text) throw new Error('No response text returned by the model.');
  return text;
}

function isUnavailable(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  // 429 = rate limited (model exists, try again); 404 = model not found (skip it)
  return msg.includes('404') || msg.includes('NOT_FOUND') || msg.includes('is not found');
}

async function generate(contents: string, systemInstruction: string): Promise<string> {
  const models = workingModel ? [workingModel, ...MODEL_CANDIDATES.filter((m) => m !== workingModel)] : MODEL_CANDIDATES;
  for (const model of models) {
    try {
      const text = await tryGenerate(model, contents, systemInstruction);
      workingModel = model;
      return text;
    } catch (err) {
      console.error(`[HearGuide AI] Model "${model}" failed:`, err);
      // If it's a rate limit (429), this model works—retry it once before moving on.
      if (err instanceof Error && err.message.includes('429')) {
        try {
          const text = await tryGenerate(model, contents, systemInstruction);
          workingModel = model;
          return text;
        } catch (retryErr) {
          console.error(`[HearGuide AI] Model "${model}" retry failed:`, retryErr);
        }
      }
      // If the model is unavailable (404), fall through to the next candidate.
      if (isUnavailable(err)) continue;
    }
  }
  throw new Error(
    'Could not reach any Gemini model right now. Please check your API key and try again in a moment.',
  );
}

export type ChatMessage = { role: 'user' | 'model'; text: string };

export async function generateChatReply(history: ChatMessage[], userMessage: string): Promise<string> {
  const contents = [...history, { role: 'user', text: userMessage }]
    .map((m) => `${m.role === 'user' ? 'User' : 'HearGuide AI'}: ${m.text}`)
    .join('\n\n');
  return generate(contents, SYSTEM_INSTRUCTION);
}

export interface SymptomInput {
  age: string;
  symptoms: string[];
  duration: string;
  ear: string;
  severity: string;
  notes: string;
}

export async function analyzeSymptoms(input: SymptomInput): Promise<string> {
  const prompt = `A person has shared the following hearing-related concerns. Provide educational guidance using the required format.

Age: ${input.age || 'not provided'}
Symptoms: ${input.symptoms.length ? input.symptoms.join(', ') : 'none selected'}
Duration: ${input.duration}
Affected ear(s): ${input.ear}
Severity of concern: ${input.severity}
Additional notes: ${input.notes || 'none'}`;

  return generate(prompt, `${SYSTEM_INSTRUCTION}\n\n${SYMPTOM_FORMAT_INSTRUCTION}`);
}

export function isGeminiConfigured(): boolean {
  return Boolean(API_KEY);
}
