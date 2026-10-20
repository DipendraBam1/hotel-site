import { useEffect, useRef, useState } from 'react';

export default function MobileNavigation({ items }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  // Close the menu if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // While open: lock page scroll, trap focus, close on Escape
  useEffect(() => {
    if (!open) return;

    const links = Array.from(panelRef.current.querySelectorAll('a[href]'));
    const cycle = [buttonRef.current, ...links];
    links[0]?.focus();
    document.body.style.overflow = 'hidden';

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;

      const first = cycle[0];
      const last = cycle[cycle.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-stone-light bg-ivory shadow-sm md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="px-5 py-2">
            {items.map((item) => (
              <li key={item.href} className="border-b border-stone-light/60 last:border-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-5 pb-6 pt-2">
          <a
            href="#availability"
            onClick={() => setOpen(false)}
            className="block bg-navy px-6 py-4 text-center text-sm tracking-wider text-ivory hover:bg-charcoal"
          >
            Check Availability
          </a>
        </div>
      </div>
    </>
  );
}