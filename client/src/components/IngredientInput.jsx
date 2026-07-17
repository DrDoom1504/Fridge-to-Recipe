import { useState } from "react";

export default function IngredientInput({
  onSubmit,
  disabled,
}) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    onSubmit(text);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!disabled && text.trim()) {
        onSubmit(text);
      }
    }
  }

  return (
    <form
      className="ingredient-form"
      onSubmit={handleSubmit}
    >
      <div className="ingredient-form__header">

        <label htmlFor="ingredients">
          What's in your fridge?
        </label>

        <p className="input-help">
          Separate ingredients using commas or new lines.
        </p>

      </div>

      <textarea
        id="ingredients"
        className="ingredient-input"
        placeholder="Eggs, Cheese, Tomatoes, Onion..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={6}
      />

      <button
        type="submit"
        disabled={disabled || !text.trim()}
      >
        {disabled ? (
          <>
            <span className="spinner-inline"></span>
            Generating...
          </>
        ) : (
          <>
            Generate Recipe
          </>
        )}
      </button>
    </form>
  );
}