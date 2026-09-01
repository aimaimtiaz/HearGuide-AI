# Secure Gemini API Setup

HearGuide AI keeps the Gemini API key on the server. The browser calls `/api/gemini`; the Vercel server reads `GEMINI_API_KEY` from its environment and calls Gemini.

## Vercel

Add this environment variable:

- Key: `GEMINI_API_KEY`
- Value: your Gemini API key
- Enable it for Production (and Preview/Development if desired)

After changing an environment variable, redeploy the project so the new value is available to the deployment.

## Local development

If you run the Vite app locally, the `/api/gemini` server function requires a serverless/Vercel-compatible development environment. Do not put the secret in a `VITE_` variable because Vite exposes `VITE_*` values to browser code.

The server sends the API key using the x-goog-api-key request header; it is never exposed to browser code.
