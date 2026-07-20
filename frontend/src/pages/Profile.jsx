import { useEffect, useState } from 'react';
import api from '../utils/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', bloodGroup: '', allergies: '', emergencyContacts: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/api/profile');
        setProfile(res.data);
        const formattedContacts = (res.data.emergencyContacts || []).map((c) => (c.phone ? `${c.name} (${c.phone})` : c.name)).join(', ');
        setForm({
          name: res.data.name || '',
          bloodGroup: res.data.bloodGroup || '',
          allergies: res.data.allergies || '',
          emergencyContacts: formattedContacts
        });
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emergencyContacts = form.emergencyContacts
        .split(',')
        .map((c) => {
          const trimmed = c.trim();
          if (!trimmed) return null;
          const match = trimmed.match(/^(.+?)\s*\(([^)]+)\)$/);
          if (match) return { name: match[1].trim(), phone: match[2].trim(), relation: 'Contact' };
          return { name: trimmed, phone: '', relation: 'Contact' };
        })
        .filter(Boolean);

      const res = await api.put('/api/profile', { ...form, emergencyContacts });
      setProfile(res.data);
      setMessage('Profile updated successfully');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Could not update profile');
    }
  };

  return (
    <div className="page-shell">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="glass-card p-6">
          <p className="eyebrow">Medical profile</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">{profile?.name || 'Manage Profile'}</h1>
          <div className="mt-6 rounded-lg border border-white/10 bg-zinc-950/70 p-5 text-zinc-300">
            <p>Blood group: {profile?.bloodGroup || 'N/A'}</p>
            <p className="mt-2">Contacts: {profile?.emergencyContacts?.length || 0}</p>
          </div>
        </aside>

        <section className="glass-card p-6">
          <h2 className="text-2xl font-semibold text-white">Emergency details</h2>
          <p className="mt-2 leading-7 text-zinc-400">Keep your emergency contact and medical details up to date.</p>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <label className="block text-sm font-medium text-zinc-300">Name</label>
            <input value={form.name} name="name" onChange={handleChange} className="field" />
            <label className="block text-sm font-medium text-zinc-300">Blood group</label>
            <input value={form.bloodGroup} name="bloodGroup" onChange={handleChange} className="field" />
            <label className="block text-sm font-medium text-zinc-300">Allergies</label>
            <input value={form.allergies} name="allergies" onChange={handleChange} className="field" />
            <label className="block text-sm font-medium text-zinc-300">Emergency contacts, comma separated</label>
            <input value={form.emergencyContacts} name="emergencyContacts" onChange={handleChange} className="field" />
            {message && <p className="rounded-lg border border-teal-300/20 bg-teal-400/10 px-4 py-3 text-sm text-teal-100">{message}</p>}
            <button type="submit" className="primary-btn w-full">Save profile</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Profile;
