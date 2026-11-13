// DEMO ONLY. These credentials are public on purpose and protect nothing.
// Real sign-in must be handled by Laravel (hashed passwords, sessions, middleware).
export const DEMO_ADMIN = {
  email: 'hoteladmin@gmail.com',
  password: 'admin@123',
};

const KEY = 'alderhouse-demo-admin';

export function signIn(email, password) {
  const ok =
    email.trim().toLowerCase() === DEMO_ADMIN.email && password === DEMO_ADMIN.password;
  if (!ok) return false;
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    // storage blocked: fall through to the check below
  }
  return isSignedIn();
}

export function isSignedIn() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function signOut() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
}