import Async from '../Async';
import { BarList, ChartCard, ColumnChart, LineChart } from '../charts';
import { analyticsApi } from '../api';
import { formatMoney, formatMoneyCompact } from '../format';
import { getResource, resources } from '../registry';
import useResource from '../useResource';

const roomsApi = getResource('rooms').api;
const kpiIcons = {
  revenue: 'M17 7a4 4 0 0 0-8 1v4m-3 0h7m-7 6h12m-9-6v4c0 1.5-1 2-3 2',
  bookings: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  occupancy: 'M3 18V7M3 14h18v4M3 11h8a3 3 0 0 1 3 3',
  enquiries: 'M4 6h16v12H4zM4 7l8 6 8-6',
};
function KpiIcon({ name }) {
  return (
    <span className="flex h-11 w-11 shrink-0 rounded items-center justify-center bg-ivory-deep text-navy">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={kpiIcons[name]} />
      </svg>
    </span>
  );
}
const loadContent = () =>
  Promise.all(
    resources.map((r) =>
      r.api.list().then((list) => ({
        key: r.key,
        label: r.label,
        total: list.length,
        shown: list.filter((i) => i.active ?? i.onSale ?? true).length,
      }))
    )
  );

const percentChange = (series) => {
  const prev = series.at(-2);
  return prev ? ((series.at(-1) - prev) / prev) * 100 : null;
};

function Kpi({ icon, label, value, delta, note, tag }) {
  return (
    <div className="flex gap-4 border border-stone-light bg-white p-5">
      <KpiIcon name={icon} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-stone">{label}</p>
          <span className="text-xs uppercase tracking-[0.12em] text-brass">{tag}</span>
        </div>
        <p className="mt-1 font-display text-4xl">{value}</p>
        <p className="mt-1 text-sm text-stone">
          {delta != null
            ? `${delta >= 0 ? 'Up' : 'Down'} ${Math.abs(delta).toFixed(1)}% on last month`
            : note}
        </p>
      </div>
    </div>
  );
}

export default function Dashboard({ enquiries, navigate }) {
  const rooms = useResource(roomsApi.list);
  const analytics = useResource(analyticsApi.get);
  const content = useResource(loadContent);
  const go = (to) => (e) => {
    e.preventDefault();
    navigate(to);
  };

  const unreadCount = enquiries.data ? enquiries.data.filter((e) => !e.read).length : null;

  return (
    <>
      <p className="text-xs uppercase tracking-[0.14em] text-brass">Overview</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Dashboard</h1>
      <p className="mt-4 max-w-[64ch] text-stone">
        Figures marked “Sample data” are invented for this demonstration. Everything else comes
        from the lists you manage in this admin.
      </p>

      <Async resource={analytics}>
        {(a) => {
          const occupancyValues = Object.values(a.occupancy);
          const occupancy = occupancyValues.length
            ? Math.round(occupancyValues.reduce((s, v) => s + v, 0) / occupancyValues.length)
            : 0;
          const peak = Math.max(...a.weekly);

          return (
            <>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Kpi icon="revenue"
                  label="Revenue this month"
                  value={formatMoney(a.revenue.at(-1))}
                  delta={percentChange(a.revenue)}
                  tag="Sample"
                />
                <Kpi icon="bookings"
                  label="Bookings this month"
                  value={a.bookings.at(-1)}
                  delta={percentChange(a.bookings)}
                  tag="Sample"
                />
                <Kpi icon="occupancy"
                  label="Average occupancy"
                  value={`${occupancy}%`}
                  note={`Average stay ${a.averageStay} nights`}
                  tag="Sample"
                />
                <Kpi icon="enquiries"
                  label="Unread enquiries"
                  value={unreadCount ?? '…'}
                  note="Waiting for a reply"
                  tag="Live"
                />
              </div>

              <div className="mt-8 grid gap-6">
                <ChartCard
                  title="Revenue by month"
                  description="Room revenue for each of the last six months. The current month is in brass."
                  table={{
                    caption: 'Revenue by month',
                    headers: ['Month', 'Revenue'],
                    rows: a.months.map((m, i) => [m, formatMoney(a.revenue[i])]),
                  }}
                >
                  <ColumnChart labels={a.months} values={a.revenue} format={formatMoneyCompact} />
                </ChartCard>

                <Async resource={rooms}>
                  {(roomList) => {
                    const items = roomList.map((r) => {
                      const value = a.occupancy[r.id] ?? null;
                      return {
                        label: r.name,
                        value,
                        display: value === null ? 'No sample data' : `${value}%`,
                      };
                    });
                    return (
                      <ChartCard
                        title="Occupancy by room type"
                        description="Share of available nights that were booked."
                        table={{
                          caption: 'Occupancy by room type',
                          headers: ['Room', 'Occupancy'],
                          rows: items.map((i) => [i.label, i.display]),
                        }}
                      >
                        <BarList items={items} />
                      </ChartCard>
                    );
                  }}
                </Async>

                {/* <Async resource={enquiries}>
                  {(list) => {
                    const counts = list.reduce((acc, e) => {
                      acc[e.topic] = (acc[e.topic] ?? 0) + 1;
                      return acc;
                    }, {});
                    const items = Object.entries(counts)
                      .sort((x, y) => y[1] - x[1])
                      .map(([label, value]) => ({ label, value, display: String(value) }));
                    return (
                      <ChartCard
                        title="Enquiries by topic"
                        description="What guests are writing to you about."
                        tag="From enquiries"
                        table={{
                          caption: 'Enquiries by topic',
                          headers: ['Topic', 'Enquiries'],
                          rows: items.length ? items.map((i) => [i.label, i.display]) : [['None', '0']],
                        }}
                      >
                        {items.length ? (
                          <BarList items={items} />
                        ) : (
                          <p className="text-sm text-stone">No enquiries yet.</p>
                        )}
                      </ChartCard>
                    );
                  }}
                </Async> */}
              </div>
            </>
          );
        }}
      </Async>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Async resource={content}>
          {(items) => (
            <section
              aria-labelledby="content-title"
              className="border border-stone-light bg-white p-5 md:p-6"
            >
              <h2 id="content-title" className="text-2xl">Website content</h2>
              <p className="mt-1 text-sm text-stone">What guests can currently see.</p>
              <ul className="mt-4 divide-y divide-stone-light border-t border-stone-light">
                {items.map((i) => (
                  <li key={i.key} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="font-medium">{i.label}</p>
                      <p className="text-sm text-stone">
                        {i.shown} of {i.total} shown
                        {i.total - i.shown > 0 ? `, ${i.total - i.shown} hidden` : ''}
                      </p>
                    </div>
                    <a
                      href={`/hotel-admin/${i.key}`}
                      onClick={go(`/hotel-admin/${i.key}`)}
                      className="border-b border-navy text-sm text-navy hover:text-brass"
                    >
                      Manage<span className="sr-only"> {i.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Async>

        <Async resource={enquiries}>
          {(list) => (
            <section
              aria-labelledby="recent-title"
              className="border border-stone-light bg-white p-5 md:p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2 id="recent-title" className="text-2xl">Latest enquiries</h2>
                <a
                  href="/hotel-admin/enquiries"
                  onClick={go('/hotel-admin/enquiries')}
                  className="border-b border-navy text-sm text-navy hover:text-brass"
                >
                  View all enquiries
                </a>
              </div>
              <ul className="mt-4 divide-y divide-stone-light border-t border-stone-light">
                {list.slice(0, 3).map((e) => (
                  <li key={e.id} className="py-3">
                    <p>
                      <span className="font-medium">{e.name}</span>
                      {!e.read && (
                        <span className="ml-3 border border-brass px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-brass">
                          New
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-stone">
                      {e.topic} · {e.received}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Async>
      </div>
    </>
  );
}