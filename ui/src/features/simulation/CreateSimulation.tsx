import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';

interface Team {
  name: string;
  password: string;
}

const CreateSimulation: React.FC = () => {
  const [name, setName] = useState('');
  const [numTeams, setNumTeams] = useState(2);
  const [teams, setTeams] = useState<Team[]>([
    { name: '', password: '' },
    { name: '', password: '' },
  ]);
  const [restaurantProfile, setRestaurantProfile] = useState('');
  const [marketModel, setMarketModel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNumTeamsChange = (n: number) => {
    setNumTeams(n);
    setTeams(prev => {
      const copy = [...prev];
      if (n > copy.length) {
        return [...copy, ...Array(n - copy.length).fill({ name: '', password: '' })];
      } else {
        return copy.slice(0, n);
      }
    });
  };

  const handleTeamChange = (idx: number, field: keyof Team, value: string) => {
    setTeams(prev => prev.map((t, i) => i === idx ? { ...t, [field]: value } : t));
  };

  const addTeam = () => {
    setNumTeams(n => n + 1);
    setTeams(prev => [...prev, { name: '', password: '' }]);
  };

  const removeTeam = () => {
    if (numTeams > 1) {
      setNumTeams(n => n - 1);
      setTeams(prev => prev.slice(0, -1));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/simulations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          name,
          teams,
          restaurantProfile,
          marketModel,
        }),
      });
      if (!res.ok) {
        setError('Failed to create simulation');
        setLoading(false);
        return;
      }
      // Optionally redirect or show success
      navigate('/dashboard');
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Create New Simulation</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Simulation Name: </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ padding: 6, width: 250, marginLeft: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Number of Teams: </label>
          <input
            type="number"
            min={1}
            value={numTeams}
            onChange={e => handleNumTeamsChange(Number(e.target.value))}
            style={{ padding: 6, width: 60, marginLeft: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Team Setup:</b>
          <table style={{ width: '100%', marginTop: 8, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Team #</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Team Name</th>
                <th style={{ border: '1px solid #ccc', padding: 6 }}>Team Password</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>{idx + 1}</td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>
                    <input
                      type="text"
                      value={team.name}
                      onChange={e => handleTeamChange(idx, 'name', e.target.value)}
                      style={{ padding: 6, width: 120 }}
                      required
                    />
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: 6 }}>
                    <input
                      type="text"
                      value={team.password}
                      onChange={e => handleTeamChange(idx, 'password', e.target.value)}
                      style={{ padding: 6, width: 120 }}
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={addTeam} style={{ marginRight: 8 }}>Add Team</button>
            <button type="button" onClick={removeTeam}>Remove Team</button>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Restaurant Profile: </label>
          <select value={restaurantProfile} onChange={e => setRestaurantProfile(e.target.value)} style={{ padding: 6, marginLeft: 8 }}>
            <option value="">Import</option>
            <option value="profile1">Profile 1</option>
            <option value="profile2">Profile 2</option>
          </select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label>Market Model: </label>
          <select value={marketModel} onChange={e => setMarketModel(e.target.value)} style={{ padding: 6, marginLeft: 8 }}>
            <option value="">Import</option>
            <option value="model1">Model 1</option>
            <option value="model2">Model 2</option>
          </select>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Simulation'}</button>
          <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSimulation;