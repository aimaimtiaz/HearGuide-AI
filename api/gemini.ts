// Vercel server-side Gemini endpoint.
// The API key stays on the server and is never sent to the browser.

const MODEL = "gemini-3.7-flash";

type Body = {
  contents?: unknown;
  systemInstruction?: unknown;
};

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return res.status(500).json({
      error: "The AI service is not configured. Please try again later.",
    });
  }

  const contents = req.body?.contents;
  const systemInstruction = req.body?.systemInstruction;

  if (
    typeof contents !== "string" ||
    typeof systemInstruction !== "string"
  ) {
    return res.status(400).json({
      error: "Invalid AI request.",
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
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
              role: "user",
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
        "Gemini API error:",
        response.status,
        JSON.stringify(data)
      );

      return res.status(502).json({
        error: "The AI service could not process the request right now. Please try again in a moment.",
      });
    }

    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part: any) => part?.text || "")
      .join("")
      .trim();

    if (!text) {
      console.error("Gemini returned no text:", JSON.stringify(data));

      return res.status(502).json({
        error: "The AI service returned no answer. Please try again.",
      });
    }

    return res.status(200).json({ text });
  } catch (error: any) {
    console.error("Gemini request failed:", error?.message || error);

    return res.status(502).json({
      error: "The AI service could not process the request right now. Please try again in a moment.",
    });
  }
}
