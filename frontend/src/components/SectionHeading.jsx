const SectionHeading = ({ title, subtitle }) => {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">{subtitle}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
    </div>
  );
};

export default SectionHeading;
