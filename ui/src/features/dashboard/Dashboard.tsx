import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';

const Dashboard: React.FC = () => {
  const [search, setSearch] = useState('');
  const [simulations, setSimulations] = useState<{id: number, name: string, owner: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const user = { username: 'johndoe' };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimulations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/simulations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        });
        const data = await res.json();
        setSimulations(data);
      } catch {
        setSimulations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSimulations();
  }, []);

  const filtered = simulations.filter(sim =>
    sim.name.toLowerCase().includes(search.toLowerCase()) ||
    sim.owner.toLowerCase().includes(search.toLowerCase()) ||
    String(sim.id).includes(search)
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span><b>User:</b> {user.username}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <button style={{ marginBottom: 16 }}>Create Simulation</button>
      <div style={{ marginBottom: 16 }}>
        <b>Simulations:</b>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table style={{ width: '100%', marginTop: 8, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>ID</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Name</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Owner</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Join</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(sim => (
                <tr key={sim.id}>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{sim.id}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{sim.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{sim.owner}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>
                    <button style={{ marginRight: 8 }}>Instructor</button>
                    <button>Team</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: 12 }}>
          <label>Search: </label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: 6, width: 200 }}
            placeholder="Search simulations..."
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;