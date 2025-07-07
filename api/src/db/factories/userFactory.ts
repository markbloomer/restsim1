// Placeholder for user data factory

export function createUserData(overrides = {}) {
  return {
    email: 'user@example.com',
    username: 'testuser',
    password: 'hashedpassword',
    ...overrides,
  };
}