import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Auth from './pages/Auth';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import FightView from './pages/FightView';
import PastResults from './pages/PastResults';
import ResultView from './pages/ResultView';
import UpcomingFights from './pages/UpcomingFights';
import BoxingGloveLoader from './components/loaders/BoxingGloveLoader';
import useAuthStore from './store/authStore';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isTransitioning } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  // Don't render children while transitioning
  if (isTransitioning) {
    return null;
  }
  
  return children;
};

import Fighters from './pages/Fighters';

// Placeholder pages for routes
const PredictionsPage = () => <div className="p-8 text-white">PREDICTIONS PAGE</div>;
const SocialPage = () => <div className="p-8 text-white">SOCIAL FEED</div>;
const LeaderboardPage = () => <div className="p-8 text-white">LEADERBOARD PAGE</div>;
const ProfilePage = () => <div className="p-8 text-white">PROFILE PAGE</div>;

function App() {
  const { isTransitioning, setTransitioning } = useAuthStore();

  return (
    <Router>
      <AnimatePresence>
        {isTransitioning && (
          <BoxingGloveLoader 
            onComplete={() => setTransitioning(false)} 
          />
        )}
      </AnimatePresence>
      
      <Routes>
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected Routes with Layout */}
        <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route index element={<Navigate to="/main-card" />} />
          <Route path="main-card" element={<Dashboard />} />
          <Route path="fights" element={<UpcomingFights />} />
          <Route path="fight/:fightId" element={<FightView />} />
          <Route path="results" element={<PastResults />} />
          <Route path="result/:resultId" element={<ResultView />} />
          <Route path="fighters" element={<Fighters />} />
          <Route path="predictions" element={<PredictionsPage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;