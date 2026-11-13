import { experiences } from '../../data/experiences';

const layouts = [
  { value: 'split', label: 'Dark band: text left, wide image right' },
  { value: 'offset', label: 'Light: tall image left, text right' },
];

export default {
  key: 'experiences',
  label: 'Dining and wellness',
  singular: 'experience',
  plural: 'experiences',
  icon: 'utensils',
  description:
    'The dining and wellness sections on the public site, such as the Orchard Table and the Stone Room.',
  titleField: 'title',
  searchable: ['title', 'eyebrow', 'body'],

  seed: experiences.map(({ cta, ...e }) => ({
    ...e,
    ctaLabel: cta.label,
    ctaHref: cta.href,
    active: true,
  })),

  columns: [
    { key: 'title', label: 'Experience' },
    { key: 'eyebrow', label: 'Category' },
    {
      key: 'layout',
      label: 'Layout',
      render: (r) => layouts.find((l) => l.value === r.layout)?.label ?? r.layout,
    },
    { key: 'active', label: 'Status', render: (r) => (r.active ? 'Shown' : 'Hidden') },
  ],

  fields: [
    {
      name: 'eyebrow', label: 'Category label', type: 'text', required: true, maxLength: 30,
      hint: 'The short label above the title, for example Dining.',
    },
    { name: 'title', label: 'Title', type: 'text', required: true, maxLength: 60 },
    { name: 'body', label: 'Description', type: 'textarea', required: true, maxLength: 500 },
    {
      name: 'details', label: 'Details', type: 'pairs', required: true, maxItems: 5, maxLength: 80,
      hint: 'One per line as Label: Value, for example “Breakfast: 7:30 to 10:30 AM”. Up to 5 lines.',
    },
    { name: 'ctaLabel', label: 'Button text', type: 'text', required: true, maxLength: 30 },
    {
      name: 'ctaHref', label: 'Button link', type: 'text', required: true, maxLength: 100,
      hint: 'For example #enquiry to scroll to the enquiry form.',
      validate: (v) =>
        v.startsWith('#') || v.startsWith('/') ? '' : 'The link must start with # or /.',
    },
    {
      name: 'layout', label: 'Layout', type: 'select', required: true, options: layouts,
      hint: 'Use different layouts for neighbouring sections so the page does not repeat itself.',
    },
    {
      name: 'image', label: 'Image path', type: 'text', required: true, maxLength: 200,
      hint: 'For example /images/dining.jpg. File upload will come with the backend.',
      validate: (v) => (v.startsWith('/images/') ? '' : 'The path must start with /images/.'),
    },
    {
      name: 'alt', label: 'Image description (alt text)', type: 'textarea', required: true, maxLength: 200,
      hint: 'Describe what the photo shows, for people who cannot see it.',
    },
    { name: 'active', label: 'Show on the public site', type: 'checkbox', default: true },
  ],
};