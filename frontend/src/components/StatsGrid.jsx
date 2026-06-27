const stats = [
  { label: 'Response Speed', value: '85% faster' },
  { label: 'Live Volunteers', value: '1.2K' },
  { label: 'Resolved Cases', value: '16.4K' },
  { label: 'Trust Score', value: '4.9/5' }
];

const StatsGrid = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div key={item.label} className="glass-card p-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">{item.label}</p>
          <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
