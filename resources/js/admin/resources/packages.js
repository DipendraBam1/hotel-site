import { offers } from '../../data/offers';

export default {
  key: 'packages',
  label: 'Packages',
  singular: 'package',
  plural: 'packages',
  icon: 'tag',
  description:
    'Stay packages shown on the public site. The price shown to guests is the room rate multiplied by the number of nights.',
  titleField: 'title',
  searchable: ['title', 'description'],
  lookups: ['rooms'],

  seed: offers.map((o) => ({ ...o, active: true })),

  columns: [
    { key: 'title', label: 'Package' },
    {
      key: 'roomId',
      label: 'Room',
      render: (r, lookups) => lookups.rooms?.find((x) => x.id === r.roomId)?.name ?? 'Room removed',
    },
    { key: 'nights', label: 'Nights' },
    { key: 'active', label: 'Status', render: (r) => (r.active ? 'Shown' : 'Hidden') },
  ],

  fields: [
    { name: 'title', label: 'Title', type: 'text', required: true, maxLength: 60 },
    {
      name: 'roomId', label: 'Room', type: 'select', required: true,
      optionsFrom: { resource: 'rooms', value: 'id', label: 'name' },
      hint: 'The package price is based on this room’s nightly rate.',
    },
    { name: 'nights', label: 'Nights', type: 'number', required: true, min: 1, max: 30 },
    { name: 'description', label: 'Description', type: 'textarea', required: true, maxLength: 300 },
    {
      name: 'includes', label: 'What is included', type: 'lines',
      required: true, maxItems: 6, maxLength: 80, hint: 'One item per line, up to 6.',
    },
    { name: 'active', label: 'Show on the public site', type: 'checkbox', default: true },
  ],
};