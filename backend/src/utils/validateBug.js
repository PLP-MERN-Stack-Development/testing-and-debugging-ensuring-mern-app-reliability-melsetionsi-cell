function validateBug(data) {
  const errors = [];
  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }
  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }
  if (!data.reportedBy || data.reportedBy.trim() === '') {
    errors.push('Reporter name is required');
  }
  return { isValid: errors.length === 0, errors };
}

module.exports = { validateBug };