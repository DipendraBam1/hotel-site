export default function ExperienceSection({ experience }) {
  const { id, layout, eyebrow, title, body, details, cta, image, alt } = experience;
  const split = layout === 'split';

  const text = (
    <div className={split ? 'md:col-span-5' : 'md:col-span-6 md:col-start-7 md:row-start-1'}>
      <p className={`text-xs uppercase tracking-[0.14em] ${split ? 'text-brass-light' : 'text-brass'}`}>
        {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="mt-3 text-4xl md:text-5xl">{title}</h2>
      <p className={`mt-5 max-w-[44ch] ${split ? 'text-ivory/85' : 'text-stone'}`}>{body}</p>

      <dl className={`mt-8 border-t ${split ? 'border-ivory/25' : 'border-stone-light'}`}>
        {details.map((d) => (
          <div
            key={d.label}
            className={`flex justify-between gap-6 border-b py-3 text-sm ${
              split ? 'border-ivory/25' : 'border-stone-light'
            }`}
          >
            <dt className={split ? 'text-ivory/85' : 'text-stone'}>{d.label}</dt>
            <dd className="text-right">{d.value}</dd>
          </div>
        ))}
      </dl>

      <a
        href={cta.href}
        className={`mt-8 inline-block border px-6 py-3 text-sm tracking-wider ${
          split
            ? 'border-ivory text-ivory hover:bg-ivory hover:text-navy'
            : 'border-navy text-navy hover:bg-navy hover:text-ivory'
        }`}
      >
        {cta.label}
      </a>
    </div>
  );

  const picture = split ? (
    <img
      src={image}
      alt={alt}
      width="1400"
      height="1120"
      loading="lazy"
      decoding="async"
      className="aspect-[5/4] w-full object-cover md:col-span-7"
    />
  ) : (
    <img
      src={image}
      alt={alt}
      width="900"
      height="1200"
      loading="lazy"
      decoding="async"
      className="aspect-[3/4] w-full object-cover md:col-span-5 md:row-start-1 md:mt-24"
    />
  );

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={split ? 'bg-navy py-16 text-ivory md:py-24' : 'py-16 md:py-24'}
    >
      <div className="mx-auto grid max-w-[1200px] items-start gap-8 px-5 md:grid-cols-12 md:gap-12 md:px-12">
        {split ? (
          <>
            {text}
            {picture}
          </>
        ) : (
          <>
            {picture}
            {text}
          </>
        )}
      </div>
    </section>
  );
}