const SOSNotice = ({ notice, className = '' }) => {
  if (!notice) return null;

  const tone = notice.type === 'success'
    ? 'border-emerald-300/30 bg-emerald-500/15 text-emerald-100'
    : 'border-rose-300/30 bg-rose-500/15 text-rose-100';

  return (
    <div className={`w-80 max-w-full rounded-lg border px-4 py-3 text-sm leading-6 shadow-2xl backdrop-blur-xl ${tone} ${className}`}>
      {notice.text}
    </div>
  );
};

export default SOSNotice;
