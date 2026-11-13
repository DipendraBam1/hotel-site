import { createElement } from 'react';
import { gallery } from '../../data/gallery';

export default {
  key: 'gallery',
  label: 'Gallery',
  singular: 'photo',
  plural: 'photos',
  icon: 'image',
  description:
    'Photos shown in the gallery on the public site. Position sets the order, starting from 1.',
  titleField: 'title',
  searchable: ['title', 'alt', 'src'],
  sortBy: 'position',

  seed: gallery.map((g, i) => ({
    id: `photo-${i + 1}`,
    title: `Photo ${i + 1}`,
    src: g.src,
    alt: g.alt,
    position: i + 1,
    active: true,
  })),

  columns: [
    {
      key: 'preview',
      label: 'Preview',
      render: (r) =>
        createElement('img', {
          src: r.src,
          alt: '',
          width: 64,
          height: 48,
          loading: 'lazy',
          className: 'h-12 w-16 object-cover',
        }),
    },
    { key: 'title', label: 'Photo' },
    { key: 'position', label: 'Position' },
    { key: 'active', label: 'Status', render: (r) => (r.active ? 'Shown' : 'Hidden') },
  ],

  fields: [
    {
      name: 'title', label: 'Title', type: 'text', required: true, maxLength: 60,
      hint: 'A name for this list only. Guests do not see it.',
    },
    {
      name: 'src', label: 'Image path', type: 'text', required: true, maxLength: 200,
      hint: 'For example /images/gallery/g1.jpg. File upload will come with the backend.',
      validate: (v) => (v.startsWith('/images/') ? '' : 'The path must start with /images/.'),
    },
    {
      name: 'alt', label: 'Image description (alt text)', type: 'textarea', required: true, maxLength: 200,
      hint: 'Describe what the photo shows, for people who cannot see it.',
    },
    {
      name: 'position', label: 'Position', type: 'number', required: true, min: 1, max: 99,
      hint: 'Photos are shown from the lowest number to the highest.',
    },
    { name: 'active', label: 'Show on the public site', type: 'checkbox', default: true },
  ],
};