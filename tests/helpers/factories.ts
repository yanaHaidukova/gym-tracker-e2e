export type UserRole = 'admin' | 'user';

export interface UserOverrides {
  fullName?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

export function createUser(overrides: UserOverrides = {}) {
  const timestamp = Date.now();
  return {
    fullName: `Test User ${timestamp}`,
    email: `test+${timestamp}@example.com`,
    password: 'Password*123',
    role: 'user' as UserRole,
    ...overrides
  };
}