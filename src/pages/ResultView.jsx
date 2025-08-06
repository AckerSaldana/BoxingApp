import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RiArrowLeftLine, 
  RiMapPinLine, 
  RiCalendarLine, 
  RiTimeLine,
  RiStarFill,
  RiTrophyFill,
  RiFlashlightFill,
  RiFireLine
} from 'react-icons/ri';
import { GiBoxingGlove } from 'react-icons/gi';

// Import the mock data - in a real app this would come from an API
import { mockExtendedResults } from '../data/mockResults';

const ResultView = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Find the result by ID - in a real app this would be an API call
    const foundResult = mockExtendedResults.find(r => r.id === parseInt(resultId));
    setResult(foundResult);
  }, [resultId]);

  if (!result) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  const getFlagEmoji = (nationality) => {
    const flags = {
      'USA': '🇺🇸',
      'Mexico': '🇲🇽',
      'UK': '🇬🇧',
      'Ukraine': '🇺🇦',
      'Russia': '🇷🇺',
      'Japan': '🇯🇵',
      'Canada': '🇨🇦',
      'Ireland': '🇮🇪',
      'Puerto Rico': '🇵🇷'
    };
    return flags[nationality] || '🏳️';
  };

  const getMethodColor = (method) => {
    if (method === 'KO' || method === 'TKO') return 'text-red-900';
    if (['UD', 'SD', 'MD'].includes(method)) return 'text-white';
    return 'text-zinc-500';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header with Back Button */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/results')}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
          >
            <RiArrowLeftLine className="w-5 h-5" />
            <span className="font-bold tracking-wider text-sm">BACK TO RESULTS</span>
          </button>
        </div>
      </div>

      {/* Fight Result Header */}
      <div className="relative bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
        {/* Corner Graphics */}
        <div className="absolute top-0 left-0 w-48 h-48">
          <div className="absolute top-8 left-8 w-32 h-32 border-l-4 border-t-4 border-red-900" />
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48">
          <div className="absolute bottom-8 right-8 w-32 h-32 border-r-4 border-b-4 border-red-900" />
        </div>
        
        <div className="relative z-10 px-6 py-8 lg:py-12">
          {/* Title/Championship Info - positioned at top aligned with corner */}
          {result.isChampionship && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-8 left-0 right-0 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <RiTrophyFill className="w-6 h-6 text-yellow-500" />
                <p className="text-yellow-500 font-bold tracking-widest text-sm">
                  {result.titles.join(' / ')} {result.weightClass.toUpperCase()} CHAMPIONSHIP
                </p>
                <RiTrophyFill className="w-6 h-6 text-yellow-500" />
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center pt-12"
          >

            {/* Fighters Names - Flexible Layout with Constraints */}
            <div className="flex items-center justify-center gap-4 lg:gap-8 mb-8 px-4">
              {/* Winner - Right Side */}
              <div className="flex-1 max-w-md flex flex-col items-end">
                <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black text-white text-right break-words">
                  {result.winner.name.split(' ').pop().toUpperCase()}
                </h2>
                <p className="text-zinc-500 text-lg">{result.winner.record}</p>
                <span className="text-3xl">{getFlagEmoji(result.winner.nationality)}</span>
                <div className="mt-2">
                  <span className="bg-green-900 text-green-100 text-sm px-3 py-1 font-bold">WINNER</span>
                </div>
              </div>
              
              {/* Method - Center */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center px-4">
                <div className={`text-2xl lg:text-3xl font-black ${getMethodColor(result.method)} mb-2`}>
                  {result.method}
                </div>
                <p className="text-zinc-600 text-xs text-center">{result.methodDetail}</p>
                {result.time && (
                  <p className="text-zinc-700 text-xs">R{result.rounds} - {result.time}</p>
                )}
              </div>
              
              {/* Loser - Left Side */}
              <div className="flex-1 max-w-md flex flex-col items-start">
                <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black text-zinc-400 text-left break-words">
                  {result.loser.name.split(' ').pop().toUpperCase()}
                </h2>
                <p className="text-zinc-500 text-lg">{result.loser.record}</p>
                <span className="text-3xl">{getFlagEmoji(result.loser.nationality)}</span>
                <div className="mt-2">
                  <span className="bg-red-900 text-red-100 text-sm px-3 py-1 font-bold">LOSER</span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <RiCalendarLine className="w-4 h-4" />
                <span>{new Date(result.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <RiMapPinLine className="w-4 h-4" />
                <span>{result.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <GiBoxingGlove className="w-4 h-4" />
                <span>{result.weightClass} Division</span>
              </div>
            </div>

            {/* Rating */}
            {result.rating && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(result.rating) ? 'text-yellow-500' : 'text-zinc-700'}`} 
                    />
                  ))}
                </div>
                <span className="text-zinc-500">({result.rating} / 5)</span>
              </div>
            )}
          </motion.div>

        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 lg:p-8">
        {/* Scorecards for Decisions */}
        {['UD', 'SD', 'MD'].includes(result.method) && result.scorecards && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-black text-white mb-6">OFFICIAL SCORECARDS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.scorecards.map((card, index) => (
                <div key={index} className="bg-zinc-900 border border-zinc-800 p-6">
                  <p className="text-zinc-500 text-sm mb-1">JUDGE</p>
                  <p className="text-white font-bold mb-3">{card.judge}</p>
                  <div className="text-center">
                    <p className="text-3xl font-black text-white mb-1">{card.score}</p>
                    <p className="text-sm text-zinc-500">for</p>
                    <p className="text-lg font-bold text-white">{card.winner}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Round by Round User Voting */}
        {result.roundByRound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-black text-white mb-2">ROUND BY ROUND</h3>
            <p className="text-zinc-500 text-sm mb-6">COMMUNITY VOTING RESULTS</p>
            
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <div className="space-y-4">
                {result.roundByRound.map((round, index) => {
                  // Calculate voting percentages (simulating user votes)
                  const totalVotes = 1000; // Mock total votes per round
                  const fighter1Votes = Math.round((round.fighter1 / (round.fighter1 + round.fighter2)) * totalVotes);
                  const fighter2Votes = totalVotes - fighter1Votes;
                  const fighter1Percentage = Math.round((fighter1Votes / totalVotes) * 100);
                  const fighter2Percentage = 100 - fighter1Percentage;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500 font-bold">ROUND {round.round}</span>
                        <span className="text-zinc-600 text-xs">{totalVotes.toLocaleString()} VOTES</span>
                      </div>
                      
                      <div className="relative">
                        {/* Background bar */}
                        <div className="h-12 bg-zinc-800 relative overflow-hidden">
                          {/* Fighter 1 bar */}
                          <div 
                            className="absolute left-0 top-0 h-full bg-green-900 transition-all duration-500"
                            style={{ width: `${fighter1Percentage}%` }}
                          />
                          {/* Fighter 2 bar */}
                          <div 
                            className="absolute right-0 top-0 h-full bg-red-900 transition-all duration-500"
                            style={{ width: `${fighter2Percentage}%` }}
                          />
                          
                          {/* Center divider */}
                          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black transform -translate-x-1/2" />
                          
                          {/* Fighter names and percentages */}
                          <div className="absolute inset-0 flex items-center justify-between px-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-sm ${
                                fighter1Percentage > 50 ? 'text-white' : 'text-zinc-500'
                              }`}>
                                {result.winner.name.split(' ').pop().toUpperCase()}
                              </span>
                              <span className={`text-xs ${
                                fighter1Percentage > 50 ? 'text-green-100' : 'text-zinc-600'
                              }`}>
                                {fighter1Percentage}%
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${
                                fighter2Percentage > 50 ? 'text-red-100' : 'text-zinc-600'
                              }`}>
                                {fighter2Percentage}%
                              </span>
                              <span className={`font-bold text-sm ${
                                fighter2Percentage > 50 ? 'text-white' : 'text-zinc-500'
                              }`}>
                                {result.loser.name.split(' ').pop().toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Round Summary */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <p className="text-zinc-500 text-sm text-center mb-4">COMMUNITY CONSENSUS</p>
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <p className="text-zinc-600 text-xs mb-1">ROUNDS WON BY</p>
                    <p className="text-white font-bold mb-2">{result.winner.name.split(' ').pop().toUpperCase()}</p>
                    <p className="text-4xl font-black text-green-500">
                      {result.roundByRound.filter(r => r.fighter1 > r.fighter2).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-600 text-xs mb-1">ROUNDS WON BY</p>
                    <p className="text-zinc-400 font-bold mb-2">{result.loser.name.split(' ').pop().toUpperCase()}</p>
                    <p className="text-4xl font-black text-red-500">
                      {result.roundByRound.filter(r => r.fighter2 > r.fighter1).length}
                    </p>
                  </div>
                </div>
                
                {/* Total Votes */}
                <div className="mt-4 text-center">
                  <p className="text-zinc-600 text-xs">TOTAL VOTES ACROSS ALL ROUNDS</p>
                  <p className="text-zinc-400 font-bold">12,000</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Punch Statistics */}
        {result.punchStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-black text-white mb-2">PUNCH STATISTICS</h3>
            <p className="text-zinc-500 text-sm mb-6">COMPUBOX NUMBERS</p>
            
            <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
              {/* Headers */}
              <div className="grid grid-cols-5 bg-black border-b border-zinc-800">
                <div className="p-4 text-center">
                  <p className="text-zinc-500 text-xs font-bold">PUNCHES</p>
                </div>
                <div className="p-4 text-center border-l border-zinc-800">
                  <p className="text-white font-bold">{result.punchStats.fighter1.name.toUpperCase()}</p>
                </div>
                <div className="p-4 text-center border-l border-zinc-800">
                  <p className="text-zinc-500 text-xs font-bold">CATEGORY</p>
                </div>
                <div className="p-4 text-center border-l border-zinc-800">
                  <p className="text-white font-bold">{result.punchStats.fighter2.name.toUpperCase()}</p>
                </div>
                <div className="p-4 text-center border-l border-zinc-800">
                  <p className="text-zinc-500 text-xs font-bold">PUNCHES</p>
                </div>
              </div>

              {/* Stats Rows */}
              {['total', 'jabs', 'power', 'body'].map((category) => {
                const fighter1Landed = result.punchStats.fighter1[category].landed;
                const fighter2Landed = result.punchStats.fighter2[category].landed;
                const totalLanded = fighter1Landed + fighter2Landed;
                const fighter1Percentage = totalLanded > 0 ? Math.round((fighter1Landed / totalLanded) * 100) : 50;
                const fighter2Percentage = 100 - fighter1Percentage;
                
                return (
                  <div key={category} className={`${category === 'total' ? 'bg-zinc-800' : ''}`}>
                    <div className="grid grid-cols-5 border-b border-zinc-800">
                      {/* Fighter 1 Stats */}
                      <div className="p-4 text-center">
                        <p className={`font-bold ${category === 'total' ? 'text-white text-lg' : 'text-zinc-400'}`}>
                          {fighter1Landed} / {result.punchStats.fighter1[category].thrown}
                        </p>
                        <p className="text-zinc-600 text-xs">{result.punchStats.fighter1[category].percentage}%</p>
                      </div>
                      
                      {/* Visual Comparison Bar - Spans 3 columns */}
                      <div className="col-span-3 p-4 border-x border-zinc-800">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs ${fighter1Landed > fighter2Landed ? 'text-green-500 font-bold' : 'text-zinc-600'}`}>
                            {fighter1Percentage}%
                          </span>
                          <div className="flex-1 h-8 bg-zinc-800 relative overflow-hidden">
                            {/* Fighter 1 bar (green) */}
                            <div 
                              className="absolute left-0 top-0 h-full bg-green-600 transition-all duration-500"
                              style={{ width: `${fighter1Percentage}%` }}
                            />
                            {/* Fighter 2 bar (red) */}
                            <div 
                              className="absolute right-0 top-0 h-full bg-red-600 transition-all duration-500"
                              style={{ width: `${fighter2Percentage}%` }}
                            />
                            {/* Center line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black transform -translate-x-1/2" />
                          </div>
                          <span className={`text-xs ${fighter2Landed > fighter1Landed ? 'text-red-500 font-bold' : 'text-zinc-600'}`}>
                            {fighter2Percentage}%
                          </span>
                        </div>
                        <p className={`text-center text-xs font-bold uppercase ${category === 'total' ? 'text-white' : 'text-zinc-500'}`}>
                          {category === 'total' ? 'TOTAL PUNCHES' : category === 'jabs' ? 'JABS' : category === 'power' ? 'POWER PUNCHES' : 'BODY SHOTS'}
                        </p>
                      </div>
                      
                      {/* Fighter 2 Stats */}
                      <div className="p-4 text-center">
                        <p className={`font-bold ${category === 'total' ? 'text-white text-lg' : 'text-zinc-400'}`}>
                          {fighter2Landed} / {result.punchStats.fighter2[category].thrown}
                        </p>
                        <p className="text-zinc-600 text-xs">{result.punchStats.fighter2[category].percentage}%</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Fight Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Betting Odds */}
          {(result.winner.odds || result.loser.odds) && (
            <div className="bg-zinc-900 border border-zinc-800 p-6">
              <h4 className="text-lg font-bold text-white mb-4">BETTING ODDS</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white">{result.winner.name}</span>
                  <span className="text-2xl font-bold text-green-500">{result.winner.odds}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">{result.loser.name}</span>
                  <span className="text-2xl font-bold text-zinc-500">{result.loser.odds}</span>
                </div>
              </div>
            </div>
          )}

          {/* Fight Info */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <h4 className="text-lg font-bold text-white mb-4">FIGHT INFORMATION</h4>
            <div className="space-y-3">
              <div>
                <p className="text-zinc-600 text-sm">WEIGHT CLASS</p>
                <p className="text-white font-bold">{result.weightClass}</p>
              </div>
              {result.isChampionship && (
                <div>
                  <p className="text-zinc-600 text-sm">TITLE DEFENSE</p>
                  <p className="text-white font-bold">#{result.titleDefense}</p>
                </div>
              )}
              <div>
                <p className="text-zinc-600 text-sm">TOTAL ROUNDS</p>
                <p className="text-white font-bold">{result.rounds}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultView;