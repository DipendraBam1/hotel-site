const splitLines = (raw) =>
  String(raw).split('\n').map((s) => s.trim()).filter(Boolean);

export function toForm(fields, record) {
  const out = {};
  for (const f of fields) {
    const v = record ? record[f.name] : f.default;
    if (f.type === 'checkbox') out[f.name] = Boolean(v);
    else if (f.type === 'lines') out[f.name] = (v ?? []).join('\n');
    else if (f.type === 'pairs')
      out[f.name] = (v ?? []).map((p) => `${p.label}: ${p.value}`).join('\n');
    else out[f.name] = v === undefined || v === null ? '' : String(v);
  }
  return out;
}

export function fromForm(fields, values) {
  const out = {};
  for (const f of fields) {
    const v = values[f.name];
    if (f.type === 'checkbox') out[f.name] = Boolean(v);
    else if (f.type === 'lines') out[f.name] = splitLines(v);
    else if (f.type === 'pairs')
      out[f.name] = splitLines(v).map((line) => {
        const i = line.indexOf(':');
        return { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
      });
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
      const items = splitLines(raw);
      if (f.required && items.length === 0) message = 'Add at least one item.';
      else if (f.maxItems && items.length > f.maxItems) message = `Add no more than ${f.maxItems} items.`;
      else if (f.maxLength && items.some((s) => s.length > f.maxLength))
        message = `Keep each item to ${f.maxLength} characters or fewer.`;
    } else if (f.type === 'pairs') {
      const items = splitLines(raw);
      if (f.required && items.length === 0) message = 'Add at least one line.';
      else if (f.maxItems && items.length > f.maxItems) message = `Add no more than ${f.maxItems} lines.`;
      else {
        const bad = items.findIndex((line) => {
          const i = line.indexOf(':');
          return i < 1 || !line.slice(i + 1).trim();
        });
        if (bad !== -1) message = `Line ${bad + 1} must look like “Label: Value”.`;
        else if (f.maxLength && items.some((s) => s.length > f.maxLength))
          message = `Keep each line to ${f.maxLength} characters or fewer.`;
      }
    } else if (!raw.trim()) {
      if (f.required) message = f.type === 'select' ? 'Choose an option.' : 'This field is required.';
    } else if (f.type === 'number') {
      const n = Number(raw.trim());
      if (!/^\d+$/.test(raw.trim())) message = 'Use whole numbers only, for example 150.';
      else if (f.min !== undefined && n < f.min) message = `Enter a number from ${f.min} to ${f.max}.`;
      else if (f.max !== undefined && n > f.max) message = `Enter a number from ${f.min} to ${f.max}.`;
    } else if (f.type === 'select' && f.options && !f.options.some((o) => o.value === raw.trim())) {
      message = 'Choose a valid option.';
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