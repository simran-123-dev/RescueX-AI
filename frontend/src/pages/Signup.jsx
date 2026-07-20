import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/signup', form);
      localStorage.setItem('rescuex_token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="page-shell">
      <div className="glass-card mx-auto max-w-xl p-6 sm:p-8">
        <p className="eyebrow">Join the network</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">Create your RescueX AI account</h1>
        <p className="mt-3 leading-7 text-zinc-400">Register to join the rescue network and access emergency voice assistance.</p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="block text-sm font-medium text-zinc-300">Name</label>
          <input name="name" type="text" value={form.name} onChange={handleChange} className="field" required />

          <label className="block text-sm font-medium text-zinc-300">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="field" required />

          <label className="block text-sm font-medium text-zinc-300">Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="field" required />

          {error && <p className="rounded-lg border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}
          <button type="submit" className="primary-btn w-full">Sign up</button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already registered? <Link to="/login" className="text-teal-200 hover:text-teal-100">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
