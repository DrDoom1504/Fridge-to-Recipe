export function LoadingState() {
  return (
    <div className="status-state loading-state">

      <div className="loading-indicator">

        <div className="spinner-modern"></div>

        <h3>
          Preparing your recipe...
        </h3>

        <p className="loading-text">
          AI is selecting ingredients,
          scaling quantities and writing
          cooking steps.
        </p>

      </div>

    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}) {
  return (
    <div className="status-state error-state">

      <div className="error-card">

        <div className="error-icon">
          ⚠️
        </div>

        <h3>
          Something went wrong
        </h3>

        <p className="error-message">
          {message ||
            "Unable to generate recipe."}
        </p>

        <button
          className="retry-button"
          onClick={onRetry}
        >
          Try Again
        </button>

      </div>

    </div>
  );
}

export function EmptyState() {
  return (
    <div className="status-state empty-state">

      <div className="empty-card">

        <div className="empty-icon">
          🍳
        </div>

        <h2>
          Let's Cook!
        </h2>

        <p className="empty-text">
          Type the ingredients you already
          have at home and the AI will
          generate a complete recipe with
          ingredient quantities, optional
          swaps and cooking steps.
        </p>

      </div>

    </div>
  );
}