import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT  = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
});


const SYSTEM_PROMPT =`You turn a list of ingredients into one recipe.
Respond with ONLY valid JSON. No markdown fences, no prose before or after.

Match this exact shape:
{
  "title": string,
  "servings": number,
  "ingredients": [
    {
      "id": string,
      "name": string,
      "amount": number,
      "unit": string,
      "swap": string
    }
  ],
  "steps": [
    {
      "id": string,
      "text": string
    }
  ]
}

Rules:
- "amount" must be a plain number (no fractions, no ranges).
- "unit" can be an empty string for countable items.
- "swap" should be a short substitute or "".
- Use 3-8 ingredients.
- Use 3-8 steps.
- ids should be like i1, i2 and s1, s2.
`;

app.post("/api/generate-recipe", async (req,res) =>{
    const {ingredients} = req.body;

    if(!ingredients ||
        typeof ingredients !== "string"||
        !ingredients.trim()){
            return res.status(400).json(
                {error : "ingredients text is required "}
            );
        }
        if(!API_KEY){
            return res.status(500).json(
                {error : "Server is not missing for the API_KEY"}
            );
        }
  try {

    const prompt = `
${SYSTEM_PROMPT}

Ingredients:
${ingredients}
`;

    
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });


    let rawText = response.text;


    rawText = rawText.trim();


    let cleaned = rawText.trim();

if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace("```json", "");
}

if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace("```", "");
}

if (cleaned.endsWith("```")) {
    cleaned = cleaned.replace("```", "");
}

cleaned = cleaned.trim();

    let recipe;

    try {
      recipe = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse model response:", rawText);

      return res.status(502).json({
        error: "Model returned malformed JSON.",
      });
    }
    return res.json({
      recipe,
    });


  } catch (err) {
    console.error("Gemini Error:", err);

    return res.status(500).json({
      error: "Unexpected server error.",
    });
  }
});

 
app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});
