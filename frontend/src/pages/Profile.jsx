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
        // Format emergency contacts as "Name (Phone)" for display
        const formattedContacts = (res.data.emergencyContacts || [])
          .map((c) => c.phone ? `${c.name} (${c.phone})` : c.name)
          .join(', ');
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
      // Parse emergency contacts: "Name (Phone)" format
      const emergencyContacts = form.emergencyContacts
        .split(',')
        .map((c) => {
          const trimmed = c.trim();
          if (!trimmed) return null;
          const match = trimmed.match(/^(.+?)\s*\(([^)]+)\)$/);
          if (match) {
            return { name: match[1].trim(), phone: match[2].trim(), relation: 'Contact' };
          }
          return { name: trimmed, phone: '', relation: 'Contact' };
        })
        .filter(Boolean);

      const payload = {
        name: form.name,
        bloodGroup: form.bloodGroup,
        allergies: form.allergies,
        emergencyContacts
      };
      const res = await api.put('/api/profile', payload);
      setProfile(res.data);
      setMessage('Profile updated successfully');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Could not update profile');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 lg:px-16">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl">
          <h1 className="text-3xl font-semibold text-white">Manage Profile</h1>
          <p className="mt-2 text-slate-400">Keep your emergency contact and medical details up to date.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <label className="block text-sm text-slate-300">Name</label>
            <input value={form.name} name="name" onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-slate-950 px-5 py-4 text-slate-100 outline-none" />
            <label className="block text-sm text-slate-300">Blood group</label>
            <input value={form.bloodGroup} name="bloodGroup" onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-slate-950 px-5 py-4 text-slate-100 outline-none" />
            <label className="block text-sm text-slate-300">Allergies</label>
            <input value={form.allergies} name="allergies" onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-slate-950 px-5 py-4 text-slate-100 outline-none" />
            <label className="block text-sm text-slate-300">Emergency contacts (comma separated)</label>
            <input value={form.emergencyContacts} name="emergencyContacts" onChange={handleChange} className="w-full rounded-3xl border border-white/10 bg-slate-950 px-5 py-4 text-slate-100 outline-none" />
            {message && <p className="text-sm text-cyan-300">{message}</p>}
            <button type="submit" className="w-full rounded-full bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 hover:bg-cyan-300">Save profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
