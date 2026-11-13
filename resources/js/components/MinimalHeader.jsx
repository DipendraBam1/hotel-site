import { hotel } from '../data/hotel';

export default function MinimalHeader() {
  return (
    <header className="border-b border-stone-light bg-ivory">
      <div className="mx-auto flex min-h-[72px] max-w-[1200px] items-center justify-between gap-6 px-5 md:px-12">
        <a href="/" className="font-display text-3xl tracking-wide">{hotel.name}</a>
        <a href="/" className="text-sm tracking-wider hover:text-brass">Back to site</a>
      </div>
    </header>
  );
}