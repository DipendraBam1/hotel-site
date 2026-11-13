import { useCallback, useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import ResourcePage from './ResourcePage';
import Dashboard from './views/Dasboard';
import Enquiries from './views/Enquiries';
import { enquiriesApi } from './api';
import { resources } from './registry';
import useResource from './useResource';

const normalize = (p) => p.replace(/\/+$/, '') || '/';

export default function AdminPage() {
  const [path, setPath] = useState(() => normalize(window.location.pathname));
  const enquiries = useResource(enquiriesApi.list);

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback(
    (to) => {
      if (to === path) return;
      window.history.pushState({}, '', to);
      setPath(to);
      window.scrollTo(0, 0);
    },
    [path]
  );

  async function toggleRead(id, read) {
    const updated = await enquiriesApi.setRead(id, read);
    enquiries.setData((list) => list.map((e) => (e.id === id ? updated : e)));
  }

  const unread = enquiries.data ? enquiries.data.filter((e) => !e.read).length : 0;

  const nav = [
    { label: null, items: [{ path: '/hotel-admin', label: 'Dashboard', icon: 'dashboard' }] },
    {
      label: 'Website content',
      items: resources.map((r) => ({ path: `/hotel-admin/${r.key}`, label: r.label, icon: r.icon })),
    },
    {
      label: 'Guests',
      items: [{ path: '/hotel-admin/enquiries', label: 'Enquiries', icon: 'mail', badge: unread }],
    },
  ];

  const resource = resources.find((r) => path === `/hotel-admin/${r.key}`);

  let view;
  if (path === '/hotel-admin') {
    view = <Dashboard enquiries={enquiries} navigate={navigate} />;
  } else if (resource) {
    view = <ResourcePage key={resource.key} config={resource} />;
  } else if (path === '/hotel-admin/enquiries') {
    view = <Enquiries enquiries={enquiries} toggleRead={toggleRead} />;
  } else {
    view = (
      <>
        <h1 className="text-4xl md:text-5xl">Page not found</h1>
        <p className="mt-4 text-stone">There is no admin page at this address.</p>
        <a
          href="/hotel-admin"
          onClick={(e) => {
            e.preventDefault();
            navigate('/hotel-admin');
          }}
          className="mt-6 inline-block bg-navy px-6 py-3 text-sm tracking-wider text-ivory hover:bg-charcoal"
        >
          Go to the dashboard
        </a>
      </>
    );
  }

  return (
    <AdminLayout path={path} navigate={navigate} nav={nav}>
      {view}
    </AdminLayout>
  );
}