const Admin = () => {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold">Admin Panel (Skeleton)</h1>
        <p className="mt-3 text-slate-400">This area will include user management, emergency oversight, and analytics dashboards.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-900/60 p-6">Users</div>
          <div className="rounded-2xl bg-slate-900/60 p-6">Emergencies</div>
          <div className="rounded-2xl bg-slate-900/60 p-6">Analytics</div>
          <div className="rounded-2xl bg-slate-900/60 p-6">Settings</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
