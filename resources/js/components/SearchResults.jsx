import { formatDate } from '../../utils/validateSearch';

const money = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
});

export default function SearchResults({ result }) {
  if (!result) return null;
  const { checkIn, checkOut, nights, adults, rooms, options } = result;
  const anyAvailable = options.some((o) => o.available);

  return (
    <div className="mt-10 border border-stone-light bg-white p-6 md:p-8">
      <p className="inline-block border border-brass px-3 py-1 text-xs uppercase tracking-[0.12em] text-brass">
        Demonstration data
      </p>
      <h3 className="mt-4 text-3xl">
        {formatDate(checkIn)} to {formatDate(checkOut)}
      </h3>
      <p className="mt-1 text-stone">
        {nights} {nights === 1 ? 'night' : 'nights'} · {adults} {adults === 1 ? 'adult' : 'adults'} ·{' '}
        {rooms} {rooms === 1 ? 'room' : 'rooms'}
      </p>

      {!anyAvailable && (
        <p className="mt-6 border-l-2 border-brass pl-4">
          No rooms match this party size in the demo. Try more rooms or fewer guests per room.
        </p>
      )}

      <ul className="mt-6 divide-y divide-stone-light">
        {options.map((o) => (
          <li key={o.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
<p className="font-display text-2xl">
  <a href={`#${o.id}`} className="underline decoration-stone-light underline-offset-4 hover:text-brass">
    {o.name}
    <span className="sr-only"> room details</span>
  </a>
</p>              <p className="text-sm text-stone">Sleeps {o.capacity}</p>
            </div>
            {o.available ? (
              <p className="sm:text-right">
                <span className="block font-medium">{money.format(o.total)} total</span>
                <span className="text-sm text-stone">Available (demo)</span>
              </p>
            ) : (
              <p className="text-sm text-stone sm:text-right">
                <span className="font-medium text-charcoal">Unavailable</span> for this search
              </p>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-stone">
        These results are mock data for demonstration. Booking is not connected yet.
      </p>
    </div>
  );
}