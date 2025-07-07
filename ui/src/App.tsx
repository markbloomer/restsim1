import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';

const Dashboard: React.FC = () => (
  <div style={{ textAlign: 'center', marginTop: 40 }}>
    <h2>Dashboard (Placeholder)</h2>
    <p>This is the dashboard page.</p>
  </div>
);

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default App;