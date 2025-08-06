import { motion } from 'framer-motion';
import { GiBoxingGlove } from 'react-icons/gi';
import { RiStarFill, RiTrophyFill } from 'react-icons/ri';

const FighterCard = ({ fighter, viewMode = 'grid' }) => {
  const { wins, losses, draws } = fighter.record;
  const totalFights = wins + losses + draws;
  const koRate = totalFights > 0 ? Math.round((wins * 0.6) / totalFights * 100) : 0; // Mock KO rate

  // Get flag emoji based on nationality
  const getFlagEmoji = (nationality) => {
    const flags = {
      'USA': '🇺🇸',
      'Mexico': '🇲🇽',
      'UK': '🇬🇧',
      'Ukraine': '🇺🇦',
      'Russia': '🇷🇺',
    };
    return flags[nationality] || '🏳️';
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        className="bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-700 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-4">
          {/* Fighter Image Placeholder */}
          <div className="w-20 h-20 bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <GiBoxingGlove className="w-10 h-10 text-zinc-600" />
          </div>

          {/* Fighter Info */}
          <div className="flex-1 grid grid-cols-12 items-center gap-4">
            <div className="col-span-4">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-lg">{fighter.name.toUpperCase()}</h3>
                {fighter.isChampion && (
                  <RiTrophyFill className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <p className="text-zinc-500 text-sm">"{fighter.nickname}"</p>
            </div>

            <div className="col-span-2 text-center">
              <p className="text-white font-bold">{wins}-{losses}-{draws}</p>
              <p className="text-zinc-600 text-xs">RECORD</p>
            </div>

            <div className="col-span-2 text-center">
              <p className="text-zinc-400 text-sm">{fighter.weightClass}</p>
            </div>

            <div className="col-span-2 text-center">
              <span className="text-2xl">{getFlagEmoji(fighter.nationality)}</span>
            </div>

            <div className="col-span-2 text-right">
              <button className="bg-red-900 text-white px-4 py-2 font-bold text-sm tracking-wider hover:bg-red-800 transition-colors">
                VIEW PROFILE
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (default)
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer group"
    >
      {/* Header with Ranking/Champion Status */}
      <div className="bg-black p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {fighter.isChampion ? (
              <>
                <RiTrophyFill className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-500 font-bold text-sm">CHAMPION</span>
              </>
            ) : (
              <>
                <span className="text-zinc-500 text-sm">RANK</span>
                <span className="text-white font-bold text-lg">#{fighter.ranking}</span>
              </>
            )}
          </div>
          <span className="text-2xl">{getFlagEmoji(fighter.nationality)}</span>
        </div>
      </div>

      {/* Fighter Image Placeholder */}
      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 h-48 flex items-center justify-center relative overflow-hidden">
        <GiBoxingGlove className="w-24 h-24 text-zinc-700" />
        
        {/* Title Belts */}
        {fighter.titles.length > 0 && (
          <div className="absolute bottom-2 left-2 flex gap-1">
            {fighter.titles.map((title) => (
              <span 
                key={title} 
                className="bg-yellow-600 text-black text-xs font-bold px-2 py-1"
              >
                {title}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Fighter Info */}
      <div className="p-6">
        <h3 className="text-2xl font-black text-white group-hover:text-red-900 transition-colors">
          {fighter.name.toUpperCase()}
        </h3>
        <p className="text-zinc-500 mb-4">"{fighter.nickname}"</p>

        <div className="space-y-3">
          {/* Record */}
          <div className="flex justify-between items-center">
            <span className="text-zinc-600 text-sm">RECORD</span>
            <span className="text-white font-bold">
              {wins}-{losses}-{draws}
            </span>
          </div>

          {/* Weight Class */}
          <div className="flex justify-between items-center">
            <span className="text-zinc-600 text-sm">WEIGHT</span>
            <span className="text-white text-sm">{fighter.weightClass}</span>
          </div>

          {/* KO Rate */}
          <div className="flex justify-between items-center">
            <span className="text-zinc-600 text-sm">KO RATE</span>
            <span className="text-red-900 font-bold">{koRate}%</span>
          </div>
        </div>

        {/* Win Streak Indicator - Always render div for consistent height */}
        <div className="mt-4 h-5">
          {losses === 0 && (
            <div className="flex items-center gap-2 text-green-500">
              <RiStarFill className="w-4 h-4" />
              <span className="text-xs font-bold">UNDEFEATED</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="border-t border-zinc-800 p-4">
        <button className="w-full bg-zinc-800 text-white py-2 font-bold text-sm tracking-wider hover:bg-red-900 transition-colors">
          VIEW PROFILE
        </button>
      </div>
    </motion.div>
  );
};

export default FighterCard;