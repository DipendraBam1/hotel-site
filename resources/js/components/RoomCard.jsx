const money = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
});

export default function RoomCard({ room, reverse }) {
  return (
    <article className="grid items-center gap-6 md:grid-cols-12 md:gap-10">
      <img
        src={room.image}
        alt={room.alt}
        width="1200"
        height="900"
        loading="lazy"
        decoding="async"
        className={`aspect-[4/3] w-full object-cover md:col-span-7 ${
          reverse ? 'md:order-2' : ''
        }`}
      />

      <div className={`md:col-span-5 ${reverse ? 'md:order-1' : ''}`}>
        <p className="text-xs uppercase tracking-[0.14em] text-brass">
          {room.size} · {room.bed} · Sleeps {room.capacity}
        </p>
        <h3 className="mt-3 text-4xl">{room.name}</h3>
        <p className="mt-4 max-w-[40ch] text-stone">{room.description}</p>

        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-stone-light pt-6 text-sm">
          {room.amenities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <p>
            <span className="font-display text-3xl">{money.format(room.pricePerNight)}</span>
            <span className="text-sm text-stone"> per night</span>
          </p>
          <a
            href="#availability"
            className="border border-navy px-6 py-3 text-sm tracking-wider text-navy hover:bg-navy hover:text-ivory"
          >
            Check availability
            <span className="sr-only"> for {room.name}</span>
          </a>
        </div>
      </div>
    </article>
  );
}