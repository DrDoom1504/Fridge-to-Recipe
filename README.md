# Fridge-to-Recipe

A small React app: type in the ingredients you have, an LLM turns them into a
structured recipe, and the app renders it as an interactive checklist with
scalable servings and ingredient swap suggestions.

Not a chatbot — the model returns JSON, the app parses and renders it.

## Project structure

```
fridge-to-recipe/
├── client/               # React app (Vite)
│   └── src/
│       ├── components/   # IngredientInput, RecipeCard, ServingsControl,
│       │                 # StepChecklist, IngredientList, LoadingState, ErrorState
│       ├── hooks/         useRecipe.js — request lifecycle + stale-response guard
│       ├── utils/         validateRecipe.js — schema check on AI output
│       ├── App.jsx
│       └── main.jsx
└── server/               # Express backend (keeps the API key off the client)
    └── index.js
```

## Setup

You need Node 18+ and a Gemini API key (any provider works — this uses
Google's Gemini API, mainly for its free tier).

**1. Backend**
```bash
cd server
npm install
cp .env.example .env      # add your GEMINI_API_KEY
npm start                 # runs on http://localhost:3000
```

**2. Frontend** (new terminal)
```bash
cd client
npm install
npm run dev                # runs on http://localhost:5173
```

Open the printed localhost URL. Type ingredients (e.g. "eggs, spinach,
cheddar, one onion") and hit Generate.

## Usage

1. Type a free-form list of ingredients into the textarea.
2. Click **Generate Recipe**.
3. The app shows a loading state, then renders:
   - Recipe title
   - A servings stepper that scales every ingredient amount live
   - An ingredient list, each with an optional swap suggestion
   - A step checklist you can tick off as you cook
4. If the model fails, times out, or returns something that doesn't match the
   expected shape, you'll see an error message with a **Retry** button instead
   of a crash.

## Architecture / how bad output is handled

- The backend prompts the model to return **only** JSON matching a fixed
  schema (`title`, `servings`, `ingredients[]`, `steps[]`) and asks for no
  prose around it.
- The frontend runs `validateRecipe()` on the parsed response before ever
  rendering it — checks required fields exist and are the right type/shape.
  If parsing (`JSON.parse`) fails, or validation fails, or the HTTP call
  fails/times out, the UI shows an error state with a retry button. It never
  crashes and never renders partial/garbage data.
- **Stale responses:** each request carries an incrementing request ID (a
  ref in `useRecipe`). When a response comes back, it's only applied to
  state if its ID still matches the latest request ID. This means if you
  submit twice quickly, an older, slower response can't overwrite the newer
  one on screen.
- A client-side 20s timeout (`AbortController`) treats a hung request as a
  failure rather than spinning forever.

## AI-usage note

I used Claude (via chat) to help scaffold the boilerplate (Express route,
component skeletons, the stale-response-guard pattern) and to draft this
README. I then rewrote the backend route myself — switched the LLM call
from Anthropic to Google's Gemini API (`@google/genai`, model
`gemini-flash-latest`) due to credit availability, restructured the
markdown-fence-stripping logic, and adjusted variable naming and structure
to match how I write and reason about code. The prompt design (what JSON
schema to ask the model for, how to phrase the system prompt so it reliably
returns clean JSON) and the validation/error-handling logic are the parts
I can walk through in detail.

## Known limitations

- Ingredient swaps are single suggestions generated per-ingredient by the
  model in the same response — not re-queried live.
- Servings scaling is simple multiplication; it doesn't round to
  "kitchen-friendly" fractions (e.g. you might see 2.33 eggs).
- No persistence — refreshing the page loses the current recipe.
- No streaming — the full JSON is returned in one response.
- Minimal styling; not a stretch-goal build (no dark mode/animation).

## Time spent

~[fill in] hours.
