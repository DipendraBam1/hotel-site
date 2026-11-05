const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL.test(email.trim())) errors.email = 'Enter a valid email address, for example name@example.com.';
  if (!password) errors.password = 'Enter your password.';
  return errors;
}

export function validateSignup({ name, email, password, confirm, agree }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Enter your name.';

  if (!email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL.test(email.trim())) errors.email = 'Enter a valid email address, for example name@example.com.';

  if (password.length < 8) errors.password = 'Use at least 8 characters.';
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password))
    errors.password = 'Include at least one letter and one number.';

  if (!confirm) errors.confirm = 'Re-enter your password.';
  else if (confirm !== password) errors.confirm = 'The two passwords do not match.';

  if (!agree) errors.agree = 'Tick the box to confirm you understand this is a demonstration.';
  return errors;
}