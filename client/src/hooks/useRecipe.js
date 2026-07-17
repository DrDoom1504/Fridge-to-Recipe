import { useRef, useState, useCallback } from "react";
import { validateRecipe } from "../utils/validateRecipe.js";

const API_URL = "http://localhost:3000/api/generate-recipe";
const TIMEOUT_MS = 20000;

export function useRecipe() {
  const [status, setStatus] = useState("idle");
  const [recipe, setRecipe] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const requestIdRef = useRef(0);
  const lastIngredientsRef = useRef("");

  const generate = useCallback(async (ingredients) => {
    const trimmed = ingredients.trim();

    if (!trimmed) return;

    lastIngredientsRef.current = trimmed;

    const requestId = ++requestIdRef.current;

    setStatus("loading");
    setErrorMessage("");

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, TIMEOUT_MS);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: trimmed,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (requestId !== requestIdRef.current) return;

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));

        throw new Error(
          body.error || "Failed to generate recipe."
        );
      }

      const body = await response.json();

      validateRecipe(body.recipe);

      if (requestId !== requestIdRef.current) return;

      setRecipe(body.recipe);

      setStatus("success");
    } catch (err) {
      clearTimeout(timeout);

      if (requestId !== requestIdRef.current) return;

      const message =
        err.name === "AbortError"
          ? "The request timed out. Please try again."
          : err.message || "Something went wrong.";

      setErrorMessage(message);

      setStatus("error");
    }
  }, []);

  const retry = useCallback(() => {
    if (lastIngredientsRef.current) {
      generate(lastIngredientsRef.current);
    }
  }, [generate]);

  return {
    status,
    recipe,
    errorMessage,
    generate,
    retry,
  };
}