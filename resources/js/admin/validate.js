export function toForm(fields, record) {
  const out = {};
  for (const f of fields) {
    const v = record ? record[f.name] : f.default;
    if (f.type === 'checkbox') out[f.name] = Boolean(v);
    else if (f.type === 'lines') out[f.name] = (v ?? []).join('\n');
    else out[f.name] = v === undefined || v === null ? '' : String(v);
  }
  return out;
}

export function fromForm(fields, values) {
  const out = {};
  for (const f of fields) {
    const v = values[f.name];
    if (f.type === 'checkbox') out[f.name] = Boolean(v);
    else if (f.type === 'lines')
      out[f.name] = String(v).split('\n').map((s) => s.trim()).filter(Boolean);
    else if (f.type === 'number') out[f.name] = String(v).trim() === '' ? null : Number(v);
    else out[f.name] = String(v).trim();
  }
  return out;
}

export function validateForm(fields, values) {
  const errors = {};
  for (const f of fields) {
    if (f.type === 'checkbox') continue;
    const raw = String(values[f.name] ?? '');
    let message = '';

    if (f.type === 'lines') {
      const items = raw.split('\n').map((s) => s.trim()).filter(Boolean);
      if (f.required && items.length === 0) message = 'Add at least one item.';
      else if (f.maxItems && items.length > f.maxItems) message = `Add no more than ${f.maxItems} items.`;
      else if (f.maxLength && items.some((s) => s.length > f.maxLength))
        message = `Keep each item to ${f.maxLength} characters or fewer.`;
    } else if (!raw.trim()) {
if (f.required) message = f.type === 'select' ? 'Choose an option.' : 'This field is required.';    } else if (f.type === 'number') {
      const n = Number(raw.trim());
      if (!/^\d+$/.test(raw.trim())) message = 'Use whole numbers only, for example 150.';
      else if (f.min !== undefined && n < f.min) message = `Enter a number from ${f.min} to ${f.max}.`;
      else if (f.max !== undefined && n > f.max) message = `Enter a number from ${f.min} to ${f.max}.`;
    } else if (f.maxLength && raw.trim().length > f.maxLength) {
      message = `Keep this to ${f.maxLength} characters or fewer.`;
    }

    if (!message && f.validate) message = f.validate(raw.trim(), values);
    if (message) errors[f.name] = message;
  }
  return errors;
}

// Mirrors what a Laravel form request would check on the server
export const validateRecord = (fields, record) => validateForm(fields, toForm(fields, record));