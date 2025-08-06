import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  RiSearchLine, 
  RiCalendarLine, 
  RiMapPinLine,
  RiTrophyFill,
  RiStarFill,
  RiArrowDownLine,
  RiArrowUpLine,
  RiTimeLine,
  RiTvLine
} from 'react-icons/ri';
import { GiBoxingGlove } from 'react-icons/gi';
import FightCard from '../components/fights/FightCard';

// Extended mock data for upcoming fights
const mockUpcomingFights = [
  {
    id: 1,
    fighter1: { name: 'Canelo Alvarez', record: '58-2-2', nationality: 'Mexico', ranking: 1 },
    fighter2: { name: 'Jermell Charlo', record: '35-1-1', nationality: 'USA', ranking: 5 },
    date: '2025-09-30',
    time: '9:00 PM ET',
    venue: 'T-Mobile Arena, Las Vegas',
    location: 'Las Vegas, USA',
    weightClass: 'Super Middleweight',
    isChampionship: true,
    isPPV: true,
    titles: ['WBA', 'WBC', 'IBF', 'WBO'],
    broadcaster: ['DAZN PPV', 'ESPN+ PPV'],
    eventName: 'Undisputed',
    predictions: 12500,
    odds: { fighter1: '-450', fighter2: '+350' }
  },
  {
    id: 2,
    fighter1: { name: 'Terence Crawford', record: '40-0-0', nationality: 'USA', ranking: 2 },
    fighter2: { name: 'Errol Spence Jr.', record: '28-0-0', nationality: 'USA', ranking: 3 },
    date: '2025-10-15',
    time: '10:00 PM ET',
    venue: 'MGM Grand, Las Vegas',
    location: 'Las Vegas, USA',
    weightClass: 'Welterweight',
    isChampionship: true,
    isPPV: true,
    titles: ['WBA', 'WBC', 'IBF', 'WBO'],
    broadcaster: ['Showtime PPV', 'ESPN+ PPV'],
    eventName: 'For All The Belts',
    predictions: 18700,
    odds: { fighter1: '-160', fighter2: '+140' }
  },
  {
    id: 3,
    fighter1: { name: 'Gervonta Davis', record: '29-0-0', nationality: 'USA', ranking: 4 },
    fighter2: { name: 'Ryan Garcia', record: '24-1-0', nationality: 'USA', ranking: 8 },
    date: '2025-10-28',
    time: '8:00 PM ET',
    venue: 'Barclays Center, Brooklyn',
    location: 'New York, USA',
    weightClass: 'Lightweight',
    isChampionship: false,
    isPPV: true,
    titles: [],
    broadcaster: ['DAZN PPV', 'Showtime PPV'],
    eventName: 'Tank vs King Ry',
    predictions: 25300,
    odds: { fighter1: '-250', fighter2: '+200' }
  },
  {
    id: 4,
    fighter1: { name: 'Tyson Fury', record: '34-0-1', nationality: 'UK', ranking: 1 },
    fighter2: { name: 'Francis Ngannou', record: '0-0-0', nationality: 'Cameroon', ranking: null },
    date: '2025-11-05',
    time: '2:00 PM ET',
    venue: 'Kingdom Arena, Riyadh',
    location: 'Riyadh, Saudi Arabia',
    weightClass: 'Heavyweight',
    isChampionship: false,
    isPPV: true,
    titles: [],
    broadcaster: ['ESPN+ PPV', 'TNT Sports Box Office'],
    eventName: 'Battle of the Baddest',
    predictions: 31200,
    odds: { fighter1: '-600', fighter2: '+450' }
  },
  {
    id: 5,
    fighter1: { name: 'Shakur Stevenson', record: '20-0-0', nationality: 'USA', ranking: 6 },
    fighter2: { name: 'William Zepeda', record: '28-0-0', nationality: 'Mexico', ranking: 10 },
    date: '2025-11-18',
    time: '7:00 PM ET',
    venue: 'Madison Square Garden',
    location: 'New York, USA',
    weightClass: 'Lightweight',
    isChampionship: false,
    isPPV: false,
    titles: [],
    broadcaster: ['ESPN'],
    eventName: 'Rising Stars',
    predictions: 8900,
    odds: { fighter1: '-300', fighter2: '+250' }
  }
];

const UpcomingFights = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('ALL');
  const [dateRange, setDateRange] = useState('ALL');
  const [showChampionshipOnly, setShowChampionshipOnly] = useState(false);
  const [showPPVOnly, setShowPPVOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  // Get unique weight classes
  const weightClasses = ['ALL', ...new Set(mockUpcomingFights.map(f => f.weightClass))];

  // Filter and sort fights
  const filteredAndSortedFights = useMemo(() => {
    // First, filter out past fights
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    
    let filtered = mockUpcomingFights.filter(fight => {
      const fightDate = new Date(fight.date);
      // Only include fights from today onwards
      if (fightDate < today) return false;
      
      // Search filter
      const searchMatch = searchTerm === '' || 
        fight.fighter1.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fight.fighter2.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fight.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fight.eventName.toLowerCase().includes(searchTerm.toLowerCase());

      // Weight class filter
      const weightMatch = selectedWeight === 'ALL' || fight.weightClass === selectedWeight;

      // Championship filter
      const championshipMatch = !showChampionshipOnly || fight.isChampionship;

      // PPV filter
      const ppvMatch = !showPPVOnly || fight.isPPV;

      // Date filter
      let dateMatch = true;
      if (dateRange !== 'ALL') {
        const daysDiff = Math.ceil((fightDate - today) / (1000 * 60 * 60 * 24));
        
        switch(dateRange) {
          case 'WEEK':
            dateMatch = daysDiff <= 7;
            break;
          case 'MONTH':
            dateMatch = daysDiff <= 30;
            break;
          case '3MONTHS':
            dateMatch = daysDiff <= 90;
            break;
        }
      }

      return searchMatch && weightMatch && championshipMatch && ppvMatch && dateMatch;
    });

    // Sort results
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch(sortBy) {
        case 'date':
          compareValue = new Date(a.date) - new Date(b.date);
          break;
        case 'predictions':
          compareValue = b.predictions - a.predictions;
          break;
        case 'weightClass':
          compareValue = a.weightClass.localeCompare(b.weightClass);
          break;
        default:
          compareValue = 0;
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [searchTerm, selectedWeight, dateRange, showChampionshipOnly, showPPVOnly, sortBy, sortOrder]);

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  // Calculate days until next fight
  const getTimeUntilFight = (fightDate) => {
    const now = new Date();
    const fight = new Date(fightDate);
    const diff = fight - now;
    
    if (diff < 0) return 'PAST';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days === 0) return `${hours}H`;
    if (days === 1) return '1 DAY';
    return `${days} DAYS`;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
        {/* Corner Graphics */}
        <div className="absolute top-0 left-0 w-48 h-48">
          <div className="absolute top-8 left-8 w-32 h-32 border-l-4 border-t-4 border-red-900" />
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48">
          <div className="absolute bottom-8 right-8 w-32 h-32 border-r-4 border-b-4 border-red-900" />
        </div>

        <div className="relative z-10 px-6 py-8 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">UPCOMING FIGHTS</h1>
            <p className="text-zinc-500 mb-8">SCHEDULED BOUTS & EVENTS</p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <GiBoxingGlove className="w-5 h-5 text-red-900" />
                <span className="text-white font-bold">{filteredAndSortedFights.length}</span>
                <span className="text-zinc-500">FIGHTS</span>
              </div>
              <div className="flex items-center gap-2">
                <RiTrophyFill className="w-5 h-5 text-yellow-500" />
                <span className="text-white font-bold">
                  {filteredAndSortedFights.filter(f => f.isChampionship).length}
                </span>
                <span className="text-zinc-500">TITLE FIGHTS</span>
              </div>
              <div className="flex items-center gap-2">
                <RiStarFill className="w-5 h-5 text-yellow-500" />
                <span className="text-white font-bold">
                  {filteredAndSortedFights.filter(f => f.isPPV).length}
                </span>
                <span className="text-zinc-500">PPV EVENTS</span>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Search Bar with Sort Controls */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <RiSearchLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="SEARCH FIGHTERS, VENUES, EVENTS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-red-900 transition-colors placeholder-zinc-600 font-bold tracking-wider"
                  />
                </div>
                
                {/* Sort Controls */}
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-red-900 transition-colors font-bold tracking-wider appearance-none cursor-pointer"
                  >
                    <option value="date">DATE</option>
                    <option value="predictions">POPULARITY</option>
                    <option value="weightClass">WEIGHT</option>
                  </select>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 hover:border-red-900 transition-colors"
                  >
                    {sortOrder === 'asc' ? <RiArrowUpLine className="w-5 h-5" /> : <RiArrowDownLine className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Weight Class */}
                <select
                  value={selectedWeight}
                  onChange={(e) => setSelectedWeight(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-red-900 transition-colors font-bold tracking-wider appearance-none cursor-pointer"
                >
                  {weightClasses.map(weight => (
                    <option key={weight} value={weight}>
                      {weight === 'ALL' ? 'ALL WEIGHTS' : weight.toUpperCase()}
                    </option>
                  ))}
                </select>

                {/* Date Range */}
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-red-900 transition-colors font-bold tracking-wider appearance-none cursor-pointer"
                >
                  <option value="ALL">ALL DATES</option>
                  <option value="WEEK">THIS WEEK</option>
                  <option value="MONTH">THIS MONTH</option>
                  <option value="3MONTHS">NEXT 3 MONTHS</option>
                </select>

                {/* Championship Toggle */}
                <button
                  onClick={() => setShowChampionshipOnly(!showChampionshipOnly)}
                  className={`px-6 py-3 font-bold tracking-wider transition-colors ${
                    showChampionshipOnly 
                      ? 'bg-red-900 text-white' 
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white'
                  }`}
                >
                  TITLE FIGHTS
                </button>

                {/* PPV Toggle */}
                <button
                  onClick={() => setShowPPVOnly(!showPPVOnly)}
                  className={`px-6 py-3 font-bold tracking-wider transition-colors ${
                    showPPVOnly 
                      ? 'bg-yellow-600 text-black' 
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white'
                  }`}
                >
                  PPV ONLY
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fights List */}
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Group fights by month */}
          {Object.entries(
            filteredAndSortedFights.reduce((acc, fight) => {
              const monthYear = new Date(fight.date).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              });
              if (!acc[monthYear]) acc[monthYear] = [];
              acc[monthYear].push(fight);
              return acc;
            }, {})
          ).map(([monthYear, fights]) => (
            <div key={monthYear} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-black text-white">{monthYear.toUpperCase()}</h2>
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="text-zinc-500 text-sm font-bold">{fights.length} FIGHTS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {fights.map((fight, index) => (
                  <motion.div
                    key={fight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative"
                  >
                    {/* Countdown Badge */}
                    <div className="absolute -top-3 -right-3 z-10 bg-red-900 px-3 py-1">
                      <span className="text-white font-bold text-xs">
                        {getTimeUntilFight(fight.date)}
                      </span>
                    </div>

                    {/* Enhanced Fight Card */}
                    <div className="bg-zinc-900 border border-zinc-800 overflow-hidden h-full">
                      <FightCard fight={fight} />
                      
                      {/* Additional Info */}
                      <div className="px-6 pb-4 space-y-2 border-t border-zinc-800">
                        {/* Event Name */}
                        {fight.eventName && (
                          <p className="text-red-900 font-bold text-sm text-center">
                            {fight.eventName.toUpperCase()}
                          </p>
                        )}
                        
                        {/* Broadcasting */}
                        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                          <RiTvLine className="w-3 h-3" />
                          <span>{fight.broadcaster.join(' / ')}</span>
                        </div>

                        {/* Predictions Count */}
                        <div className="flex items-center justify-center gap-2 text-xs text-zinc-600">
                          <span>{fight.predictions.toLocaleString()} predictions made</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* No Results */}
          {filteredAndSortedFights.length === 0 && (
            <div className="text-center py-20">
              <GiBoxingGlove className="w-20 h-20 text-zinc-800 mx-auto mb-4" />
              <p className="text-zinc-500 text-lg">NO FIGHTS FOUND</p>
              <p className="text-zinc-600 text-sm mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingFights;