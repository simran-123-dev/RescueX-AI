const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">{subtitle}</p>
      <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">{title}</h2>
    </div>
  );
};

export default SectionHeading;
