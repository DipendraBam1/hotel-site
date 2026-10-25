export const experiences = [
  {
    id: 'dining',
    layout: 'split',
    eyebrow: 'Dining',
    title: 'The Orchard Table',
    body:
      'One kitchen, one short menu that changes with the week. Vegetables, dairy and honey come from farms within an hour of the lake, and bread is baked each morning.',
    details: [
      { label: 'Breakfast', value: '7:30 to 10:30 AM' },
      { label: 'Dinner', value: '7:00 to 10:00 PM' },
      { label: 'Seating', value: 'Twelve tables, by reservation' },
    ],
    cta: { label: 'Reserve a table', href: '#enquiry' },
    image: '/images/dining.jpg',
    alt: 'A set dining table with plates and glassware by a window',
  },
  {
    id: 'wellness',
    layout: 'offset',
    eyebrow: 'Wellness',
    title: 'The Stone Room',
    body:
      'A small spa built from local stone, with a wood-fired sauna and two treatment rooms. Appointments are limited so the space stays quiet.',
    details: [
      { label: 'Massage', value: '60 or 90 minutes' },
      { label: 'Sauna and plunge', value: '45 minutes' },
      { label: 'Morning yoga', value: '7:00 AM, on the terrace' },
    ],
    cta: { label: 'Ask about treatments', href: '#enquiry' },
    image: '/images/spa.jpg',
    alt: 'Folded towels and smooth stones on a wooden shelf in the spa',
  },
];