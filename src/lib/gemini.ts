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

export type ChatMessage = { role: 'user' | 'model'; text: string };

export interface SymptomInput {
  age: string;
  symptoms: string[];
  duration: string;
  ear: string;
  severity: string;
  notes: string;
}

async function callGemini(payload: {
  contents: string;
  systemInstruction: string;
}): Promise<string> {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data: { text?: string; error?: string } = {};
  try {
    data = await response.json();
  } catch {
    throw new Error('The AI service returned an invalid response.');
  }

  if (!response.ok) {
    throw new Error(data.error || 'The AI service is unavailable right now. Please try again.');
  }

  if (!data.text) {
    throw new Error('No response was returned by the AI service.');
  }

  return data.text;
}

export async function generateChatReply(
  history: ChatMessage[],
  userMessage: string,
): Promise<string> {
  const contents = [...history, { role: 'user', text: userMessage }]
    .map((m) => `${m.role === 'user' ? 'User' : 'HearGuide AI'}: ${m.text}`)
    .join('\n\n');

  return callGemini({
    contents,
    systemInstruction: SYSTEM_INSTRUCTION,
  });
}

export async function analyzeSymptoms(input: SymptomInput): Promise<string> {
  const prompt = `A person has shared the following hearing-related concerns. Provide educational guidance using the required format.

Age: ${input.age || 'not provided'}
Symptoms: ${input.symptoms.length ? input.symptoms.join(', ') : 'none selected'}
Duration: ${input.duration}
Affected ear(s): ${input.ear}
Severity of concern: ${input.severity}
Additional notes: ${input.notes || 'none'}`;

  return callGemini({
    contents: prompt,
    systemInstruction: `${SYSTEM_INSTRUCTION}\n\n${SYMPTOM_FORMAT_INSTRUCTION}`,
  });
}

/**
 * The Gemini key is intentionally not exposed to the browser.
 * Configuration is checked by the server-side /api/gemini function.
 */
export function isGeminiConfigured(): boolean {
  return true;
}
