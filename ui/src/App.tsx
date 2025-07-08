import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Dashboard from './features/dashboard/Dashboard';
import CreateSimulation from './features/simulation/CreateSimulation';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      } />
      <Route path="/create-simulation" element={
        <RequireAuth>
          <CreateSimulation />
        </RequireAuth>
      } />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);

export default App;