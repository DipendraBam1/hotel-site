import { hotel } from '../data/hotel';

export default function HotelHero() {
  return (
    <section aria-labelledby="hero-title" className="py-10">
      <div className="mx-auto grid max-w-[1200px] items-center gap-6 px-5 md:grid-cols-[5fr_6fr] md:gap-16 md:px-12">
        <div className="md:order-1">
          <p className="mb-4 text-xs uppercase tracking-[0.14em] text-brass">Bhimtal, Uttarakhand</p>
          <h1 id="hero-title" className="text-[clamp(2.5rem,5vw,4.25rem)]">{hotel.tagline}</h1>
          <p className="my-6 max-w-[34ch] text-stone">{hotel.intro}</p>
          <a href="#availability"
             className="inline-block bg-navy px-7 py-3.5 text-sm tracking-wider text-ivory hover:bg-charcoal">
            Check Availability
          </a>
        </div>
        <img
          src="/images/hero.jpg"
          alt="Lakeside facade of Alder House at dusk with lit windows"
          width="900" height="1100" fetchPriority="high"
          className="order-first aspect-[4/3] w-full object-cover md:order-2 md:aspect-[4/4.2] md:max-h-[560px]"
        />
      </div>
    </section>
  );
}