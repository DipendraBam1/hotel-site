import { useState } from 'react';
import Async from '../Async';

export default function Enquiries({ enquiries, toggleRead }) {
  const [filter, setFilter] = useState('all');

  return (
    <>
      <p className="text-xs uppercase tracking-[0.14em] text-brass">Inbox</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Enquiries</h1>

      <Async resource={enquiries}>
        {(list) => {
          const unread = list.filter((e) => !e.read).length;
          const shown = filter === 'unread' ? list.filter((e) => !e.read) : list;
          const filters = [
            ['all', `All (${list.length})`],
            ['unread', `Unread (${unread})`],
          ];

          return (
            <>
              <div className="mt-8 flex flex-wrap gap-3">
                {filters.map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={filter === key}
                    onClick={() => setFilter(key)}
                    className={`h-11 border px-5 text-sm tracking-wider ${
                      filter === key
                        ? 'border-navy bg-navy text-ivory'
                        : 'border-stone hover:border-navy'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {shown.length === 0 ? (
                <p className="mt-8 border-l-2 border-brass pl-4">No unread enquiries.</p>
              ) : (
                <ul className="mt-6 border-t border-stone">
                  {shown.map((e) => (
                    <li key={e.id} className="border-b border-stone-light py-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h2 className="text-2xl">
                          {e.name}
                          {!e.read && (
                            <span className="ml-3 border border-brass px-2 py-0.5 align-middle font-sans text-xs uppercase tracking-[0.12em] text-brass">
                              New
                            </span>
                          )}
                        </h2>
                        <p className="text-sm text-stone">{e.received}</p>
                      </div>
                      <p className="mt-1 text-sm text-stone">
                        {e.topic} · {e.email}
                      </p>
                      <p className="mt-3 max-w-[60ch]">{e.message}</p>
                      <button
                        type="button"
                        onClick={() => toggleRead(e.id, !e.read)}
                        className="mt-4 border border-navy px-5 py-2.5 text-sm tracking-wider text-navy hover:bg-navy hover:text-ivory"
                      >
                        {e.read ? 'Mark as unread' : 'Mark as read'}
                        <span className="sr-only"> ({e.name})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          );
        }}
      </Async>
    </>
  );
}