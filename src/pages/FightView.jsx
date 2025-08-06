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
  RiTvLine
} from 'react-icons/ri';
import { GiBoxingGlove } from 'react-icons/gi';

// Extended mock fight data
const mockFightDetails = {
  1: {
    id: 1,
    fighter1: { 
      name: 'Canelo Alvarez', 
      nickname: 'Canelo',
      record: '58-2-2',
      age: 33,
      height: "5'8\"",
      reach: "70.5\"",
      stance: 'Orthodox',
      nationality: 'Mexico',
      kos: 39,
      titles: ['WBA', 'WBC', 'IBF', 'WBO'],
      lastFights: [
        { opponent: 'John Ryder', result: 'W', method: 'UD' },
        { opponent: 'Dmitry Bivol', result: 'L', method: 'UD' },
        { opponent: 'Caleb Plant', result: 'W', method: 'TKO' },
        { opponent: 'Billy Joe Saunders', result: 'W', method: 'TKO' },
        { opponent: 'Avni Yildirim', result: 'W', method: 'TKO' },
      ]
    },
    fighter2: { 
      name: 'Jermell Charlo', 
      nickname: 'Iron Man',
      record: '35-1-1',
      age: 33,
      height: "6'0\"",
      reach: "73\"",
      stance: 'Orthodox',
      nationality: 'USA',
      kos: 19,
      titles: ['WBA', 'WBC', 'IBF', 'WBO'],
      lastFights: [
        { opponent: 'Brian Castano', result: 'W', method: 'KO' },
        { opponent: 'Brian Castano', result: 'D', method: 'SD' },
        { opponent: 'Jeison Rosario', result: 'W', method: 'KO' },
        { opponent: 'Jorge Cota', result: 'W', method: 'KO' },
        { opponent: 'Tony Harrison', result: 'W', method: 'TKO' },
      ]
    },
    date: '2024-09-30',
    time: '9:00 PM ET',
    venue: 'T-Mobile Arena, Las Vegas',
    weightClass: 'Super Middleweight',
    isChampionship: true,
    isPPV: true,
    titles: 'Undisputed Super Middleweight Championship',
    broadcast: {
      ppv: ['DAZN PPV', 'ESPN+ PPV'],
      international: ['Sky Sports Box Office', 'FITE TV'],
      price: '$79.99'
    },
    odds: {
      fighter1: '-450',
      fighter2: '+350',
      overUnder: { rounds: 9.5, over: '-110', under: '-110' },
      props: [
        { name: 'Fight goes distance', odds: '+150' },
        { name: 'Canelo by KO/TKO', odds: '+200' },
        { name: 'Canelo by Decision', odds: '-150' },
        { name: 'Charlo by KO/TKO', odds: '+600' },
        { name: 'Charlo by Decision', odds: '+450' },
        { name: 'Draw', odds: '+1600' },
      ]
    },
    predictions: {
      total: 15420,
      fighter1Percentage: 78,
      fighter2Percentage: 22
    },
    analysis: {
      overview: "Canelo Alvarez puts his undisputed super middleweight crown on the line against Jermell Charlo, who moves up two weight classes for this mega-fight. This clash of champions promises fireworks as Canelo looks to defend his throne against the ambitious Charlo.",
      keys: [
        "Canelo's experience at 168 pounds vs Charlo's power at 154",
        "Charlo's size advantage could play a crucial role",
        "Both fighters possess knockout power and elite skills",
        "Canelo's body work vs Charlo's jab will be key"
      ]
    }
  },
  // Add more fight details for other IDs as needed
};

const FightView = () => {
  const { fightId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userPrediction, setUserPrediction] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  const fight = mockFightDetails[fightId] || mockFightDetails[1]; // Fallback to first fight

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(fight.date) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [fight.date]);

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

  const getLastFightResult = (result, method) => {
    const colors = {
      'W': 'text-green-500',
      'L': 'text-red-500',
      'D': 'text-yellow-500'
    };
    return (
      <span className={`${colors[result]} font-bold`}>
        {result} ({method})
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header with Back Button */}
      <div className="bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
          >
            <RiArrowLeftLine className="w-5 h-5" />
            <span className="font-bold tracking-wider text-sm">BACK TO FIGHTS</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
        {/* Corner Graphics */}
        <div className="absolute top-0 left-0 w-48 h-48">
          <div className="absolute top-8 left-8 w-32 h-32 border-l-4 border-t-4 border-red-900" />
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48">
          <div className="absolute bottom-8 right-8 w-32 h-32 border-r-4 border-b-4 border-red-900" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {fight.isChampionship && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <RiTrophyFill className="w-6 h-6 text-yellow-500" />
                <p className="text-yellow-500 font-bold tracking-widest">
                  {fight.titles.toUpperCase()}
                </p>
                <RiTrophyFill className="w-6 h-6 text-yellow-500" />
              </div>
            )}

            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-right">
                <h2 className="text-5xl lg:text-7xl font-black text-white">
                  {fight.fighter1.name.split(' ').pop().toUpperCase()}
                </h2>
                <p className="text-zinc-500 text-lg">{fight.fighter1.record}</p>
                <span className="text-3xl">{getFlagEmoji(fight.fighter1.nationality)}</span>
              </div>
              
              <div className="text-4xl lg:text-5xl font-bold text-zinc-400">VS</div>
              
              <div className="text-left">
                <h2 className="text-5xl lg:text-7xl font-black text-white">
                  {fight.fighter2.name.split(' ').pop().toUpperCase()}
                </h2>
                <p className="text-zinc-500 text-lg">{fight.fighter2.record}</p>
                <span className="text-3xl">{getFlagEmoji(fight.fighter2.nationality)}</span>
              </div>
            </div>

            {/* Event Details */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400 mb-8">
              <div className="flex items-center gap-2">
                <RiCalendarLine className="w-4 h-4" />
                <span>{new Date(fight.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <RiTimeLine className="w-4 h-4" />
                <span>{fight.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <RiMapPinLine className="w-4 h-4" />
                <span>{fight.venue}</span>
              </div>
            </div>

            {/* Countdown Timer */}
            {Object.keys(timeLeft).length > 0 && (
              <div className="flex gap-4 justify-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-zinc-900 border border-zinc-800 px-4 py-2">
                      <p className="text-3xl font-bold text-white">{value || 0}</p>
                    </div>
                    <p className="text-xs text-zinc-600 mt-1 uppercase">{unit}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Broadcast Bar */}
      {fight.broadcast && (
        <div className="bg-black border-y border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <RiTvLine className="w-5 h-5 text-red-900" />
                  <span className="text-zinc-500 text-sm font-bold tracking-wider">WATCH ON</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {fight.broadcast.ppv.map((channel, index) => (
                    <span key={index} className="text-white">
                      {channel}
                    </span>
                  ))}
                  {fight.broadcast.international && fight.broadcast.international.map((channel, index) => (
                    <span key={index} className="text-zinc-400">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              {fight.broadcast.price && (
                <div className="bg-red-900 px-4 py-2">
                  <span className="text-white font-bold text-sm">{fight.broadcast.price}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Fighter Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Fighter 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-white">{fight.fighter1.name.toUpperCase()}</h3>
                <p className="text-zinc-500">"{fight.fighter1.nickname}"</p>
              </div>
              <div className="flex gap-2">
                {fight.fighter1.titles.map((title) => (
                  <span key={title} className="bg-yellow-600 text-black text-xs font-bold px-2 py-1">
                    {title}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-600 text-sm">AGE</p>
                  <p className="text-white font-bold">{fight.fighter1.age}</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-sm">HEIGHT</p>
                  <p className="text-white font-bold">{fight.fighter1.height}</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-sm">REACH</p>
                  <p className="text-white font-bold">{fight.fighter1.reach}</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-sm">STANCE</p>
                  <p className="text-white font-bold">{fight.fighter1.stance}</p>
                </div>
              </div>

              <div>
                <p className="text-zinc-600 text-sm mb-2">LAST 5 FIGHTS</p>
                <div className="space-y-2">
                  {fight.fighter1.lastFights.map((fight, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-zinc-400">{fight.opponent}</span>
                      {getLastFightResult(fight.result, fight.method)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fighter 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-white">{fight.fighter2.name.toUpperCase()}</h3>
                <p className="text-zinc-500">"{fight.fighter2.nickname}"</p>
              </div>
              <div className="flex gap-2">
                {fight.fighter2.titles.map((title) => (
                  <span key={title} className="bg-yellow-600 text-black text-xs font-bold px-2 py-1">
                    {title}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-600 text-sm">AGE</p>
                  <p className="text-white font-bold">{fight.fighter2.age}</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-sm">HEIGHT</p>
                  <p className="text-white font-bold">{fight.fighter2.height}</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-sm">REACH</p>
                  <p className="text-white font-bold">{fight.fighter2.reach}</p>
                </div>
                <div>
                  <p className="text-zinc-600 text-sm">STANCE</p>
                  <p className="text-white font-bold">{fight.fighter2.stance}</p>
                </div>
              </div>

              <div>
                <p className="text-zinc-600 text-sm mb-2">LAST 5 FIGHTS</p>
                <div className="space-y-2">
                  {fight.fighter2.lastFights.map((fight, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-zinc-400">{fight.opponent}</span>
                      {getLastFightResult(fight.result, fight.method)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tale of the Tape */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 mb-12">
          <h3 className="text-2xl font-black text-white mb-6 text-center">TALE OF THE TAPE</h3>
          
          <div className="space-y-6">
            {/* Height Comparison */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-white">{fight.fighter1.height}</span>
                <span className="text-zinc-500 text-sm">HEIGHT</span>
                <span className="text-white">{fight.fighter2.height}</span>
              </div>
              <div className="relative h-2 bg-zinc-800">
                <div className="absolute left-0 top-0 h-full bg-red-900" style={{ width: '45%' }} />
                <div className="absolute right-0 top-0 h-full bg-zinc-600" style={{ width: '50%' }} />
              </div>
            </div>

            {/* Reach Comparison */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-white">{fight.fighter1.reach}</span>
                <span className="text-zinc-500 text-sm">REACH</span>
                <span className="text-white">{fight.fighter2.reach}</span>
              </div>
              <div className="relative h-2 bg-zinc-800">
                <div className="absolute left-0 top-0 h-full bg-red-900" style={{ width: '48%' }} />
                <div className="absolute right-0 top-0 h-full bg-zinc-600" style={{ width: '52%' }} />
              </div>
            </div>

            {/* Age Comparison */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-white">{fight.fighter1.age}</span>
                <span className="text-zinc-500 text-sm">AGE</span>
                <span className="text-white">{fight.fighter2.age}</span>
              </div>
              <div className="relative h-2 bg-zinc-800">
                <div className="absolute left-0 top-0 h-full bg-red-900" style={{ width: '50%' }} />
                <div className="absolute right-0 top-0 h-full bg-zinc-600" style={{ width: '50%' }} />
              </div>
            </div>

            {/* Stance Comparison */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-white">{fight.fighter1.stance.toUpperCase()}</span>
                <span className="text-zinc-500 text-sm">STANCE</span>
                <span className="text-white">{fight.fighter2.stance.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className={`flex-1 h-2 ${fight.fighter1.stance === 'Southpaw' ? 'bg-red-900' : 'bg-zinc-600'}`} />
                <div className="text-xs text-zinc-500">VS</div>
                <div className={`flex-1 h-2 ${fight.fighter2.stance === 'Southpaw' ? 'bg-red-900' : 'bg-zinc-600'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-12">
          <div className="flex border-b border-zinc-800">
            {['overview', 'odds', 'predictions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-bold tracking-wider transition-colors ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-red-900'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-zinc-900 border border-zinc-800 p-6">
                  <h4 className="text-xl font-bold text-white mb-4">FIGHT OVERVIEW</h4>
                  <p className="text-zinc-400 leading-relaxed">{fight.analysis.overview}</p>
                  
                  <h5 className="text-lg font-bold text-white mt-6 mb-3">KEYS TO VICTORY</h5>
                  <ul className="space-y-2">
                    {fight.analysis.keys.map((key, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-900 mt-1">•</span>
                        <span className="text-zinc-400">{key}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Odds Tab */}
            {activeTab === 'odds' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div className="bg-zinc-900 border border-zinc-800 p-6">
                  <h4 className="text-xl font-bold text-white mb-4">MONEYLINE</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">{fight.fighter1.name}</span>
                      <span className="text-2xl font-bold text-red-900">{fight.odds.fighter1}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">{fight.fighter2.name}</span>
                      <span className="text-2xl font-bold text-zinc-400">{fight.odds.fighter2}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6">
                  <h4 className="text-xl font-bold text-white mb-4">OVER/UNDER {fight.odds.overUnder.rounds} ROUNDS</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800 p-4 text-center">
                      <p className="text-zinc-500 text-sm">OVER</p>
                      <p className="text-xl font-bold text-white">{fight.odds.overUnder.over}</p>
                    </div>
                    <div className="bg-zinc-800 p-4 text-center">
                      <p className="text-zinc-500 text-sm">UNDER</p>
                      <p className="text-xl font-bold text-white">{fight.odds.overUnder.under}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6">
                  <h4 className="text-xl font-bold text-white mb-4">PROP BETS</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fight.odds.props.map((prop, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-zinc-400">{prop.name}</span>
                        <span className="text-white font-bold">{prop.odds}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Predictions Tab */}
            {activeTab === 'predictions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-zinc-900 border border-zinc-800 p-6">
                  <h4 className="text-xl font-bold text-white mb-6">COMMUNITY PREDICTIONS</h4>
                  
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-white">{fight.fighter1.name}</span>
                      <span className="text-white">{fight.fighter2.name}</span>
                    </div>
                    <div className="relative h-8 bg-zinc-800 overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-red-900 flex items-center justify-start pl-4"
                        style={{ width: `${fight.predictions.fighter1Percentage}%` }}
                      >
                        <span className="text-white font-bold">{fight.predictions.fighter1Percentage}%</span>
                      </div>
                      <div 
                        className="absolute right-0 top-0 h-full bg-zinc-600 flex items-center justify-end pr-4"
                        style={{ width: `${fight.predictions.fighter2Percentage}%` }}
                      >
                        <span className="text-white font-bold">{fight.predictions.fighter2Percentage}%</span>
                      </div>
                    </div>
                    <p className="text-center text-zinc-500 text-sm mt-2">
                      {fight.predictions.total.toLocaleString()} TOTAL PREDICTIONS
                    </p>
                  </div>

                  {!userPrediction && (
                    <div>
                      <h5 className="text-lg font-bold text-white mb-4">MAKE YOUR PREDICTION</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setUserPrediction('fighter1')}
                          className="bg-zinc-800 hover:bg-red-900 text-white py-4 font-bold tracking-wider transition-colors"
                        >
                          {fight.fighter1.name.toUpperCase()}
                        </button>
                        <button
                          onClick={() => setUserPrediction('fighter2')}
                          className="bg-zinc-800 hover:bg-red-900 text-white py-4 font-bold tracking-wider transition-colors"
                        >
                          {fight.fighter2.name.toUpperCase()}
                        </button>
                      </div>
                    </div>
                  )}

                  {userPrediction && (
                    <div className="bg-zinc-800 p-4 text-center">
                      <p className="text-green-500 font-bold mb-2">PREDICTION SUBMITTED!</p>
                      <p className="text-white">
                        You predicted: {userPrediction === 'fighter1' ? fight.fighter1.name : fight.fighter2.name}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FightView;