
import { hotel, guestInfo } from '../data/hotel';

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  hotel.address
)}`;

function MapPlaceholder() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 600 450"
        role="img"
        aria-label="Illustrative map showing Alder House beside the lake, off Lakeview Road"
        className="aspect-[4/3] w-full border border-stone-light"
      >
        <rect width="600" height="450" className="fill-ivory-deep" />
        {/* lake */}
        <polygon points="330,0 600,0 600,300 470,340 380,250 350,130" className="fill-stone-light" />
        {/* roads */}
        <g className="stroke-stone" strokeWidth="2" fill="none">
          <path d="M0 330 L220 300 L330 360 L600 420" />
          <path d="M220 300 L200 450" strokeWidth="1.5" />
          <path d="M120 0 L150 180 L220 300" strokeWidth="1.5" />
        </g>
        {/* pin */}
        <g transform="translate(262 262)">
          <circle r="20" className="fill-navy" />
          <circle r="7" className="fill-ivory" />
        </g>
        <text x="292" y="262" className="fill-charcoal" fontSize="18" fontFamily="Inter, sans-serif">
          Alder House
        </text>
        <text x="410" y="170" className="fill-charcoal" fontSize="16" fontFamily="Inter, sans-serif">
          Bhimtal lake
        </text>
        <text x="30" y="318" className="fill-charcoal" fontSize="14" fontFamily="Inter, sans-serif">
          Lakeview Road
        </text>
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-stone">
        <span>Illustration only, not to scale.</span>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-navy text-navy hover:text-brass"
        >
          Open in Maps
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}

export default function LocationInfo() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.14em] text-brass">Find us</p>
          <h2 id="contact-title" className="mt-3 text-4xl md:text-5xl">Location &amp; contact</h2>

          <address className="mt-6 not-italic leading-relaxed text-stone">
            {hotel.name}
            <br />
            {hotel.address}
          </address>

          <p className="mt-4">
            <a href={`tel:${hotel.phone.replace(/\s/g, '')}`} className="block hover:text-brass">
              {hotel.phone}
            </a>
            <a href={`mailto:${hotel.email}`} className="block hover:text-brass">
              {hotel.email}
            </a>
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-stone-light py-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-stone">Check-in</dt>
              <dd className="mt-1 font-display text-3xl">{hotel.checkIn}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-stone">Check-out</dt>
              <dd className="mt-1 font-display text-3xl">{hotel.checkOut}</dd>
            </div>
          </dl>

          <h3 className="mt-8 text-2xl">Good to know</h3>
          <dl className="mt-3">
            {guestInfo.map((g) => (
              <div key={g.label} className="border-b border-stone-light py-3 text-sm">
                <dt className="font-medium">{g.label}</dt>
                <dd className="mt-1 text-stone">{g.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <MapPlaceholder />
        </div>
      </div>
    </section>
  );
}