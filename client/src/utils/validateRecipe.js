export function validateRecipe(recipe) {
  if (!recipe || typeof recipe !== "object") {
    throw new Error("Invalid response.");
  }

  if (
    typeof recipe.title !== "string" ||
    !recipe.title.trim()
  ) {
    throw new Error("Recipe title missing.");
  }

  if (
    typeof recipe.servings !== "number" ||
    recipe.servings <= 0
  ) {
    throw new Error("Invalid servings.");
  }

  if (
    !Array.isArray(recipe.ingredients) ||
    recipe.ingredients.length === 0
  ) {
    throw new Error("No ingredients returned.");
  }

  if (
    !Array.isArray(recipe.steps) ||
    recipe.steps.length === 0
  ) {
    throw new Error("No cooking steps returned.");
  }

  recipe.ingredients.forEach((ingredient, index) => {
    if (
      typeof ingredient.id !== "string" ||
      typeof ingredient.name !== "string" ||
      typeof ingredient.amount !== "number" ||
      typeof ingredient.unit !== "string"
    ) {
      throw new Error(
        `Ingredient ${index + 1} is invalid.`
      );
    }
  });

  recipe.steps.forEach((step, index) => {
    if (
      typeof step.id !== "string" ||
      typeof step.text !== "string"
    ) {
      throw new Error(
        `Step ${index + 1} is invalid.`
      );
    }
  });

  return true;
}