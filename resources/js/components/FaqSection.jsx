import { faqs } from '../data/hotel';

export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 md:grid-cols-12 md:px-12">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.14em] text-brass">Before you book</p>
          <h2 id="faq-title" className="mt-3 text-4xl md:text-5xl">Common questions</h2>
        </div>

        <div className="border-t border-stone md:col-span-7 md:col-start-6">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-stone-light">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-2xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-brass">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="max-w-[56ch] pb-6 text-stone">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}