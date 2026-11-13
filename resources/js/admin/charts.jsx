export function ChartCard({ title, description, table, tag = 'Sample data', children }) {
  return (
    <figure className="m-0 border border-stone-light bg-white p-5 md:p-6">
      <figcaption>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-2xl">{title}</h2>
          <span className="border border-brass px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-brass">
            {tag}
          </span>
        </div>
        <p className="mt-1 text-sm text-stone">{description}</p>
      </figcaption>

      <div aria-hidden="true" className="mt-6">
        {children}
      </div>

      <table className="sr-only">
        <caption>{table.caption}</caption>
        <thead>
          <tr>
            {table.headers.map((h) => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export function ColumnChart({ labels, values, format }) {
  const max = Math.max(...values, 1);
  const last = values.length - 1;
  return (
    <div>
<div className="flex h-56 items-end gap-2 border-b border-stone sm:gap-4 md:h-72 md:gap-8">        {values.map((v, i) => (
<div key={labels[i]} className="mx-auto flex h-full w-full max-w-24 flex-1 flex-col justify-end">            <span className="mb-1 text-center text-xs">{format(v)}</span>
            <div
              className={i === last ? 'bg-brass' : 'bg-navy'}
              style={{ height: `${(v / max) * 80}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2 sm:gap-4">
        {labels.map((l, i) => (
          <span
            key={l}
            className={`flex-1 text-center text-xs ${i === last ? 'font-medium' : 'text-stone'}`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LineChart({ values, startLabel, endLabel, summary }) {
  const max = Math.max(...values, 1);
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${38 - (v / max) * 34}`)
    .join(' ');
  return (
    <div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-44 w-full">
        {[6, 22, 38].map((y) => (
          <line
            key={y}
            x1="0"
            x2="100"
            y1={y}
            y2={y}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            className="stroke-stone-light"
          />
        ))}
        <polyline
          points={points}
          fill="none"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="stroke-navy"
        />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-stone">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
      <p className="mt-3 text-sm">{summary}</p>
    </div>
  );
}

export function BarList({ items }) {
  const max = Math.max(...items.map((i) => i.value ?? 0), 1);
  return (
    <ul className="space-y-4">
      {items.map((i) => (
        <li key={i.label}>
          <div className="flex justify-between gap-4 text-sm">
            <span>{i.label}</span>
            <span className="font-medium">{i.display}</span>
          </div>
          <div className="mt-1 h-2 bg-ivory-deep">
            <div
              className="h-2 bg-navy"
              style={{ width: `${i.value ? (i.value / max) * 100 : 0}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}