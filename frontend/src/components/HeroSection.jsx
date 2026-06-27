import { motion } from 'framer-motion';
import { FaHeartbeat, FaAmbulance } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_20%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <FaHeartbeat /> Life-saving AI response in seconds
            </span>
            <h1 className="mt-8 max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              RescueX AI — The Last-Minute Life Saver
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Reduce emergency response time with instant rescue coordination, AI first aid guidance, live mapping, and volunteer dispatch.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#dashboard" className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Launch Dashboard
              </a>
              <a href="#features" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/10">
                Explore Features
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative mx-auto flex max-w-lg items-center justify-center">
            <div className="glass-card relative w-full overflow-hidden border-cyan-300/30 px-8 py-10">
              <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-900/80 p-6 ring-1 ring-white/10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Emergency status</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">Critical</h2>
                  </div>
                  <div className="rounded-3xl bg-cyan-500/10 p-3 text-cyan-300">
                    <FaAmbulance className="h-8 w-8" />
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-6 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Nearest ambulance</p>
                  <div className="mt-4 flex items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Ambulance 12</h3>
                      <p className="mt-2 text-sm text-slate-400">3.2 km away · ETA 4 min</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-3 py-2 text-xs uppercase tracking-[0.2em] text-emerald-300">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
