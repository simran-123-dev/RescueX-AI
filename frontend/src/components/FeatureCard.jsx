const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="glass-card p-6 text-zinc-100 transition hover:-translate-y-1 hover:border-teal-300/30 hover:bg-white/[0.08]">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-400/12 text-teal-200">{icon}</div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 leading-7 text-zinc-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
