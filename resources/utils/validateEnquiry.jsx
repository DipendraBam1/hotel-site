export const ENQUIRY_LIMITS = { messageMin: 10, messageMax: 500 };

export const topics = [
  'Room booking',
  'Dining reservation',
  'Spa and wellness',
  'Transfers and travel',
  'Something else',
];

export function validateEnquiry({ name, email, phone, topic, message }) {
  const errors = {};

  if (!name.trim()) errors.name = 'Enter your name.';

  if (!email.trim()) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
    errors.email = 'Enter a valid email address, for example name@example.com.';

  if (phone.trim()) {
    const digits = phone.replace(/[\s()+-]/g, '');
    if (!/^\d{7,15}$/.test(digits))
      errors.phone = 'Enter a phone number with 7 to 15 digits, or leave it empty.';
  }

  if (!topic) errors.topic = 'Choose what your enquiry is about.';

  const len = message.trim().length;
  if (len < ENQUIRY_LIMITS.messageMin)
    errors.message = `Write at least ${ENQUIRY_LIMITS.messageMin} characters so we can help.`;
  else if (len > ENQUIRY_LIMITS.messageMax)
    errors.message = `Keep your message under ${ENQUIRY_LIMITS.messageMax} characters.`;

  return errors;
}