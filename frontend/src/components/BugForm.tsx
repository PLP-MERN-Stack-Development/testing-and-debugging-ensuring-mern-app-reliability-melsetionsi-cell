import React, { useState } from 'react';
import { createBug } from '../services/api';

const BugForm: React.FC<{ onBugAdded: () => void }> = ({ onBugAdded }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', reportedBy: '', status: 'open'
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBug(formData);
      setFormData({ title: '', description: '', reportedBy: '', status: 'open' });
      setErrors([]);
      onBugAdded();
    } catch (err: any) {
      setErrors(err.response?.data?.errors || ['Failed to create bug']);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Your Name"
        value={formData.reportedBy}
        onChange={e => setFormData({ ...formData, reportedBy: e.target.value })}
      />
      <button type="submit">Report Bug</button>
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}
    </form>
  );
};

export default BugForm;