const { validateBug } = require('../../src/utils/validateBug');

test('validates bug correctly', () => {
  const valid = { title: 'App crash', description: 'It crashes on login', reportedBy: 'John' };
  expect(validateBug(valid).isValid).toBe(true);

  const invalid = { title: 'A', description: 'short', reportedBy: '' };
  const result = validateBug(invalid);
  expect(result.isValid).toBe(false);
  expect(result.errors.length).toBe(3);
});