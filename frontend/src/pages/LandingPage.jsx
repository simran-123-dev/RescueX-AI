import { FaHandsHelping, FaHospital, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import SectionHeading from '../components/SectionHeading';
import StatsGrid from '../components/StatsGrid';

const features = [
  { title: 'Instant SOS Dispatch', description: 'Send high-priority requests with location data to responders, volunteers, and hospitals.', icon: <FaShieldAlt size={22} /> },
  { title: 'AI First Aid Coach', description: 'Get calm, step-by-step guidance while professional help is on the way.', icon: <FaHandsHelping size={22} /> },
  { title: 'Live Rescue Map', description: 'Track ambulances, hospitals, donors, safe zones, and nearby support in one operational view.', icon: <FaHospital size={22} /> }
];

const LandingPage = () => {
  return (
    <main>
      <HeroSection />

      <section id="features" className="px-4 py-16 sm:px-6 lg:px-10">
        <SectionHeading title="Emergency tools that stay clear under pressure" subtitle="Core response system" />
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
          ))}
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="glass-card p-6 sm:p-8">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Dispatch, guide, and coordinate from one fast interface.
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-zinc-400">
              RescueX AI brings SOS activation, response routing, first aid instructions, and volunteer coordination into a single workflow built for urgent decisions.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['Step 1', 'Trigger SOS', 'Tap the emergency button or use voice SOS to broadcast your location.'],
                ['Step 2', 'Activate responders', 'Nearby ambulances, hospitals, and volunteers receive the alert instantly.']
              ].map(([step, title, copy]) => (
                <div key={title} className="rounded-lg border border-white/10 bg-zinc-950/60 p-5">
                  <p className="eyebrow">{step}</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 leading-7 text-zinc-400">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8">
            <p className="eyebrow">AI assist</p>
            <h3 className="mt-4 text-3xl font-semibold text-white">First aid assistant</h3>
            <p className="mt-4 leading-8 text-zinc-400">Ask about burns, chest pain, snake bites, fainting, bleeding, or shock and get practical next steps.</p>
            <div className="mt-8 space-y-4">
              {['My friend fainted. What should I do?', 'Snake bite with swelling and dizziness'].map((query) => (
                <div key={query} className="rounded-lg border border-white/10 bg-zinc-950/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Sample AI query</p>
                  <p className="mt-3 text-lg font-medium text-white">{query}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-10">
        <SectionHeading title="Live emergency response analytics" subtitle="Operational insight" />
        <div className="mx-auto mt-10 max-w-7xl">
          <StatsGrid />
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 RescueX AI. Built for life-saving response.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition hover:text-teal-200">Privacy</a>
            <a href="#" className="transition hover:text-teal-200">Support</a>
            <a href="#" className="transition hover:text-teal-200">Deploy</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
