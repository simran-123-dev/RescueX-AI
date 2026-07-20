import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiActivity, FiBell, FiHeart, FiMapPin } from 'react-icons/fi';
import api from '../utils/api';
import SOSButton from '../components/SOSButton';
import VoiceSOS from '../components/VoiceSOS';

const cardData = [
  { title: 'Nearby Hospitals', value: '18', icon: <FiMapPin size={22} />, tone: 'text-teal-200 bg-teal-400/10' },
  { title: 'Available Volunteers', value: '42', icon: <FiActivity size={22} />, tone: 'text-emerald-200 bg-emerald-400/10' },
  { title: 'Active Emergencies', value: '3', icon: <FiBell size={22} />, tone: 'text-rose-200 bg-rose-400/10' },
  { title: 'Donors Ready', value: '12', icon: <FiHeart size={22} />, tone: 'text-amber-200 bg-amber-400/10' }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0, averageTime: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([api.get('/api/profile'), api.get('/api/emergency/stats')]);
        setProfile(profileRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="page-shell pb-32 sm:pb-8">
      <SOSButton />
      <VoiceSOS />
      <div className="content-shell space-y-6">
        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.8fr]">
          <div className="glass-card p-6 sm:p-8">
            <p className="eyebrow">Dashboard</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">RescueX AI command center</h1>
            <p className="mt-4 max-w-3xl leading-8 text-zinc-400">Monitor active emergencies, nearby response resources, and patient readiness from one operational workspace.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cardData.map((item) => (
                <div key={item.title} className="rounded-lg border border-white/10 bg-zinc-950/60 p-5">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${item.tone}`}>{item.icon}</div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{item.title}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Emergency status</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Awaiting live response</h2>
              </div>
              <span className="rounded-lg bg-emerald-500/15 px-3 py-2 text-sm font-medium text-emerald-200">Stable</span>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                ['Nearest ambulance', 'Ambulance 04, 2.1 km'],
                ['Estimated arrival', '4 min'],
                ['Emergency ID', 'RX-1A2B3C4D']
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-zinc-950/70 p-4">
                  <p className="text-sm text-zinc-500">{label}</p>
                  <p className="mt-2 font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">AI assistant</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Ask about first aid</h2>
              </div>
              <button onClick={() => navigate('/ai')} className="primary-btn">Ask Gemini</button>
            </div>
            <div className="mt-6 rounded-lg border border-white/10 bg-zinc-950/70 p-5 text-zinc-400">
              "My friend fainted during a marathon. What should I do right now?"
            </div>
          </div>

          <div className="glass-card p-6">
            <p className="eyebrow">Profile</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{profile ? profile.name : 'Loading...'}</h2>
            <div className="mt-5 rounded-lg border border-white/10 bg-zinc-950/70 p-5 text-zinc-300">
              <p>Blood group: {profile?.bloodGroup || 'N/A'}</p>
              <p className="mt-2">Allergies: {profile?.allergies || 'None recorded'}</p>
              <p className="mt-2">Emergency contacts: {profile?.emergencyContacts?.length || 0}</p>
            </div>
            <button onClick={() => navigate('/profile')} className="secondary-btn mt-4 w-full">Manage profile</button>
          </div>
        </section>

        <section className="glass-card p-6">
          <p className="eyebrow">Emergency analytics</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Live rescue performance</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ['Total cases', stats.total],
              ['Resolved', stats.resolved],
              ['Pending', stats.pending],
              ['Avg response', `${stats.averageTime} min`]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-zinc-950/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
