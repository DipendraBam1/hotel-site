import { useEffect, useState } from 'react';

export default function StickyBookBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById('availability');
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) =>
      setHidden(entry.isIntersecting)
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      hidden={hidden}
      className="fixed inset-x-0 bottom-0 z-10 border-t border-stone-light bg-ivory p-3 sm:hidden"
    >
      <a
        href="#availability"
        className="block bg-navy px-6 py-3.5 text-center text-sm tracking-wider text-ivory hover:bg-charcoal"
      >
        Check Availability
      </a>
    </div>
  );
}