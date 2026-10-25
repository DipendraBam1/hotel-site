import { useRef, useState } from 'react';
import { gallery } from '../data/gallery';

export default function GallerySection() {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(0);
  const total = gallery.length;
  const current = gallery[index];

  function open(i) {
    setIndex(i);
    dialogRef.current?.showModal();
  }
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  function onKeyDown(e) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  const navBtn =
    'flex h-12 w-12 items-center justify-center border border-ivory/60 text-2xl text-ivory hover:bg-ivory hover:text-navy';

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-12">
        <p className="text-xs uppercase tracking-[0.14em] text-brass">Gallery</p>
        <h2 id="gallery-title" className="mt-3 text-4xl md:text-5xl">A look around</h2>

        <ul className="mt-10 grid grid-cols-2 gap-3 md:auto-rows-[190px] md:grid-cols-12 md:gap-4">
          {gallery.map((g, i) => (
            <li key={g.src} className={`${i === 0 ? 'col-span-2' : ''} ${g.span}`}>
              <button
                type="button"
                onClick={() => open(i)}
                className="block h-full w-full overflow-hidden"
                aria-label={`Open photo ${i + 1} of ${total}: ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt=""
                  width="1600"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-full w-full object-cover transition-opacity hover:opacity-90 md:aspect-auto"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo gallery"
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current.close()}
        className="m-auto w-[min(94vw,64rem)] max-w-none bg-navy p-0 text-ivory backdrop:bg-charcoal/80"
      >
        <div className="p-4 md:p-6">
          <img
            src={current.src}
            alt={current.alt}
            className="mx-auto max-h-[68vh] w-full object-contain"
          />
          <div className="mt-4 flex items-center justify-between gap-4">
            <p aria-live="polite" className="text-sm text-ivory/85">
              Photo {index + 1} of {total}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={prev} className={navBtn} aria-label="Previous photo">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={next} className={navBtn} aria-label="Next photo">
                <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                onClick={() => dialogRef.current.close()}
                className="h-12 border border-ivory/60 px-5 text-sm tracking-wider hover:bg-ivory hover:text-navy"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
}