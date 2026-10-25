import { offers, offersNote } from '../data/offers';
import { rooms } from '../data/rooms';

const money = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
});

export default function OffersSection({ onSelectRoom }) {
  return (
    <section id="offers" aria-labelledby="offers-title" className="bg-ivory-deep py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 md:grid-cols-12 md:gap-12 md:px-12">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.14em] text-brass">Stay longer</p>
          <h2 id="offers-title" className="mt-3 text-4xl md:text-5xl">Packages</h2>
          <p className="mt-4 max-w-[34ch] text-stone">
            Two ways to stay that put the house to good use.
          </p>
          <p className="mt-6 text-sm text-stone">{offersNote}</p>
        </div>

        <ul className="border-t border-stone md:col-span-8">
          {offers.map((o) => {
            const room = rooms.find((r) => r.id === o.roomId);
            const price = room ? room.pricePerNight * o.nights : null;
            return (
              <li key={o.id} className="grid gap-6 border-b border-stone-light py-8 sm:grid-cols-[1fr_auto] sm:gap-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-brass">
                    {o.nights} nights · {room?.name}
                  </p>
                  <h3 className="mt-2 text-3xl">{o.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-stone">{o.description}</p>
                  <ul className="mt-4 space-y-1 text-sm">
                    {o.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-brass">–</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sm:text-right">
                  {price && (
                    <p>
                      <span className="block text-sm text-stone">Room rate from</span>
                      <span className="font-display text-3xl">{money.format(price)}</span>
                    </p>
                  )}
                  <a
                    href="#availability"
                    onClick={() => onSelectRoom?.(o.roomId)}
                    className="mt-4 inline-block border border-navy px-6 py-3 text-sm tracking-wider text-navy hover:bg-navy hover:text-ivory"
                  >
                    Check availability
                    <span className="sr-only"> for {o.title}</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}