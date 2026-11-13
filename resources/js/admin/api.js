import { sampleEnquiries } from '../data/adminSample';
import { validateRecord } from './validate';

/*
 * DEMO DATA LAYER. Everything is in memory and resets on refresh.
 * To connect Laravel, replace each method body with a fetch() call:
 *
 *   list()          GET    /api/admin/{key}
 *   create(record)  POST   /api/admin/{key}
 *   update(id, r)   PATCH  /api/admin/{key}/{id}
 *   remove(id)      DELETE /api/admin/{key}/{id}
 *
 * Keep the return shapes and the error shape ({ message, errors })
 * and the screens will not need to change.
 */

const DELAY = 300;
const respond = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), DELAY));
const fail = (message, errors) =>
  Promise.reject(Object.assign(new Error(message), { errors }));

const slug = (text) =>
  String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export function createCrudApi(config) {
  let items = structuredClone(config.seed);

  return {
    list: () => respond(items),

    create(record) {
      const errors = validateRecord(config.fields, record);
      if (Object.keys(errors).length) return fail('Validation failed.', errors);
      const base = slug(record[config.titleField]) || config.key;
      let id = base;
      let n = 2;
      while (items.some((i) => i.id === id)) id = `${base}-${n++}`;
      const created = { ...record, id };
      items = [...items, created];
      return respond(created);
    },

    update(id, record) {
      if (!items.some((i) => i.id === id)) return fail('Record not found.');
      const errors = validateRecord(config.fields, record);
      if (Object.keys(errors).length) return fail('Validation failed.', errors);
      const updated = { ...items.find((i) => i.id === id), ...record, id };
      items = items.map((i) => (i.id === id ? updated : i));
      return respond(updated);
    },

    remove(id) {
      if (!items.some((i) => i.id === id)) return fail('Record not found.');
      items = items.filter((i) => i.id !== id);
      return respond({ id });
    },
  };
}

let enquiries = sampleEnquiries.map((e) => ({ ...e, read: false }));

export const enquiriesApi = {
  list: () => respond(enquiries),
  setRead(id, read) {
    if (!enquiries.some((e) => e.id === id)) return fail('Enquiry not found.');
    enquiries = enquiries.map((e) => (e.id === id ? { ...e, read } : e));
    return respond(enquiries.find((e) => e.id === id));
  },
};