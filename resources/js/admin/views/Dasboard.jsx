import Async from '../Async';
import { formatMoney } from '../format';
import { getResource } from '../registry';
import useResource from '../useResource';
const roomsApi = getResource('rooms').api;

export default function Dashboard({ enquiries, navigate }) {
    const rooms = useResource(roomsApi.list);

  return (
    <>
      <p className="text-xs uppercase tracking-[0.14em] text-brass">Overview</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Dashboard</h1>

      <Async resource={rooms}>
        {(roomList) => (
          <Async resource={enquiries}>
            {(enquiryList) => {
              const onSale = roomList.filter((r) => r.onSale).length;
              const unread = enquiryList.filter((e) => !e.read);
              const average = roomList.length
                ? Math.round(roomList.reduce((s, r) => s + r.pricePerNight, 0) / roomList.length)
                : 0;

              return (
                <>
                  <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                    <div className="border-t border-stone pt-4">
                      <dt className="text-sm text-stone">Room types on sale</dt>
                      <dd className="mt-1 font-display text-5xl">
                        {onSale} <span className="text-2xl text-stone">of {roomList.length}</span>
                      </dd>
                    </div>
                    <div className="border-t border-stone pt-4">
                      <dt className="text-sm text-stone">Unread enquiries</dt>
                      <dd className="mt-1 font-display text-5xl">{unread.length}</dd>
                    </div>
                    <div className="border-t border-stone pt-4">
                      <dt className="text-sm text-stone">Average nightly rate</dt>
                      <dd className="mt-1 font-display text-5xl">{formatMoney(average)}</dd>
                    </div>
                  </dl>

                  <section aria-labelledby="recent-title" className="mt-14">
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <h2 id="recent-title" className="text-3xl">Latest enquiries</h2>
                      <a
                        href="/hotel-admin/enquiries"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/hotel-admin/enquiries');
                        }}
                        className="border-b border-navy text-sm text-navy hover:text-brass"
                      >
                        View all enquiries
                      </a>
                    </div>
                    <ul className="mt-4 border-t border-stone">
                      {enquiryList.slice(0, 3).map((e) => (
                        <li
                          key={e.id}
                          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-stone-light py-4"
                        >
                          <p>
                            <span className="font-medium">{e.name}</span>
                            <span className="text-stone"> · {e.topic}</span>
                            {!e.read && (
                              <span className="ml-3 border border-brass px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-brass">
                                New
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-stone">{e.received}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              );
            }}
          </Async>
        )}
      </Async>
    </>
  );
}