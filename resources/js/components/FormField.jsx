export default function FormField({
  id, label, error, hint, required = false, as: Tag = 'input', ...props
}) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div data-invalid={error ? 'true' : undefined}>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.12em] text-stone">
        {label}
        <span className="normal-case tracking-normal">{required ? ' (required)' : ' (optional)'}</span>
      </label>
      <Tag
        id={id}
        name={id}
        aria-required={required || undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={`w-full bg-white px-3 text-charcoal ${
          Tag === 'textarea' ? 'min-h-36 py-3' : 'h-12'
        } ${error ? 'border-2 border-red-800' : 'border border-stone'}`}
        {...props}
      />
      {hint && <p id={hintId} className="mt-2 text-sm text-stone">{hint}</p>}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-red-800">
          <span className="font-medium">Error: </span>{error}
        </p>
      )}
    </div>
  );
}