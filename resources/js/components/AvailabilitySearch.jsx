import { useRef, useState } from 'react';
import DateField from './DateField';
import GuestSelector from './GuestSelector';
import SearchResults from './SearchResults';
import { rooms as roomData } from '../data/rooms';
import {
  LIMITS, addDays, countNights, toLocalISO, validateSearch,
} from '../../utils/validateSearch';

function getMockAvailability({ checkIn, checkOut, adults, rooms }) {
  const nights = countNights(checkIn, checkOut);
  const perRoom = Math.ceil(adults / rooms);
  const options = roomData.map((r) => ({
    ...r,
    available: !r.demoUnavailable && r.capacity >= perRoom,
    total: r.pricePerNight * nights * rooms,
  }));
  return { checkIn, checkOut, nights, adults, rooms, options };
}

export default function AvailabilitySearch() {
  const formRef = useRef(null);
  const today = toLocalISO(new Date());
  const [values, setValues] = useState({ checkIn: '', checkOut: '', adults: 2, rooms: 1 });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  // Any change clears old results and that field's error, so nothing stale stays on screen
  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setResult(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateSearch(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setResult(null);
      // Move focus to the first invalid control after the errors render
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector('[data-invalid="true"] input, [data-invalid="true"] button:not(:disabled)')
          ?.focus();
      });
      return;
    }
    setResult(getMockAvailability(values));
  }

  const checkOutMin = values.checkIn ? addDays(values.checkIn, 1) : addDays(today, 1);

  return (
    <section id="availability" aria-labelledby="availability-title" className="bg-ivory-deep py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-5 md:px-12">
        <h2 id="availability-title" className="text-3xl md:text-4xl">Check availability</h2>
        <p className="mt-2 max-w-[48ch] text-stone">
          Choose your dates and party size to see what is open.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} noValidate
              className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-start">
          <DateField id="checkIn" label="Check-in" value={values.checkIn} min={today}
                     onChange={(v) => update('checkIn', v)} error={errors.checkIn} />
          <DateField id="checkOut" label="Check-out" value={values.checkOut} min={checkOutMin}
                     onChange={(v) => update('checkOut', v)} error={errors.checkOut} />
          <GuestSelector id="adults" label="Adults" value={values.adults}
                         min={LIMITS.minAdults} max={LIMITS.maxAdults}
                         onChange={(v) => update('adults', v)} error={errors.adults} />
          <GuestSelector id="rooms" label="Rooms" value={values.rooms}
                         min={LIMITS.minRooms} max={LIMITS.maxRooms}
                         onChange={(v) => update('rooms', v)} error={errors.rooms} />
          <button type="submit"
                  className="h-12 self-end bg-navy px-8 text-sm tracking-wider text-ivory hover:bg-charcoal sm:col-span-2 lg:col-span-1">
            Search
          </button>
        </form>

        <div aria-live="polite">
          <SearchResults result={result} />
        </div>
      </div>
    </section>
  );
}