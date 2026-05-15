import { useId } from "react";

export default function Input({
  label,
  type = "text",
  error = "",
  className = "",
  ...props
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          error
            ? "border-red-400 focus:ring-red-500"
            : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
