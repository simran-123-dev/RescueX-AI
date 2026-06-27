const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="glass-card p-8 text-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-300">{icon}</div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-slate-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
