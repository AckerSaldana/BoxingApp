import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiSearchLine, RiGridFill, RiListUnordered } from 'react-icons/ri';
import { GiBoxingGlove } from 'react-icons/gi';
import FighterCard from '../components/fighters/FighterCard';

// Mock fighter data
const mockFighters = [
  {
    id: 1,
    name: 'Canelo Alvarez',
    nickname: 'Canelo',
    record: { wins: 58, losses: 2, draws: 2 },
    weightClass: 'Super Middleweight',
    nationality: 'Mexico',
    isChampion: true,
    ranking: 1,
    titles: ['WBA', 'WBC', 'IBF', 'WBO'],
  },
  {
    id: 2,
    name: 'Terence Crawford',
    nickname: 'Bud',
    record: { wins: 40, losses: 0, draws: 0 },
    weightClass: 'Welterweight',
    nationality: 'USA',
    isChampion: true,
    ranking: 1,
    titles: ['WBO'],
  },
  {
    id: 3,
    name: 'Gervonta Davis',
    nickname: 'Tank',
    record: { wins: 29, losses: 0, draws: 0 },
    weightClass: 'Lightweight',
    nationality: 'USA',
    isChampion: true,
    ranking: 1,
    titles: ['WBA'],
  },
  {
    id: 4,
    name: 'Tyson Fury',
    nickname: 'The Gypsy King',
    record: { wins: 34, losses: 0, draws: 1 },
    weightClass: 'Heavyweight',
    nationality: 'UK',
    isChampion: true,
    ranking: 1,
    titles: ['WBC'],
  },
  {
    id: 5,
    name: 'Oleksandr Usyk',
    nickname: 'The Cat',
    record: { wins: 21, losses: 0, draws: 0 },
    weightClass: 'Heavyweight',
    nationality: 'Ukraine',
    isChampion: true,
    ranking: 2,
    titles: ['WBA', 'IBF', 'WBO'],
  },
  {
    id: 6,
    name: 'Dmitry Bivol',
    nickname: 'The Big Russian',
    record: { wins: 21, losses: 0, draws: 0 },
    weightClass: 'Light Heavyweight',
    nationality: 'Russia',
    isChampion: true,
    ranking: 1,
    titles: ['WBA'],
  },
  {
    id: 7,
    name: 'Shakur Stevenson',
    nickname: 'Sugar',
    record: { wins: 20, losses: 0, draws: 0 },
    weightClass: 'Lightweight',
    nationality: 'USA',
    isChampion: false,
    ranking: 3,
    titles: [],
  },
  {
    id: 8,
    name: 'Ryan Garcia',
    nickname: 'KingRy',
    record: { wins: 24, losses: 1, draws: 0 },
    weightClass: 'Lightweight',
    nationality: 'USA',
    isChampion: false,
    ranking: 5,
    titles: [],
  },
];

const weightClasses = [
  'ALL WEIGHTS',
  'HEAVYWEIGHT',
  'CRUISERWEIGHT',
  'LIGHT HEAVYWEIGHT',
  'SUPER MIDDLEWEIGHT',
  'MIDDLEWEIGHT',
  'SUPER WELTERWEIGHT',
  'WELTERWEIGHT',
  'SUPER LIGHTWEIGHT',
  'LIGHTWEIGHT',
  'SUPER FEATHERWEIGHT',
  'FEATHERWEIGHT',
];

const Fighters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('ALL WEIGHTS');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showChampionsOnly, setShowChampionsOnly] = useState(false);

  // Filter fighters based on search and filters
  const filteredFighters = mockFighters.filter((fighter) => {
    const matchesSearch = fighter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fighter.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWeight = selectedWeight === 'ALL WEIGHTS' || 
                         fighter.weightClass.toUpperCase() === selectedWeight;
    const matchesChampion = !showChampionsOnly || fighter.isChampion;
    
    return matchesSearch && matchesWeight && matchesChampion;
  });

  // Count champions
  const championCount = mockFighters.filter(f => f.isChampion).length;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-b from-zinc-900 to-black p-6 lg:p-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">FIGHTERS</h1>
            <p className="text-zinc-500 mb-8">DISCOVER BOXING'S ELITE WARRIORS</p>

            {/* Search Bar */}
            <div className="relative mb-6">
              <RiSearchLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                type="text"
                placeholder="SEARCH FIGHTERS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-red-900 transition-colors placeholder-zinc-600 font-bold tracking-wider"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Weight Class Filter */}
              <div className="flex-1 min-w-[200px]">
                <select
                  value={selectedWeight}
                  onChange={(e) => setSelectedWeight(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-red-900 transition-colors font-bold tracking-wider appearance-none cursor-pointer"
                >
                  {weightClasses.map((weight) => (
                    <option key={weight} value={weight}>{weight}</option>
                  ))}
                </select>
              </div>

              {/* Champions Only Toggle */}
              <button
                onClick={() => setShowChampionsOnly(!showChampionsOnly)}
                className={`px-6 py-3 font-bold tracking-wider transition-colors ${
                  showChampionsOnly 
                    ? 'bg-red-900 text-white' 
                    : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white'
                }`}
              >
                CHAMPIONS ONLY
              </button>

              {/* View Mode Toggle */}
              <div className="flex bg-zinc-900 border border-zinc-800">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid' ? 'bg-red-900 text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <RiGridFill className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list' ? 'bg-red-900 text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <RiListUnordered className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-zinc-950 border-b border-zinc-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">TOTAL FIGHTERS:</span>
              <span className="text-white font-bold">{mockFighters.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">CHAMPIONS:</span>
              <span className="text-red-900 font-bold">{championCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">SHOWING:</span>
              <span className="text-white font-bold">{filteredFighters.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fighters Grid/List */}
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {filteredFighters.length > 0 ? (
            <motion.div 
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {filteredFighters.map((fighter, index) => (
                <motion.div
                  key={fighter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <FighterCard fighter={fighter} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <GiBoxingGlove className="w-20 h-20 text-zinc-800 mx-auto mb-4" />
              <p className="text-zinc-500 text-lg">NO FIGHTERS FOUND</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fighters;