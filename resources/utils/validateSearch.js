export const LIMITS = { minAdults: 1, maxAdults: 6, minRooms: 1, maxRooms: 4, maxNights: 30 };

// Local-date string (YYYY-MM-DD). Don't use toISOString(): it uses UTC and can be a day off.
export function toLocalISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parse(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso, days) {
  const date = parse(iso);
  date.setDate(date.getDate() + days);
  return toLocalISO(date);
}

export function countNights(checkIn, checkOut) {
  return Math.round((parse(checkOut) - parse(checkIn)) / 86400000);
}

export function formatDate(iso) {
  return parse(iso).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function validateSearch({ checkIn, checkOut, adults, rooms }) {
  const errors = {};
  const today = toLocalISO(new Date());

  if (!checkIn) errors.checkIn = 'Choose a check-in date.';
  else if (checkIn < today) errors.checkIn = 'Check-in cannot be in the past.';

  if (!checkOut) errors.checkOut = 'Choose a check-out date.';
  else if (checkIn && checkOut <= checkIn) errors.checkOut = 'Check-out must be after check-in.';
  else if (checkIn && countNights(checkIn, checkOut) > LIMITS.maxNights)
    errors.checkOut = `Stays are limited to ${LIMITS.maxNights} nights online.`;

  if (adults < LIMITS.minAdults || adults > LIMITS.maxAdults)
    errors.adults = `Choose between ${LIMITS.minAdults} and ${LIMITS.maxAdults} adults.`;

  if (rooms < LIMITS.minRooms || rooms > LIMITS.maxRooms)
    errors.rooms = `Choose between ${LIMITS.minRooms} and ${LIMITS.maxRooms} rooms.`;
  else if (rooms > adults)
    errors.rooms = 'Rooms cannot exceed the number of adults.';

  return errors;
}