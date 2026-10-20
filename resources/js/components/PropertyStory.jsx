import { story } from '../data/hotel';

export default function PropertyStory() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-ivory-deep py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <p className="text-xs uppercase tracking-[0.14em] text-brass">{story.eyebrow}</p>
            <h2 id="about-title" className="mt-3 text-4xl md:text-6xl">{story.title}</h2>
          </div>
          <div className="space-y-4 text-stone md:col-span-5 md:col-start-8 md:pt-8">
            {story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <img
          src={story.image}
          alt={story.alt}
          width="2000"
          height="800"
          loading="lazy"
          decoding="async"
          className="mt-12 aspect-[16/9] w-full object-cover md:mt-16 md:aspect-[5/2]"
        />

        <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-12">
          {story.facts.map((f) => (
            <div key={f.label} className="border-t border-stone pt-4">
              <dt className="order-2 text-sm text-stone">{f.label}</dt>
              <dd className="font-display text-5xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}