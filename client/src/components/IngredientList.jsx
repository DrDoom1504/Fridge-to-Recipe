import { useState } from "react";

function formatAmount(value) {
  const rounded = Math.round(value * 100) / 100;

  return rounded % 1 === 0
    ? rounded.toString()
    : rounded.toFixed(2);
}

export default function IngredientList({
  ingredients,
  scale,
}) {
  const [swapped, setSwapped] = useState({});

  function toggleSwap(id) {
    setSwapped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <ul className="ingredient-list">

      {ingredients.map((ingredient) => {
        const isSwapped = swapped[ingredient.id];

        const currentName = isSwapped
          ? ingredient.swap
          : ingredient.name;

        const swapText = isSwapped
          ? ingredient.name
          : ingredient.swap;

        return (
          <li
            key={ingredient.id}
            className="ingredient-card"
          >
            <span className="ingredient-amount">
              {formatAmount(
                ingredient.amount * scale
              )}{" "}
              {ingredient.unit}
            </span>

            <span className="ingredient-name fade-text">
              {currentName}
            </span>

            {ingredient.swap && (
              <button
                type="button"
                className="ingredient-swap"
                onClick={() =>
                  toggleSwap(ingredient.id)
                }
                aria-label="Swap Ingredient"
              >
                <span className="material-symbols-outlined">
                  swap_horiz
                </span>

                {swapText}
              </button>
            )}
          </li>
        );
      })}

    </ul>
  );
}