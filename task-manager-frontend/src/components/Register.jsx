import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post('/register', form);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input className="form-control my-2" placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
        <input className="form-control my-2" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
        <input className="form-control my-2" placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
