import { useEffect, useRef, useState } from 'react';
import FormField from './FormField';
import { validateLogin, validateSignup } from '../../utils/validateAuth';

const initial = { name: '', email: '', password: '', confirm: '', agree: false, show: false };

export default function AuthPage({ mode }) {
  const signup = mode === 'signup';
  const formRef = useRef(null);
  const doneRef = useRef(null);
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  function update(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = signup ? validateSignup(values) : validateLogin(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector('[data-invalid="true"] input')?.focus();
      });
      return;
    }
    // Demo only: nothing is sent or stored. Laravel auth replaces this later.
    setDone({ name: values.name.trim(), email: values.email.trim() });
    setValues((v) => ({ ...v, password: '', confirm: '', show: false }));
  }

  const pwType = values.show ? 'text' : 'password';

  return (
    <section aria-labelledby="auth-title" className="py-16 md:py-30">
      <div className="mx-auto grid max-w-300 gap-10 px-5 md:grid-cols-12 md:gap-12 md:px-12">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.14em] text-brass">Guest account</p>
          <h1 id="auth-title" className="mt-3 text-4xl md:text-6xl">
            {signup ? 'Create an account' : 'Sign in'}
          </h1>
          <p className="mt-4 max-w-[36ch] text-stone">
            {signup
              ? 'An account would let you see your stays and keep your details for next time.'
              : 'Sign in to see your stays and manage your details.'}
          </p>
          <p className="mt-6 text-sm text-stone">
            {signup ? 'Already have an account? ' : 'New here? '}
            <a href={signup ? '/login' : '/register'} className="border-b border-navy text-navy hover:text-brass">
              {signup ? 'Sign in' : 'Create an account'}
            </a>
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {done ? (
            <div className="border border-stone-light bg-white p-6 md:p-8">
              <p className="inline-block border border-brass px-3 py-1 text-xs uppercase tracking-[0.12em] text-brass">
                Demonstration only
              </p>
              <h2 ref={doneRef} tabIndex={-1} className="mt-4 text-3xl outline-none">
                {signup ? `Welcome, ${done.name.split(' ')[0]}` : 'Signed in (demo)'}
              </h2>
              <p className="mt-3 text-stone">
                No account was created and nothing was stored. The details for {done.email} were
                checked in your browser only. Real sign-in will be handled by Laravel.
              </p>
              <a href="/" className="mt-6 inline-block bg-navy px-6 py-3 text-sm tracking-wider text-ivory hover:bg-charcoal">
                Back to the home page
              </a>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5">
              {signup && (
                <FormField id="name" label="Full name" required autoComplete="name"
                           value={values.name} error={errors.name}
                           onChange={(e) => update('name', e.target.value)} />
              )}
              <FormField id="email" label="Email" required type="email" autoComplete="email"
                         value={values.email} error={errors.email}
                         onChange={(e) => update('email', e.target.value)} />
              <FormField id="password" label="Password" required type={pwType}
                         autoComplete={signup ? 'new-password' : 'current-password'}
                         hint={signup ? 'At least 8 characters, with a letter and a number.' : undefined}
                         value={values.password} error={errors.password}
                         onChange={(e) => update('password', e.target.value)} />
              {signup && (
                <FormField id="confirm" label="Confirm password" required type={pwType}
                           autoComplete="new-password"
                           value={values.confirm} error={errors.confirm}
                           onChange={(e) => update('confirm', e.target.value)} />
              )}

              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" checked={values.show}
                       onChange={(e) => update('show', e.target.checked)}
                       className="h-5 w-5 accent-navy" />
                Show password
              </label>

              {signup && (
                <div data-invalid={errors.agree ? 'true' : undefined}>
                  <label className="flex items-start gap-3 text-sm">
                    <input type="checkbox" checked={values.agree}
                           onChange={(e) => update('agree', e.target.checked)}
                           aria-invalid={errors.agree ? 'true' : undefined}
                           aria-describedby={errors.agree ? 'agree-error' : undefined}
                           className="mt-0.5 h-5 w-5 shrink-0 accent-navy" />
                    I understand this is a demonstration and no account will be created.
                  </label>
                  {errors.agree && (
                    <p id="agree-error" className="mt-2 text-sm text-red-800">
                      <span className="font-medium">Error: </span>{errors.agree}
                    </p>
                  )}
                </div>
              )}

              <div>
                <button type="submit"
                        className="h-12 bg-navy px-8 text-sm tracking-wider text-ivory hover:bg-charcoal">
                  {signup ? 'Create account' : 'Sign in'}
                </button>
                <p className="mt-3 text-sm text-stone">
                  Demonstration form. Nothing is sent or stored.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}