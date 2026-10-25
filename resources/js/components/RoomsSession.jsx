import RoomCard from './RoomCard';
import { rooms } from '../data/rooms';

export default function RoomsSection({ onSelectRoom }) {
    return (
    <section id="rooms" aria-labelledby="rooms-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-12">
        <div className="max-w-[52ch]">
          <p className="text-xs uppercase tracking-[0.14em] text-brass">Where you will stay</p>
          <h2 id="rooms-title" className="mt-3 text-4xl md:text-5xl">Rooms &amp; Suites</h2>
          <p className="mt-4 text-stone">
            Twelve rooms in three kinds, each with a view of either the lake or the garden.
          </p>
        </div>

        <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
          {rooms.map((room, i) => (
<RoomCard key={room.id} room={room} reverse={i % 2 === 1} onSelect={onSelectRoom} />          ))}
        </div>
      </div>
    </section>
  );
}