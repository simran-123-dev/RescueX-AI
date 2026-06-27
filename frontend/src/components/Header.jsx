import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-16">
      <Link to="/" className="text-xl font-semibold text-white">RescueX AI</Link>
      <nav className="flex items-center gap-4 text-sm text-slate-200">
        <Link to="/login" className="transition hover:text-cyan-300">Login</Link>
        <Link to="/signup" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-cyan-300/40 hover:text-cyan-300">Get Started</Link>
      </nav>
    </header>
  );
};

export default Header;
