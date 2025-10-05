import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Upload, CreditCard, FileText, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-gray-900 text-white border-b border-gray-800 flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center">
          <Logo variant="light" size="md" />
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
          className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-gray-900 border-r border-gray-800 flex flex-col transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center">
            <Logo variant="light" size="lg" />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/dashboard') 
                ? 'bg-gray-800 text-white font-semibold shadow' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Upload className="h-5 w-5" />
            <span>Upload Document</span>
          </Link>

          <Link 
            to="/dashboard/ids" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/dashboard/ids') 
                ? 'bg-gray-800 text-white font-semibold shadow' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <CreditCard className="h-5 w-5" />
            <span>My IDs</span>
          </Link>

          <Link 
            to="/dashboard/certificates" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/dashboard/certificates') 
                ? 'bg-gray-800 text-white font-semibold shadow' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>My Certificates</span>
          </Link>


          <Link 
            to="/dashboard/settings" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/dashboard/settings') 
                ? 'bg-gray-800 text-white font-semibold shadow' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>

          <Link 
            to="/dashboard/profile" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive('/dashboard/profile') 
                ? 'bg-gray-800 text-white font-semibold shadow' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="mb-4 px-4 py-3 bg-gray-800 rounded-lg">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          <button 
            className="w-full flex items-center justify-start px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full md:ml-0 pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
