import { faqs } from '../../data/hotel';

export default {
  key: 'faqs',
  label: 'FAQ',
  singular: 'question',
  plural: 'questions',
  icon: 'help',
  description:
    'Questions and answers shown in the “Common questions” section of the public site. Position sets the order, starting from 1.',
  titleField: 'question',
  searchable: ['question', 'answer'],
  sortBy: 'position',

  seed: faqs.map((f, i) => ({
    id: `faq-${i + 1}`,
    question: f.q,
    answer: f.a,
    position: i + 1,
    active: true,
  })),

  columns: [
    { key: 'question', label: 'Question' },
    { key: 'position', label: 'Position' },
    { key: 'active', label: 'Status', render: (r) => (r.active ? 'Shown' : 'Hidden') },
  ],

  fields: [
    {
      name: 'question', label: 'Question', type: 'text', required: true, maxLength: 120,
      validate: (v) => (v.endsWith('?') ? '' : 'End the question with a question mark.'),
    },
    {
      name: 'answer', label: 'Answer', type: 'textarea', required: true, maxLength: 600,
      hint: 'Keep it short and factual. Do not promise anything the hotel cannot confirm.',
    },
    {
      name: 'position', label: 'Position', type: 'number', required: true, min: 1, max: 99,
      hint: 'Questions are shown from the lowest number to the highest.',
    },
    { name: 'active', label: 'Show on the public site', type: 'checkbox', default: true },
  ],
};