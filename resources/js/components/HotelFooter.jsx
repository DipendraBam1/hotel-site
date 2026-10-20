import { useRef, useState } from 'react';
import { hotel, policies, footerBlurb } from '../data/hotel';

export default function HotelFooter() {
  const dialogRef = useRef(null);
  const [policyKey, setPolicyKey] = useState('privacy');
  const policy = policies[policyKey];

  function openPolicy(key) {
    setPolicyKey(key);
    dialogRef.current?.showModal();
  }

  const linkClass = 'hover:text-brass-light';
  const headingClass = 'text-xs uppercase tracking-[0.14em] text-brass-light';

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-12 md:px-12 md:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-4xl">{hotel.name}</p>
          <p className="mt-4 max-w-[36ch] text-ivory/80">{footerBlurb}</p>
          <a
            href="#availability"
            className="mt-8 inline-block bg-ivory px-7 py-3.5 text-sm tracking-wider text-navy hover:bg-brass-light"
          >
            Check Availability
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className={headingClass}>Explore</h2>
          <ul className="mt-4 space-y-3">
            {hotel.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className={headingClass}>Contact</h2>
          <address className="mt-4 not-italic leading-relaxed text-ivory/80">
            {hotel.address}
          </address>
          <p className="mt-3">
            <a href={`tel:${hotel.phone.replace(/\s/g, '')}`} className={`block ${linkClass}`}>
              {hotel.phone}
            </a>
            <a href={`mailto:${hotel.email}`} className={`block ${linkClass}`}>
              {hotel.email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-ivory/20">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-6 text-sm text-ivory/80 sm:flex-row sm:items-center sm:justify-between md:px-12">
          <p>© {new Date().getFullYear()} {hotel.name}. A fictional hotel created for a design exercise.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <button type="button" onClick={() => openPolicy('privacy')} className={linkClass}>
                Privacy policy
              </button>
            </li>
            <li>
              <button type="button" onClick={() => openPolicy('terms')} className={linkClass}>
                Terms of use
              </button>
            </li>
            <li>
              <a href="#top" className={linkClass}>Back to top</a>
            </li>
          </ul>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="policy-title"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current.close()}
        className="m-auto w-[min(90vw,34rem)] bg-ivory p-0 text-charcoal backdrop:bg-charcoal/60"
      >
        <div className="p-6 md:p-8">
          <h2 id="policy-title" className="text-3xl">{policy.title}</h2>
          <div className="mt-4 space-y-3 text-stone">
            {policy.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            className="mt-6 bg-navy px-6 py-3 text-sm tracking-wider text-ivory hover:bg-charcoal"
          >
            Close
          </button>
        </div>
      </dialog>
    </footer>
  );
}