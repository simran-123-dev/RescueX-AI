import { motion } from 'framer-motion';
import { FaAmbulance, FaHeartbeat } from 'react-icons/fa';
import { FiArrowRight, FiMapPin, FiShield } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <span className="inline-flex items-center gap-2 rounded-lg border border-rose-300/20 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-100">
            <FaHeartbeat /> Life-saving response in seconds
          </span>
          <h1 className="mt-7 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            RescueX AI
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
            A focused emergency command app for SOS dispatch, AI first aid, live map visibility, and volunteer coordination.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/dashboard" className="primary-btn gap-2">
              Launch Dashboard <FiArrowRight />
            </a>
            <a href="#features" className="secondary-btn">Explore Features</a>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {['4 min ETA', '42 volunteers', '24/7 AI aid'].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-medium text-zinc-200">
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65 }} className="glass-card overflow-hidden">
          <div className="border-b border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="eyebrow">Live incident view</p>
          </div>
          <div className="grid gap-4 p-5">
            <div className="rounded-lg border border-rose-300/20 bg-rose-500/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-rose-100">Emergency status</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">Critical</h2>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-rose-500 text-white">
                  <FaAmbulance className="h-6 w-6" />
                </span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-5">
                <FiMapPin className="h-5 w-5 text-teal-200" />
                <p className="mt-4 text-sm text-zinc-400">Nearest ambulance</p>
                <p className="mt-2 text-lg font-semibold text-white">Ambulance 12, 3.2 km</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-5">
                <FiShield className="h-5 w-5 text-amber-200" />
                <p className="mt-4 text-sm text-zinc-400">Responder status</p>
                <p className="mt-2 text-lg font-semibold text-white">3 units notified</p>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-zinc-950/70 p-5">
              <div className="flex items-center justify-between text-sm text-zinc-400">
                <span>Route confidence</span>
                <span className="font-semibold text-teal-200">92%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-teal-300" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
