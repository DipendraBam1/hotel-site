import { useEffect, useRef, useState } from 'react';
import FormField from './FormField';
import { hotel } from '../data/hotel';
import { ENQUIRY_LIMITS, topics, validateEnquiry } from '../../utils/validateEnquiry';

const empty = { name: '', email: '', phone: '', topic: '', message: '' };

export default function EnquirySection() {
  const formRef = useRef(null);
  const successRef = useRef(null);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector('[data-invalid="true"] :is(input, textarea, select)')
          ?.focus();
      });
      return;
    }
    // Demo only: nothing is sent. Laravel will receive this later.
    setSent({ ...values });
  }

  function reset() {
    setValues(empty);
    setErrors({});
    setSent(null);
  }

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="bg-ivory-deep py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 md:grid-cols-12 md:gap-12 md:px-12">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.14em] text-brass">Ask us</p>
          <h2 id="enquiry-title" className="mt-3 text-4xl md:text-5xl">Send an enquiry</h2>
          <p className="mt-4 max-w-[34ch] text-stone">
            Questions about a stay, a table, or getting here? Write to us and we will reply by email.
          </p>
          <p className="mt-6 text-sm text-stone">
            Prefer to talk?{' '}
            <a
              href={`tel:${hotel.phone.replace(/\s/g, '')}`}
              className="border-b border-navy text-navy hover:text-brass"
            >
              Call {hotel.phone}
            </a>
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {sent ? (
            <div className="border border-stone-light bg-white p-6 md:p-8">
              <p className="inline-block border border-brass px-3 py-1 text-xs uppercase tracking-[0.12em] text-brass">
                Demonstration only
              </p>
              <h3 ref={successRef} tabIndex={-1} className="mt-4 text-3xl outline-none">
                Thank you, {sent.name.trim().split(' ')[0]}
              </h3>
              <p className="mt-3 text-stone">
                This is a demo, so your message was not sent and nothing was stored. On the live
                site, a reply would go to {sent.email.trim()}.
              </p>
              <dl className="mt-6 divide-y divide-stone-light border-y border-stone-light text-sm">
                <div className="flex justify-between gap-6 py-3">
                  <dt className="text-stone">Topic</dt>
                  <dd className="text-right">{sent.topic}</dd>
                </div>
                <div className="py-3">
                  <dt className="text-stone">Your message</dt>
                  <dd className="mt-1 whitespace-pre-line">{sent.message.trim()}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={reset}
                className="mt-6 border border-navy px-6 py-3 text-sm tracking-wider text-navy hover:bg-navy hover:text-ivory"
              >
                Write another message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <FormField id="name" label="Full name" required autoComplete="name"
                         value={values.name} error={errors.name}
                         onChange={(e) => update('name', e.target.value)} />
              <FormField id="email" label="Email" required type="email" autoComplete="email"
                         value={values.email} error={errors.email}
                         onChange={(e) => update('email', e.target.value)} />
              <FormField id="phone" label="Phone" type="tel" autoComplete="tel"
                         value={values.phone} error={errors.phone}
                         onChange={(e) => update('phone', e.target.value)} />
              <FormField id="topic" label="Topic" required as="select"
                         value={values.topic} error={errors.topic}
                         onChange={(e) => update('topic', e.target.value)}>
                <option value="">Choose a topic</option>
                {topics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </FormField>
              <div className="sm:col-span-2">
                <FormField id="message" label="Message" required as="textarea"
                           maxLength={ENQUIRY_LIMITS.messageMax}
                           value={values.message} error={errors.message}
                           hint={`${values.message.length} of ${ENQUIRY_LIMITS.messageMax} characters`}
                           onChange={(e) => update('message', e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <button type="submit"
                        className="h-12 bg-navy px-8 text-sm tracking-wider text-ivory hover:bg-charcoal">
                  Send enquiry
                </button>
                <p className="mt-3 text-sm text-stone">
                  Demonstration form. Messages are not sent or stored.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}