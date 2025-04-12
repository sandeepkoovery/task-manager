import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/login', form);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <div className="container mt-4">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}
