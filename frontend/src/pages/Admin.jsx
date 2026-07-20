import { FiBarChart2, FiSettings, FiUsers, FiZap } from 'react-icons/fi';

const items = [
  { title: 'Users', icon: <FiUsers />, copy: 'Review responders, volunteers, and patient records.' },
  { title: 'Emergencies', icon: <FiZap />, copy: 'Monitor active incidents and escalation status.' },
  { title: 'Analytics', icon: <FiBarChart2 />, copy: 'Track response times, coverage, and resolution rates.' },
  { title: 'Settings', icon: <FiSettings />, copy: 'Manage routing, alerts, and operating regions.' }
];

const Admin = () => {
  return (
    <div className="page-shell">
      <div className="content-shell">
        <div className="glass-card p-6 sm:p-8">
          <p className="eyebrow">Admin</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">Operations control panel</h1>
          <p className="mt-3 max-w-2xl leading-8 text-zinc-400">Manage users, emergency oversight, analytics, and system configuration from a focused admin workspace.</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="glass-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-400/10 text-teal-200">{item.icon}</div>
              <h2 className="mt-5 text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-2 leading-7 text-zinc-400">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
