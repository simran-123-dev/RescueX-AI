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
    <div className="min-h-screen bg-slate-950 px-6 py-20 text-slate-100 lg:px-16">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">
        <h1 className="text-4xl font-semibold text-white">Create your RescueX AI account</h1>
        <p className="mt-3 text-slate-400">Register to join the rescue network and access emergency voice assistance.</p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <label className="block text-sm text-slate-300">Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-3xl border border-white/10 bg-slate-950 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-300"
            required
          />
          <label className="block text-sm text-slate-300">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-3xl border border-white/10 bg-slate-950 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-300"
            required
          />
          <label className="block text-sm text-slate-300">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-3xl border border-white/10 bg-slate-950 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-300"
            required
          />
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button type="submit" className="w-full rounded-full bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300">
            Sign up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already registered? <Link to="/login" className="text-cyan-300 hover:text-cyan-200">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
