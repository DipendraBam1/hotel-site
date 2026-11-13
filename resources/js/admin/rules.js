export const RATE = { min: 1, max: 5000 };

export function validateRate(value) {
  const text = String(value).trim();
  if (!text) return 'Enter a nightly rate.';
  if (!/^\d+$/.test(text)) return 'Use whole numbers only, for example 150.';
  const n = Number(text);
  if (n < RATE.min || n > RATE.max)
    return `Enter a rate from £${RATE.min} to £${RATE.max.toLocaleString('en-GB')}.`;
  return '';
}