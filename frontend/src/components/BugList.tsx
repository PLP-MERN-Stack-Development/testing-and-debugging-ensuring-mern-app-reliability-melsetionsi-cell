import React from 'react';
import { updateBug, deleteBug } from '../services/api';

interface Bug {
  _id: string;
  title: string;
  status: string;
  reportedBy: string;
}

const BugList: React.FC<{ bugs: Bug[]; onUpdate: () => void }> = ({ bugs, onUpdate }) => {
  const handleStatusChange = async (id: string, status: string) => {
    await updateBug(id, { status });
    onUpdate();
  };

  const handleDelete = async (id: string) => {
    await deleteBug(id);
    onUpdate();
  };

  return (
    <div>
      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        bugs.map(bug => (
          <div key={bug._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{bug.title}</h3>
            <p><strong>Status:</strong>
              <select
                value={bug.status}
                onChange={e => handleStatusChange(bug._id, e.target.value)}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </p>
            <p><strong>Reported by:</strong> {bug.reportedBy}</p>
            <button onClick={() => handleDelete(bug._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default BugList;