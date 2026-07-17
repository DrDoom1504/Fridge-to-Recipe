export default function ServingsControl({
  servings,
  onChange,
}) {
  function decrease() {
    if (servings > 1) {
      onChange(servings - 1);
    }
  }

  function increase() {
    onChange(servings + 1);
  }

  return (
    <div className="servings-control">

      <div>

        <p className="servings-label">
          Servings
        </p>

        <span className="servings-caption">
          Adjust ingredient quantities instantly
        </span>

      </div>

      <div
        className="servings-stepper"
        role="group"
        aria-label="Servings"
      >

        <button
          type="button"
          onClick={decrease}
          disabled={servings <= 1}
          aria-label="Decrease Servings"
        >
          −
        </button>

        <span className="servings-count">
          {servings}
        </span>

        <button
          type="button"
          onClick={increase}
          aria-label="Increase Servings"
        >
          +
        </button>

      </div>

    </div>
  );
}