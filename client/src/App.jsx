import { useEffect, useState } from "react";
import IngredientInput from "./components/IngredientInput.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "./components/StatusStates.jsx";
import { useRecipe } from "./hooks/useRecipe.js";

export default function App() {
  const { status, recipe, errorMessage, generate, retry } = useRecipe();

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");

    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <div className="app-shell fade-page">
      <header className="top-app-bar">
        <div className="top-app-bar__content">

          <div className="brand">
            <span className="brand-mark"></span>

            <div>
              <p className="brand-label">Fridge to Recipe</p>
              <span className="brand-subtitle">
                AI Powered Recipe Generator
              </span>
            </div>
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <span className="material-symbols-outlined">
                light_mode
              </span>
            ) : (
              <span className="material-symbols-outlined">
                dark_mode
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="main-canvas">

        <section className="hero-section fade-up">

          <h1 className="hero-title">
            Cook Something Amazing
          </h1>

          <p className="hero-subtitle">
            Turn whatever is sitting in your fridge into a complete recipe in
            seconds using AI.
          </p>

        </section>

        <section className="glass-card input-panel fade-up">
          <IngredientInput
            onSubmit={generate}
            disabled={status === "loading"}
          />
        </section>

        <section className="status-panel fade-up">

          {status === "idle" && <EmptyState />}

          {status === "loading" && <LoadingState />}

          {status === "error" && (
            <ErrorState
              message={errorMessage}
              onRetry={retry}
            />
          )}

          {status === "success" && recipe && (
            <RecipeCard recipe={recipe} />
          )}

        </section>

        <section className="visual-hint fade-up">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80"
            alt="Kitchen Workspace"
          />
        </section>

      </main>

    </div>
  );
}