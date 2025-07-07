import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    alert(`Login: ${email}`);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
    alert(`Signup: ${email}`);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Restaurant Simulator</h2>
      <form>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4 }}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <button onClick={handleLogin} type="submit">Login</button>
          <button onClick={handleSignup} type="button">Sign Up</button>
        </div>
        <div style={{ textAlign: 'right' }}>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;