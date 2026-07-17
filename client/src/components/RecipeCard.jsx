import { useState } from "react";

import ServingsControl from "./ServingsControl.jsx";
import IngredientList from "./IngredientList.jsx";
import StepChecklist from "./StepChecklist.jsx";

export default function RecipeCard({ recipe }) {
  const [servings, setServings] = useState(recipe.servings);

  const scale = servings / recipe.servings;

  return (
    <article className="recipe-card">

      <div className="recipe-card__header">

        <div>

          <h2>{recipe.title}</h2>

          <p className="recipe-description">
            Generated based on your available ingredients.
          </p>

        </div>

        <span className="recipe-badge">
          Chef's Pick
        </span>

      </div>

      <ServingsControl
        servings={servings}
        onChange={setServings}
      />

      <section className="recipe-section">

        <div className="section-heading">
          <span className="material-symbols-outlined">
            grocery
          </span>

          <h3>Ingredients</h3>
        </div>

        <IngredientList
          ingredients={recipe.ingredients}
          scale={scale}
        />

      </section>

      <section className="recipe-section">

        <div className="section-heading">
          <span className="material-symbols-outlined">
            checklist
          </span>

          <h3>Instructions</h3>
        </div>

        <StepChecklist
          steps={recipe.steps}
        />

      </section>

    </article>
  );
}