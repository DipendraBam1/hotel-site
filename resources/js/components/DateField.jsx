export default function DateField({ id, label, value, min, onChange, error }) {
  const errorId = `${id}-error`;
  return (
    <div data-invalid={error ? 'true' : undefined}>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.12em] text-stone">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-12 w-full bg-white px-3 text-charcoal ${
          error ? 'border-2 border-red-800' : 'border border-stone'
        }`}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-800">
          <span className="font-medium">Error: </span>{error}
        </p>
      )}
    </div>
  );
}