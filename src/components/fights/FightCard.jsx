import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RiMapPinLine, RiCalendarLine, RiStarFill } from 'react-icons/ri';
import { GiBoxingGlove } from 'react-icons/gi';

const FightCard = ({ fight }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).toUpperCase();
  };

  const handleClick = () => {
    navigate(`/fight/${fight.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className="bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer group flex flex-col h-full"
    >
      {/* Card Header - Always render but make invisible if not championship */}
      <div className={`${fight.isChampionship ? 'bg-red-900' : 'bg-transparent'} text-white text-xs font-bold text-center py-1 tracking-wider`}>
        {fight.isChampionship ? 'CHAMPIONSHIP BOUT' : '\u00A0'}
      </div>

      {/* Fighters Section - Make it flex-1 to fill available space */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Fighter 1 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white group-hover:text-red-900 transition-colors">
              {fight.fighter1.name.toUpperCase()}
            </h4>
            <p className="text-sm text-zinc-500">{fight.fighter1.record}</p>
          </div>
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
            <GiBoxingGlove className="w-8 h-8 text-zinc-600" />
          </div>
        </div>

        {/* VS Divider */}
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-500 font-bold text-sm">VS</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Fighter 2 */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
            <GiBoxingGlove className="w-8 h-8 text-zinc-600 transform scale-x-[-1]" />
          </div>
          <div className="flex-1 text-right">
            <h4 className="text-xl font-bold text-white group-hover:text-red-900 transition-colors">
              {fight.fighter2.name.toUpperCase()}
            </h4>
            <p className="text-sm text-zinc-500">{fight.fighter2.record}</p>
          </div>
        </div>

        {/* Fight Details - Add margin-top auto to push to bottom */}
        <div className="space-y-2 mt-auto">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <RiCalendarLine className="w-4 h-4" />
            <span>{formatDate(fight.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <RiMapPinLine className="w-4 h-4" />
            <span className="truncate">{fight.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <GiBoxingGlove className="w-4 h-4" />
            <span>{fight.weightClass}</span>
          </div>
          
          {/* PPV Badge - Include in the details section */}
          {fight.isPPV && (
            <div className="flex items-center gap-2 pt-2">
              <RiStarFill className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-bold text-yellow-500">PAY-PER-VIEW</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="border-t border-zinc-800 p-4">
        <button className="w-full bg-zinc-800 text-white py-2 font-bold text-sm tracking-wider hover:bg-red-900 transition-colors">
          MAKE PREDICTION
        </button>
      </div>
    </motion.div>
  );
};

export default FightCard;