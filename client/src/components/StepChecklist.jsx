import { useState } from "react";

export default function StepChecklist({
  steps,
}) {
  const [checked, setChecked] = useState({});

  function toggle(id) {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <ol className="step-list">

      {steps.map((step, index) => (
        <li
          key={step.id}
          className={
            checked[step.id]
              ? "checked"
              : ""
          }
        >
          <label>

            <input
              type="checkbox"
              checked={!!checked[step.id]}
              onChange={() =>
                toggle(step.id)
              }
            />

            <span className="step-number">
              {index + 1}
            </span>

            <span className="step-text">
              {step.text}
            </span>

          </label>
        </li>
      ))}

    </ol>
  );
}