import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiBell, FiActivity, FiHeart } from 'react-icons/fi';
import api from '../utils/api';
import SOSButton from '../components/SOSButton';
import VoiceSOS from '../components/VoiceSOS';

const cardData = [
  { title: 'Nearby Hospitals', value: '18', icon: <FiMapPin size={24} /> },
  { title: 'Available Volunteers', value: '42', icon: <FiActivity size={24} /> },
  { title: 'Active Emergencies', value: '3', icon: <FiBell size={24} /> },
  { title: 'Donors Ready', value: '12', icon: <FiHeart size={24} /> }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0, averageTime: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([
          api.get('/api/profile'),
          api.get('/api/emergency/stats')
        ]);
        setProfile(profileRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-16">
      <SOSButton />
      <VoiceSOS />
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="glass-card p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Dashboard</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">RescueX AI command center</h1>
            <p className="mt-4 text-slate-400">Monitor live emergencies, nearest response units, and AI assist tools from one premium interface.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cardData.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">{item.icon}</div>
                  <p className="mt-4 text-sm uppercase tracking-[0.28em] text-slate-400">{item.title}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card grid gap-6 p-8">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Emergency status</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Awaiting live response</h2>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300">Stable</span>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">Nearest ambulance</p>
                  <p className="mt-2 text-lg font-semibold text-white">Ambulance 04 · 2.1 km</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm text-slate-400">Estimated arrival</p>
                  <p className="mt-2 text-lg font-semibold text-white">4 min</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Emergency ID</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">RX-1A2B3C4D</h3>
              <div className="mt-4 grid gap-3">
                <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
                  <p className="text-sm">Nearby hospitals</p>
                  <p className="mt-2 text-base font-medium text-white">AAD Hospital · 1.8 km</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
                  <p className="text-sm">Emergency contacts</p>
                  <p className="mt-2 text-base font-medium text-white">2 notified</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="glass-card p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">AI assistant</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Ask about first aid</h2>
              </div>
              <button onClick={() => navigate('/ai')} className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Ask Gemini</button>
            </div>
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-slate-400">"My friend fainted during a marathon. What should I do right now?"</p>
            </div>
          </div>
          <div className="glass-card space-y-6 p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Profile</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{profile ? profile.name : 'Loading...'}</h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-slate-300">
              <p>Blood group: {profile?.bloodGroup || 'N/A'}</p>
              <p className="mt-2">Allergies: {profile?.allergies || 'None recorded'}</p>
              <p className="mt-2">Emergency contacts: {profile?.emergencyContacts?.length || 0}</p>
            </div>
            <button onClick={() => navigate('/profile')} className="w-full rounded-full bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10">Manage profile</button>
          </div>
        </section>

        <section className="glass-card p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Emergency analytics</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Live rescue performance</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-300">
              <p className="text-sm uppercase tracking-[0.28em]">Total cases</p>
              <p className="mt-3 text-3xl font-semibold text-white">{stats.total}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-300">
              <p className="text-sm uppercase tracking-[0.28em]">Resolved</p>
              <p className="mt-3 text-3xl font-semibold text-white">{stats.resolved}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-300">
              <p className="text-sm uppercase tracking-[0.28em]">Pending</p>
              <p className="mt-3 text-3xl font-semibold text-white">{stats.pending}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-300">
              <p className="text-sm uppercase tracking-[0.28em]">Avg response</p>
              <p className="mt-3 text-3xl font-semibold text-white">{stats.averageTime} min</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
