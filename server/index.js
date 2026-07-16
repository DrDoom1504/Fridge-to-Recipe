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

// const SYSTEM_PROMPT =`You turn a list of ingredients into one recipe.
// Respond with ONLY valid JSON. No markdown fences, no prose before or after.

// Match this exact shape:
// {
//   "title": string,
//   "servings": number,
//   "ingredients": [
//     {
//       "id": string,
//       "name": string,
//       "amount": number,
//       "unit": string,
//       "swap": string
//     }
//   ],
//   "steps": [
//     {
//       "id": string,
//       "text": string
//     }
//   ]
// }

// Rules:
// - "amount" must be a plain number (no fractions, no ranges).
// - "unit" can be an empty string for countable items.
// - "swap" should be a short substitute or "".
// - Use 3-8 ingredients.
// - Use 3-8 steps.
// - ids should be like i1, i2 and s1, s2.
// `;

const SYSTEM_PROMPT = `You are a professional chef. You turn a list of ingredients into exactly one recipe.
Rules:
- "amount" must be a plain number (no fractions, no ranges).
- "unit" can be an empty string for countable items.
- "swap" should be a short substitute or "".
- Use 3-8 ingredients.
- Use 3-8 steps.
- ids should be like i1, i2 and s1, s2.`;

// Define the exact JSON schema Gemini must return
const recipeSchema = {
   type: "object",
    properties: {
        title: { type: "string" },
        servings: { type: "integer" },
        ingredients: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    amount: { type: "number" },
                    unit: { type: "string" },
                    swap: { type: "string" }
                },
                required: ["id", "name", "amount", "unit", "swap"]
            }
        },
        steps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    text: { type: "string" }
                },
                required: ["id", "text"]
            }
        }
    },
    required: ["title", "servings", "ingredients", "steps"]
};
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
        try{

        //     const prompt = `
        //      ${SYSTEM_PROMPT}

            
        //      Ingredients:
        //      ${ingredients}
        //     `;
        // const response = await ai.models.generateContent({
        //     model: "gemini-2.0-flash",
        //     contents: prompt,
        // });
        // console.log(prompt);
        // let rawText = response.text;
        // rawText = rawText.trim();

        // return res.json({
        //     rawText
        // });

        const response = await ai.models.generateContent({
            // 1. Updated to the active Gemini 2.5 Flash model
            model: "gemini-3.5-flash", 
            contents: `Ingredients available:\n${ingredients}`,
            config: {
                systemInstruction: SYSTEM_PROMPT,
               
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
            }
        });

        const recipeJson = JSON.parse(response.text);
        console.log(recipeJson);
        return res.json(recipeJson);
    }catch(err){
        console.log(err);

        return res.status(500).json({
            error : "Unexpected server error",
        })
    }

      
 });
 
app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});
