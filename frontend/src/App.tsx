import React, { useState, useEffect } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import { fetchBugs } from './services/api';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBugs = async () => {
    try {
      const res = await fetchBugs();
      setBugs(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load bugs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBugs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bug Tracker</h1>
      <BugForm onBugAdded={loadBugs} />
      <h2>Reported Bugs</h2>
      <BugList bugs={bugs} onUpdate={loadBugs} />
    </div>
  );
}

export default App;