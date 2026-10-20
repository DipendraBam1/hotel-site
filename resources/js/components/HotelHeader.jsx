import { hotel } from '../data/hotel';
import MobileNavigation from './MobileNavigation';

export default function HotelHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-light bg-ivory">
      <div className="mx-auto flex min-h-[72px] max-w-[1200px] items-center justify-between gap-6 px-5 md:px-12">
        <a href="#top" className="font-display text-3xl tracking-wide">
          {hotel.name}
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-10">
            {hotel.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm tracking-wider hover:text-brass">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#availability"
            className="hidden bg-navy px-5 py-3 text-sm tracking-wider text-ivory hover:bg-charcoal sm:inline-block"
          >
            Check Availability
          </a>
          <MobileNavigation items={hotel.nav} />
        </div>
      </div>
    </header>
  );
}