import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const BoxingGloveLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 30; // Update every 30ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 200); // Small delay before completion
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const cornerVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.2, duration: 0.5, ease: "easeInOut" },
        opacity: { delay: i * 0.2, duration: 0.1 }
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="relative w-[400px] h-[300px] flex items-center justify-center">
        {/* Ring Corners Animation - Positioned around content */}
        <div className="absolute inset-0">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 300"
          >
            {/* Top Left Corner */}
            <motion.path
              d="M 30 70 L 30 30 L 70 30"
              stroke="#DC143C"
              strokeWidth="4"
              fill="none"
              strokeLinecap="square"
              variants={cornerVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            />
            {/* Top Right Corner */}
            <motion.path
              d="M 330 30 L 370 30 L 370 70"
              stroke="#DC143C"
              strokeWidth="4"
              fill="none"
              strokeLinecap="square"
              variants={cornerVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            />
            {/* Bottom Right Corner */}
            <motion.path
              d="M 370 230 L 370 270 L 330 270"
              stroke="#DC143C"
              strokeWidth="4"
              fill="none"
              strokeLinecap="square"
              variants={cornerVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            />
            {/* Bottom Left Corner */}
            <motion.path
              d="M 70 270 L 30 270 L 30 230"
              stroke="#DC143C"
              strokeWidth="4"
              fill="none"
              strokeLinecap="square"
              variants={cornerVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            />
          </svg>
        </div>

        <div className="text-center relative z-10">

          {/* Progress Bar Container */}
          <div className="w-64 mx-auto mb-6">
            <div className="h-1 bg-zinc-900 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-red-900"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Progress Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <h2 className="text-7xl font-black text-zinc-800 font-mono">
              {Math.round(progress).toString().padStart(3, '0')}
            </h2>
            <p className="text-zinc-600 text-xs tracking-[0.3em] uppercase">
              Entering the Ring
            </p>
          </motion.div>
        </div>

        {/* Corner Dots Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-2 h-2 bg-red-900"
            style={{ top: '30px', left: '30px' }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-red-900"
            style={{ top: '30px', right: '30px' }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-red-900"
            style={{ bottom: '30px', right: '30px' }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-red-900"
            style={{ bottom: '30px', left: '30px' }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1.5,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BoxingGloveLoader;