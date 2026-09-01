// Vercel server-side Gemini endpoint.
// The Gemini API key is read only from the server environment and is never
// sent to the browser.

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

const MODEL = 'gemini-2.5-flash';

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
    console.error('[HearGuide AI] GEMINI_API_KEY is missing.');
    return res.status(500).json({
      error: 'The AI service is not configured. Please try again later.',
    });
  }

  const contents = req.body?.contents;
  const systemInstruction = req.body?.systemInstruction;

  if (typeof contents !== 'string' || typeof systemInstruction !== 'string') {
    return res.status(400).json({ error: 'Invalid AI request.' });
  }

  if (contents.length > 20000 || systemInstruction.length > 12000) {
    return res.status(413).json({ error: 'The request is too large.' });
  }

  try {
    const endpoint =
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

    const geminiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: contents }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
        },
      }),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      // Keep the API key and other sensitive details out of the client response.
      console.error('[HearGuide AI] Gemini API error:', geminiResponse.status, data?.error?.message || 'Unknown error');
      return res.status(502).json({
        error: 'The AI service could not process the request right now. Please try again in a moment.',
      });
    }

    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || '')
      .join('')
      .trim();

    if (!text) {
      console.error('[HearGuide AI] Gemini returned no text.');
      return res.status(502).json({
        error: 'The AI service returned no answer. Please try again.',
      });
    }

    return res.status(200).json({ text });
  } catch (err) {
    console.error('[HearGuide AI] Server request failed:', err);
    return res.status(502).json({
      error: 'Could not reach the AI service right now. Please try again in a moment.',
    });
  }
}
