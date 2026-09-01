import { GoogleGenAI } from '@google/genai';

type Request = {
  method?: string;
  body?: {
    contents?: unknown;
    systemInstruction?: unknown;
  };
};

type Response = {
  status: (code: number) => Response;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const MODEL_CANDIDATES = [
  'gemini-flash-latest',
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-1.5-flash',
];

function isUnavailable(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return msg.includes('404') || msg.includes('NOT_FOUND') || msg.includes('is not found');
}

async function generate(
  ai: GoogleGenAI,
  contents: string,
  systemInstruction: string,
): Promise<string> {
  for (const model of MODEL_CANDIDATES) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: { systemInstruction },
      });

      const text = response.text;
      if (text) return text;
    } catch (err) {
      console.error(`[HearGuide AI] Model "${model}" failed.`);

      // Retry a rate-limited model once, matching the previous app behaviour.
      if (err instanceof Error && err.message.includes('429')) {
        try {
          const retry = await ai.models.generateContent({
            model,
            contents,
            config: { systemInstruction },
          });
          const text = retry.text;
          if (text) return text;
        } catch {
          console.error(`[HearGuide AI] Model "${model}" retry failed.`);
        }
      }

      if (isUnavailable(err)) continue;
    }
  }

  throw new Error('Could not reach a Gemini model right now.');
}

export default async function handler(req: Request, res: Response) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).json({});
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('[HearGuide AI] GEMINI_API_KEY is not configured on the server.');
    return res.status(500).json({
      error: 'The AI service is not configured. Please try again later.',
    });
  }

  const contents = req.body?.contents;
  const systemInstruction = req.body?.systemInstruction;

  if (typeof contents !== 'string' || typeof systemInstruction !== 'string') {
    return res.status(400).json({ error: 'Invalid AI request.' });
  }

  // Keep requests bounded so a client cannot send an unexpectedly huge prompt.
  if (contents.length > 20000 || systemInstruction.length > 12000) {
    return res.status(413).json({ error: 'The request is too large.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const text = await generate(ai, contents, systemInstruction);
    return res.status(200).json({ text });
  } catch (err) {
    console.error('[HearGuide AI] Server request failed:', err);
    return res.status(502).json({
      error: 'Could not reach the AI service right now. Please try again in a moment.',
    });
  }
}
