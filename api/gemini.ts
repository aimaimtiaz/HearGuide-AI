// Vercel server-side Gemini endpoint.
// The Gemini API key is read only from the server environment and is never
// sent to the browser.

const MODEL = 'gemini-3.7-flash';

type Body = {
  contents?: unknown;
  systemInstruction?: unknown;
};

type VercelRequest = {
  method?: string;
  body?: Body;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).json({});
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({
      error: 'Method not allowed.',
    });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    console.error('[HearGuide AI] GEMINI_API_KEY is missing.');

    return res.status(500).json({
      error: 'The AI service is not configured. Please try again later.',
    });
  }

  const contents = req.body?.contents;
  const systemInstruction = req.body?.systemInstruction;

  if (
    typeof contents !== 'string' ||
    typeof systemInstruction !== 'string'
  ) {
    return res.status(400).json({
      error: 'Invalid AI request.',
    });
  }

  if (contents.length > 20000 || systemInstruction.length > 12000) {
    return res.status(413).json({
      error: 'The request is too large.',
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: systemInstruction,
              },
            ],
          },
          contents: [
            {
              parts: [
                {
                  text: contents,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        '[HearGuide AI] Gemini API error:',
        response.status,
        JSON.stringify(data)
      );

      return res.status(502).json({
        error: 'The AI service could not process the request right now. Please try again in a moment.',
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || '')
        .join('')
        .trim();

    if (!text) {
      console.error(
        '[HearGuide AI] Gemini returned no text:',
        JSON.stringify(data)
      );

      return res.status(502).json({
        error: 'The AI service returned no answer. Please try again.',
      });
    }

    return res.status(200).json({ text });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : String(error);

    console.error(
      '[HearGuide AI] Request failed:',
      message
    );

    return res.status(502).json({
      error:
        'The AI service could not process the request right now. Please try again in a moment.',
    });
  }
}
