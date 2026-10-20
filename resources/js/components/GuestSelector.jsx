export default function GuestSelector({ id, label, value, min, max, onChange, error }) {
  const errorId = `${id}-error`;
  const btn =
    'flex h-full w-12 items-center justify-center text-xl hover:bg-ivory-deep disabled:cursor-not-allowed disabled:opacity-35';
  return (
    <div
      role="group"
      aria-labelledby={`${id}-label`}
      aria-describedby={error ? errorId : undefined}
      data-invalid={error ? 'true' : undefined}
    >
      <span id={`${id}-label`} className="mb-2 block text-xs uppercase tracking-[0.12em] text-stone">
        {label}
      </span>
      <div className={`flex h-12 items-center justify-between bg-white ${
        error ? 'border-2 border-red-800' : 'border border-stone'
      }`}>
        <button type="button" className={btn} disabled={value <= min}
                aria-label={`Decrease ${label.toLowerCase()}`}
                onClick={() => onChange(value - 1)}>
          <span aria-hidden="true">−</span>
        </button>
        <output aria-live="polite" className="min-w-8 text-center font-medium">{value}</output>
        <button type="button" className={btn} disabled={value >= max}
                aria-label={`Increase ${label.toLowerCase()}`}
                onClick={() => onChange(value + 1)}>
          <span aria-hidden="true">+</span>
        </button>
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-800">
          <span className="font-medium">Error: </span>{error}
        </p>
      )}
    </div>
  );
}