import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  RiBoxingFill, 
  RiUserFill, 
  RiTrophyFill, 
  RiFireFill,
  RiCloseLine,
  RiChat3Fill 
} from 'react-icons/ri';
import { GiBoxingGlove } from 'react-icons/gi';
import useAuthStore from '../../store/authStore';

const MobileMenu = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();

  const navItems = [
    { path: '/main-card', label: 'MAIN CARD', icon: RiBoxingFill },
    { path: '/fighters', label: 'FIGHTERS', icon: GiBoxingGlove },
    { path: '/predictions', label: 'PREDICTIONS', icon: RiFireFill },
    { path: '/social', label: 'SOCIAL', icon: RiChat3Fill },
    { path: '/leaderboard', label: 'LEADERBOARD', icon: RiTrophyFill },
    { path: '/profile', label: 'MY PROFILE', icon: RiUserFill },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed top-0 left-0 h-full w-80 bg-black z-50 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-900">
              <h1 className="text-2xl font-black text-white">GLOVES OFF</h1>
              <button onClick={onClose} className="text-white p-2">
                <RiCloseLine className="w-6 h-6" />
              </button>
            </div>

            {/* User Profile */}
            <div className="p-6 border-b border-zinc-900">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold">{user?.name || 'Fighter'}</p>
                  <p className="text-sm text-zinc-500">
                    Accuracy: <span className="text-red-900">{user?.predictionAccuracy || 0}%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onClose}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;