import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ setSession }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const form = { maxWidth: 420, margin: '24px auto' };
  const input = { width: '100%', padding: '10px', marginBottom: 12, borderRadius: 6, border: '1px solid #e5e7eb' };
  const btn = { width: '100%', padding: '10px', borderRadius: 6, border: 'none', background: '#16a34a', color: 'white', cursor: 'pointer' };
  const error = { color: '#dc2626', marginBottom: 12 };

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      const res = await axios.post('/auth/login', { email, password });
      setSession(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed');
    }
  }

  return (
    <form style={form} onSubmit={onSubmit}>
      <h2>Login</h2>
      {err ? <div style={error}>{err}</div> : null}
      <input style={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input style={input} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button style={btn} type="submit">Login</button>
      <p style={{ marginTop: 12 }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}