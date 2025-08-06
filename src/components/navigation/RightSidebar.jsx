import { motion } from 'framer-motion';
import { RiFireLine, RiTimeLine } from 'react-icons/ri';
import { GiBoxingGlove } from 'react-icons/gi';

// Mock data
const liveFights = [
  {
    id: 1,
    fighter1: 'MARTINEZ',
    fighter2: 'JOHNSON',
    round: 7,
    totalRounds: 12,
  },
  {
    id: 2,
    fighter1: 'LOPEZ',
    fighter2: 'WILLIAMS',
    round: 3,
    totalRounds: 10,
  },
];

const activePredictions = [
  {
    id: 1,
    fight: 'Garcia vs Davis',
    prediction: 'Garcia by KO',
    confidence: 4,
    status: 'pending',
  },
  {
    id: 2,
    fight: 'Fury vs Usyk',
    prediction: 'Fury by Decision',
    confidence: 3,
    status: 'pending',
  },
];

const topPredictors = [
  { rank: 1, name: 'BoxingPro92', accuracy: 89.2, streak: 12 },
  { rank: 2, name: 'FightMaster', accuracy: 87.5, streak: 8 },
  { rank: 3, name: 'KnockoutKing', accuracy: 85.1, streak: 5 },
];

const RightSidebar = () => {
  return (
    <div className="h-full bg-black p-6 overflow-y-auto">
      {/* Live Fights Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <h3 className="text-sm font-bold text-white tracking-wider">LIVE NOW</h3>
        </div>
        
        <div className="space-y-3">
          {liveFights.map((fight) => (
            <motion.div
              key={fight.id}
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 border border-zinc-800 p-3 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">{fight.fighter1}</span>
                <span className="text-xs text-zinc-500">VS</span>
                <span className="text-sm font-bold text-white">{fight.fighter2}</span>
              </div>
              <div className="flex items-center gap-2">
                <RiTimeLine className="w-3 h-3 text-red-500" />
                <span className="text-xs text-red-500">
                  ROUND {fight.round} OF {fight.totalRounds}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Predictions */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-white tracking-wider mb-4">YOUR ACTIVE PREDICTIONS</h3>
        
        <div className="space-y-3">
          {activePredictions.map((pred) => (
            <div key={pred.id} className="bg-zinc-900 border border-zinc-800 p-3">
              <p className="text-sm font-bold text-white mb-1">{pred.fight}</p>
              <p className="text-xs text-zinc-400 mb-2">{pred.prediction}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${
                      i < pred.confidence ? 'bg-red-900' : 'bg-zinc-700'
                    }`}
                  />
                ))}
                <span className="text-xs text-zinc-500 ml-2">CONFIDENCE</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Predictors */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-white tracking-wider mb-4">TOP PREDICTORS</h3>
        
        <div className="space-y-3">
          {topPredictors.map((predictor) => (
            <div key={predictor.rank} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center">
                <span className="text-sm font-bold text-white">#{predictor.rank}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{predictor.name}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-500">{predictor.accuracy}%</span>
                  <span className="text-red-900">🔥 {predictor.streak}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="border-t border-zinc-800 pt-6">
        <h3 className="text-sm font-bold text-white tracking-wider mb-4">YOUR STATS</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900 p-3 text-center">
            <p className="text-2xl font-bold text-white">#42</p>
            <p className="text-xs text-zinc-500">GLOBAL RANK</p>
          </div>
          <div className="bg-zinc-900 p-3 text-center">
            <p className="text-2xl font-bold text-red-900">5</p>
            <p className="text-xs text-zinc-500">WIN STREAK</p>
          </div>
          <div className="bg-zinc-900 p-3 text-center">
            <p className="text-2xl font-bold text-white">156</p>
            <p className="text-xs text-zinc-500">TOTAL POINTS</p>
          </div>
          <div className="bg-zinc-900 p-3 text-center">
            <p className="text-2xl font-bold text-white">72.5%</p>
            <p className="text-xs text-zinc-500">ACCURACY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;