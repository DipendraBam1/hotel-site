import { rooms as seedRooms } from '../../data/rooms';
import { formatMoney } from '../format';

export default {
  key: 'rooms',
  label: 'Rooms and suites',
  singular: 'room',
  plural: 'rooms',
  icon: 'rooms',
  description: 'The rooms shown on the public site, with their rates and whether they are on sale.',
  titleField: 'name',
  searchable: ['name', 'description', 'bed'],

  seed: seedRooms.map(({ demoUnavailable, ...room }) => ({ ...room, onSale: !demoUnavailable })),

  columns: [
    { key: 'name', label: 'Room' },
    { key: 'capacity', label: 'Sleeps' },
    { key: 'pricePerNight', label: 'Rate per night', render: (r) => formatMoney(r.pricePerNight) },
    { key: 'onSale', label: 'Status', render: (r) => (r.onSale ? 'On sale' : 'Off sale') },
  ],

  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, maxLength: 60 },
    { name: 'description', label: 'Description', type: 'textarea', required: true, maxLength: 300 },
    { name: 'size', label: 'Size', type: 'text', required: true, maxLength: 20, hint: 'For example 38 m²' },
    { name: 'bed', label: 'Bed', type: 'text', required: true, maxLength: 40 },
    { name: 'capacity', label: 'Sleeps', type: 'number', required: true, min: 1, max: 12 },
    { name: 'pricePerNight', label: 'Rate per night (£)', type: 'number', required: true, min: 1, max: 5000 },
    { name: 'amenities', label: 'Amenities', type: 'lines', required: true, maxItems: 8, maxLength: 40, hint: 'One amenity per line, up to 8.' },
    {
      name: 'image', label: 'Image path', type: 'text', required: true, maxLength: 200,
      hint: 'For example /images/rooms/garden-room.jpg. File upload will come with the backend.',
      validate: (v) => (v.startsWith('/images/') ? '' : 'The path must start with /images/.'),
    },
    { name: 'alt', label: 'Image description (alt text)', type: 'textarea', required: true, maxLength: 200, hint: 'Describe what the photo shows, for people who cannot see it.' },
    { name: 'onSale', label: 'On sale (shown as bookable)', type: 'checkbox', default: true },
  ],
};