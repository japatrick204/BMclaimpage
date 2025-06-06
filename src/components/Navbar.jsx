import { Link } from 'react-router-dom';
import logo from '../assets/Brandmarch logo.png';

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-canvas border-b border-neutral-200 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Brandmarch logo" className="h-8 w-auto" />
        </Link>
        <div className="space-x-4 hidden sm:flex">
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-brand hover:text-brand-accent"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-brand text-white px-4 py-1.5 text-sm font-medium hover:bg-brand-accent"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
} 