import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RiBoxingFill, 
  RiUserFill, 
  RiTrophyFill, 
  RiFireFill,
  RiLogoutBoxLine,
  RiChat3Fill,
  RiCalendarLine,
  RiHistoryLine
} from 'react-icons/ri';
import { GiBoxingGlove } from 'react-icons/gi';
import useAuthStore from '../../store/authStore';

const NavigationSidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = [
    { path: '/dashboard', label: 'DASHBOARD', icon: RiBoxingFill },
    { path: '/fights', label: 'UPCOMING', icon: RiCalendarLine },
    { path: '/results', label: 'RESULTS', icon: RiHistoryLine },
    { path: '/fighters', label: 'FIGHTERS', icon: GiBoxingGlove },
    { path: '/predictions', label: 'PREDICTIONS', icon: RiFireFill },
    { path: '/social', label: 'SOCIAL', icon: RiChat3Fill },
    { path: '/leaderboard', label: 'LEADERBOARD', icon: RiTrophyFill },
    { path: '/profile', label: 'MY PROFILE', icon: RiUserFill },
  ];

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-900 text-center">
        <h1 className="text-2xl font-black text-white">GLOVES OFF</h1>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-zinc-900">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm truncate">{user?.name || 'Fighter'}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500">ACCURACY</span>
              <span className="text-red-900 font-bold">{user?.predictionAccuracy || 0}%</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-zinc-900 p-2 text-center">
            <p className="text-2xl font-bold text-white">{user?.totalPredictions || 0}</p>
            <p className="text-xs text-zinc-600">PREDICTIONS</p>
          </div>
          <div className="bg-zinc-900 p-2 text-center">
            <p className="text-2xl font-bold text-red-900">#42</p>
            <p className="text-xs text-zinc-600">RANK</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm font-bold tracking-wider transition-all ${
                    isActive
                      ? 'text-white bg-red-900'
                      : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-900">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold tracking-wider text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all"
        >
          <RiLogoutBoxLine className="w-5 h-5" />
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default NavigationSidebar;