import { useEffect, useRef, useState } from 'react';
import FormField from '../components/FormField';
import { fromForm, toForm, validateForm } from './validate';
import { getResource } from './registry';
function RecordForm({ config, record, onSave, onClose }) {
  const isNew = record === 'new';
  const formRef = useRef(null);
  const [values, setValues] = useState(() => toForm(config.fields, isNew ? null : record));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState('');
const [options, setOptions] = useState({});

useEffect(() => {
  config.fields
    .filter((f) => f.optionsFrom)
    .forEach((f) => {
      const { resource, value, label } = f.optionsFrom;
      getResource(resource)
        .api.list()
        .then((list) =>
          setOptions((o) => ({
            ...o,
            [f.name]: list.map((i) => ({ value: i[value], label: i[label] })),
          }))
        );
    });
}, [config]);
  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const focusFirstError = () =>
    requestAnimationFrame(() =>
      formRef.current
        ?.querySelector('[data-invalid="true"] :is(input, textarea, select)')
        ?.focus()
    );

  async function submit(e) {
    e.preventDefault();
    const found = validateForm(config.fields, values);
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirstError();
      return;
    }
    setSaving(true);
    setFailed('');
    try {
      await onSave(fromForm(config.fields, values));
      onClose();
    } catch (err) {
      setSaving(false);
      if (err.errors) {
        setErrors(err.errors);
        focusFirstError();
      } else {
        setFailed('Could not save. Please try again.');
      }
    }
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="p-6 md:p-8">
      <h2 id="record-title" className="text-3xl">
        {isNew ? `Add ${config.singular}` : `Edit ${config.singular}`}
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {config.fields.map((f) => {
          if (f.type === 'checkbox') {
            return (
              <label key={f.name} className="flex items-center gap-3 text-sm sm:col-span-2">
                <input
                  type="checkbox"
                  checked={values[f.name]}
                  onChange={(e) => set(f.name, e.target.checked)}
                  className="h-5 w-5 accent-navy"
                />
                {f.label}
              </label>
            );
          }
if (f.type === 'select') {
  const list = f.options ?? options[f.name];
  return (
    <div key={f.name}>
      <FormField
        id={`f-${f.name}`}
        label={f.label}
        required={f.required}
        hint={f.hint}
        as="select"
        value={values[f.name]}
        error={errors[f.name]}
        onChange={(e) => set(f.name, e.target.value)}
      >
        <option value="">{list ? 'Choose an option' : 'Loading…'}</option>
        {(list ?? []).map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </FormField>
    </div>
  );
}
const area = ['textarea', 'lines', 'pairs'].includes(f.type);          return (
            <div key={f.name} className={area || f.wide ? 'sm:col-span-2' : ''}>
              <FormField
                id={`f-${f.name}`}
                label={f.label}
                required={f.required}
                hint={f.hint}
                as={area ? 'textarea' : 'input'}
                {...(area ? {} : { type: 'text', inputMode: f.type === 'number' ? 'numeric' : undefined })}
                value={values[f.name]}
                error={errors[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      {failed && (
        <p role="alert" className="mt-6 text-red-800">
          <span className="font-medium">Error: </span>
          {failed}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="h-12 bg-navy px-8 text-sm tracking-wider text-ivory hover:bg-charcoal disabled:opacity-60"
        >
          {saving ? 'Saving…' : isNew ? `Add ${config.singular}` : 'Save changes'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="h-12 border border-navy px-8 text-sm tracking-wider text-navy hover:bg-navy hover:text-ivory"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function RecordDialog({ config, record, onSave, onClose }) {
  const ref = useRef(null);
  const open = record !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="record-title"
      onClose={onClose}
      className="m-auto max-h-[90vh] w-[min(94vw,42rem)] max-w-none overflow-y-auto bg-ivory p-0 text-charcoal backdrop:bg-charcoal/60"
    >
      {open && (
        <RecordForm
          key={record === 'new' ? 'new' : record.id}
          config={config}
          record={record}
          onSave={onSave}
          onClose={onClose}
        />
      )}
    </dialog>
  );
}