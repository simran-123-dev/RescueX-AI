import { FaHospital, FaHandsHelping, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import SectionHeading from '../components/SectionHeading';
import StatsGrid from '../components/StatsGrid';

const features = [
  { title: 'Instant SOS Dispatch', description: 'Send emergency requests with GPS coordinates to volunteers and hospitals.', icon: <FaShieldAlt size={24} /> },
  { title: 'AI First Aid Coach', description: 'Gemini-powered step-by-step guidance for life-saving response.', icon: <FaHandsHelping size={24} /> },
  { title: 'Live Rescue Map', description: 'Track ambulances, hospitals, safe zones, and volunteers on a dynamic map.', icon: <FaHospital size={24} /> }
];

const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <section id="features" className="px-6 py-24 lg:px-16">
        <SectionHeading title="What RescueX AI delivers" subtitle="Emergency response reinvented" />
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 grid gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
          ))}
        </motion.div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.08),_transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-slate-900/70 p-10 shadow-xl backdrop-blur-xl">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_0.8fr]">
            <div className="space-y-6 text-slate-300">
              <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-500/10 px-4 py-2 text-sm uppercase tracking-[0.36em] text-cyan-200">How it works</p>
              <h2 className="text-4xl font-semibold text-white">Emergency response with speed, visibility, and AI guidance.</h2>
              <p className="max-w-2xl leading-8">
                RescueX AI combines SOS activation, real-time rescue routing, first aid instructions from Gemini, and volunteer coordination so every second is optimized.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-card p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Step 1</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">Trigger SOS</h3>
                  <p className="mt-2 text-slate-400">Tap the emergency button or say “Help me” to broadcast your location.</p>
                </div>
                <div className="glass-card p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Step 2</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">Activate responders</h3>
                  <p className="mt-2 text-slate-400">Nearby ambulances, hospitals, and volunteers receive the alert instantly.</p>
                </div>
              </div>
            </div>
            <div className="glass-card p-8">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">AI assist</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">First aid assistant</h3>
              <p className="mt-4 text-slate-400">Ask RescueX AI about burns, heart attacks, snake bites, or fainting and get safe step-by-step recovery guidance.</p>
              <div className="mt-8 space-y-4">
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Sample AI query</p>
                  <p className="mt-3 text-lg font-medium text-white">"My friend fainted, what do I do?"</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Sample AI query</p>
                  <p className="mt-3 text-lg font-medium text-white">"Snake bite with swelling and dizziness"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-16">
        <SectionHeading title="Trusted by emergency teams nationwide" subtitle="Designed for rapid-impact response" />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="glass-card p-8">
            <p className="text-slate-400">“RescueX AI feels like a command center in your pocket. Our response teams now know exactly where to go first.”</p>
            <p className="mt-6 font-semibold text-white">— Dr. Priya Menon, Emergency Director</p>
          </div>
          <div className="glass-card p-8">
            <p className="text-slate-400">“The live map and volunteer dispatch are remarkable. It makes every second count.”</p>
            <p className="mt-6 font-semibold text-white">— Rajiv Kumar, Rescue Volunteer</p>
          </div>
          <div className="glass-card p-8">
            <p className="text-slate-400">“The UI is premium and intuitive. Perfect for hackathon-level wow factor.”</p>
            <p className="mt-6 font-semibold text-white">— Anjali Bose, Product Lead</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-16">
        <SectionHeading title="Live emergency response analytics" subtitle="Actionable insights in real time" />
        <div className="mt-16">
          <StatsGrid />
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">© 2026 RescueX AI. Built for life-saving response.</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <a href="#" className="transition hover:text-cyan-300">Privacy</a>
            <a href="#" className="transition hover:text-cyan-300">Support</a>
            <a href="#" className="transition hover:text-cyan-300">Deploy</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
