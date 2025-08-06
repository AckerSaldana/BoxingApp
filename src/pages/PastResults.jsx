import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RiSearchLine, 
  RiCalendarLine, 
  RiMapPinLine,
  RiTrophyFill,
  RiStarFill,
  RiFlashlightFill,
  RiArrowDownLine,
  RiArrowUpLine,
  RiTimeLine,
  RiFireLine
} from 'react-icons/ri';
import { GiBoxingGlove } from 'react-icons/gi';
import { FaSortAmountDown } from 'react-icons/fa';
import { mockExtendedResults } from '../data/mockResults';

const PastResults = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('ALL');
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('ALL');
  const [dateRange, setDateRange] = useState('ALL');
  const [showChampionshipOnly, setShowChampionshipOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Get unique weight classes
  const weightClasses = ['ALL', ...new Set(mockExtendedResults.map(r => r.weightClass))];

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    let filtered = mockExtendedResults.filter(result => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        result.winner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.loser.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Weight class filter (now supports multi-select)
      const weightMatch = selectedWeights.length === 0 || 
        selectedWeight === 'ALL' || 
        result.weightClass === selectedWeight ||
        selectedWeights.includes(result.weightClass);

      // Method filter
      const methodMatch = selectedMethod === 'ALL' || 
        (selectedMethod === 'KO/TKO' && (result.method === 'KO' || result.method === 'TKO')) ||
        (selectedMethod === 'DECISION' && (result.method === 'UD' || result.method === 'SD' || result.method === 'MD'));

      // Championship filter
      const championshipMatch = !showChampionshipOnly || result.isChampionship;

      // Date filter (simplified for now)
      const dateMatch = dateRange === 'ALL'; // Would implement actual date filtering

      return searchMatch && weightMatch && methodMatch && championshipMatch && dateMatch;
    });

    // Sort results
    filtered.sort((a, b) => {
      let compareValue = 0;
      
      switch(sortBy) {
        case 'date':
          compareValue = new Date(b.date) - new Date(a.date);
          break;
        case 'method':
          const methodOrder = { 'KO': 0, 'TKO': 1, 'UD': 2, 'SD': 3, 'MD': 4 };
          compareValue = methodOrder[a.method] - methodOrder[b.method];
          break;
        case 'upset':
          compareValue = b.isUpset - a.isUpset;
          break;
        case 'rating':
          compareValue = (b.rating || 0) - (a.rating || 0);
          break;
        default:
          compareValue = 0;
      }
      
      return sortOrder === 'desc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [searchTerm, selectedWeight, selectedWeights, selectedMethod, showChampionshipOnly, dateRange, sortBy, sortOrder]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredAndSortedResults.length;
    const knockouts = filteredAndSortedResults.filter(r => r.method === 'KO' || r.method === 'TKO').length;
    const decisions = filteredAndSortedResults.filter(r => ['UD', 'SD', 'MD'].includes(r.method)).length;
    const upsets = filteredAndSortedResults.filter(r => r.isUpset).length;

    return {
      total,
      koRate: total > 0 ? Math.round((knockouts / total) * 100) : 0,
      decisionRate: total > 0 ? Math.round((decisions / total) * 100) : 0,
      upsetRate: total > 0 ? Math.round((upsets / total) * 100) : 0
    };
  }, [filteredAndSortedResults]);

  const getMethodColor = (method) => {
    if (method === 'KO' || method === 'TKO') return 'text-red-900';
    if (['UD', 'SD', 'MD'].includes(method)) return 'text-white';
    return 'text-zinc-500';
  };

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

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-zinc-900 to-black border-b border-zinc-800">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">PAST RESULTS</h1>
            <p className="text-zinc-500 mb-8">RECENT FIGHT OUTCOMES & HISTORY</p>

            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search Bar with Sort Controls */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <RiSearchLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="SEARCH FIGHTERS..."
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
                    <option value="method">METHOD</option>
                    <option value="upset">UPSETS</option>
                    <option value="rating">RATING</option>
                  </select>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 hover:border-red-900 transition-colors"
                  >
                    {sortOrder === 'desc' ? <RiArrowDownLine className="w-5 h-5" /> : <RiArrowUpLine className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

                {/* Method */}
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-red-900 transition-colors font-bold tracking-wider appearance-none cursor-pointer"
                >
                  <option value="ALL">ALL METHODS</option>
                  <option value="KO/TKO">KO/TKO</option>
                  <option value="DECISION">DECISION</option>
                </select>

                {/* Date Range */}
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-red-900 transition-colors font-bold tracking-wider appearance-none cursor-pointer"
                >
                  <option value="ALL">ALL TIME</option>
                  <option value="30">LAST 30 DAYS</option>
                  <option value="90">LAST 3 MONTHS</option>
                  <option value="180">LAST 6 MONTHS</option>
                  <option value="365">LAST YEAR</option>
                </select>

                {/* Championship Toggle */}
                <button
                  onClick={() => setShowChampionshipOnly(!showChampionshipOnly)}
                  className={`px-6 py-3 font-bold tracking-wider transition-colors md:col-span-2 lg:col-span-2 ${
                    showChampionshipOnly 
                      ? 'bg-red-900 text-white' 
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white'
                  }`}
                >
                  TITLE FIGHTS ONLY
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Results List */}
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <div className="space-y-6">
          {filteredAndSortedResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => navigate(`/result/${result.id}`)}
              className="bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors cursor-pointer"
            >
              {/* Date Header */}
              <div className="bg-black px-6 py-3 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <RiCalendarLine className="w-4 h-4 text-zinc-500" />
                      <span className="text-white font-bold">
                        {new Date(result.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        }).toUpperCase()}
                      </span>
                    </div>
                    {result.isChampionship && (
                      <div className="flex items-center gap-2">
                        <RiTrophyFill className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-500 text-xs font-bold">
                          {result.titles.join(' / ')} TITLE
                        </span>
                      </div>
                    )}
                    {result.isUpset && (
                      <div className="flex items-center gap-2">
                        <RiFlashlightFill className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-500 text-xs font-bold">UPSET</span>
                      </div>
                    )}
                    {result.fightOfTheNight && (
                      <div className="flex items-center gap-2">
                        <RiFireLine className="w-4 h-4 text-red-600" />
                        <span className="text-red-600 text-xs font-bold">FIGHT OF THE NIGHT</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-sm">
                    <RiMapPinLine className="w-4 h-4" />
                    <span>{result.venue}</span>
                  </div>
                </div>
              </div>

              {/* Fight Result */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Winner */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-zinc-800 flex items-center justify-center">
                        <GiBoxingGlove className="w-8 h-8 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getFlagEmoji(result.winner.nationality)}</span>
                          <h3 className="text-xl font-bold text-white">{result.winner.name}</h3>
                          <span className="bg-green-900 text-green-100 text-xs px-2 py-1 font-bold">WIN</span>
                        </div>
                        <p className="text-zinc-500">{result.winner.record}</p>
                        {result.winner.odds && (
                          <p className="text-sm text-zinc-600">Odds: {result.winner.odds}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Method */}
                  <div className="lg:col-span-2 text-center">
                    <p className={`text-2xl font-bold ${getMethodColor(result.method)}`}>
                      {result.method}
                    </p>
                    <p className="text-zinc-500 text-sm">{result.methodDetail}</p>
                    {result.time ? (
                      <p className="text-zinc-600 text-xs mt-1">R{result.rounds} - {result.time}</p>
                    ) : (
                      <p className="text-zinc-600 text-xs mt-1">After {result.rounds} Rounds</p>
                    )}
                  </div>

                  {/* Loser */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4 lg:flex-row-reverse">
                      <div className="w-16 h-16 bg-zinc-800 flex items-center justify-center">
                        <GiBoxingGlove className="w-8 h-8 text-red-500 transform scale-x-[-1]" />
                      </div>
                      <div className="flex-1 lg:text-right">
                        <div className="flex items-center gap-3 lg:justify-end">
                          <span className="bg-red-900 text-red-100 text-xs px-2 py-1 font-bold">LOSS</span>
                          <h3 className="text-xl font-bold text-zinc-400">{result.loser.name}</h3>
                          <span className="text-2xl">{getFlagEmoji(result.loser.nationality)}</span>
                        </div>
                        <p className="text-zinc-500">{result.loser.record}</p>
                        {result.loser.odds && (
                          <p className="text-sm text-zinc-600">Odds: {result.loser.odds}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weight Class and Rating */}
                <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-500 text-sm">{result.weightClass} Division</span>
                    {result.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <RiStarFill 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(result.rating) ? 'text-yellow-500' : 'text-zinc-700'}`} 
                          />
                        ))}
                        <span className="text-xs text-zinc-500 ml-1">({result.rating})</span>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/result/${result.id}`);
                    }}
                    className="text-red-900 hover:text-red-700 font-bold text-sm tracking-wider transition-colors"
                  >
                    VIEW DETAILS →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedResults.length === 0 && (
          <div className="text-center py-20">
            <GiBoxingGlove className="w-20 h-20 text-zinc-800 mx-auto mb-4" />
            <p className="text-zinc-500 text-lg">NO RESULTS FOUND</p>
            <p className="text-zinc-600 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastResults;