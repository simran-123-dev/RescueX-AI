import { Link } from 'react-router-dom';
import { FiActivity } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link to="/" className="inline-flex items-center gap-3 text-base font-semibold text-white">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-rose-500 text-white shadow-lg shadow-rose-950/30">
            <FiActivity className="h-5 w-5" />
          </span>
          <span>RescueX AI</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm text-zinc-200">
          <Link to="/login" className="secondary-btn px-4 py-2">Login</Link>
          <Link to="/signup" className="primary-btn px-4 py-2">Get Started</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
