# HearGuide AI secure API setup

The Gemini API key is no longer used in the Vite/browser bundle.

## Vercel
Add this Environment Variable to the Vercel project:

GEMINI_API_KEY=YOUR_NEW_GEMINI_API_KEY

Do not use the `VITE_` prefix.

After adding it, redeploy the project.

## Important
If the old Gemini key was ever used in the deployed client-side app, revoke it and create a new key before deploying this version.
