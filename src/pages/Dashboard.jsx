import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FightCard from '../components/fights/FightCard';
import { RiTimeLine, RiMapPinLine } from 'react-icons/ri';

// Mock data for upcoming fights
const mockFights = [
  {
    id: 1,
    fighter1: { name: 'Canelo Alvarez', record: '58-2-2', image: null },
    fighter2: { name: 'Jermell Charlo', record: '35-1-1', image: null },
    date: '2024-09-30',
    venue: 'T-Mobile Arena, Las Vegas',
    weightClass: 'Super Middleweight',
    isChampionship: true,
    isPPV: true,
  },
  {
    id: 2,
    fighter1: { name: 'Terence Crawford', record: '40-0-0', image: null },
    fighter2: { name: 'Errol Spence Jr.', record: '28-0-0', image: null },
    date: '2024-10-15',
    venue: 'MGM Grand, Las Vegas',
    weightClass: 'Welterweight',
    isChampionship: true,
    isPPV: true,
  },
  {
    id: 3,
    fighter1: { name: 'Gervonta Davis', record: '29-0-0', image: null },
    fighter2: { name: 'Ryan Garcia', record: '24-1-0', image: null },
    date: '2024-10-28',
    venue: 'Barclays Center, Brooklyn',
    weightClass: 'Lightweight',
    isChampionship: false,
    isPPV: true,
  },
];

// Mock data for past results
const mockPastResults = [
  {
    id: 1,
    winner: 'Devin Haney',
    loser: 'Vasiliy Lomachenko',
    method: 'UD',
    rounds: '12',
    date: '2024-05-20',
    weightClass: 'Lightweight',
  },
  {
    id: 2,
    winner: 'Dmitry Bivol',
    loser: 'Canelo Alvarez',
    method: 'UD',
    rounds: '12',
    date: '2024-05-07',
    weightClass: 'Light Heavyweight',
  },
  {
    id: 3,
    winner: 'Jaron Ennis',
    loser: 'Custio Clayton',
    method: 'KO',
    rounds: '2',
    date: '2024-05-07',
    weightClass: 'Welterweight',
  },
];

// Mock data for betting odds
const mockBettingOdds = [
  {
    id: 1,
    fight: 'Canelo vs Charlo',
    fighter1: { name: 'Canelo Alvarez', odds: '-450' },
    fighter2: { name: 'Jermell Charlo', odds: '+350' },
    overUnder: { rounds: 9.5, over: '-110', under: '-110' },
    props: [
      { name: 'Fight goes distance', odds: '+150' },
      { name: 'Canelo by KO/TKO', odds: '+200' },
    ],
  },
  {
    id: 2,
    fight: 'Crawford vs Spence',
    fighter1: { name: 'Terence Crawford', odds: '-160' },
    fighter2: { name: 'Errol Spence Jr.', odds: '+140' },
    overUnder: { rounds: 10.5, over: '-130', under: '+110' },
    props: [
      { name: 'Fight goes distance', odds: '-150' },
      { name: 'Crawford by decision', odds: '+180' },
    ],
  },
];

// Mock hero fight (next major event)
const heroFight = {
  fighter1: { name: 'Tyson Fury', record: '34-0-1' },
  fighter2: { name: 'Oleksandr Usyk', record: '21-0-0' },
  date: '2024-12-23',
  venue: 'Kingdom Arena, Riyadh',
  title: 'UNDISPUTED HEAVYWEIGHT CHAMPIONSHIP',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(heroFight.date) - new Date();
      
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
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50" />
        
        {/* Corner Graphics */}
        <div className="absolute top-0 left-0 w-48 h-48">
          <div className="absolute top-8 left-8 w-32 h-32 border-l-4 border-t-4 border-red-900" />
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48">
          <div className="absolute bottom-8 right-8 w-32 h-32 border-r-4 border-b-4 border-red-900" />
        </div>

        <div className="relative z-10 h-full flex flex-col px-4">
          {/* NEXT MAIN EVENT - aligned with top corner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-0 right-0 text-center"
          >
            <p className="text-red-900 text-sm font-bold tracking-[0.3em]">NEXT MAIN EVENT</p>
          </motion.div>

          {/* Center content - FURY vs USYK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-none">
                {heroFight.fighter1.name.split(' ').pop().toUpperCase()}
              </h2>
              <p className="text-2xl lg:text-3xl font-bold text-zinc-400 my-2">VS</p>
              <h2 className="text-5xl lg:text-7xl font-black text-white leading-none mb-3">
                {heroFight.fighter2.name.split(' ').pop().toUpperCase()}
              </h2>
              <p className="text-zinc-500 text-sm">{heroFight.title}</p>
            </div>
            
            {/* Countdown */}
            <div className="flex gap-4 justify-center mt-6">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-zinc-900 border border-zinc-800 px-4 py-2">
                    <p className="text-3xl font-bold text-white">{value || 0}</p>
                  </div>
                  <p className="text-xs text-zinc-600 mt-1 uppercase">{unit}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* MAKE PREDICTION button - aligned with bottom corner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 flex justify-center"
            style={{ bottom: '20px' }} // Adjust so button center aligns with corner
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-900 text-white px-8 py-3 font-bold tracking-wider hover:bg-red-800 transition-colors"
            >
              MAKE PREDICTION
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 lg:p-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-white">UPCOMING FIGHTS</h3>
          <button 
            onClick={() => navigate('/fights')}
            className="text-zinc-500 hover:text-white text-sm font-bold tracking-wider transition-colors"
          >
            VIEW ALL
          </button>
        </div>

        {/* Fight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockFights.map((fight) => (
            <FightCard key={fight.id} fight={fight} />
          ))}
        </div>

        {/* Past Results Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-white">PAST RESULTS</h3>
            <button 
              onClick={() => navigate('/results')}
              className="text-zinc-500 hover:text-white text-sm font-bold tracking-wider transition-colors"
            >
              VIEW ALL
            </button>
          </div>
          
          <div className="space-y-4">
            {mockPastResults.map((result) => (
              <div key={result.id} className="bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-700 transition-colors">
                <div className="grid grid-cols-12 items-center gap-4">
                  {/* Fighter Names - Fixed width columns */}
                  <div className="col-span-5">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{result.winner}</span>
                      <span className="text-green-500 text-xs font-bold">W</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-zinc-500">{result.loser}</span>
                      <span className="text-red-500 text-xs font-bold">L</span>
                    </div>
                  </div>
                  
                  {/* Method and Round - Fixed width columns */}
                  <div className="col-span-3 text-center">
                    <p className="text-red-900 font-bold">{result.method}</p>
                    <p className="text-zinc-500 text-sm">Round {result.rounds}</p>
                  </div>
                  
                  {/* Date and Weight Class - Fixed width columns */}
                  <div className="col-span-4 text-right">
                    <p className="text-zinc-500 text-sm">{result.date}</p>
                    <p className="text-zinc-600 text-xs">{result.weightClass}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Betting Odds Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-white">BETTING ODDS</h3>
            <button className="text-zinc-500 hover:text-white text-sm font-bold tracking-wider transition-colors">
              VIEW ALL
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockBettingOdds.map((odds) => (
              <div key={odds.id} className="bg-zinc-900 border border-zinc-800 p-6">
                <h4 className="text-white font-bold mb-4">{odds.fight}</h4>
                
                {/* Moneyline Odds */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800">
                  <div>
                    <p className="text-white">{odds.fighter1.name}</p>
                    <p className="text-2xl font-bold text-red-900">{odds.fighter1.odds}</p>
                  </div>
                  <p className="text-zinc-500 text-sm">VS</p>
                  <div className="text-right">
                    <p className="text-white">{odds.fighter2.name}</p>
                    <p className="text-2xl font-bold text-zinc-400">{odds.fighter2.odds}</p>
                  </div>
                </div>
                
                {/* Over/Under */}
                <div className="mb-4">
                  <p className="text-zinc-500 text-sm mb-2">OVER/UNDER {odds.overUnder.rounds} ROUNDS</p>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-zinc-800 p-2 text-center">
                      <p className="text-xs text-zinc-500">OVER</p>
                      <p className="text-white font-bold">{odds.overUnder.over}</p>
                    </div>
                    <div className="flex-1 bg-zinc-800 p-2 text-center">
                      <p className="text-xs text-zinc-500">UNDER</p>
                      <p className="text-white font-bold">{odds.overUnder.under}</p>
                    </div>
                  </div>
                </div>
                
                {/* Prop Bets */}
                <div>
                  <p className="text-zinc-500 text-sm mb-2">POPULAR PROPS</p>
                  <div className="space-y-2">
                    {odds.props.map((prop, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-zinc-400">{prop.name}</span>
                        <span className="text-white font-bold">{prop.odds}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;