import { motion } from 'framer-motion';
import { GiBoxingGlove } from 'react-icons/gi';
import boxingImage from '../../../assets/boxing-placeholder.svg'; // Replace with boxing-fighters.png when available
import ColorSplash from '../../../components/ColorSplash';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Boxing Theme with Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-boxing-darker">
        {/* Color Splash Effect */}
        <ColorSplash />
        
        {/* Boxing Image */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.img
            src={boxingImage}
            alt="Boxing Fighters"
            className="w-full h-full object-contain"
            style={{ 
              filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.8))' 
            }}
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Text Content - Positioned at Top */}
        <div className="absolute top-0 left-0 right-0 p-12 z-20">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-7xl font-boxing font-bold mb-2 text-white drop-shadow-2xl">
              BOXING FAN
            </h1>
            <h2 className="text-5xl font-boxing text-yellow-400 drop-shadow-2xl">
              PLATFORM
            </h2>
          </motion.div>
        </div>
        
        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
          <motion.p
            className="text-xl text-white/90 text-center mb-8 drop-shadow-lg max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Join the ultimate boxing community. Make predictions, follow fighters, and compete with fans worldwide.
          </motion.p>
          
          <motion.div
            className="flex justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 drop-shadow-lg">50K+</div>
              <div className="text-white/80 text-sm">Active Fans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 drop-shadow-lg">10K+</div>
              <div className="text-white/80 text-sm">Daily Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 drop-shadow-lg">500+</div>
              <div className="text-white/80 text-sm">Pro Fighters</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-boxing-darker">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <GiBoxingGlove className="w-16 h-16 text-boxing-red" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400">{subtitle}</p>
          </motion.div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;