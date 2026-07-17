# Fridge-to-Recipe

A React application that turns a list of available ingredients into a structured recipe using Google's Gemini API. The AI returns structured JSON, which is validated before being rendered as an interactive recipe with scalable servings, ingredient swap suggestions, and a step-by-step cooking checklist.

This project focuses on reliable AI integration rather than a conversational chatbot experience.

---

## Project Structure

```
fridge-to-recipe/
├── client/               # React app (Vite)
│   └── src/
│       ├── components/   # IngredientInput, RecipeCard, ServingsControl,
│       │                 # StepChecklist, IngredientList, StatusStates
│       ├── hooks/         useRecipe.js — request lifecycle + stale-response guard
│       ├── utils/         validateRecipe.js — validates AI response
│       ├── App.jsx
│       └── main.jsx
└── server/               # Express backend (protects API key)
    └── index.js
```

---

## Setup

### Requirements

- Node.js 18+
- Google Gemini API Key

### Backend

```bash
cd server
npm install
cp .env.example .env
```

Add your API key:

```env
GEMINI_API_KEY=your_api_key_here
```

Start the backend:

```bash
npm start
```

Runs on:

```
http://localhost:3000
```

---

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

Open the Vite URL shown in the terminal and enter ingredients such as:

```
eggs, spinach, cheese, tomatoes
```

Click **Generate Recipe**.

---

# Features

- AI-generated recipes using Google's Gemini API
- Structured JSON response rendering
- Ingredient quantity scaling through servings control
- Ingredient swap suggestions
- Interactive cooking checklist
- Dark / Light mode
- Loading, Empty and Error states
- Responsive UI
- Request timeout handling
- Retry support
- Response validation before rendering
- Protection against stale API responses

---

# Usage

1. Enter ingredients in the textarea.
2. Click **Generate Recipe**.
3. The application displays:

- Recipe title
- Adjustable servings
- Dynamically scaled ingredient quantities
- Ingredient swap suggestions
- Interactive cooking checklist

If the API request fails, times out, or returns invalid data, the application displays an error message with a **Retry** option instead of rendering incomplete data.

---

# Architecture

## AI Response Validation

The backend instructs Gemini to return **only JSON** following a predefined schema:

- title
- servings
- ingredients[]
- steps[]

The frontend validates every response before rendering using `validateRecipe()`.

Validation ensures:

- Required fields exist
- Correct data types
- Proper object structure

If validation fails, the application enters an error state instead of rendering invalid content.

---

## Request Handling

The custom `useRecipe` hook manages the request lifecycle.

Features include:

- Loading state management
- Request timeout using `AbortController`
- Retry functionality
- Error handling

---

## Stale Response Protection

Each request is assigned an incrementing request ID.

When multiple requests are made quickly, only the most recent response is allowed to update the UI.

Older responses are ignored, preventing race conditions and stale data from overwriting newer results.

---

## Error Handling

The application gracefully handles:

- Network failures
- Request timeouts
- Invalid JSON
- Invalid response schema
- Server-side errors

Instead of crashing, the UI displays a retry option.

---

# AI Usage

AI was used as a development assistant to help scaffold parts of the project, improve component organization, and draft documentation.

The application logic, Gemini API integration, prompt design, response validation, request lifecycle management, stale response protection, and overall project structure were implemented and adapted to fit the application's requirements. The code was reviewed, modified, and integrated manually.

---

# Known Limitations

- Ingredient swap suggestions are generated once per recipe and are not refreshed dynamically.
- Ingredient scaling uses direct multiplication and may produce decimal values that are not kitchen-friendly (for example, **2.33 eggs**).
- Recipes are not persisted after refreshing the page.
- Responses are returned as a complete JSON object rather than streamed progressively.

---

# Time Spent

Approximately **5 hours**.